$rootDir = (Get-Item $PSScriptRoot).Parent.FullName
$examsPath = Join-Path $rootDir "data\exams.js"

$raw = [System.IO.File]::ReadAllText($examsPath, [System.Text.Encoding]::UTF8)
$startIdx = $raw.IndexOf("[")
$endIdx = $raw.LastIndexOf("]")
$jsonOnly = $raw.Substring($startIdx, $endIdx - $startIdx + 1)
$cleanJson = [System.Text.RegularExpressions.Regex]::Replace($jsonOnly, "(?m)^\s*//.*$", "")
$exams = ConvertFrom-Json $cleanJson

$MONTHS = @{
    "05" = "Maj"
    "06" = "Czerwiec"
    "12" = "Grudzień"
}

$FORMULA_LABELS = @{
    "F2007" = "Formuła 2007"
    "F2015" = "Formuła 2015"
    "F2023" = "Formuła 2023"
}

$FORMULA_DESCS = @{
    "F2007" = "Egzamin w starej Formule 2007 składał się z części teoretycznej (część I) oraz części praktycznej przy komputerze (część II)."
    "F2015" = "Egzamin w Formule 2015 składał się z dwóch części: część I (teoria i analiza algorytmów na kartce, 60 minut) oraz część II (praca z arkuszem, bazą danych i programowaniem, 150 minut)."
    "F2023" = "Nowa Formuła 2023 to jednolity egzamin trwający 210 minut, rozwiązywany w całości przy komputerze. Obejmuje zadania z programowania w Pythonie/C++/Javie, baz danych SQL, arkusza kalkulacyjnego oraz teorii informatyki."
}

$EXAM_TYPES = @{
    "PP" = "Poziom podstawowy"
    "PR" = "Poziom rozszerzony"
}

$PDF_CDN = "https://cdn.jsdelivr.net/gh/alanwnuczko/matura-informatyka-rozszerzona@main/Arkusze"
$REPO_BASE = "https://github.com/alanwnuczko/matura-informatyka-rozszerzona"
$API_BASE = "https://api.github.com/repos/alanwnuczko/matura-informatyka-rozszerzona/contents/Arkusze"

$arrowUp = '<svg class="link-arrow-svg" viewBox="0 0 16 16" fill="none" width="12" height="12" aria-hidden="true"><path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
$arrowDown = '<svg class="link-arrow-svg" viewBox="0 0 16 16" fill="none" width="12" height="12" aria-hidden="true"><path d="M8 3.5V12.5M8 12.5L4.5 9M8 12.5L11.5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
$copySvg = '<svg class="copy-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true"><rect x="5" y="5" width="8" height="8" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M11 3H4C3.44772 3 3 3.44772 3 4V11" stroke="currentColor" stroke-width="1.5"/></svg>'

$headers = @{ "User-Agent" = "InfMatura-Generator" }

function Escape-Html([string]$str) {
    if ([string]::IsNullOrEmpty($str)) { return "" }
    return $str.Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;").Replace('"', "&quot;")
}

function Get-LanguageClass([string]$filename) {
    $ext = [System.IO.Path]::GetExtension($filename).ToLower()
    switch ($ext) {
        ".py" { return "language-python" }
        ".sql" { return "language-sql" }
        ".cpp" { return "language-cpp" }
        ".pas" { return "language-pascal" }
        ".java" { return "language-java" }
        default { return "language-none" }
    }
}

$arkuszeDir = Join-Path $rootDir "arkusze"
if (![System.IO.Directory]::Exists($arkuszeDir)) {
    [System.IO.Directory]::CreateDirectory($arkuszeDir) | Out-Null
}

$sitemapUrls = [System.Collections.Generic.List[string]]::new()
$today = (Get-Date).ToString("yyyy-MM-dd")

