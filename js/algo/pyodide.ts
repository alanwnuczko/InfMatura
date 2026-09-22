import { companionTypingTimer, companionPauseTimer, setCompanionState } from './editor';
import { PYODIDE_CDN, PYODIDE_INDEX_URL, PYODIDE_RUN_TIMEOUT_MS, PYODIDE_MAX_CODE_LENGTH, state, saveProgress } from './state';
import { checkmarkSvg, crossSvg, escHtml } from './ui';


  // --- Silnik Pyodide i uruchamianie testow ---
export function createPyodideWorker() {
    var workerSource = [
      "'use strict';",
      "var pyodidePromise = null;",
      "function getPyodide() {",
      "  if (!pyodidePromise) {",
      "    importScripts(" + JSON.stringify(PYODIDE_CDN) + ");",
      "    pyodidePromise = loadPyodide({ indexURL: " + JSON.stringify(PYODIDE_INDEX_URL) + " });",
      "  }",
      "  return pyodidePromise;",
      "}",
      "self.onmessage = function (event) {",
      "  var data = event.data || {};",
      "  if (data.type === 'load') {",
      "    getPyodide().then(function () {",
      "      self.postMessage({ type: 'ready' });",
      "    }).catch(function (err) {",
      "      self.postMessage({ type: 'error', message: String(err) });",
      "    });",
      "    return;",
      "  }",
      "  if (data.type === 'run') {",
      "    getPyodide().then(function (py) {",
      "      if (data.runnerScript.length > " + PYODIDE_MAX_CODE_LENGTH + ") {",
      "        throw new Error('Kod przekracza limit rozmiaru.');",
      "      }",
      "      py.runPython(data.runnerScript);",
      "      var jsonProxy = py.globals.get('_out_json');",
      "      var jsonStr = String(jsonProxy);",
      "      if (jsonProxy && typeof jsonProxy.destroy === 'function') {",
      "        jsonProxy.destroy();",
      "      }",
      "      if (jsonStr.length > 200000) {",
      "        throw new Error('Wynik testów przekroczył limit rozmiaru.');",
      "      }",
      "      self.postMessage({ type: 'result', requestId: data.requestId, results: JSON.parse(jsonStr) });",
      "    }).catch(function (err) {",
      "      self.postMessage({ type: 'error', requestId: data.requestId, message: String(err) });",
      "    });",
      "  }",
      "};"
    ].join('\n');
    var blob = new Blob([workerSource], { type: 'application/javascript' });
    var url = URL.createObjectURL(blob);
    return {
      worker: new Worker(url),
      url: url
    };
  }

export function terminatePyodideWorker(nextState: "idle" | "loading" | "ready" | "error") {
    if (state.pyodideWorker) {
      state.pyodideWorker.terminate();
    }
    if (state.pyodideWorkerUrl) {
      URL.revokeObjectURL(state.pyodideWorkerUrl);
    }
    state.pyodideWorker = null;
    state.pyodideWorkerUrl = null;
    state.pyodidePromise = null;
    state.pyodideState = nextState;
    updatePyodideStatusDisplay();
  }

export function loadPyodide(): Promise<Worker> {
    if (state.pyodideState === 'ready') return Promise.resolve(state.pyodideWorker!);
    if (state.pyodideState === 'loading') return state.pyodidePromise!;

    state.pyodideState = 'loading';
    updatePyodideStatusDisplay();

    var created = createPyodideWorker();
    state.pyodideWorker = created.worker;
    state.pyodideWorkerUrl = created.url;
    state.pyodidePromise = new Promise(function (resolve, reject) {
      function onMessage(event: any) {
        var data = event.data || {};
        if (data.type === 'ready') {
          state.pyodideState = 'ready';
          state.pyodideWorker!.removeEventListener('message', onMessage);
          state.pyodideWorker!.removeEventListener('error', onError);
          updatePyodideStatusDisplay();
          resolve(state.pyodideWorker!);
        } else if (data.type === 'error') {
          onError(new Error(data.message || 'Nie udało się uruchomić środowiska Python.'));
        }
      }
      function onError(err: any) {
        state.pyodideState = 'error';
        state.pyodideWorker!.removeEventListener('message', onMessage);
        state.pyodideWorker!.removeEventListener('error', onError);
        terminatePyodideWorker('error');
        reject(err instanceof Error ? err : new Error('Nie udało się uruchomić środowiska Python.'));
      }
      state.pyodideWorker!.addEventListener('message', onMessage);
      state.pyodideWorker!.addEventListener('error', onError);
      state.pyodideWorker!.postMessage({ type: 'load' });
    });

    return state.pyodidePromise;
  }

