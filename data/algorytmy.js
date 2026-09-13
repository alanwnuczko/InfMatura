// data/algorytmy.js - Baza zadań programistycznych CKE dla matury rozszerzonej
window.ALGO_CATEGORIES = [
  {
    "id": "zlozonosc",
    "label": "Złożoność i analiza",
    "description": "Szacowanie liczby operacji dominujących, pętle i zbieżność algorytmów."
  },
  {
    "id": "wyszukiwanie",
    "label": "Wyszukiwanie i wskaźniki",
    "description": "Wyszukiwanie binarne, technika dwóch wskaźników, przeszukiwanie uporządkowanych ciągów."
  },
  {
    "id": "sortowanie",
    "label": "Sortowanie i podziały",
    "description": "Scalanie list, partycjonowanie Lomuto i stabilność porządków."
  },
  {
    "id": "rekurencja",
    "label": "Rekurencja i potęgi",
    "description": "Szybkie potęgowanie modularne, drzewa wywołań i relacje rekurencyjne."
  },
  {
    "id": "tablice",
    "label": "Tablice i podciągi",
    "description": "Najdłuższe podciągi spójne, rotacje in-place i sumy prefiksowe."
  },
  {
    "id": "numeryczne",
    "label": "Algorytmy numeryczne",
    "description": "Algorytm Euklidesa, sito Eratostenesa i własności liczb."
  },
  {
    "id": "drzewa",
    "label": "Drzewa binarne i BST",
    "description": "Własność BST, zliczanie liści, głębokość i przejścia drzewa."
  },
  {
    "id": "grafy",
    "label": "Grafy i stos",
    "description": "Przeszukiwanie wszerz BFS, najkrótsza ścieżka oraz obsługa stosu."
  }
];

