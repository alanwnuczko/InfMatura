// data/algorytmy.js - Baza zadań programistycznych CKE dla matury rozszerzonej
var ALGO_DATA = [
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
    "id": "tekstowe",
    "label": "Napisy i teksty",
    "description": "Palindromy, anagramy, wyszukiwanie wzorców i przetwarzanie stringów."
  },
  {
    "id": "zloz-03",
    "title": "Liczba porównań w sortowaniu przez wybieranie",
    "category": "zlozonosc",
    "difficulty": "easy",
    "ckeSource": "CKE maj 2018 · PP F2007, zadanie 2",
    "description": "<p>W jednej iteracji sortowania przez wybieranie wyszukiwany jest największy element w nieposortowanej części tablicy. Dla tablicy długości <code>n</code> algorytm wykonuje kolejno <code>n - 1</code>, <code>n - 2</code>, aż do <code>1</code> porównań.</p><p>Napisz funkcję <code>liczba_porownan_wybierania(n)</code>, która zwraca łączną liczbę porównań elementów wykonywanych przez ten algorytm dla tablicy długości <code>n</code>.</p>",
    "inputDesc": "Dodatnia liczba całkowita n oznaczająca długość tablicy.",
    "outputDesc": "Łączna liczba porównań jako liczba całkowita.",
    "timeComplexity": "O(1)",
    "spaceComplexity": "O(1)",
    "examples": [
      {
        "input": "n = 3",
        "output": "3",
        "explanation": "Algorytm wykonuje 2 + 1 porównania."
      },
      {
        "input": "n = 6",
        "output": "15",
        "explanation": "Algorytm wykonuje 5 + 4 + 3 + 2 + 1 porównań."
      }
    ],
    "starterCode": "def liczba_porownan_wybierania(n):\n    # Oblicz wynik bez wykonywania sortowania\n    pass\n",
    "functionName": "liczba_porownan_wybierania",
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
        "input": "(3,)",
        "expected": 3
      },
      {
        "input": "(6,)",
        "expected": 15
      },
      {
        "input": "(10,)",
        "expected": 45
      }
    ],
    "solution": "def liczba_porownan_wybierania(n):\n    return n * (n - 1) // 2",
    "explanation": "<p>Suma porównań ma postać <code>(n - 1) + (n - 2) + ... + 1</code>. Jest to suma pierwszych <code>n - 1</code> liczb naturalnych, więc wynik można obliczyć bez pętli ze wzoru <code>n * (n - 1) // 2</code>. Samo sortowanie przez wybieranie ma złożoność <strong>O(n²)</strong>, ale obliczenie liczby porównań ze wzoru działa w czasie <strong>O(1)</strong>.</p>"
  },
  {
    "id": "wysz-03",
    "title": "Pierwsza liczba parzysta w uporządkowanym ciągu",
    "category": "wyszukiwanie",
    "difficulty": "medium",
    "ckeSource": "CKE maj 2019 · PR F2015, zadanie 1",
    "description": "<p>Dana jest lista <code>tab</code>, w której wszystkie liczby nieparzyste występują przed liczbami parzystymi. Napisz funkcję <code>pierwsza_parzysta(tab)</code>, która za pomocą wyszukiwania binarnego zwraca indeks pierwszej liczby parzystej.</p><p>Jeżeli w tablicy nie ma liczb parzystych, zwróć <code>-1</code>. Nie przeglądaj tablicy liniowo.</p>",
    "inputDesc": "Lista liczb całkowitych, w której najpierw występują liczby nieparzyste, a następnie parzyste.",
    "outputDesc": "Indeks pierwszej liczby parzystej albo -1, jeśli taka liczba nie występuje.",
    "timeComplexity": "O(log n)",
    "spaceComplexity": "O(1)",
    "examples": [
      {
        "input": "tab = [5, 99, 3, 7, 111, 13, 4, 24, 4, 8]",
        "output": "6",
        "explanation": "Pierwsza liczba parzysta to 4 pod indeksem 6."
      },
      {
        "input": "tab = [1, 3, 5, 7]",
        "output": "-1",
        "explanation": "W tablicy nie ma liczby parzystej."
      }
    ],
    "starterCode": "def pierwsza_parzysta(tab):\n    # Wyszukiwanie binarne w O(log n)\n    pass\n",
    "functionName": "pierwsza_parzysta",
    "testCases": [
      {
        "input": "([5, 99, 3, 7, 111, 13, 4, 24, 4, 8],)",
        "expected": 6
      },
      {
        "input": "([1, 3, 5, 7],)",
        "expected": -1
      },
      {
        "input": "([2, 4, 6],)",
        "expected": 0
      },
      {
        "input": "([],)",
        "expected": -1
      },
      {
        "input": "([1, 3, 5, 8],)",
        "expected": 3
      }
    ],
    "solution": "def pierwsza_parzysta(tab):\n    lewy = 0\n    prawy = len(tab) - 1\n    wynik = -1\n    while lewy <= prawy:\n        srodek = (lewy + prawy) // 2\n        if tab[srodek] % 2 == 0:\n            wynik = srodek\n            prawy = srodek - 1\n        else:\n            lewy = srodek + 1\n    return wynik",
    "explanation": "<p>Jeżeli środkowy element jest parzysty, zapamiętujemy jego indeks i szukamy jeszcze wcześniej, zmniejszając prawe ograniczenie. Jeżeli jest nieparzysty, pierwsza liczba parzysta może znajdować się wyłącznie po jego prawej stronie. Każdy krok zmniejsza obszar poszukiwań o połowę, dlatego złożoność wynosi <strong>O(log n)</strong>.</p>"
  },
  {
    "id": "sort-03",
    "title": "Sortowanie przez wybieranie malejąco",
    "category": "sortowanie",
    "difficulty": "medium",
    "ckeSource": "CKE maj 2018 · PP F2007, zadanie 2",
    "description": "<p>Zaimplementuj sortowanie przez wybieranie w wersji malejącej. W każdej iteracji znajdź największy element w nieposortowanej części tablicy i zamień go z elementem na jej początku.</p><p>Napisz funkcję <code>sortuj_wybieraniem(tab)</code>, która zmodyfikuje listę <code>tab</code> w miejscu i zwróci tę samą listę posortowaną od największego do najmniejszego elementu. Nie używaj <code>sort()</code> ani <code>sorted()</code>.</p>",
    "inputDesc": "Lista liczb całkowitych tab.",
    "outputDesc": "Zmodyfikowana lista tab posortowana malejąco.",
    "timeComplexity": "O(n²)",
    "spaceComplexity": "O(1)",
    "examples": [
      {
        "input": "tab = [1, 2, 3, 7, 8, 6, 7]",
        "output": "[8, 7, 7, 6, 3, 2, 1]",
        "explanation": "W każdej iteracji na początku nieposortowanej części umieszczany jest jej największy element."
      },
      {
        "input": "tab = [4, 4, 4, 4, 2]",
        "output": "[4, 4, 4, 4, 2]",
        "explanation": "Równe elementy mogą pozostać na swoich miejscach."
      }
    ],
    "starterCode": "def sortuj_wybieraniem(tab):\n    # Zmodyfikuj tab w miejscu bez sort() i sorted()\n    pass\n",
    "functionName": "sortuj_wybieraniem",
    "inPlaceArg": 0,
    "testCases": [
      {
        "input": "([1, 2, 3, 7, 8, 6, 7],)",
        "expected": [
          8,
          7,
          7,
          6,
          3,
          2,
          1
        ]
      },
      {
        "input": "([4, 4, 4, 4, 2],)",
        "expected": [
          4,
          4,
          4,
          4,
          2
        ]
      },
      {
        "input": "([1],)",
        "expected": [
          1
        ]
      },
      {
        "input": "([],)",
        "expected": []
      },
      {
        "input": "([3, 1, 2],)",
        "expected": [
          3,
          2,
          1
        ]
      }
    ],
    "solution": "def sortuj_wybieraniem(tab):\n    n = len(tab)\n    for i in range(n - 1):\n        indeks_max = i\n        for j in range(i + 1, n):\n            if tab[j] > tab[indeks_max]:\n                indeks_max = j\n        if indeks_max != i:\n            tab[i], tab[indeks_max] = tab[indeks_max], tab[i]\n    return tab",
    "explanation": "<p>Algorytm przechodzi po kolejnych pozycjach tablicy i wyszukuje maksimum w pozostałym fragmencie. Po jednej iteracji jedna pozycja jest już ustalona, ale znalezienie maksimum wymaga dalszych porównań. Łącznie jest ich <code>(n - 1) + ... + 1</code>, więc czas wynosi <strong>O(n²)</strong>, a pamięć dodatkowa <strong>O(1)</strong>.</p>"
  },
  {
    "id": "rek-04",
    "title": "Generowanie napisów z alfabetu cyfr",
    "category": "rekurencja",
    "difficulty": "medium",
    "ckeSource": "CKE maj 2019 · PR F2015, zadanie 2",
    "description": "<p>Dla danych liczb <code>n</code> i <code>k</code> wygeneruj wszystkie napisy długości <code>n</code> złożone z cyfr od <code>0</code> do <code>k - 1</code>. Napisz funkcję <code>generuj_napisy(n, k)</code>, która zwraca listę napisów w kolejności uzyskiwanej przez rekurencyjne wywołania od cyfry <code>0</code> do cyfry <code>k - 1</code>.</p><p>Dla <code>n = 0</code> jedynym wynikiem jest pusty napis. Wykorzystaj rekurencję i nie używaj <code>itertools</code>.</p>",
    "inputDesc": "Liczby całkowite n >= 0 i k >= 1.",
    "outputDesc": "Lista wszystkich napisów długości n z cyfr 0, 1, ..., k - 1.",
    "timeComplexity": "O(k^n)",
    "spaceComplexity": "O(n · k^n)",
    "examples": [
      {
        "input": "n = 2, k = 2",
        "output": "['00', '01', '10', '11']",
        "explanation": "Powstają wszystkie dwucyfrowe napisy z cyfr 0 i 1."
      },
      {
        "input": "n = 2, k = 3",
        "output": "['00', '01', '02', '10', '11', '12', '20', '21', '22']",
        "explanation": "Każda pozycja może zawierać 0, 1 albo 2."
      }
    ],
    "starterCode": "def generuj_napisy(n, k):\n    # Rozwiązanie rekurencyjne\n    pass\n",
    "functionName": "generuj_napisy",
    "testCases": [
      {
        "input": "(0, 3)",
        "expected": [
          ""
        ]
      },
      {
        "input": "(1, 1)",
        "expected": [
          "0"
        ]
      },
      {
        "input": "(2, 2)",
        "expected": [
          "00",
          "01",
          "10",
          "11"
        ]
      },
      {
        "input": "(2, 3)",
        "expected": [
          "00",
          "01",
          "02",
          "10",
          "11",
          "12",
          "20",
          "21",
          "22"
        ]
      }
    ],
    "solution": "def generuj_napisy(n, k):\n    wynik = []\n    def generuj(prefiks):\n        if len(prefiks) == n:\n            wynik.append(prefiks)\n            return\n        for cyfra in range(k):\n            generuj(prefiks + str(cyfra))\n    generuj('')\n    return wynik",
    "explanation": "<p>Każde wywołanie rekurencyjne dopisuje jedną z <code>k</code> możliwych cyfr. Gdy długość prefiksu osiągnie <code>n</code>, prefiks jest gotowym wynikiem. Drzewo wywołań ma <code>k^n</code> liści, dlatego liczba wygenerowanych napisów determinuje złożoność czasową.</p>"
  }
];