export function updatePyodideStatusDisplay() {
    var status = document.getElementById('algo-py-status');
    if (!status) return;

    switch (state.pyodideState) {
      case 'idle':
        status.textContent = 'Środowisko Python: oczekiwanie...';
        status.className   = 'algo-py-status';
        break;
      case 'loading':
        status.textContent = 'Środowisko Python: ładowanie...';
        status.className   = 'algo-py-status';
        break;
      case 'ready':
        status.textContent = 'Python 3.11 gotowy';
        status.className   = 'algo-py-status is-ready';
        break;
      case 'error':
        status.textContent = 'Środowisko Python: błąd ładowania';
        status.className   = 'algo-py-status';
        break;
    }
  }

export function runTaskTests(task: AlgoTask) {
    var editor = document.getElementById('algo-editor') as HTMLTextAreaElement;
    var runBtn = document.getElementById('algo-run-btn') as HTMLButtonElement;
    var consoleBody = document.getElementById('algo-console-body');
    var runLabel = document.getElementById('algo-run-label');

    if (!editor || !consoleBody || !runBtn) return;

    var userCode = editor.value;

    runBtn.disabled = true;
    if (runLabel) runLabel.textContent = 'Testowanie...';
    if (companionTypingTimer) clearTimeout(companionTypingTimer);
    if (companionPauseTimer) clearTimeout(companionPauseTimer);
    setCompanionState('typing');

    // Skonstruuj skrypt ewaluacyjny Pythona
    var testCasesJson = JSON.stringify(task.testCases);
    var fnNameJson    = JSON.stringify(task.functionName);
    var requirementsJson = JSON.stringify({
      inPlaceArg: Number.isInteger(task.inPlaceArg) ? task.inPlaceArg : null
    });

    var runnerScript = [
      'import copy, json, time',
      '',
      userCode,
      '',
      '_results = []',
      '_fn = globals().get(' + fnNameJson + ')',
      'if _fn is None:',
      '    raise NameError("Nie zdefiniowano funkcji o nazwie: " + ' + fnNameJson + ')',
      '',
      '_requirements = json.loads(' + JSON.stringify(requirementsJson) + ')',
      '_test_cases = json.loads(' + JSON.stringify(testCasesJson) + ')',
      'for tc in _test_cases:',
      '    try:',
      '        args = eval(tc["input"])',
      '    except Exception as _e:',
      '        args = ()',
      '    if isinstance(args, tuple):',
      '        if len(args) == 1:',
      '            _input_repr = repr(args[0])',
      '        else:',
      '            _input_repr = ", ".join(repr(a) for a in args)',
      '    else:',
      '        _input_repr = repr(args)',
      '    expected = tc["expected"]',
      '    t0 = time.perf_counter()',
      '    try:',
      '        _in_place_target = None',
      '        _in_place_before = None',
      '        if _requirements["inPlaceArg"] is not None:',
      '            _in_place_target = args[_requirements["inPlaceArg"]]',
      '            _in_place_before = copy.deepcopy(_in_place_target)',
      '        got = _fn(*args)',
      '        t1 = time.perf_counter()',
      '        output_passed = bool(got == expected)',
      '        requirements_passed = True',
      '        requirement_error = None',
      '        in_place_observed = _in_place_target is not None and _in_place_target != _in_place_before',
      '        passed = output_passed and requirements_passed',
      '        _results.append({',
      '            "passed": passed,',
      '            "outputPassed": output_passed,',
      '            "requirementsPassed": requirements_passed,',
      '            "inPlaceObserved": in_place_observed,',
      '            "input": _input_repr,',
      '            "got": repr(got),',
      '            "expected": repr(expected),',
      '            "timeMs": round((t1 - t0) * 1000, 2),',
      '            "error": None,',
      '            "requirementError": requirement_error',
      '        })',
      '    except Exception as _e:',
      '        _results.append({',
      '            "passed": False,',
      '            "outputPassed": False,',
      '            "requirementsPassed": False,',
      '            "input": _input_repr,',
      '            "got": None,',
      '            "expected": repr(expected),',
      '            "timeMs": 0,',
      '            "error": str(_e),',
      '            "requirementError": None,',
      '            "inPlaceObserved": False',
      '        })',
      '',
      'if _requirements["inPlaceArg"] is not None and not any(r["inPlaceObserved"] for r in _results):',
      '    for r in _results:',
      '        r["requirementsPassed"] = False',
      '        r["passed"] = False',
      '        r["requirementError"] = "Funkcja musi modyfikować przekazany argument w miejscu (in-place)."',
      '',
      '_out_json = json.dumps(_results)'
    ].join('\n');

    var requestId = ++state.runRequestId;
    loadPyodide().then(function (worker) {
      return new Promise<any[]>(function (resolve, reject) {
        var timeoutId;
        function cleanup() {
          clearTimeout(timeoutId);
          worker.removeEventListener('message', onMessage);
          worker.removeEventListener('error', onError);
        }
        function onMessage(event) {
          var data = event.data || {};
          if (data.requestId !== requestId) return;
          cleanup();
          if (data.type === 'result') {
            resolve(data.results);
          } else {
            reject(new Error(data.message || 'Nie udało się wykonać testów.'));
          }
        }
        function onError(err) {
          cleanup();
          terminatePyodideWorker('error');
          reject(err instanceof Error ? err : new Error('Nie udało się wykonać testów.'));
        }
        timeoutId = setTimeout(function () {
          cleanup();
          terminatePyodideWorker('idle');
          var timeoutError: any = new Error('Przekroczono limit czasu wykonania testów.');
          timeoutError.code = 'PYODIDE_TIMEOUT';
          reject(timeoutError);
        }, PYODIDE_RUN_TIMEOUT_MS);
        worker.addEventListener('message', onMessage);
        worker.addEventListener('error', onError);
        worker.postMessage({
          type: 'run',
          requestId: requestId,
          runnerScript: runnerScript
        });
      });
    }).then(function (results) {
      displayTestResults(task, results);

      var allPassed = results.every(function (r) { return r.passed; });
      if (allPassed) {
        setCompanionState('success');
        saveProgress(task.id);
        // Zaktualizuj nagłówek jeśli trzeba
        var meta = document.querySelector('.card-meta');
        if (meta && !meta.querySelector('.pill-badge--done')) {
          var badge = document.createElement('span');
          badge.className = 'pill-badge pill-badge--done';
          badge.textContent = 'Ukończono';
          meta.appendChild(badge);
        }
    } else {
        setCompanionState('error');
      }
    }).catch(function (err) {
      setCompanionState('error');
      var cleanedErr = cleanPythonTraceback(err, userCode);
      if (consoleBody) {
        consoleBody.innerHTML = '<div class="algo-console-banner is-failure">'
          + '<span>' + (err && err.code === 'PYODIDE_TIMEOUT'
            ? 'Przekroczono limit czasu wykonania testów'
            : 'Błąd w kodzie lub brak definicji funkcji') + '</span>'
          + '</div>'
          + '<pre class="algo-error-pre">'
          + escHtml(cleanedErr)
          + '</pre>';
      }
    }).finally(function () {
      runBtn.disabled = false;
      if (runLabel) runLabel.textContent = 'Uruchom i sprawdź testy';
    });
  }