$sitemapUrls.Add("  <url>`n    <loc>https://infmatura.dev/</loc>`n    <lastmod>$today</lastmod>`n    <changefreq>daily</changefreq>`n    <priority>1.0</priority>`n  </url>")
$sitemapUrls.Add("  <url>`n    <loc>https://infmatura.dev/pytania-teoretyczne/</loc>`n    <lastmod>$today</lastmod>`n    <changefreq>weekly</changefreq>`n    <priority>0.9</priority>`n  </url>")
$sitemapUrls.Add("  <url>`n    <loc>https://infmatura.dev/polityka-prywatnosci/</loc>`n    <lastmod>$today</lastmod>`n    <changefreq>monthly</changefreq>`n    <priority>0.3</priority>`n  </url>")

Write-Host "Generowanie podstron dla $($exams.Count) arkuszy z renderowaniem Markdown..."

for ($i = 0; $i -lt $exams.Count; $i++) {
    $e = $exams[$i]
    $prev = if ($i -gt 0) { $exams[$i - 1] } else { $null }
    $next = if ($i -lt ($exams.Count - 1)) { $exams[$i + 1] } else { $null }

    $mName = if ($MONTHS.ContainsKey($e.month)) { $MONTHS[$e.month] } else { $e.month }
    $dTitle = "$mName $($e.year)"
    $tLabel = if ($EXAM_TYPES.ContainsKey($e.type)) { $EXAM_TYPES[$e.type] } else { $e.type }
    $fLabel = if ($FORMULA_LABELS.ContainsKey($e.formula)) { $FORMULA_LABELS[$e.formula] } else { $e.formula }
    $fDesc = if ($FORMULA_DESCS.ContainsKey($e.formula)) { $FORMULA_DESCS[$e.formula] } else { "" }
    $fClass = if ($e.formula -eq "F2023") { "pill-badge--f2023" } elseif ($e.formula -eq "F2015") { "pill-badge--f2015" } else { "pill-badge--fother" }
    $tClass = if ($e.type -eq "PP") { "pill-badge--pp" } else { "pill-badge--pr" }

    $fullTitle = "Matura informatyka $dTitle ($tLabel, $fLabel)"
    $metaDesc = "Oficjalny arkusz CKE, pliki z danymi (ZIP), zasady oceniania oraz rozwiązania zadań w Pythonie z matury z informatyki ($($tLabel.ToLower()), $fLabel) - $dTitle."
    $canUrl = "https://infmatura.dev/arkusze/$($e.id)/"

    # 1. Action buttons
    $parts = if ($e.parts) { $e.parts } else { @("Arkusz") }
    $actionsHTML = ""
    foreach ($p in $parts) {
        $pLabel = if ($p -eq "Arkusz") { "Arkusz PDF" } else { $p.Replace("_cz", " cz. ").Replace("_", " ") }
        $pUrl = "$PDF_CDN/$($e.id)/$p.pdf"
        $actionsHTML += "<a href=""$pUrl"" target=""_blank"" rel=""noopener noreferrer"" class=""card-link""><span>$pLabel</span>$arrowUp</a>"
    }

    if ($e.hasData) {
        $daneUrl = "$REPO_BASE/raw/main/Arkusze/$($e.id)/Dane.zip"
        $actionsHTML += "<a href=""$daneUrl"" download class=""card-link""><span>Dane ZIP</span>$arrowDown</a>"
    }

    if ($e.hasZasady) {
        $zasUrl = "$PDF_CDN/$($e.id)/Zasady.pdf"
        $actionsHTML += "<a href=""$zasUrl"" target=""_blank"" rel=""noopener noreferrer"" class=""card-link""><span>Zasady oceniania</span>$arrowUp</a>"
    }

    # Fetch Solution Files from GitHub
    $codeViewerHTML = ""
    if ($e.hasSolution) {
        $solUrl = "$REPO_BASE/tree/main/Arkusze/$($e.id)/Rozwiazanie"
        $solZipUrl = "$REPO_BASE/raw/main/Arkusze/$($e.id)/Rozwiazanie.zip"

        $manifestPath = Join-Path $PSScriptRoot "solutions-manifest.json"
        $manifest = if ([System.IO.File]::Exists($manifestPath)) {
            [System.IO.File]::ReadAllText($manifestPath, [System.Text.Encoding]::UTF8) | ConvertFrom-Json
        } else { $null }

        $displayFiles = @()
        if ($manifest -and $manifest.PSObject.Properties[$e.id]) {
            $displayFiles = $manifest.$($e.id)
        } else {
            $apiUri = "$API_BASE/$($e.id)/Rozwiazanie"
            try {
                $fileList = Invoke-RestMethod -Uri $apiUri -Headers $headers
                foreach ($item in $fileList) {
                    if ($item.type -eq "file") {
                        $ext = [System.IO.Path]::GetExtension($item.name).ToLower()
                        if ($ext -in @(".py", ".sql", ".cpp", ".pas", ".java", ".txt", ".md")) {
                            $displayFiles += $item.name
                        }
                    }
                }
            } catch {
                Write-Host "    [WARN] Nie udało się pobrać listy plików dla $($e.id): $_"
            }
        }

        if ($displayFiles.Count -gt 0) {
            # Sort: .py first, then .sql, .md, .txt
            $displayFiles = $displayFiles | Sort-Object @{
                Expression = {
                    $ext = [System.IO.Path]::GetExtension($_).ToLower()
                    if ($ext -eq ".py") { 1 }
                    elseif ($ext -eq ".cpp" -or $ext -eq ".java") { 2 }
                    elseif ($ext -eq ".sql") { 3 }
                    elseif ($ext -eq ".md") { 4 }
                    else { 5 }
                }
            }, { $_ }

            $tabsHTML = ""
            $panelsHTML = ""
            $renderedCount = 0

            for ($fIdx = 0; $fIdx -lt $displayFiles.Count; $fIdx++) {
                $fName = $displayFiles[$fIdx]
                $ext = [System.IO.Path]::GetExtension($fName).ToLower()

                $rawUrl = "https://raw.githubusercontent.com/alanwnuczko/matura-informatyka-rozszerzona/main/Arkusze/$($e.id)/Rozwiazanie/$fName"
                $fContent = ""
                try {
                    $wc = [System.Net.WebClient]::new()
                    $wc.Headers.Add("User-Agent", "InfMatura-Generator")
                    $b = $wc.DownloadData($rawUrl)
                    $fContent = [System.Text.Encoding]::UTF8.GetString($b)
                } catch {
                    Write-Host "    [SKIP] Nie znaleziono pliku $fName dla $($e.id)"
                    continue
                }

                if ([string]::IsNullOrWhiteSpace($fContent)) {
                    continue
                }

                $isActive = if ($renderedCount -eq 0) { " is-active" } else { "" }
                $isAriaSelected = if ($renderedCount -eq 0) { "true" } else { "false" }
                $tabId = "tab-$($e.id)-$renderedCount"
                $panelId = "panel-$($e.id)-$renderedCount"

                $tabsHTML += "<button class=""code-tab$isActive"" role=""tab"" aria-selected=""$isAriaSelected"" aria-controls=""$panelId"" id=""$tabId"">$fName</button>"

                if ($ext -eq ".md") {
                    $escapedRawMd = [System.Web.HttpUtility]::HtmlEncode($fContent)
                    $panelsHTML += "<div class=""code-panel$isActive code-panel-md"" id=""$panelId"" role=""tabpanel"" aria-labelledby=""$tabId""><div class=""code-panel-header""><span class=""code-file-name"">$fName</span><button class=""copy-code-btn"" type=""button"" aria-label=""Kopiuj zawartość $fName"">$copySvg<span class=""copy-btn-text"">Kopiuj</span></button></div><script type=""text/markdown"">$fContent</script><div class=""markdown-rendered""></div></div>"
                } else {
                    $langClass = Get-LanguageClass $fName
                    $escapedCode = Escape-Html $fContent
                    $panelsHTML += "<div class=""code-panel$isActive"" id=""$panelId"" role=""tabpanel"" aria-labelledby=""$tabId""><div class=""code-panel-header""><span class=""code-file-name"">$fName</span><button class=""copy-code-btn"" type=""button"" aria-label=""Kopiuj zawartość $fName"">$copySvg<span class=""copy-btn-text"">Kopiuj</span></button></div><pre class=""code-pre""><code class=""$langClass"">$escapedCode</code></pre></div>"
                }

                $renderedCount++
            }

            $codeViewerHTML = @"
        <!-- Code Viewer Section -->
        <section class="solutions-viewer-section" aria-labelledby="solutions-viewer-heading">
          <div class="solutions-viewer-header">
            <div>
              <h2 id="solutions-viewer-heading" class="solutions-viewer-title">Podgląd rozwiązań</h2>
            </div>
            <div class="solutions-viewer-header-actions">
              <a href="$solUrl" target="_blank" rel="noopener noreferrer" class="solutions-header-btn">
                $githubSvg
                <span>Zobacz na GitHub</span>
                $arrowUp
              </a>
              <a href="$solZipUrl" target="_blank" rel="noopener noreferrer" class="solutions-header-btn" title="Pobierz całe rozwiązanie jako ZIP">
                <span>Pobierz ZIP</span>
                $arrowDown
              </a>
            </div>
          </div>

          <div class="code-viewer">
            <div class="code-tabs-bar" role="tablist" aria-label="Pliki z rozwiązaniami">
              $tabsHTML
            </div>
            <div class="code-panels-container">
              $panelsHTML
            </div>
          </div>
        </section>
"@
        }
    }

    # Navigation buttons
    $prevBtn = if ($prev) {
        $pm = if ($MONTHS.ContainsKey($prev.month)) { $MONTHS[$prev.month] } else { $prev.month }
        "<a href=""/arkusze/$($prev.id)/"" class=""exam-nav-link exam-nav-link--prev""><span class=""exam-nav-arrow"" aria-hidden=""true"">←</span><span>$pm $($prev.year) ($($prev.type))</span></a>"
    } else {
        "<span class=""exam-nav-link exam-nav-link--disabled""><span class=""exam-nav-arrow"" aria-hidden=""true"">←</span><span>Poprzedni</span></span>"
    }

    $nextBtn = if ($next) {
        $nm = if ($MONTHS.ContainsKey($next.month)) { $MONTHS[$next.month] } else { $next.month }
        "<a href=""/arkusze/$($next.id)/"" class=""exam-nav-link exam-nav-link--next""><span>$nm $($next.year) ($($next.type))</span><span class=""exam-nav-arrow"" aria-hidden=""true"">→</span></a>"
    } else {
        "<span class=""exam-nav-link exam-nav-link--disabled""><span>Następny</span><span class=""exam-nav-arrow"" aria-hidden=""true"">→</span></span>"
    }

    $jsonLd = @"
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "InfMatura",
            "item": "https://infmatura.dev/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Baza arkuszy",
            "item": "https://infmatura.dev/#baza-arkuszy"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "$dTitle ($($e.type))",
            "item": "$canUrl"
          }
        ]
      },
      {
        "@type": ["LearningResource", "DigitalDocument"],
        "@id": "$canUrl",
        "name": "$fullTitle",
        "description": "$metaDesc",
        "url": "$canUrl",
        "inLanguage": "pl",
        "datePublished": "$($e.year)-$($e.month)-01",
        "learningResourceType": "Exam paper",
        "educationalLevel": "Upper Secondary Education",
        "assesses": "Informatyka",
        "publisher": {
          "@type": "Organization",
          "name": "Centralna Komisja Egzaminacyjna",
          "url": "https://cke.gov.pl"
        }
      }
    ]
  }