window.ALGO_TASKS = [
  {
    "id": "zloz-01",
    "title": "Liczba operacji w pętli z dzieleniem",
    "category": "zlozonosc",
    "difficulty": "easy",
    "ckeSource": "Zadanie 1. · Formuła 2023",
    "description": "<p>W zadaniach maturalnych CKE często należy dokładnie określić, ile razy wykona się ciało pętli dla danej wartości <code>n</code>.</p><p>Przeanalizuj poniższy algorytm:</p><pre><code>krok = 0\nwhile n > 1:\n    krok += 1\n    n = n // 2</code></pre><p>Napisz funkcję <code>policz_kroki(n)</code>, która dla podanej dodatniej liczby całkowitej <code>n</code> zwraca liczbę wykonań ciała pętli.</p>",
    "inputDesc": "Liczba całkowita n (n >= 1).",
    "outputDesc": "Liczba całkowita oznaczająca dokładną liczbę wykonań ciała pętli.",
    "timeComplexity": "O(log n)",
    "spaceComplexity": "O(1)",
    "examples": [
      {
        "input": "n = 1",
        "output": "0",
        "explanation": "Warunek n > 1 jest od razu fałszywy."
      },
      {
        "input": "n = 8",
        "output": "3",
        "explanation": "Wartości n: 8 -> 4 -> 2 -> 1 (3 kroki)."
      },
      {
        "input": "n = 16",
        "output": "4",
        "explanation": "16 -> 8 -> 4 -> 2 -> 1 (4 kroki)."
      }
    ],
    "starterCode": "def policz_kroki(n):\n    # Twoje rozwiązanie w O(log n)\n    pass\n",
    "functionName": "policz_kroki",
    "testCases": [
      {
        "input": "(1,)",
        "expected": 0
      },
      {
        "input": "(2,)",
        "expected": 1
      },
      {
        "input": "(7,)",
        "expected": 2
      },
      {
        "input": "(8,)",
        "expected": 3
      },
      {
        "input": "(31,)",
        "expected": 4
      },
      {
        "input": "(32,)",
        "expected": 5
      },
      {
        "input": "(1024,)",
        "expected": 10
      }
    ],
    "solution": "def policz_kroki(n):\n    krok = 0\n    while n > 1:\n        krok += 1\n        n = n // 2\n    return krok",
    "explanation": "<p>W każdej iteracji wartość <code>n</code> jest dzielona całkowitoliczbowo przez 2. Liczba kroków odpowiada <code>floor(log2(n))</code>. Złożoność czasowa wynosi <strong>O(log n)</strong>, a pamięciowa <strong>O(1)</strong>.</p>"
  },
  {
    "id": "zloz-02",
    "title": "Element większościowy (Boyer-Moore)",
    "category": "zlozonosc",
    "difficulty": "medium",
    "ckeSource": "Zadanie 1. · Formuła 2023",
    "description": "<p>Elementem większościowym w tablicy o długości <code>n</code> jest element, który występuje w niej <strong>więcej niż n // 2 razy</strong>.</p><p>Napisz funkcję <code>element_wiekszosciowy(tab)</code>, która znajduje i zwraca element większościowy. Jeżeli taki element nie istnieje, funkcja powinna zwrócić <code>None</code>.</p><p>Wzorcowy algorytm powinien działać w czasie <strong>O(n)</strong> i pamięci <strong>O(1)</strong> (algorytm głosowania Boyera-Moore'a).</p>",
    "inputDesc": "Lista liczb całkowitych tab o długości n >= 1.",
    "outputDesc": "Liczba całkowita będąca elementem większościowym lub None.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "examples": [
      {
        "input": "tab = [3, 3, 4, 2, 4, 4, 2, 4, 4]",
        "output": "4",
        "explanation": "Liczba 4 występuje 5 razy na 9 elementów (5 > 9 // 2)."
      },
      {
        "input": "tab = [1, 2, 3, 4]",
        "output": "None",
        "explanation": "Żaden element nie występuje więcej niż 2 razy."
      }
    ],
    "starterCode": "def element_wiekszosciowy(tab):\n    # Twoje rozwiązanie w O(n)\n    pass\n",
    "functionName": "element_wiekszosciowy",
    "testCases": [
      {
        "input": "([3, 3, 4, 2, 4, 4, 2, 4, 4],)",
        "expected": 4
      },
      {
        "input": "([1, 2, 3, 4],)",
        "expected": null
      },
      {
        "input": "([7],)",
        "expected": 7
      },
      {
        "input": "([2, 2, 1, 1, 2, 2],)",
        "expected": 2
      },
      {
        "input": "([1, 2, 1, 2, 1, 2],)",
        "expected": null
      }
    ],
    "solution": "def element_wiekszosciowy(tab):\n    kandydat = None\n    licznik = 0\n    for x in tab:\n        if licznik == 0:\n            kandydat = x\n            licznik = 1\n        elif x == kandydat:\n            licznik += 1\n        else:\n            licznik -= 1\n    # Weryfikacja kandydata\n    if tab.count(kandydat) > len(tab) // 2:\n        return kandydat\n    return None",
    "explanation": "<p>Algorytm głosowania Boyera-Moore'a wyznacza kandydata w jednym przejściu pętli. Następnie sprawdzane jest, czy kandydat rzeczywiście stanowi ponad połowę elementów tablicy. Złożoność czasowa wynosi <strong>O(n)</strong>, pamięciowa <strong>O(1)</strong>.</p>"
  },
  {
    "id": "wysz-01",
    "title": "Wyszukiwanie binarne – pierwsze wystąpienie",
    "category": "wyszukiwanie",
    "difficulty": "easy",
    "ckeSource": "Zadanie 1. · Formuła 2023",
    "description": "<p>Dana jest posortowana niemalejąco lista liczb całkowitych <code>tab</code>, w której elementy mogą się powtarzać, oraz szukana liczba <code>x</code>.</p><p>Napisz funkcję <code>pierwsze_wystapienie(tab, x)</code>, która za pomocą wyszukiwania binarnego zwraca <strong>najmniejszy indeks</strong>, pod którym znajduje się wartość <code>x</code>. Jeśli <code>x</code> nie występuje w tablicy, zwróć <code>-1</code>.</p>",
    "inputDesc": "Posortowana niemalejąco lista liczb całkowitych tab oraz liczba całkowita x.",
    "outputDesc": "Indeks pierwszego wystąpienia (liczba całkowita) lub -1.",
    "timeComplexity": "O(log n)",
    "spaceComplexity": "O(1)",
    "examples": [
      {
        "input": "tab = [1, 2, 4, 4, 4, 5, 9], x = 4",
        "output": "2",
        "explanation": "Liczba 4 występuje na indeksach 2, 3, 4. Pierwsze wystąpienie to 2."
      },
      {
        "input": "tab = [1, 3, 5], x = 2",
        "output": "-1",
        "explanation": "Liczba 2 nie występuje w tablicy."
      }
    ],
    "starterCode": "def pierwsze_wystapienie(tab, x):\n    # Twoje rozwiązanie w O(log n)\n    pass\n",
    "functionName": "pierwsze_wystapienie",
    "testCases": [
      {
        "input": "([1, 2, 4, 4, 4, 5, 9], 4)",
        "expected": 2
      },
      {
        "input": "([1, 3, 5], 2)",
        "expected": -1
      },
      {
        "input": "([5, 5, 5, 5], 5)",
        "expected": 0
      },
      {
        "input": "([], 1)",
        "expected": -1
      },
      {
        "input": "([1, 2, 3, 4, 5], 5)",
        "expected": 4
      }
    ],
    "solution": "def pierwsze_wystapienie(tab, x):\n    left = 0\n    right = len(tab) - 1\n    wynik = -1\n    while left <= right:\n        mid = (left + right) // 2\n        if tab[mid] == x:\n            wynik = mid\n            right = mid - 1\n        elif tab[mid] < x:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return wynik",
    "explanation": "<p>Modyfikacja wyszukiwania binarnego (binary search): po znalezieniu elementu równego <code>x</code> następuje zapamiętanie indeksu i zawężenie poszukiwań do lewej połowy (<code>right = mid - 1</code>), aby znaleźć ewentualne wcześniejsze wystąpienie. Złożoność: <strong>O(log n)</strong>.</p>"
  },
  {
    "id": "wysz-02",
    "title": "Para o zadanej sumie (dwa wskaźniki)",
    "category": "wyszukiwanie",
    "difficulty": "medium",
    "ckeSource": "Zadanie 2. · Formuła 2015",
    "description": "<p>Dana jest posortowana rosnąco lista unikalnych liczb całkowitych <code>tab</code> oraz docelowa suma <code>cel</code>.</p><p>Napisz funkcję <code>znajdz_pare_sumy(tab, cel)</code>, która sprawdza, czy w tablicy istnieją dwa różne elementy o sumie równej <code>cel</code>. Jeśli tak, zwróć krotkę zawierającą te dwa elementy <code>(a, b)</code>, gdzie <code>a < b</code>. Jeśli taka para nie istnieje, zwróć <code>None</code>.</p><p>Algorytm powinien działać w czasie <strong>O(n)</strong> dzięki technice dwóch wskaźników.</p>",
    "inputDesc": "Posortowana rosnąco lista unikalnych liczb całkowitych tab oraz liczba całkowita cel.",
    "outputDesc": "Krotka (a, b) dwóch liczb spełniających a + b == cel (gdzie a < b) lub None.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "examples": [
      {
        "input": "tab = [1, 2, 4, 7, 11, 15], cel = 15",
        "output": "(4, 11)",
        "explanation": "4 + 11 = 15."
      },
      {
        "input": "tab = [1, 2, 3, 9], cel = 8",
        "output": "None",
        "explanation": "Żadna para elementów nie sumuje się do 8."
      }
    ],
    "starterCode": "def znajdz_pare_sumy(tab, cel):\n    # Twoje rozwiązanie w O(n)\n    pass\n",
    "functionName": "znajdz_pare_sumy",
    "testCases": [
      {
        "input": "([1, 2, 4, 7, 11, 15], 15)",
        "expected": [
          4,
          11
        ]
      },
      {
        "input": "([1, 2, 3, 9], 8)",
        "expected": null
      },
      {
        "input": "([-5, -2, 0, 3, 8], 1)",
        "expected": [
          -2,
          3
        ]
      },
      {
        "input": "([2, 5], 7)",
        "expected": [
          2,
          5
        ]
      },
      {
        "input": "([1], 2)",
        "expected": null
      }
    ],
    "solution": "def znajdz_pare_sumy(tab, cel):\n    left = 0\n    right = len(tab) - 1\n    while left < right:\n        s = tab[left] + tab[right]\n        if s == cel:\n            return (tab[left], tab[right])\n        elif s < cel:\n            left += 1\n        else:\n            right -= 1\n    return None",
    "explanation": "<p>Wskaźniki zostają umieszczone na początku i końcu posortowanej tablicy. Jeśli suma jest zbyt mała, lewy wskaźnik przesuwa się w prawo. Jeśli zbyt duża – prawy wskaźnik przesuwa się w lewo. Każdy element jest sprawdzany co najwyżej raz, stąd czas <strong>O(n)</strong> i pamięć <strong>O(1)</strong>.</p>"
  },
  {
    "id": "sort-01",
    "title": "Scalanie dwóch posortowanych list",
    "category": "sortowanie",
    "difficulty": "easy",
    "ckeSource": "Zadanie 2. · Formuła 2023",
    "description": "<p>Kluczowym elementem algorytmu sortowania przez scalanie (Merge Sort) jest połączenie dwóch już posortowanych ciągów w jeden posortowany ciąg.</p><p>Napisz funkcję <code>scal_listy(a, b)</code>, która przyjmuje dwie posortowane niemalejąco listy liczb całkowitych <code>a</code> i <code>b</code>, a następnie zwraca nową, posortowaną niemalejąco listę zawierającą wszystkie elementy z obu list.</p><p><strong>Ograniczenie:</strong> Nie używaj wbudowanej metody <code>sort()</code> ani funkcji <code>sorted()</code>. Algorytm powinien działać w czasie <strong>O(len(a) + len(b))</strong>.</p>",
    "inputDesc": "Dwie posortowane niemalejąco listy liczb całkowitych a i b.",
    "outputDesc": "Nowa posortowana lista liczb całkowitych.",
    "timeComplexity": "O(n + m)",
    "spaceComplexity": "O(n + m)",
    "examples": [
      {
        "input": "a = [1, 4, 7], b = [2, 3, 5, 8]",
        "output": "[1, 2, 3, 4, 5, 7, 8]",
        "explanation": "Elementy są porównywane ze sobą po kolei."
      }
    ],
    "starterCode": "def scal_listy(a, b):\n    # Twoje rozwiązanie w O(len(a) + len(b))\n    pass\n",
    "functionName": "scal_listy",
    "testCases": [
      {
        "input": "([1, 4, 7], [2, 3, 5, 8])",
        "expected": [
          1,
          2,
          3,
          4,
          5,
          7,
          8
        ]
      },
      {
        "input": "([], [1, 2, 3])",
        "expected": [
          1,
          2,
          3
        ]
      },
      {
        "input": "([5], [2])",
        "expected": [
          2,
          5
        ]
      },
      {
        "input": "([1, 3, 5], [2, 4, 6])",
        "expected": [
          1,
          2,
          3,
          4,
          5,
          6
        ]
      },
      {
        "input": "([], [])",
        "expected": []
      }
    ],
    "solution": "def scal_listy(a, b):\n    wynik = []\n    i = 0\n    j = 0\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:\n            wynik.append(a[i])\n            i += 1\n        else:\n            wynik.append(b[j])\n            j += 1\n    wynik.extend(a[i:])\n    wynik.extend(b[j:])\n    return wynik",
    "explanation": "<p>Wykorzystanie dwóch indeksów <code>i</code> oraz <code>j</code> z wyborem mniejszego elementu w każdym kroku i dopisaniem go do wyniku. Na koniec dołączana jest pozostała część listy, która nie uległa wyczerpaniu. Złożoność czasowa: <strong>O(n + m)</strong>.</p>"
  },
  {
    "id": "sort-02",
    "title": "Partycjonowanie względem pivota (Lomuto)",
    "category": "sortowanie",
    "difficulty": "medium",
    "ckeSource": "Zadanie 1. · Formuła 2023",
    "description": "<p>W algorytmie QuickSort kluczową operacją jest partycjonowanie tablicy. W schemacie Lomuto jako pivot przyjmuje się ostatni element tablicy.</p><p>Napisz funkcję <code>partycjonuj(tab)</code>, która modyfikuje listę <code>tab</code> w miejscu (in-place) tak, aby wszystkie elementy mniejsze lub równe pivotowi znalazły się po jego lewej stronie, a większe po prawej, po czym zwraca <strong>ostateczny indeks pivota</strong>.</p>",
    "inputDesc": "Niepusta lista liczb całkowitych tab.",
    "outputDesc": "Liczba całkowita będąca indeksem pivota w zmodyfikowanej tablicy.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "examples": [
      {
        "input": "tab = [3, 8, 2, 5, 1, 4]",
        "output": "3",
        "explanation": "Pivot = 4. Po partycjonowaniu elementy <= 4 są z lewej, a 4 trafia na indeks 3."
      }
    ],
    "starterCode": "def partycjonuj(tab):\n    # Zmodyfikuj tab w miejscu i zwróć końcowy indeks pivota\n    pass\n",
    "functionName": "partycjonuj",
    "testCases": [
      {
        "input": "([3, 8, 2, 5, 1, 4],)",
        "expected": 3
      },
      {
        "input": "([1, 2, 3],)",
        "expected": 2
      },
      {
        "input": "([3, 2, 1],)",
        "expected": 0
      },
      {
        "input": "([5],)",
        "expected": 0
      }
    ],
    "solution": "def partycjonuj(tab):\n    pivot = tab[-1]\n    i = -1\n    for j in range(len(tab) - 1):\n        if tab[j] <= pivot:\n            i += 1\n            tab[i], tab[j] = tab[j], tab[i]\n    tab[i + 1], tab[-1] = tab[-1], tab[i + 1]\n    return i + 1",
    "explanation": "<p>Iteracja przez tablicę od początku do przedostatniego elementu. Za każdym razem, gdy napotkany zostanie element <code><= pivot</code>, następuje zwiększenie indeksu <code>i</code> oraz zamiana elementów. Na koniec pivot umieszczany jest pod indeksem <code>i + 1</code>. Złożoność czasowa: <strong>O(n)</strong>, pamięciowa: <strong>O(1)</strong>.</p>"
  },
  {
    "id": "rek-01",
    "title": "Szybkie potęgowanie modularne",
    "category": "rekurencja",
    "difficulty": "medium",
    "ckeSource": "Zadanie 2. · Formuła 2023",
    "description": "<p>Klasyczne potęgowanie przez mnożenie n-krotne wymaga O(n) mnożeń. Algorytm szybkiego potęgowania wykorzystuje tożsamość <code>a^b = (a^(b//2))^2</code> dla b parzystych oraz <code>a * a^(b-1)</code> dla b nieparzystych.</p><p>Napisz funkcję <code>potega_mod(a, b, m)</code>, która oblicza wartość <code>(a^b) % m</code> w czasie <strong>O(log b)</strong>.</p>",
    "inputDesc": "Liczby całkowite a >= 0, b >= 0, m >= 1.",
    "outputDesc": "Wartość (a^b) % m jako liczba całkowita.",
    "timeComplexity": "O(log b)",
    "spaceComplexity": "O(log b) lub O(1)",
    "examples": [
      {
        "input": "a = 2, b = 10, m = 1000",
        "output": "24",
        "explanation": "2^10 = 1024, 1024 % 1000 = 24."
      }
    ],
    "starterCode": "def potega_mod(a, b, m):\n    # Twoje rozwiązanie w O(log b)\n    pass\n",
    "functionName": "potega_mod",
    "testCases": [
      {
        "input": "(2, 10, 1000)",
        "expected": 24
      },
      {
        "input": "(3, 0, 7)",
        "expected": 1
      },
      {
        "input": "(5, 3, 13)",
        "expected": 8
      },
      {
        "input": "(2, 20, 100)",
        "expected": 76
      },
      {
        "input": "(7, 1, 10)",
        "expected": 7
      }
    ],
    "solution": "def potega_mod(a, b, m):\n    if b == 0:\n        return 1 % m\n    if b % 2 == 0:\n        pol = potega_mod(a, b // 2, m)\n        return (pol * pol) % m\n    else:\n        return (a * potega_mod(a, b - 1, m)) % m",
    "explanation": "<p>Wykładnik jest dzielony przez 2 w każdym kroku parzystym, natomiast dla wykładników nieparzystych odejmowana jest jedynka. Liczba operacji jest rzędu <code>2 * log2(b)</code>, co zapewnia złożoność <strong>O(log b)</strong>.</p>"
  },
  {
    "id": "rek-02",
    "title": "Zliczanie wywołań rekurencyjnych",
    "category": "rekurencja",
    "difficulty": "easy",
    "ckeSource": "Zadanie 1. · Formuła 2015",
    "description": "<p>W zadaniach maturalnych często pada pytanie o całkowitą liczbę wywołań funkcji rekurencyjnej dla danego argumentu.</p><p>Dana jest funkcja rekurencyjna zdefiniowana następująco:</p><pre><code>def f(n):\n    if n <= 1:\n        return 1\n    return f(n - 1) + f(n - 2)</code></pre><p>Napisz funkcję <code>liczba_wywolan(n)</code>, która oblicza, ile razy łącznie zostanie wywołana funkcja <code>f</code> (wliczając pierwsze wywołanie) dla zadanego argumentu <code>n</code>.</p>",
    "inputDesc": "Liczba całkowita n (n >= 0).",
    "outputDesc": "Liczba całkowita oznaczająca sumaryczną liczbę wywołań.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "examples": [
      {
        "input": "n = 0",
        "output": "1",
        "explanation": "Tylko jedno wywołanie bazowe f(0)."
      },
      {
        "input": "n = 2",
        "output": "3",
        "explanation": "f(2) wywołuje f(1) i f(0) -> 1 + 1 + 1 = 3."
      },
      {
        "input": "n = 3",
        "output": "5",
        "explanation": "f(3) -> f(2) (3 wywołania) + f(1) (1 wywołanie) + 1 (sam f(3)) = 5."
      }
    ],
    "starterCode": "def liczba_wywolan(n):\n    # Twoje rozwiązanie\n    pass\n",
    "functionName": "liczba_wywolan",
    "testCases": [
      {
        "input": "(0,)",
        "expected": 1
      },
      {
        "input": "(1,)",
        "expected": 1
      },
      {
        "input": "(2,)",
        "expected": 3
      },
      {
        "input": "(3,)",
        "expected": 5
      },
      {
        "input": "(4,)",
        "expected": 9
      },
      {
        "input": "(5,)",
        "expected": 15
      }
    ],
    "solution": "def liczba_wywolan(n):\n    # Liczba wywołań tworzy relację: T(n) = 1 + T(n-1) + T(n-2)\n    if n <= 1:\n        return 1\n    dp = [0] * (n + 1)\n    dp[0] = 1\n    dp[1] = 1\n    for i in range(2, n + 1):\n        dp[i] = 1 + dp[i - 1] + dp[i - 2]\n    return dp[n]",
    "explanation": "<p>Liczba wywołań spełnia równanie rekurencyjne: <code>T(0)=1</code>, <code>T(1)=1</code>, a dla <code>n >= 2</code>: <code>T(n) = 1 + T(n-1) + T(n-2)</code>. Wartości te można wyznaczyć w czasie <strong>O(n)</strong> za pomocą programowania dynamicznego.</p>"
  },
  {
    "id": "tab-01",
    "title": "Najdłuższy spójny podciąg niemalejący",
    "category": "tablice",
    "difficulty": "easy",
    "ckeSource": "Zadanie 1. · Formuła 2023",
    "description": "<p>Dany jest ciąg liczb całkowitych w postaci listy <code>tab</code>. Spójny podciąg to fragment tablicy złożony z kolejnych elementów.</p><p>Napisz funkcję <code>najdluzszy_niemalejacy(tab)</code>, która zwraca długość najdłuższego spójnego podciągu, w którym każdy kolejny element jest większy bądź równy poprzedniemu.</p><p>Dla pustej tablicy funkcja powinna zwrócić <code>0</code>.</p>",
    "inputDesc": "Lista liczb całkowitych tab.",
    "outputDesc": "Liczba całkowita oznaczająca maksymalną długość spójnego fragmentu niemalejącego.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "examples": [
      {
        "input": "tab = [1, 2, 2, 4, 1, 3, 5, 6, 2]",
        "output": "4",
        "explanation": "Podciąg [1, 2, 2, 4] ma długość 4, a [1, 3, 5, 6] również długość 4."
      },
      {
        "input": "tab = [5, 4, 3, 2]",
        "output": "1",
        "explanation": "Każdy pojedynczy element to podciąg o długości 1."
      }
    ],
    "starterCode": "def najdluzszy_niemalejacy(tab):\n    # Twoje rozwiązanie w O(n)\n    pass\n",
    "functionName": "najdluzszy_niemalejacy",
    "testCases": [
      {
        "input": "([1, 2, 2, 4, 1, 3, 5, 6, 2],)",
        "expected": 4
      },
      {
        "input": "([5, 4, 3, 2],)",
        "expected": 1
      },
      {
        "input": "([],)",
        "expected": 0
      },
      {
        "input": "([7],)",
        "expected": 1
      },
      {
        "input": "([1, 2, 3, 4, 5],)",
        "expected": 5
      }
    ],
    "solution": "def najdluzszy_niemalejacy(tab):\n    if not tab:\n        return 0\n    max_dl = 1\n    akt_dl = 1\n    for i in range(1, len(tab)):\n        if tab[i] >= tab[i - 1]:\n            akt_dl += 1\n            if akt_dl > max_dl:\n                max_dl = akt_dl\n        else:\n            akt_dl = 1\n    return max_dl",
    "explanation": "<p>Jednokrotne przejście przez tablicę w czasie <code>O(n)</code> ze zliczaniem długości bieżącego podciągu niemalejącego. W przypadku naruszenia warunku niemalejącego porządku licznik jest resetowany do 1. Złożoność czasowa: <strong>O(n)</strong>, pamięciowa: <strong>O(1)</strong>.</p>"
  },
  {
    "id": "tab-02",
    "title": "Rotacja tablicy o k pozycji in-place",
    "category": "tablice",
    "difficulty": "medium",
    "ckeSource": "Zadanie 2. · Formuła 2015",
    "description": "<p>Napisz funkcję <code>rotuj_tablice(tab, k)</code>, która przesuwa cyklicznie elementy listy <code>tab</code> o <code>k</code> pozycji w prawo w miejscu (in-place) i zwraca zmodyfikowaną listę.</p><p><strong>Wymaganie:</strong> Algorytm powinien działać w czasie <strong>O(n)</strong> i używać pamięci dodatkowej <strong>O(1)</strong> (np. za pomocą trzykrotnego odwracania fragmentów).</p>",
    "inputDesc": "Lista liczb całkowitych tab oraz nieujemna liczba całkowita k.",
    "outputDesc": "Zmodyfikowana lista tab.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "examples": [
      {
        "input": "tab = [1, 2, 3, 4, 5], k = 2",
        "output": "[4, 5, 1, 2, 3]",
        "explanation": "Elementy zostają przesunięte o 2 w prawo."
      }
    ],
    "starterCode": "def rotuj_tablice(tab, k):\n    # Twoje rozwiązanie w O(n) i O(1) pamięci\n    pass\n",
    "functionName": "rotuj_tablice",
    "testCases": [
      {
        "input": "([1, 2, 3, 4, 5], 2)",
        "expected": [
          4,
          5,
          1,
          2,
          3
        ]
      },
      {
        "input": "([1, 2, 3], 0)",
        "expected": [
          1,
          2,
          3
        ]
      },
      {
        "input": "([1, 2, 3], 3)",
        "expected": [
          1,
          2,
          3
        ]
      },
      {
        "input": "([1, 2, 3, 4], 5)",
        "expected": [
          4,
          1,
          2,
          3
        ]
      },
      {
        "input": "([], 4)",
        "expected": []
      }
    ],
    "solution": "def rotuj_tablice(tab, k):\n    n = len(tab)\n    if n <= 1:\n        return tab\n    k = k % n\n    def odwroc(l, r):\n        while l < r:\n            tab[l], tab[r] = tab[r], tab[l]\n            l += 1\n            r -= 1\n    odwroc(0, n - 1)\n    odwroc(0, k - 1)\n    odwroc(k, n - 1)\n    return tab",
    "explanation": "<p>Algorytm trzykrotnego odwracania: najpierw odwracana jest cała tablica, następnie pierwszych <code>k</code> elementów, a na końcu pozostałe <code>n - k</code> elementów. Każdy element podlega operacji odwrócenia dwukrotnie, co daje czas <strong>O(n)</strong> i brak pamięci dodatkowej <strong>O(1)</strong>.</p>"
  },
  {
    "id": "num-01",
    "title": "Algorytm Euklidesa z liczbą operacji modulo",
    "category": "numeryczne",
    "difficulty": "easy",
    "ckeSource": "Zadanie 1. · Formuła 2023",
    "description": "<p>Napisz funkcję <code>nwd_z_krokami(a, b)</code>, która oblicza największy wspólny dzielnik dwóch dodatnich liczb całkowitych <code>a</code> i <code>b</code> za pomocą algorytmu Euklidesa z operacją modulo (reszta z dzielenia).</p><p>Funkcja powinna zwrócić krotkę <code>(nwd, kroki)</code>, gdzie <code>nwd</code> to wyznaczony dzielnik, a <code>kroki</code> to liczba wykonań operacji reszty z dzielenia (liczba obrotów pętli while b != 0).</p>",
    "inputDesc": "Dwie dodatnie liczby całkowite a > 0, b > 0.",
    "outputDesc": "Krotka (nwd, kroki) dwóch liczb całkowitych.",
    "timeComplexity": "O(log(min(a, b)))",
    "spaceComplexity": "O(1)",
    "examples": [
      {
        "input": "a = 48, b = 18",
        "output": "(6, 3)",
        "explanation": "Iteracja 1: 48 % 18 = 12. Iteracja 2: 18 % 12 = 6. Iteracja 3: 12 % 6 = 0. Razem 3 kroki."
      }
    ],
    "starterCode": "def nwd_z_krokami(a, b):\n    # Twoje rozwiązanie\n    pass\n",
    "functionName": "nwd_z_krokami",
    "testCases": [
      {
        "input": "(48, 18)",
        "expected": [
          6,
          3
        ]
      },
      {
        "input": "(21, 13)",
        "expected": [
          1,
          6
        ]
      },
      {
        "input": "(100, 25)",
        "expected": [
          25,
          1
        ]
      },
      {
        "input": "(7, 7)",
        "expected": [
          7,
          1
        ]
      }
    ],
    "solution": "def nwd_z_krokami(a, b):\n    kroki = 0\n    while b != 0:\n        a, b = b, a % b\n        kroki += 1\n    return (a, kroki)",
    "explanation": "<p>Klasyczny Euklides z modulo: w każdym kroku para <code>(a, b)</code> przechodzi w <code>(b, a % b)</code>. Gdy <code>b == 0</code>, wynikiem jest <code>a</code>. Złożoność czasowa wynosi <strong>O(log(min(a, b)))</strong>.</p>"
  },
  {
    "id": "num-02",
    "title": "Sito Eratostenesa do liczby n",
    "category": "numeryczne",
    "difficulty": "easy",
    "ckeSource": "Zadanie 2. · Formuła 2023",
    "description": "<p>Sito Eratostenesa to klasyczny algorytm wyznaczania wszystkich liczb pierwszych w zadanym przedziale.</p><p>Napisz funkcję <code>sito(n)</code>, która zwraca listę wszystkich liczb pierwszych z przedziału <code>[2, n]</code> posortowaną rosnąco.</p><p>Algorytm powinien mieć złożoność <strong>O(n log log n)</strong>.</p>",
    "inputDesc": "Liczba całkowita n (n >= 0).",
    "outputDesc": "Lista liczb pierwszych w porządku rosnącym.",
    "timeComplexity": "O(n log log n)",
    "spaceComplexity": "O(n)",
    "examples": [
      {
        "input": "n = 10",
        "output": "[2, 3, 5, 7]",
        "explanation": "Liczby pierwsze do 10 to 2, 3, 5 i 7."
      }
    ],
    "starterCode": "def sito(n):\n    # Twoje rozwiązanie w O(n log log n)\n    pass\n",
    "functionName": "sito",
    "testCases": [
      {
        "input": "(10,)",
        "expected": [
          2,
          3,
          5,
          7
        ]
      },
      {
        "input": "(2,)",
        "expected": [
          2
        ]
      },
      {
        "input": "(1,)",
        "expected": []
      },
      {
        "input": "(20,)",
        "expected": [
          2,
          3,
          5,
          7,
          11,
          13,
          17,
          19
        ]
      }
    ],
    "solution": "def sito(n):\n    if n < 2:\n        return []\n    is_prime = [True] * (n + 1)\n    is_prime[0] = is_prime[1] = False\n    p = 2\n    while p * p <= n:\n        if is_prime[p]:\n            for i in range(p * p, n + 1, p):\n                is_prime[i] = False\n        p += 1\n    return [i for i in range(2, n + 1) if is_prime[i]]",
    "explanation": "<p>Sito Eratostenesa wykorzystuje tablicę wartości logicznych o długości <code>n+1</code>. Wielokrotności kolejnych liczb pierwszych są eliminowane począwszy od wartości <code>p*p</code>. Złożoność czasowa wynosi <strong>O(n log log n)</strong>.</p>"
  },
  {
    "id": "drzew-01",
    "title": "Sprawdzanie własności drzewa BST",
    "category": "drzewa",
    "difficulty": "medium",
    "ckeSource": "Zadanie 2. · Formuła 2023",
    "description": "<p>Drzewo binarne przeszukiwań (BST) spełnia warunek: dla każdego węzła wszystkie klucze w lewym poddrzewie są ściśle mniejsze od klucza węzła, a w prawym poddrzewie ściśle większe.</p><p>Węzeł drzewa reprezentowany jest jako słownik postaci: <code>{'val': int, 'left': node lub None, 'right': node lub None}</code>.</p><p>Napisz funkcję <code>czy_bst(root)</code>, która sprawdza, czy podane drzewo o korzeniu <code>root</code> jest poprawnym drzewem BST.</p>",
    "inputDesc": "Węzeł korzenia drzewa (słownik) lub None dla pustego drzewa.",
    "outputDesc": "Wartość logiczna True lub False.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(h)",
    "examples": [
      {
        "input": "root = {'val': 2, 'left': {'val': 1, 'left': None, 'right': None}, 'right': {'val': 3, 'left': None, 'right': None}}",
        "output": "True",
        "explanation": "Lewy potomek 1 < 2, prawy 3 > 2."
      }
    ],
    "starterCode": "def czy_bst(root):\n    # Twoje rozwiązanie w O(n)\n    pass\n",
    "functionName": "czy_bst",
    "testCases": [
      {
        "input": "({'val': 2, 'left': {'val': 1, 'left': None, 'right': None}, 'right': {'val': 3, 'left': None, 'right': None}},)",
        "expected": true
      },
      {
        "input": "({'val': 5, 'left': {'val': 1, 'left': None, 'right': None}, 'right': {'val': 4, 'left': {'val': 3, 'left': None, 'right': None}, 'right': {'val': 6, 'left': None, 'right': None}}},)",
        "expected": false
      },
      {
        "input": "(None,)",
        "expected": true
      },
      {
        "input": "({'val': 10, 'left': None, 'right': None},)",
        "expected": true
      }
    ],
    "solution": "def czy_bst(root):\n    def waliduj(wezel, min_val, max_val):\n        if wezel is None:\n            return True\n        v = wezel['val']\n        if v <= min_val or v >= max_val:\n            return False\n        return waliduj(wezel['left'], min_val, v) and waliduj(wezel['right'], v, max_val)\n    return waliduj(root, float('-inf'), float('inf'))",
    "explanation": "<p>Każdy węzeł musi mieścić się w dozwolonym przedziale <code>(min_val, max_val)</code>. Przy przejściu do lewego poddrzewa zawężane jest dopuszczalne maksimum, a przy przejściu do prawego – minimum. Złożoność czasowa wynosi <strong>O(n)</strong>.</p>"
  },
  {
    "id": "drzew-02",
    "title": "Zliczanie liści w drzewie binarnym",
    "category": "drzewa",
    "difficulty": "easy",
    "ckeSource": "Zadanie 2. · Formuła 2015",
    "description": "<p>Liściem w drzewie binarnym jest węzeł, który nie posiada żadnego potomka (zarówno lewy, jak i prawy potomek to <code>None</code>).</p><p>Węzeł reprezentowany jest jako słownik: <code>{'val': int, 'left': node lub None, 'right': node lub None}</code>.</p><p>Napisz funkcję <code>liczba_lisci(root)</code>, która rekurencyjnie zlicza i zwraca liczbę liści w drzewie.</p>",
    "inputDesc": "Węzeł korzenia (słownik) lub None.",
    "outputDesc": "Liczba całkowita będąca liczbą liści.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(h)",
    "examples": [
      {
        "input": "root = {'val': 1, 'left': {'val': 2, 'left': None, 'right': None}, 'right': {'val': 3, 'left': None, 'right': None}}",
        "output": "2",
        "explanation": "Węzły 2 i 3 są liśćmi."
      }
    ],
    "starterCode": "def liczba_lisci(root):\n    # Twoje rozwiązanie rekurencyjne\n    pass\n",
    "functionName": "liczba_lisci",
    "testCases": [
      {
        "input": "({'val': 1, 'left': {'val': 2, 'left': None, 'right': None}, 'right': {'val': 3, 'left': None, 'right': None}},)",
        "expected": 2
      },
      {
        "input": "(None,)",
        "expected": 0
      },
      {
        "input": "({'val': 5, 'left': None, 'right': None},)",
        "expected": 1
      },
      {
        "input": "({'val': 1, 'left': {'val': 2, 'left': {'val': 3, 'left': None, 'right': None}, 'right': None}, 'right': None},)",
        "expected": 1
      }
    ],
    "solution": "def liczba_lisci(root):\n    if root is None:\n        return 0\n    if root['left'] is None and root['right'] is None:\n        return 1\n    return liczba_lisci(root['left']) + liczba_lisci(root['right'])",
    "explanation": "<p>Warunki bazowe rekurencji: dla <code>None</code> funkcja zwraca 0, a dla liścia 1. W pozostałych przypadkach sumowane są wyniki wywołań rekurencyjnych dla lewego i prawego poddrzewa. Złożoność czasowa wynosi <strong>O(n)</strong>.</p>"
  },
  {
    "id": "graf-01",
    "title": "Najkrótsza ścieżka w grafie (BFS)",
    "category": "grafy",
    "difficulty": "medium",
    "ckeSource": "Zadanie 2. · Formuła 2023",
    "description": "<p>Dany jest nieskierowany graf nieważony reprezentowany jako słownik sąsiedztwa: klucze to numery wierzchołków, a wartości to listy sąsiadów.</p><p>Napisz funkcję <code>najkrotsza_sciezka(graf, start, cel)</code>, która za pomocą przeszukiwania wszerz (BFS) znajduje i zwraca <strong>długość najkrótszej ścieżki</strong> (liczbę krawędzi) między wierzchołkiem <code>start</code> a <code>cel</code>. Jeśli ścieżka nie istnieje, funkcja powinna zwrócić <code>-1</code>.</p>",
    "inputDesc": "Słownik sąsiedztwa graf, wierzchołek start i wierzchołek cel.",
    "outputDesc": "Liczba krawędzi najkrótszej ścieżki lub -1.",
    "timeComplexity": "O(V + E)",
    "spaceComplexity": "O(V)",
    "examples": [
      {
        "input": "graf = {1: [2, 3], 2: [1, 4], 3: [1], 4: [2]}, start = 1, cel = 4",
        "output": "2",
        "explanation": "Najkrótsza ścieżka: 1 -> 2 -> 4 (2 krawędzie)."
      }
    ],
    "starterCode": "def najkrotsza_sciezka(graf, start, cel):\n    # Twoje rozwiązanie z użyciem BFS\n    pass\n",
    "functionName": "najkrotsza_sciezka",
    "testCases": [
      {
        "input": "({1: [2, 3], 2: [1, 4], 3: [1], 4: [2]}, 1, 4)",
        "expected": 2
      },
      {
        "input": "({1: [2], 2: [1], 3: []}, 1, 3)",
        "expected": -1
      },
      {
        "input": "({1: []}, 1, 1)",
        "expected": 0
      },
      {
        "input": "({1: [2], 2: [1, 3], 3: [2, 4], 4: [3]}, 1, 4)",
        "expected": 3
      }
    ],
    "solution": "def najkrotsza_sciezka(graf, start, cel):\n    if start == cel:\n        return 0\n    from collections import deque\n    kolejka = deque([(start, 0)])\n    odwiedzone = {start}\n    while kolejka:\n        wierzcholek, dystans = kolejka.popleft()\n        if wierzcholek == cel:\n            return dystans\n        for sasiad in graf.get(wierzcholek, []):\n            if sasiad not in odwiedzone:\n                odwiedzone.add(sasiad)\n                kolejka.append((sasiad, dystans + 1))\n    return -1",
    "explanation": "<p>Przeszukiwanie wszerz (BFS) w grafie nieważonym gwarantuje odnalezienie najkrótszej ścieżki w liczbie krawędzi. Złożoność czasowa: <strong>O(V + E)</strong>, pamięciowa: <strong>O(V)</strong>.</p>"
  },
  {
    "id": "graf-02",
    "title": "Poprawność nawiasowania (Stos)",
    "category": "grafy",
    "difficulty": "easy",
    "ckeSource": "Zadanie 1. · Formuła 2023",
    "description": "<p>Klasyczne zadanie maturalne na użycie struktury danych typu stos (LIFO).</p><p>Dany jest napis złożony ze znaków nawiasów <code>'()'</code>, <code>'[]'</code> oraz <code>'{}'</code>. Napisz funkcję <code>poprawne_nawiasy(napis)</code>, która sprawdza, czy nawiasy są poprawnie sparowane i domknięte we właściwej kolejności.</p>",
    "inputDesc": "Napis złożony ze znaków '()[]{}'.",
    "outputDesc": "Wartość logiczna True lub False.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "examples": [
      {
        "input": "napis = '()[{}]'",
        "output": "True",
        "explanation": "Wszystkie nawiasy są poprawnie domknięte."
      },
      {
        "input": "napis = '(]'",
        "output": "False",
        "explanation": "Nawias ( został domknięty niepasującym ]."
      }
    ],
    "starterCode": "def poprawne_nawiasy(napis):\n    # Twoje rozwiązanie z użyciem stosu w O(n)\n    pass\n",
    "functionName": "poprawne_nawiasy",
    "testCases": [
      {
        "input": "('()[{}]',)",
        "expected": true
      },
      {
        "input": "('(]',)",
        "expected": false
      },
      {
        "input": "('([)]',)",
        "expected": false
      },
      {
        "input": "('',)",
        "expected": true
      },
      {
        "input": "('((((',)",
        "expected": false
      }
    ],
    "solution": "def poprawne_nawiasy(napis):\n    stos = []\n    pary = {')': '(', ']': '[', '}': '{'}\n    for c in napis:\n        if c in '([{':\n            stos.append(c)\n        elif c in pary:\n            if not stos or stos[-1] != pary[c]:\n                return False\n            stos.pop()\n    return len(stos) == 0",
    "explanation": "<p>Wykorzystanie listy w roli stosu LIFO. Każdy nawias otwierający trafia na stos. Przy napotkaniu nawiasu zamykającego następuje sprawdzenie, czy na wierzchu stosu znajduje się pasujący nawias otwierający. Złożoność czasowa: <strong>O(n)</strong>.</p>"
  }
];