export function cleanPythonTraceback(err: unknown, userCode: string): string {
    if (!err) return 'Nieznany błąd wykonania.';
    var str = String(err).trim();
    // Usuń prefiks "PythonError: "
    str = str.replace(/^PythonError:\s*/i, '');

    var prefixLines = 2; // Liczba linii przed userCode w runnerScript ('import json, time\n\n')
    var userLinesCount = userCode ? userCode.split('\n').length : 9999;

    var lines = str.split('\n');
    var cleaned: string[] = [];
    var skipInternal = false;

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];

      // Wykryj wewnętrzne moduły Pyodide / biblioteki standardowej WebAssembly
      if (line.indexOf('/lib/python3') !== -1 || line.indexOf('_pyodide') !== -1) {
        skipInternal = true;
        continue;
      }
      if (skipInternal) {
        if (/^\s*File\s+"/.test(line) || /^[A-Z][a-zA-Z0-9_]*(?:Error|Exception):/.test(line)) {
          skipInternal = false;
        } else {
          continue;
        }
      }

      var userCodeMatch = line.match(/^(\s*)File\s+"<user_code>",\s+line\s+(\d+)(.*)/);
      if (userCodeMatch) {
        line = userCodeMatch[1] + 'File "rozwiazanie.py", line ' + userCodeMatch[2] + userCodeMatch[3];
      }

      // Zamień odwołanie do pliku wewnętrznego <exec> na rozwiazanie.py i zmapuj numer linii
      var execMatch = line.match(/^(\s*)File\s+"<exec>",\s+line\s+(\d+)(.*)/);
      if (execMatch) {
        var rawLineNum = parseInt(execMatch[2], 10);
        var userLineNum = rawLineNum - prefixLines;
        if (userLineNum > 0 && userLineNum <= userLinesCount) {
          line = execMatch[1] + 'Plik "rozwiazanie.py", linia ' + userLineNum + execMatch[3];
        } else {
          line = execMatch[1] + 'Plik "rozwiazanie.py"' + execMatch[3];
        }
      }

      cleaned.push(line);
    }

    var result = cleaned.join('\n').trim();
    result = result.replace(/^Traceback\s*\(most recent call last\):/i, 'Ślad błędu (ostatnie wywołania):');
    return result || str;
  }