"@

    $html = @"
<!DOCTYPE html>
<html lang="pl" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$fullTitle | InfMatura</title>
  <meta name="description" content="$metaDesc">
  <meta name="theme-color" content="#09090B">
  <meta name="robots" content="index, follow">
  <meta name="author" content="alanwnuczko">

  <link rel="canonical" href="$canUrl">
  <meta property="og:site_name" content="InfMatura">
  <meta property="og:title" content="$fullTitle | InfMatura">
  <meta property="og:description" content="$metaDesc">
  <meta property="og:type" content="article">
  <meta property="og:url" content="$canUrl">
  <meta property="og:locale" content="pl_PL">
  <meta property="og:image" content="https://infmatura.dev/assets/preview.png">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="$fullTitle | InfMatura">
  <meta name="twitter:description" content="$metaDesc">
  <meta name="twitter:image" content="https://infmatura.dev/assets/preview.png">

  <link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
  <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">
  <link rel="stylesheet" href="/css/fonts.css?v=1.3">
  <link rel="stylesheet" href="/css/style.css?v=2.1">
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">

  <script type="application/ld+json">
$jsonLd
  </script>
</head>
<body>
  <a class="skip-link" href="#main-content">Przejdź do treści</a>

  <header class="site-header" id="site-header">
    <div class="container header-inner">
      <a href="/" class="brand" aria-label="InfMatura - strona główna">
        <span class="brand-name">InfMatura</span>
      </a>
      <a href="https://github.com/alanwnuczko/matura-informatyka-rozszerzona" target="_blank" rel="noopener noreferrer" class="header-link">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        <span>GitHub</span>
        <svg class="header-arrow" viewBox="0 0 16 16" fill="none" width="12" height="12" aria-hidden="true"><path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>
    </div>
  </header>

  <main id="main-content" class="site-main">
    <div class="exam-detail-page">
      <div class="container">
        <!-- Breadcrumbs -->
        <nav class="breadcrumbs" aria-label="Ścieżka powrotu">
          <ol class="breadcrumb-list">
            <li class="breadcrumb-item">
              <a href="/" class="breadcrumb-link">Strona główna</a>
              <span class="breadcrumb-separator" aria-hidden="true">/</span>
            </li>
            <li class="breadcrumb-item">
              <a href="/#baza-arkuszy" class="breadcrumb-link">Baza arkuszy</a>
              <span class="breadcrumb-separator" aria-hidden="true">/</span>
            </li>
            <li class="breadcrumb-item">
              <span class="breadcrumb-current" aria-current="page">$dTitle ($($e.type))</span>
            </li>
          </ol>
        </nav>

        <!-- Hero Header -->
        <section class="exam-detail-hero" aria-labelledby="exam-heading">
          <div class="exam-detail-meta">
            <span class="pill-badge $tClass">$tLabel</span>
            <span class="pill-badge $fClass">$fLabel</span>
          </div>
          <h1 id="exam-heading" class="exam-detail-title">$dTitle</h1>
        </section>

        <!-- Actions Bar -->
        <section class="exam-actions-section" aria-labelledby="resources-heading">
          <h2 id="resources-heading" class="sr-only">Materiały do pobrania</h2>
          <div class="exam-actions-bar">
            $actionsHTML
          </div>
        </section>