window.ALGO_CATEGORIES = ALGO_DATA.filter(function (item) { return !item.category; });
window.ALGO_TASKS = ALGO_DATA.filter(function (item) { return item.category; }).concat([
  {
    "id": "zloz-01",
    "title": "Liczba operacji w pętli z dzieleniem",
    "category": "zlozonosc",
    "difficulty": "easy",
    "ckeSource": "Zadanie 1. · Formuła 2023",
    "description": "<p>Przeanalizuj poniższy algorytm:</p><pre><code>krok = 0\nwhile n &gt; 1:\n    krok += 1\n    n = n // 2</code></pre><p>Napisz funkcję <code>policz_kroki(n)</code>, która dla podanej dodatniej liczby całkowitej <code>n</code> zwraca liczbę wykonań ciała pętli.</p>",
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
    "id": "wysz-01",
    "title": "Wyszukiwanie binarne - pierwsze wystąpienie",
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
    "description": "<p>Dana jest posortowana rosnąco lista unikalnych liczb całkowitych <code>tab</code> oraz docelowa suma <code>cel</code>.</p><p>Napisz funkcję <code>znajdz_pare_sumy(tab, cel)</code>, która sprawdza, czy w tablicy istnieją dwa różne elementy o sumie równej <code>cel</code>. Jeśli tak, zwróć krotkę zawierającą te dwa elementy <code>(a, b)</code>, gdzie <code>a &lt; b</code>. Jeśli taka para nie istnieje, zwróć <code>None</code>.</p><p>Algorytm powinien działać w czasie <strong>O(n)</strong> dzięki technice dwóch wskaźników.</p>",
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
    "explanation": "<p>Wskaźniki zostają umieszczone na początku i końcu posortowanej tablicy. Jeśli suma jest zbyt mała, lewy wskaźnik przesuwa się w prawo. Jeśli zbyt duża - prawy wskaźnik przesuwa się w lewo. Każdy element jest sprawdzany co najwyżej raz, stąd czas <strong>O(n)</strong> i pamięć <strong>O(1)</strong>.</p>"
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
    "id": "rek-01",
    "title": "Szybkie potęgowanie modularne",
    "category": "rekurencja",
    "difficulty": "medium",
    "ckeSource": "Zadanie 2. · Formuła 2023",
    "description": "<p>Algorytm szybkiego potęgowania wykorzystuje tożsamość <code>a^b = (a^(b//2))^2</code> dla b parzystych oraz <code>a * a^(b-1)</code> dla b nieparzystych.</p><p>Napisz funkcję <code>potega_mod(a, b, m)</code>, która oblicza wartość <code>(a^b) % m</code> w czasie <strong>O(log b)</strong>.</p>",
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
    "description": "<p>Dana jest funkcja rekurencyjna zdefiniowana następująco:</p><pre><code>def f(n):\n    if n &lt;= 1:\n        return 1\n    return f(n - 1) + f(n - 2)</code></pre><p>Napisz funkcję <code>liczba_wywolan(n)</code>, która oblicza, ile razy łącznie zostanie wywołana funkcja <code>f</code> (wliczając pierwsze wywołanie) dla zadanego argumentu <code>n</code>.</p>",
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
    "explanation": "<p>Liczba wywołań spełnia równanie rekurencyjne: <code>T(0)=1</code>, <code>T(1)=1</code>, a dla <code>n &gt;= 2</code>: <code>T(n) = 1 + T(n-1) + T(n-2)</code>. Wartości te można wyznaczyć w czasie <strong>O(n)</strong> za pomocą programowania dynamicznego.</p>"
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
    "id": "tekst-03",
    "title": "Poprawność nawiasowania (Stos)",
    "category": "tekstowe",
    "difficulty": "easy",
    "ckeSource": "Zadanie 1. · Formuła 2023",
    "description": "<p>Dany jest napis złożony ze znaków nawiasów <code>'()'</code>, <code>'[]'</code> oraz <code>'{}'</code>. Napisz funkcję <code>poprawne_nawiasy(napis)</code>, która sprawdza, czy nawiasy są poprawnie sparowane i domknięte we właściwej kolejności (z wykorzystaniem struktury stosu LIFO).</p>",
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
,
  {
    "id": "num-01",
    "title": "NWD ci\u0105gu liczb",
    "category": "numeryczne",
    "difficulty": "easy",
    "ckeSource": "CKE \"Tworzenie algorytm\u00f3w\" \u00b7 rozdzia\u0142 1.2",
    "tags": ["NWD", "Euklides", "p\u0119tla"],
    "description": "<p>Algorytm Euklidesa pozwala wyznaczy\u0107 najwi\u0119kszy wsp\u00f3lny dzielnik (NWD) dw\u00f3ch liczb. Korzystaj\u0105c z to\u017csamo\u015bci <code>NWD(a\u2081, \u2026, a\u2099) = NWD(NWD(a\u2081, \u2026, a\u2099\u208b\u2081), a\u2099)</code>, mo\u017cna wyznaczy\u0107 NWD ca\u0142ego ci\u0105gu <em>n</em> liczb.</p><p>Napisz funkcj\u0119 <code>nwd_ciagu(n, liczby)</code>, kt\u00f3ra dla danej listy <code>n</code> dodatnich liczb ca\u0142kowitych zwraca ich najwi\u0119kszy wsp\u00f3lny dzielnik.</p><p><strong>Pseudokod:</strong></p><pre><code>w \u2190 a\u2081\ndla i = 2..n wykonuj:\n    w \u2190 NWD(w, a\u1d62)\nzwr\u00f3\u0107 w</code></pre>",
    "inputDesc": "Liczba naturalna n oraz lista n dodatnich liczb ca\u0142kowitych.",
    "outputDesc": "NWD wszystkich n liczb jako liczba ca\u0142kowita.",
    "timeComplexity": "O(n \u00b7 log(max(a\u1d62)))",
    "spaceComplexity": "O(1)",
    "examples": [
      {
        "input": "n = 4, liczby = [36, 24, 72, 150]",
        "output": "6",
        "explanation": "NWD(36, 24) = 12; NWD(12, 72) = 12; NWD(12, 150) = 6."
      }
    ],
    "starterCode": "def nwd_ciagu(n, liczby):\n    # Wyznacz NWD ca\u0142ego ci\u0105gu\n    pass\n",
    "functionName": "nwd_ciagu",
    "testCases": [
      { "input": "(4, [36, 24, 72, 150])", "expected": 6 },
      { "input": "(5, [119, 187, 323, 527, 731])", "expected": 17 },
      { "input": "(6, [121, 330, 990, 1331, 110, 225])", "expected": 1 },
      { "input": "(1, [17])", "expected": 17 },
      { "input": "(3, [8, 12, 20])", "expected": 4 }
    ],
    "solution": "def nwd_ciagu(n, liczby):\n    def nwd(a, b):\n        while b:\n            a, b = b, a % b\n        return a\n    w = liczby[0]\n    for i in range(1, n):\n        w = nwd(w, liczby[i])\n    return w",
    "explanation": "<p>Wewn\u0119trzna funkcja <code>nwd(a, b)</code> realizuje klasyczny algorytm Euklidesa w czasie <strong>O(log min(a,b))</strong>. P\u0119tla zewn\u0119trzna redukuje ca\u0142y ci\u0105g do jednej warto\u015bci przez <code>n \u2212 1</code> wywo\u0142a\u0144. W przypadku <code>n = 1</code> p\u0119tla nie wykonuje \u017cadnej iteracji i zwracany jest jedyny element listy.</p>",
    "hints": [
      "Zaimplementuj pomocnicz\u0105 funkcj\u0119 nwd(a, b) korzystaj\u0105c\u0105 z p\u0119tli while i operacji mod.",
      "Pami\u0119taj o przypadku n = 1 - p\u0119tla powinna dzia\u0142a\u0107 poprawnie, gdy nie ma iteracji."
    ],
    "relatedTopic": "Algorytm Euklidesa (NWD) - sekcja \u201eAlgorytmy numeryczne\u201f"
  },
  {
    "id": "num-02",
    "title": "Liczba B-narcystyczna",
    "category": "numeryczne",
    "difficulty": "easy",
    "ckeSource": "CKE \"Tworzenie algorytm\u00f3w\" \u00b7 rozdzia\u0142 1.2",
    "tags": ["systemy liczbowe", "cyfry", "pot\u0119gowanie"],
    "description": "<p>Liczba <em>x</em> jest <strong>B-narcystyczna</strong>, je\u015bli jej zapis w systemie o podstawie <em>B</em> ma <em>k</em> cyfr, a suma <em>k</em>-tych pot\u0119g tych cyfr jest r\u00f3wna <em>x</em>.</p><p><strong>Przyk\u0142ad 1:</strong> 289 w systemie o podstawie 5 ma zapis <code>2124</code> (4 cyfry), a <code>2\u2074 + 1\u2074 + 2\u2074 + 4\u2074 = 16 + 1 + 16 + 256 = 289</code> - liczba jest 5-narcystyczna.</p><p><strong>Przyk\u0142ad 2:</strong> <code>1\u2074 + 6\u2074 + 3\u2074 + 4\u2074 = 1634</code> - liczba 1634 jest 10-narcystyczna.</p><p>Napisz funkcj\u0119 <code>b_narcystyczna(x, B)</code>, kt\u00f3ra zwraca <code>\"TAK\"</code> je\u015bli <em>x</em> jest B-narcystyczna, lub <code>\"NIE\"</code> w przeciwnym razie.</p>",
    "inputDesc": "Liczba ca\u0142kowita x (x \u2265 0) oraz podstawa systemu B (B \u2265 2).",
    "outputDesc": "Napis \"TAK\" lub \"NIE\".",
    "timeComplexity": "O(log_B(x))",
    "spaceComplexity": "O(log_B(x))",
    "examples": [
      {
        "input": "x = 289, B = 5",
        "output": "\"TAK\"",
        "explanation": "289 = (2124)\u2085, a 2\u2074+1\u2074+2\u2074+4\u2074 = 289."
      },
      {
        "input": "x = 8956, B = 3",
        "output": "\"NIE\"",
        "explanation": "8956 w systemie tr\u00f3jkowym nie spe\u0142nia warunku narcystyczno\u015bci."
      }
    ],
    "starterCode": "def b_narcystyczna(x, B):\n    # Wyznacz cyfry x w systemie B, policz je (k),\n    # sprawd\u017a czy suma k-tych pot\u0119g cyfr == x\n    pass\n",
    "functionName": "b_narcystyczna",
    "testCases": [
      { "input": "(3433, 6)", "expected": "TAK" },
      { "input": "(4890, 5)", "expected": "TAK" },
      { "input": "(8956, 3)", "expected": "NIE" },
      { "input": "(15345, 2)", "expected": "NIE" },
      { "input": "(289, 5)", "expected": "TAK" },
      { "input": "(1634, 10)", "expected": "TAK" }
    ],
    "solution": "def b_narcystyczna(x, B):\n    cyfry = []\n    tmp = x\n    while tmp > 0:\n        cyfry.append(tmp % B)\n        tmp //= B\n    if not cyfry:\n        cyfry = [0]\n    k = len(cyfry)\n    suma = sum(c ** k for c in cyfry)\n    return \"TAK\" if suma == x else \"NIE\"",
    "explanation": "<p>P\u0119tla <code>while tmp > 0</code> wyznacza cyfry liczby <em>x</em> w systemie o podstawie <em>B</em> przez kolejne dzielenia ca\u0142kowitoliczbowe i reszty z dzielenia. Po zebraniu wszystkich cyfr ich liczba <em>k</em> s\u0142u\u017cy jako wyk\u0142adnik. Wa\u017cne: najpierw policz cyfry, dopiero potem podnosy do pot\u0119gi.</p>",
    "hints": [
      "Najpierw wyznacz wszystkie cyfry x mod B, x div B i zapami\u0119taj je na li\u015bcie - dopiero potem znasz k.",
      "Suma k-tych pot\u0119g cyfr: sum(c**k for c in cyfry). Por\u00f3wnaj j\u0105 z x."
    ],
    "relatedTopic": "Systemy pozycyjne - sekcja \u201eAlgorytmy numeryczne\u201f"
  },
  {
    "id": "num-04",
    "title": "Schemat Hornera",
    "category": "numeryczne",
    "difficulty": "easy",
    "ckeSource": "CKE \"Tworzenie algorytm\u00f3w\" \u00b7 rozdzia\u0142 1.2",
    "tags": ["wielomian", "Horner", "z\u0142o\u017cono\u015b\u0107"],
    "description": "<p>Warto\u015b\u0107 wielomianu <code>W(x) = a\u2099\u00b7x\u207f + a\u2099\u208b\u2081\u00b7x\u207f\u207b\u00b9 + \u2026 + a\u2081\u00b7x + a\u2080</code> mo\u017cna obliczy\u0107 <em>bez pot\u0119gowania</em>, korzystaj\u0105c ze <strong>schematu Hornera</strong>:</p><pre><code>W(x) = (\u2026((a\u2099\u00b7x + a\u2099\u208b\u2081)\u00b7x + a\u2099\u208b\u2082)\u00b7x + \u2026)\u00b7x + a\u2080</code></pre><p>Pseudokod:</p><pre><code>w \u2190 a\u2099\ndla i = n\u22121, n\u22122, \u2026, 0 wykonuj:\n    w \u2190 w \u00b7 x + a\u1d62\nzwr\u00f3\u0107 w</code></pre><p>Napisz funkcj\u0119 <code>horner(n, x, wspolczynniki)</code>, gdzie <code>wspolczynniki</code> to lista <code>[a\u2080, a\u2081, \u2026, a\u2099]</code> (od wyrazu wolnego do najwy\u017cszego stopnia). Funkcja powinna zwraca\u0107 warto\u015b\u0107 <code>W(x)</code> wykonuj\u0105c dok\u0142adnie <em>n</em> mno\u017ce\u0144 i <em>n</em> dodawa\u0144.</p>",
    "inputDesc": "Stopie\u0144 wielomianu n (n \u2265 0); warto\u015b\u0107 x; lista wspolczynniki = [a\u2080, a\u2081, \u2026, a\u2099] d\u0142ugo\u015bci n+1.",
    "outputDesc": "Warto\u015b\u0107 W(x) jako liczba.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "examples": [
      {
        "input": "n = 5, x = 2, wspolczynniki = [9, 7, -5, 2, -3, 4]",
        "output": "99",
        "explanation": "W(x) = 4x\u2075\u22123x\u2074+2x\u00b3\u22125x\u00b2+7x+9; W(2) = 128\u221248+16\u221220+14+9 = 99."
      },
      {
        "input": "n = 1, x = 5, wspolczynniki = [2, 3]",
        "output": "17",
        "explanation": "W(x) = 3x+2; W(5) = 17."
      }
    ],
    "starterCode": "def horner(n, x, wspolczynniki):\n    # wspolczynniki = [a0, a1, ..., an]\n    # Iteruj od najwy\u017cszego wsp\u00f3\u0142czynnika do a0\n    pass\n",
    "functionName": "horner",
    "testCases": [
      { "input": "(5, 2, [9, 7, -5, 2, -3, 4])", "expected": 99 },
      { "input": "(0, 7, [3])", "expected": 3 },
      { "input": "(1, 5, [2, 3])", "expected": 17 },
      { "input": "(2, 3, [1, 0, 1])", "expected": 10 }
    ],
    "solution": "def horner(n, x, wspolczynniki):\n    w = wspolczynniki[n]\n    for i in range(n - 1, -1, -1):\n        w = w * x + wspolczynniki[i]\n    return w",
    "explanation": "<p>Algorytm zaczyna od najwy\u017cszego wsp\u00f3\u0142czynnika <code>a\u2099</code>, a nast\u0119pnie w ka\u017cdym kroku mno\u017cy bie\u017c\u0105cy wynik przez <code>x</code> i dodaje kolejny wsp\u00f3\u0142czynnik. Wykonuje dok\u0142adnie <em>n</em> mno\u017ce\u0144 i <em>n</em> dodawa\u0144, co daje z\u0142o\u017cono\u015b\u0107 <strong>O(n)</strong> - lepsz\u0105 ni\u017c naiwne obliczanie kolejnych pot\u0119g.</p>",
    "hints": [
      "Zacznij od wspolczynniki[n] (najwy\u017cszy stopie\u0144) i iteruj w d\u00f3\u0142 do wspolczynniki[0].",
      "W ka\u017cdym kroku: w = w * x + wspolczynniki[i]. Nie potrzebujesz operatora pot\u0119gowania."
    ],
    "relatedTopic": "Algorytmy numeryczne - wielomiany i schemat Hornera"
  },
  {
    "id": "num-05",
    "title": "Dodawanie pisemne w systemie o podstawie p",
    "category": "numeryczne",
    "difficulty": "medium",
    "ckeSource": "CKE \"Tworzenie algorytm\u00f3w\" \u00b7 rozdzia\u0142 1.2",
    "tags": ["systemy liczbowe", "przeniesienie", "tablice"],
    "description": "<p>Zaimplementuj dodawanie pisemne dw\u00f3ch liczb zapisanych w systemie o podstawie <em>p</em> <strong>bez konwersji</strong> na system dziesi\u0119tny. Algorytm przetwarza cyfry od prawej do lewej, wyznaczaj\u0105c przeniesienie do kolejnej pozycji.</p><p>Pseudokod:</p><pre><code>i \u2190 1;  R[1] \u2190 0\ndop\u00f3ki i \u2264 n wykonuj:\n    c \u2190 A[i] + B[i] + R[i]\n    C[i] \u2190 c mod p\n    R[i+1] \u2190 c div p\n    i \u2190 i + 1\nC[n+1] \u2190 R[n+1]</code></pre><p>Napisz funkcj\u0119 <code>dodawanie_w_systemie(p, n, a, b)</code>, gdzie <code>a</code> i <code>b</code> to napisy cyfr (np. <code>\"3122\"</code>), a wynikiem jest napis <em>n+1</em> cyfr (zawsze z wiod\u0105c\u0105 cyfr\u0105, nawet je\u015bli jest zerem).</p>",
    "inputDesc": "Podstawa p (2 \u2264 p \u2264 9); n - liczba cyfr obu liczb; napisy a i b cyfr w danym systemie (obie d\u0142ugo\u015bci n).",
    "outputDesc": "Napis o d\u0142ugo\u015bci n+1 - cyfry sumy a+b w systemie o podstawie p (od najbardziej znacz\u0105cej do najmniej).",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "examples": [
      {
        "input": "p = 4, n = 4, a = \"3122\", b = \"0021\"",
        "output": "\"03203\"",
        "explanation": "Dodawanie w systemie cz\u00f3rkowym: 3122\u2084 + 0021\u2084 = 03203\u2084."
      },
      {
        "input": "p = 2, n = 5, a = \"10110\", b = \"01101\"",
        "output": "\"100011\"",
        "explanation": "Dodawanie dw\u00f3ch liczb binarnych z przeniesieniem."
      }
    ],
    "starterCode": "def dodawanie_w_systemie(p, n, a, b):\n    # a i b to napisy d\u0142ugo\u015bci n, cyfry od lewej (najbardziej znacz\u0105cej)\n    # Zwr\u00f3\u0107 napis d\u0142ugo\u015bci n+1\n    pass\n",
    "functionName": "dodawanie_w_systemie",
    "testCases": [
      { "input": "(4, 4, \"3122\", \"0021\")", "expected": "03203" },
      { "input": "(2, 5, \"10110\", \"01101\")", "expected": "100011" },
      { "input": "(8, 3, \"724\", \"156\")", "expected": "1102" },
      { "input": "(2, 4, \"1111\", \"0001\")", "expected": "10000" }
    ],
    "solution": "def dodawanie_w_systemie(p, n, a, b):\n    a_cyfry = [int(c) for c in reversed(a)]\n    b_cyfry = [int(c) for c in reversed(b)]\n    R = [0] * (n + 2)\n    C = [0] * (n + 2)\n    for i in range(1, n + 1):\n        c = a_cyfry[i - 1] + b_cyfry[i - 1] + R[i]\n        C[i] = c % p\n        R[i + 1] = c // p\n    C[n + 1] = R[n + 1]\n    return ''.join(str(C[i]) for i in range(n + 1, 0, -1))",
    "explanation": "<p>Napisy wej\u015bciowe s\u0105 odwracane, aby indeks 0 odpowiada\u0142 prawej (najmniej znacz\u0105cej) cyfrze - zgodnie z pseudokodem <code>A[1]</code>. P\u0119tla wyznacza cyfry sumy (<code>c mod p</code>) i przeniesienia (<code>c div p</code>) od prawej do lewej. Wynik zawsze ma <em>n+1</em> cyfr - najstarsza mo\u017ce by\u0107 zerem, ale musi by\u0107 zachowana. Z\u0142o\u017cono\u015b\u0107 <strong>O(n)</strong>.</p>",
    "hints": [
      "Cyfra wyniku na pozycji i: (A[i] + B[i] + przeniesienie) mod p. Przeniesienie: (A[i] + B[i] + przeniesienie) div p.",
      "Wynik ma zawsze n+1 cyfr - zachowaj wiod\u0105ce zero. Buduj wynik od C[n+1] do C[1]."
    ],
    "relatedTopic": "Systemy pozycyjne i arytmetyka - sekcja \u201eAlgorytmy numeryczne\u201f"
  }
,
  {
    "id": "num-06",
    "title": "Zamiana z systemu dziesi\u0119tnego na p-kowy",
    "category": "numeryczne",
    "difficulty": "easy",
    "ckeSource": "Zadanie klasyczne \u00b7 Systemy pozycyjne",
    "tags": ["systemy liczbowe", "konwersja", "p\u0119tla"],
    "description": "<p>Zamiana liczby z systemu dziesi\u0119tnego (10) na system o podstawie <em>p</em> polega na wielokrotnym dzieleniu liczby ca\u0142kowitej przez <em>p</em> i zapisywaniu reszt z dzielenia. Reszty odczytane w odwrotnej kolejno\u015bci (od ostatniej do pierwszej) tworz\u0105 zapis liczby w systemie <em>p</em>.</p><p><strong>Pseudokod:</strong></p><pre><code>wynik \u2190 \"\"\ndop\u00f3ki x > 0 wykonuj:\n    reszta \u2190 x mod p\n    wynik \u2190 znak(reszta) + wynik\n    x \u2190 x div p\nje\u015bli wynik = \"\" to zwr\u00f3\u0107 \"0\"\nzwr\u00f3\u0107 wynik</code></pre><p>Napisz funkcj\u0119 <code>dec2base(x, p)</code>, kt\u00f3ra zamienia liczb\u0119 dziesi\u0119tn\u0105 <code>x</code> na napis (string) reprezentuj\u0105cy t\u0119 liczb\u0119 w systemie <code>p</code> (2 \u2264 p \u2264 9).</p>",
    "inputDesc": "Liczba ca\u0142kowita nieujemna x oraz podstawa systemu p (2 \u2264 p \u2264 9).",
    "outputDesc": "Napis sk\u0142adaj\u0105cy si\u0119 z cyfr od 0 do p-1.",
    "timeComplexity": "O(log_p(x))",
    "spaceComplexity": "O(log_p(x))",
    "examples": [
      {
        "input": "x = 13, p = 2",
        "output": "\"1101\"",
        "explanation": "13 / 2 = 6 r 1\n6 / 2 = 3 r 0\n3 / 2 = 1 r 1\n1 / 2 = 0 r 1\nOdczytuj\u0105c reszty od do\u0142u: 1101."
      },
      {
        "input": "x = 0, p = 5",
        "output": "\"0\"",
        "explanation": "Dla x = 0 wynik to zawsze \"0\" niezale\u017cnie od systemu."
      }
    ],
    "starterCode": "def dec2base(x, p):\n    # Pami\u0119taj o przypadku x = 0\n    pass\n",
    "functionName": "dec2base",
    "testCases": [
      { "input": "(13, 2)", "expected": "1101" },
      { "input": "(0, 5)", "expected": "0" },
      { "input": "(255, 2)", "expected": "11111111" },
      { "input": "(123, 8)", "expected": "173" },
      { "input": "(1000, 3)", "expected": "1101001" },
      { "input": "(7, 9)", "expected": "7" }
    ],
    "solution": "def dec2base(x, p):\n    if x == 0:\n        return \"0\"\n    wynik = \"\"\n    while x > 0:\n        wynik = str(x % p) + wynik\n        x = x // p\n    return wynik",
    "explanation": "<p>P\u0119tla <code>while x > 0</code> wyznacza kolejne reszty z dzielenia przez <code>p</code>. Dodaj\u0105c reszt\u0119 <strong>na pocz\u0105tek</strong> stringa (<code>str(x % p) + wynik</code>), z automatu uzyskujemy odwr\u00f3con\u0105 kolejno\u015b\u0107 reszt. Z\u0142o\u017cono\u015b\u0107 czasowa jest zale\u017cna od liczby cyfr, czyli logarytmiczna.</p>",
    "hints": [
      "Je\u015bli liczba x wynosi 0 na samym pocz\u0105tku, zwr\u00f3\u0107 '0'.",
      "G\u0142\u00f3wna p\u0119tla: dop\u00f3ki x > 0, reszta to x % p, nast\u0119pnie x = x // p.",
      "Dodawaj ka\u017cd\u0105 now\u0105 reszt\u0119 na LEW\u0104 stron\u0119 aktualnego wyniku (zamiast na koniec), np. wynik = str(reszta) + wynik."
    ],
    "relatedTopic": "Systemy liczbowe \u2013 zamiana z dziesi\u0119tnego"
  },
  {
    "id": "tekst-01",
    "title": "Sprawdzanie palindromu",
    "category": "tekstowe",
    "difficulty": "easy",
    "ckeSource": "Zadanie klasyczne \u00b7 Algorytmy na tekstach",
    "tags": ["napisy", "palindrom", "dwa wska\u017aniki"],
    "description": "<p>Napis (s\u0142owo) nazywamy <strong>palindromem</strong>, je\u015bli czytany od lewej do prawej i od prawej do lewej jest dok\u0142adnie taki sam.</p><p><strong>Pseudokod:</strong></p><pre><code>n \u2190 d\u0142ugo\u015b\u0107(s)\ndla i = 1, 2, ..., n div 2 wykonuj:\n    je\u015bli s[i] \u2260 s[n - i + 1] to\n        zwr\u00f3\u0107 Fa\u0142sz\nzwr\u00f3\u0107 Prawda</code></pre><p>Napisz funkcj\u0119 <code>czy_palindrom(s)</code>, kt\u00f3ra dzia\u0142a w czasie liniowym i weryfikuje t\u0119 w\u0142asno\u015b\u0107.</p>",
    "inputDesc": "Napis (string) s sk\u0142adaj\u0105cy si\u0119 z ma\u0142ych liter alfabetu.",
    "outputDesc": "Prawda (True) je\u015bli s jest palindromem, Fa\u0142sz (False) w przeciwnym wypadku.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "examples": [
      {
        "input": "s = \"kajak\"",
        "output": "True",
        "explanation": "\"kajak\" od ty\u0142u to r\u00f3wnie\u017c \"kajak\"."
      },
      {
        "input": "s = \"matura\"",
        "output": "False",
        "explanation": "\"matura\" od ty\u0142u to \"aratum\"."
      }
    ],
    "starterCode": "def czy_palindrom(s):\n    # U\u017cyj dw\u00f3ch wska\u017anik\u00f3w: z lewej i z prawej strony napisu\n    pass\n",
    "functionName": "czy_palindrom",
    "testCases": [
      { "input": "(\"kajak\",)", "expected": true },
      { "input": "(\"potop\",)", "expected": true },
      { "input": "(\"matura\",)", "expected": false },
      { "input": "(\"a\",)", "expected": true },
      { "input": "(\"\",)", "expected": true },
      { "input": "(\"anna\",)", "expected": true },
      { "input": "(\"informatyka\",)", "expected": false },
      { "input": "(\"ababa\",)", "expected": true },
      { "input": "(\"abcba\",)", "expected": true }
    ],
    "solution": "def czy_palindrom(s):\n    lewy = 0\n    prawy = len(s) - 1\n    while lewy < prawy:\n        if s[lewy] != s[prawy]:\n            return False\n        lewy += 1\n        prawy -= 1\n    return True",
    "explanation": "<p>Najlepszym sposobem jest metoda <strong>dw\u00f3ch wska\u017anik\u00f3w</strong>. Zaczynamy od ko\u0144c\u00f3w napisu i stopniowo zsuwamy wska\u017aniki do \u015brodka (<code>lewy += 1</code> i <code>prawy -= 1</code>). Je\u015bli kiedykolwiek znaki pod wska\u017anikami s\u0105 r\u00f3\u017cne, zwracamy <code>Fa\u0142sz</code>. Dzi\u0119ki temu w kodzie nie tworzymy kopii napisu z\u017c\u0119raj\u0105cej pami\u0119\u0107.</p>",
    "hints": [
      "W Pythonie mo\u017cna u\u017cy\u0107 s == s[::-1]",
      "Ustaw zmienn\u0105 lewy = 0 oraz prawy = len(s) - 1.",
      "Dop\u00f3ki lewy < prawy, sprawdzaj czy znaki s\u0105 r\u00f3wne. Je\u015bli nie - s\u0142owo nie jest palindromem."
    ],
    "relatedTopic": "Algorytmy na tekstach"
  }
,
  {
    "id": "num-07",
    "title": "Test pierwszo\u015bci",
    "category": "numeryczne",
    "difficulty": "easy",
    "ckeSource": "Zadanie klasyczne \u00b7 Algorytmy numeryczne",
    "tags": ["liczby pierwsze", "w\u0142asno\u015bci liczb", "z\u0142o\u017cono\u015b\u0107"],
    "description": "<p>Napisz funkcj\u0119 <code>czy_pierwsza(n)</code>, kt\u00f3ra zwraca <code>True</code>, je\u015bli podana liczba <em>n</em> jest pierwsza, oraz <code>False</code> w przeciwnym razie. Liczba pierwsza to taka liczba naturalna wi\u0119ksza od 1, kt\u00f3ra dzieli si\u0119 tylko przez 1 i przez sam\u0105 siebie. Zadbaj o optymaln\u0105 z\u0142o\u017cono\u015b\u0107 czasow\u0105.</p><p><strong>Pseudokod:</strong></p><pre><code>je\u015bli n < 2 to zwr\u00f3\u0107 Fa\u0142sz\ndla i = 2, 3, ..., \u230a\u221an\u230b wykonuj:\n    je\u015bli n mod i = 0 to\n        zwr\u00f3\u0107 Fa\u0142sz\nzwr\u00f3\u0107 Prawda</code></pre>",
    "inputDesc": "Liczba ca\u0142kowita n.",
    "outputDesc": "Prawda (True) je\u015bli n jest liczb\u0105 pierwsz\u0105, Fa\u0142sz (False) w przeciwnym razie.",
    "timeComplexity": "O(\u221an)",
    "spaceComplexity": "O(1)",
    "examples": [
      {
        "input": "n = 17",
        "output": "True",
        "explanation": "17 dzieli si\u0119 tylko przez 1 i 17."
      },
      {
        "input": "n = 15",
        "output": "False",
        "explanation": "15 dzieli si\u0119 np. przez 3 i 5."
      }
    ],
    "starterCode": "def czy_pierwsza(n):\n    # Sprawd\u017a przypadki pocz\u0105tkowe (n < 2)\n    # Iteruj przez potencjalne dzielniki\n    pass\n",
    "functionName": "czy_pierwsza",
    "testCases": [
      { "input": "(2,)", "expected": true },
      { "input": "(1,)", "expected": false },
      { "input": "(17,)", "expected": true },
      { "input": "(15,)", "expected": false },
      { "input": "(97,)", "expected": true },
      { "input": "(100,)", "expected": false },
      { "input": "(-5,)", "expected": false }
    ],
    "solution": "def czy_pierwsza(n):\n    if n < 2:\n        return False\n    i = 2\n    while i * i <= n:\n        if n % i == 0:\n            return False\n        i += 1\n    return True",
    "explanation": "<p>Zamiast sprawdza\u0107 wszystkie dzielniki a\u017c do <code>n - 1</code>, wystarczy sprawdzi\u0107 je tylko do pierwiastka kwadratowego z <code>n</code> (zapisane bezpiecznie w p\u0119tli jako <code>i * i <= n</code>). Je\u015bli liczba mia\u0142aby wi\u0119kszy dzielnik (inny ni\u017c n), do pary musia\u0142by istnie\u0107 te\u017c dzielnik mniejszy. Optymalizacja ta osi\u0105ga z\u0142o\u017cono\u015b\u0107 czasow\u0105 <strong>O(\u221an)</strong>.</p>",
    "hints": [
      "Zwr\u00f3\u0107 False dla n < 2 (liczby 0, 1 oraz ujemne nie s\u0105 pierwsze).",
      "Wystarczy sprawdzi\u0107 potencjalne dzielniki od 2 do \u221an.",
      "Aby unikn\u0105\u0107 obliczania u\u0142amkowego pierwiastka, u\u017cyj w p\u0119tli warunku i * i <= n."
    ],
    "relatedTopic": "W\u0142asno\u015bci liczb i podzielno\u015b\u0107"
  },
  {
    "id": "num-08",
    "title": "Rozk\u0142ad na czynniki pierwsze",
    "category": "numeryczne",
    "difficulty": "medium",
    "ckeSource": "Zadanie klasyczne \u00b7 Algorytmy numeryczne",
    "tags": ["liczby pierwsze", "czynniki", "dzielniki"],
    "description": "<p>Napisz funkcj\u0119 <code>rozklad_na_czynniki(n)</code>, kt\u00f3ra przyjmuje liczb\u0119 naturaln\u0105 <em>n > 1</em> i zwraca list\u0119 (tablic\u0119) jej wszystkich czynnik\u00f3w pierwszych, w kolejno\u015bci rosn\u0105cej. Je\u015bli czynnik wyst\u0119puje w rozk\u0142adzie wielokrotnie (np. 12 = 2 * 2 * 3), powinien r\u00f3wnie\u017c pojawi\u0107 si\u0119 wielokrotnie na li\u015bcie.</p><p><strong>Pseudokod:</strong></p><pre><code>czynniki \u2190 []\nk \u2190 2\ndop\u00f3ki n > 1 wykonuj:\n    dop\u00f3ki n mod k = 0 wykonuj:\n        dodaj k do czynniki\n        n \u2190 n div k\n    k \u2190 k + 1\nzwr\u00f3\u0107 czynniki</code></pre><p>W celu optymalizacji p\u0119tl\u0119 zewn\u0119trzn\u0105 mo\u017cna wykonywa\u0107 dop\u00f3ki <code>k * k \u2264 n</code>, a pozosta\u0142\u0105 (ostateczn\u0105) cz\u0119\u015b\u0107 <em>n > 1</em> dopisa\u0107 na sam koniec.</p>",
    "inputDesc": "Liczba naturalna n (n > 1).",
    "outputDesc": "Lista liczb ca\u0142kowitych stanowi\u0105cych czynniki pierwsze.",
    "timeComplexity": "O(\u221an)",
    "spaceComplexity": "O(log_2 n)",
    "examples": [
      {
        "input": "n = 12",
        "output": "[2, 2, 3]",
        "explanation": "12 = 2 * 2 * 3"
      },
      {
        "input": "n = 17",
        "output": "[17]",
        "explanation": "17 jest liczb\u0105 pierwsz\u0105, wi\u0119c sk\u0142ada si\u0119 tylko z samej siebie."
      }
    ],
    "starterCode": "def rozklad_na_czynniki(n):\n    czynniki = []\n    # Iteruj po k=2,3... dop\u00f3ki to konieczne\n    # i wydzielaj (dziel n) powtarzaj\u0105ce si\u0119 czynniki\n    return czynniki\n",
    "functionName": "rozklad_na_czynniki",
    "testCases": [
      { "input": "(12,)", "expected": [2, 2, 3] },
      { "input": "(17,)", "expected": [17] },
      { "input": "(100,)", "expected": [2, 2, 5, 5] },
      { "input": "(2,)", "expected": [2] },
      { "input": "(1024,)", "expected": [2, 2, 2, 2, 2, 2, 2, 2, 2, 2] },
      { "input": "(315,)", "expected": [3, 3, 5, 7] },
      { "input": "(9999,)", "expected": [3, 3, 11, 101] }
    ],
    "solution": "def rozklad_na_czynniki(n):\n    czynniki = []\n    k = 2\n    while k * k <= n:\n        while n % k == 0:\n            czynniki.append(k)\n            n //= k\n        k += 1\n    if n > 1:\n        czynniki.append(n)\n    return czynniki",
    "explanation": "<p>Algorytm opiera si\u0119 na dzieleniu ca\u0142kowitym zmiennej <code>n</code> przez najmniejsze mo\u017cliwe dzielniki <code>k</code>. Wewn\u0119trzna p\u0119tla obs\u0142uguje wielokrotno\u015b\u0107 tego samego czynnika (np. 12 dzieli si\u0119 dwukrotnie na 2). Zewn\u0119trzna p\u0119tla zosta\u0142a zoptymalizowana warunkiem <code>k * k <= n</code>. Je\u015bli po jej zako\u0144czeniu <code>n</code> jest nadal wi\u0119ksze od 1, oznacza to \u017ce ta nierozk\u0142adalna cz\u0119\u015b\u0107 sama jest liczb\u0105 pierwsz\u0105 i musimy dopisa\u0107 j\u0105 do listy (z\u0142o\u017cono\u015b\u0107 <strong>O(\u221an)</strong>).</p>",
    "hints": [
      "Zadeklaruj pust\u0105 list\u0119 czynniki = [] oraz k = 2.",
      "Dop\u00f3ki n % k == 0, dopisuj k do listy i dziel n = n // k. Potem inkrementuj k.",
      "Aby zoptymalizowa\u0107 program sprawdzaj k * k <= n. Pami\u0119taj na ko\u0144cu dopisa\u0107 pozosta\u0142o\u015b\u0107 z n, o ile jest > 1!"
    ],
    "relatedTopic": "W\u0142asno\u015bci liczb i podzielno\u015b\u0107"
  }
,
  {
    "id": "tab-03",
    "title": "Sumy prefiksowe",
    "category": "tablice",
    "difficulty": "medium",
    "ckeSource": "Zadanie klasyczne \u00b7 Optymalizacja zapyta\u0144",
    "tags": ["tablice", "optymalizacja", "sumy"],
    "description": "<p>Napisz funkcj\u0119 <code>oblicz_sumy(tab)</code>, kt\u00f3ra dla danej tablicy liczb oblicza jej <strong>tablic\u0119 sum prefiksowych</strong>. Suma prefiksowa na indeksie <code>i</code> to suma wszystkich element\u00f3w od indeksu 0 do <code>i</code> w\u0142\u0105cznie. Dzi\u0119ki niej sum\u0119 dowolnego przedzia\u0142u [L, R] mo\u017cna w przysz\u0142o\u015bci liczy\u0107 w czasie O(1) wzorem: <code>S[R] - S[L-1]</code>.</p><p><strong>Pseudokod:</strong></p><pre><code>n \u2190 d\u0142ugo\u015b\u0107(A)\nP \u2190 tablica o rozmiarze n\nP[0] \u2190 A[0]\ndla i = 1, 2, ..., n-1 wykonuj:\n    P[i] \u2190 P[i-1] + A[i]\nzwr\u00f3\u0107 P</code></pre>",
    "inputDesc": "Tablica liczb ca\u0142kowitych.",
    "outputDesc": "Tablica sum prefiksowych tej samej d\u0142ugo\u015bci co wej\u015bciowa.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "examples": [
      {
        "input": "tab = [2, 4, 1, 5]",
        "output": "[2, 6, 7, 12]",
        "explanation": "P[0] = 2\nP[1] = 2 + 4 = 6\nP[2] = 6 + 1 = 7\nP[3] = 7 + 5 = 12"
      }
    ],
    "starterCode": "def oblicz_sumy(tab):\n    if not tab: return []\n    # Zainicjuj tablic\u0119 wynikow\u0105\n    pass\n",
    "functionName": "oblicz_sumy",
    "testCases": [
      { "input": "([2, 4, 1, 5],)", "expected": [2, 6, 7, 12] },
      { "input": "([-1, 1, -1, 1],)", "expected": [-1, 0, -1, 0] },
      { "input": "([10],)", "expected": [10] },
      { "input": "([0, 0, 0],)", "expected": [0, 0, 0] },
      { "input": "([1, 2, 3, 4, 5],)", "expected": [1, 3, 6, 10, 15] }
    ],
    "solution": "def oblicz_sumy(tab):\n    if not tab:\n        return []\n    P = [0] * len(tab)\n    P[0] = tab[0]\n    for i in range(1, len(tab)):\n        P[i] = P[i-1] + tab[i]\n    return P",
    "explanation": "<p>Ka\u017cda kolejna suma prefiksowa to po prostu poprzednia suma prefiksowa powi\u0119kszona o aktualny element z tablicy wej\u015bciowej (<code>P[i] = P[i-1] + tab[i]</code>). Algorytm ten w jednym przej\u015bciu przez tablic\u0119 buduje struktur\u0119, kt\u00f3ra jest wprost nieoceniona w arkuszach CKE przy zadaniach optymalizacyjnych z oknami i przedzia\u0142ami.</p>",
    "hints": [
      "Stw\u0142rz pust\u0105 tablic\u0119 wynikow\u0105 lub od razu wype\u0142nion\u0105 zerami o rozmiarze len(tab).",
      "Pierwszy element to zawsze tab[0].",
      "W p\u0119tli od indeksu 1 do ko\u0144ca dodawaj P[i-1] do tab[i]."
    ],
    "relatedTopic": "Tablice i optymalizacja"
  },
  {
    "id": "tekst-02",
    "title": "Sprawdzanie anagram\u00f3w",
    "category": "tekstowe",
    "difficulty": "easy",
    "ckeSource": "Zadanie klasyczne \u00b7 Algorytmy na tekstach",
    "tags": ["napisy", "anagram", "zliczanie"],
    "description": "<p>Dwa s\u0142owa s\u0105 anagramami, je\u015bli sk\u0142adaj\u0105 si\u0119 z tych samych liter, ale mog\u0105 mie\u0107 r\u00f3\u017cn\u0105 ich kolejno\u015b\u0107 (np. \"mata\" i \"tama\"). Napisz funkcj\u0119 <code>czy_anagramy(s1, s2)</code>, kt\u00f3ra zwraca <code>True</code>, je\u015bli s\u0142owa s\u0105 anagramami. Postaraj si\u0119 to zrealizowa\u0107 w optymalnym czasie liniowym <strong>O(n)</strong> u\u017cywaj\u0105c zliczania wyst\u0105pie\u0144 (np. za pomoc\u0105 s\u0142ownika), zamiast sortowa\u0107 ca\u0142e s\u0142owa, co dzia\u0142a\u0142oby wolniej (O(n log n)).</p><p><strong>Pseudokod:</strong></p><pre><code>je\u015bli d\u0142ugo\u015b\u0107(s1) \u2260 d\u0142ugo\u015b\u0107(s2) to zwr\u00f3\u0107 Fa\u0142sz\nZ \u2190 tablica (lub s\u0142ownik) zlicze\u0144 (same zera)\ndla ka\u017cdego znaku c w s1 wykonuj:\n    Z[c] \u2190 Z[c] + 1\ndla ka\u017cdego znaku c w s2 wykonuj:\n    Z[c] \u2190 Z[c] - 1\ndla ka\u017cdej warto\u015bci v w Z wykonuj:\n    je\u015bli v \u2260 0 to zwr\u00f3\u0107 Fa\u0142sz\nzwr\u00f3\u0107 Prawda</code></pre>",
    "inputDesc": "Dwa napisy s1 i s2.",
    "outputDesc": "Prawda (True) je\u015bli s\u0105 anagramami, Fa\u0142sz (False) w przeciwnym razie.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(k), gdzie k to rozmiar alfabetu",
    "examples": [
      {
        "input": "s1 = \"mata\", s2 = \"tama\"",
        "output": "True",
        "explanation": "Oba s\u0142owa maj\u0105 2x 'a', 1x 'm' i 1x 't'."
      },
      {
        "input": "s1 = \"kot\", s2 = \"to\"",
        "output": "False",
        "explanation": "R\u00f3\u017cna d\u0142ugo\u015b\u0107 s\u0142\u00f3w, wi\u0119c nie mog\u0105 by\u0107 anagramami."
      }
    ],
    "starterCode": "def czy_anagramy(s1, s2):\n    # Sprawd\u017a czy maj\u0105 r\u00f3wn\u0105 d\u0142ugo\u015b\u0107\n    # Zlicz litery w s1 i s2, a na koniec je por\u00f3wnaj\n    pass\n",
    "functionName": "czy_anagramy",
    "testCases": [
      { "input": "(\"mata\", \"tama\")", "expected": true },
      { "input": "(\"kot\", \"tok\")", "expected": true },
      { "input": "(\"matura\", \"natura\")", "expected": false },
      { "input": "(\"a\", \"a\")", "expected": true },
      { "input": "(\"ab\", \"a\")", "expected": false },
      { "input": "(\"aabb\", \"bbaa\")", "expected": true },
      { "input": "(\"aabb\", \"abbc\")", "expected": false },
      { "input": "(\"\", \"\")", "expected": true }
    ],
    "solution": "def czy_anagramy(s1, s2):\n    if len(s1) != len(s2):\n        return False\n    zliczenia = {}\n    for znak in s1:\n        zliczenia[znak] = zliczenia.get(znak, 0) + 1\n    for znak in s2:\n        zliczenia[znak] = zliczenia.get(znak, 0) - 1\n    \n    for wartosc in zliczenia.values():\n        if wartosc != 0:\n            return False\n    return True",
    "explanation": "<p>Dzi\u0119ki wykorzystaniu jednej mapy (s\u0142ownika) <code>zliczenia</code> osi\u0105gamy minimaln\u0105 zaj\u0119to\u015b\u0107 pami\u0119ci w stosunku do tworzenia wielu tablic pomocniczych. Dla <code>s1</code> dodajemy wyst\u0105pienia (+1), dla <code>s2</code> je odejmujemy (-1). Je\u015bli s\u0142owa s\u0105 idealnymi anagramami, na koniec w s\u0142owniku zostan\u0105 same zera.</p>",
    "hints": [
      "Je\u015bli s1 i s2 maj\u0105 inne d\u0142ugo\u015bci, od razu zwr\u00f3\u0107 False.",
      "U\u017cyj s\u0142ownika (dict). Przeiteruj przez s1 zwi\u0119kszaj\u0105c liczniki.",
      "Przeiteruj przez s2 zmniejszaj\u0105c liczniki. Nast\u0119pnie sprawd\u017a czy ka\u017cdy licznik w s\u0142owniku wynosi 0."
    ],
    "relatedTopic": "Przetwarzanie znak\u00f3w"
  }

]);