export function displayTestResults(task: AlgoTask, results: any[]) {
    var consoleBody = document.getElementById('algo-console-body');
    if (!consoleBody) return;

    var passedCount = results.filter(function (r) { return r.outputPassed; }).length;
    var totalCount  = results.length;
    var allOutputsPassed = passedCount === totalCount;
    var allRequirementsPassed = results.every(function (r) { return r.requirementsPassed; });
    var allPassed = allOutputsPassed && allRequirementsPassed;
    var bannerText;
    if (allPassed) {
      bannerText = 'Zaliczono wszystkie testy (' + passedCount + ' / ' + totalCount + ')';
    } else if (allOutputsPassed && !allRequirementsPassed) {
      bannerText = 'Testy wyników zaliczone, ale nie spełniono wymagań algorytmu';
    } else {
      bannerText = 'Zaliczono ' + passedCount + ' z ' + totalCount + ' ' + (totalCount === 1 ? 'testu' : 'testów');
    }

    var html = '<div class="algo-console-banner ' + (allPassed ? 'is-success' : 'is-failure') + '">'
      + (allPassed ? checkmarkSvg() : crossSvg())
      + '<span>' + bannerText + '</span>'
      + '</div>'
      + '<div class="algo-tests-table-wrapper">'
      + '<table class="algo-tests-table" aria-label="Tabela wyników testów">'
      + '<thead><tr>'
      + '<th>Test</th>'
      + '<th>Status</th>'
      + '<th>Wejście</th>'
      + '<th>Oczekiwano</th>'
      + '<th>Otrzymano</th>'
      + '<th>Czas</th>'
      + '</tr></thead><tbody>';

    results.forEach(function (r, i) {
      html += '<tr>'
        + '<td><strong>#' + (i + 1) + '</strong></td>'
        + '<td class="' + (r.passed ? 'algo-test-status--ok' : 'algo-test-status--fail') + '">'
        + (r.passed ? 'Zaliczony' : 'Niezaliczony')
        + '</td>'
        + '<td><code>' + escHtml(r.input) + '</code></td>'
        + '<td><code>' + escHtml(r.expected) + '</code></td>'
        + '<td><code>' + (r.error
          ? ('Błąd: ' + escHtml(r.error))
          : (r.requirementError
            ? escHtml(r.requirementError)
            : escHtml(r.got))) + '</code></td>'
        + '<td>' + r.timeMs + ' ms</td>'
        + '</tr>';
    });

    html += '</tbody></table></div>';

    if (allPassed) {
      html += '<div style="margin-top:16px;padding:14px;background:rgba(34,197,94,0.06);border:1px solid rgba(74,222,128,0.25);border-radius:8px;font-size:0.875rem;color:#86efac">'
        + (task.inPlaceArg !== undefined
          ? 'Wszystkie testy i jawne wymagania wykonania w miejscu zostały zaliczone. '
          : 'Wszystkie testy zostały zaliczone. ')
        + 'Złożoność czasowa i pamięciowa nie jest automatycznie weryfikowana.'
        + '</div>';

      // Automatycznie odsłoń wzorcowe rozwiązanie
      var solPanel = document.getElementById('algo-solution-panel');
      if (solPanel) solPanel.style.display = 'block';
      var solBtn = document.getElementById('algo-toggle-solution-btn');
      if (solBtn) solBtn.textContent = 'Ukryj wzorcowe rozwiązanie';
    }

    consoleBody.innerHTML = html;
  }