$codeViewerHTML

        <!-- Session Navigation -->
        <nav class="exam-nav-bar" aria-label="Nawigacja między arkuszami">
          $prevBtn
          <a href="/#baza-arkuszy" class="exam-nav-link exam-nav-link--all">Wszystkie arkusze</a>
          $nextBtn
        </nav>
      </div>
    </div>
  </main>

  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-bar">
        <div class="footer-left">
          <a href="https://github.com/alanwnuczko" target="_blank" rel="noopener noreferrer" class="footer-copy-link">&copy; 2026 alanwnuczko</a>
        </div>
        <div class="footer-right">
          <a href="/polityka-prywatnosci/" class="footer-link">Polityka prywatności</a>
          <a href="https://github.com/alanwnuczko/matura-informatyka-rozszerzona/issues" target="_blank" rel="noopener noreferrer" class="footer-link">
            <span>Zgłoszenia</span>
            <svg class="issues-arrow" viewBox="0 0 16 16" fill="none" width="12" height="12" aria-hidden="true"><path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </div>
      <p class="footer-disclaimer">
        Arkusze i zasady oceniania pochodzą z CKE. Rozwiązania w Pythonie są nieoficjalne i nie stanowią materiałów Centralnej Komisji Egzaminacyjnej.
      </p>
    </div>
  </footer>

  <button type="button" class="btn-cta back-to-top" id="back-to-top" hidden aria-label="Wróć na górę strony">
    ↑ Na górę
  </button>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/12.0.2/marked.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-sql.min.js" defer></script>

  <script>
    (function () {
      var header = document.getElementById("site-header");
      var backToTop = document.getElementById("back-to-top");

      window.addEventListener("scroll", function () {
        var y = window.pageYOffset;
        if (header) {
          if (y > 48) header.classList.add("header--scrolled");
          else header.classList.remove("header--scrolled");
        }
        if (backToTop) {
          var show = y > 400;
          backToTop.hidden = false;
          backToTop.classList.toggle("is-visible", show);
        }
      }, { passive: true });

      if (backToTop) {
        backToTop.addEventListener("click", function () {
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      }

      // Render Markdown panels
      function renderMarkdown() {
        if (typeof marked !== "undefined") {
          marked.use({ gfm: true, breaks: true });
          document.querySelectorAll(".code-panel-md").forEach(function (panel) {
            var rawScript = panel.querySelector('script[type="text/markdown"]');
            var target = panel.querySelector(".markdown-rendered");
            if (rawScript && target && !target.dataset.rendered) {
              target.innerHTML = marked.parse(rawScript.textContent);
              target.dataset.rendered = "true";
            }
          });
        } else {
          setTimeout(renderMarkdown, 50);
        }
      }
      renderMarkdown();

      // Code tabs switching
      document.querySelectorAll(".code-tab").forEach(function (tab) {
        tab.addEventListener("click", function () {
          var viewer = tab.closest(".code-viewer");
          if (!viewer) return;
          viewer.querySelectorAll(".code-tab").forEach(function (t) {
            t.classList.remove("is-active");
            t.setAttribute("aria-selected", "false");
          });
          viewer.querySelectorAll(".code-panel").forEach(function (p) {
            p.classList.remove("is-active");
          });
          tab.classList.add("is-active");
          tab.setAttribute("aria-selected", "true");
          var targetId = tab.getAttribute("aria-controls");
          var targetPanel = viewer.querySelector("#" + targetId);
          if (targetPanel) {
            targetPanel.classList.add("is-active");
            renderMarkdown();
          }
        });
      });

      // Copy code button
      document.querySelectorAll(".copy-code-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var panel = btn.closest(".code-panel");
          if (!panel) return;
          var textToCopy = "";
          var rawScript = panel.querySelector('script[type="text/markdown"]');
          if (rawScript) {
            textToCopy = rawScript.textContent.trim();
          } else {
            var codeEl = panel.querySelector("code");
            if (codeEl) textToCopy = codeEl.innerText || codeEl.textContent;
          }

          navigator.clipboard.writeText(textToCopy).then(function () {
            var label = btn.querySelector(".copy-btn-text");
            var originalText = label ? label.textContent : "Kopiuj";
            if (label) label.textContent = "Skopiowano";
            btn.classList.add("is-copied");
            setTimeout(function () {
              if (label) label.textContent = originalText;
              btn.classList.remove("is-copied");
            }, 2000);
          }).catch(function (err) {
            console.error("Błąd kopiowania:", err);
          });
        });
      });
    })();
  </script>
</body>
</html>
"@

    $eDir = Join-Path $arkuszeDir $e.id
    if (![System.IO.Directory]::Exists($eDir)) {
        [System.IO.Directory]::CreateDirectory($eDir) | Out-Null
    }
    $outFile = Join-Path $eDir "index.html"
    [System.IO.File]::WriteAllText($outFile, $html, [System.Text.Encoding]::UTF8)
    $sitemapUrls.Add("  <url>`n    <loc>$canUrl</loc>`n    <lastmod>$today</lastmod>`n    <changefreq>monthly</changefreq>`n    <priority>0.8</priority>`n  </url>")
    Write-Host "  [OK] Wygenerowano: arkusze/$($e.id)/index.html (Markdown z renderowaniem)"
}

$sitemapXml = @"
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
$($sitemapUrls -join "`n")
</urlset>
"@

[System.IO.File]::WriteAllText((Join-Path $rootDir "sitemap.xml"), $sitemapXml, [System.Text.Encoding]::UTF8)
Write-Host "Zaktualizowano sitemap.xml ze wszystkimi podstronami."
Write-Host "Gotowe!"