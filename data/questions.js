/**
 * Baza pytań teoretycznych (źródło na stronie: ten plik).
 *
 * Typy:
 * - "fill"      - {{blank}} / {{d}} / {{select}} + answers[]
 * - "truefalse" - items[].answer: "P" | "F"
 * - "choice"    - options[] + answer: "A"|"B"|…
 *
 * category (jedna na pytanie):
 * - "systemy" | "sieci" | "sql" | "algorytmy" | "bezpieczenstwo"
 * - "arkusz" | "multimedia" | "oprogramowanie"
 *
 * level (poziom egzaminu):
 * - "PP" | "PR"
 *
 * Dla {{select}} podaj selectOptions: ["<", "=", ">"] (lub inne).
 * Sprawdzanie odpowiedzi: lokalnie w przeglądarce (js/questions.js).
 */
window.QUESTIONS_JSON = [
  {
    id: "q-001",
    category: "systemy",
    type: "fill",
    source: "CKE czerwiec 2026 · F2023",
    level: "PR",
    html:
      "<p>Poniżej zapisano wyrażenie matematyczne zawierające dodatnie liczby całkowite zapisane w systemach: szóstkowym, dziesiętnym i trójkowym.<br>" +
      "W miejsce kropek wpisz odpowiednie liczby, tak aby obie równości były prawdziwe.</p>" +
      "<p class=\"question-math\">1251<sub>6</sub> + {{blank}}<sub>6</sub> = 500<sub>10</sub> = {{blank}}<sub>3</sub> &minus; 110102<sub>3</sub></p>",
    answers: ["501", "1010221"]
  },
  {
    id: "q-002",
    category: "bezpieczenstwo",
    type: "truefalse",
    source: "CKE czerwiec 2026 · F2023",
    level: "PR",
    html:
      "<p>Oceń prawdziwość podanych zdań. Zaznacz <strong>P</strong>, jeśli zdanie jest prawdziwe, albo <strong>F</strong> - jeśli jest fałszywe.</p>",
    items: [
      {
        text: "Stosowanie uwierzytelniania dwuskładnikowego nie gwarantuje braku dostępu dla osób niepowołanych.",
        answer: "P"
      },
      {
        text: "Stosowanie uwierzytelniania dwuskładnikowego jest możliwe tylko na urządzeniach wyposażonych w kamerę i w mikrofon.",
        answer: "F"
      }
    ]
  },
  {
    id: "q-003",
    category: "systemy",
    type: "truefalse",
    source: "CKE czerwiec 2026 · F2015",
    level: "PR",
    html:
      "<p>Liczba <strong>11101010<sub>2</sub></strong> (zapisana w systemie binarnym) jest</p>",
    items: [
      { text: "= EA₁₆", answer: "P" },
      { text: "= 3222₄", answer: "P" },
      { text: "= 253₈", answer: "F" },
      { text: "> 255₁₀", answer: "F" }
    ]
  },
  {
    id: "q-004",
    category: "systemy",
    type: "fill",
    source: "CKE maj 2026 · F2023",
    level: "PR",
    html:
      "<p>Poniżej zapisano wyrażenie matematyczne zawierające liczby zapisane w systemach: piątkowym, dziesiętnym i trójkowym.<br>" +
      "W miejsce kropek wpisz odpowiednie liczby (zapisane w systemie piątkowym i trójkowym), tak aby obie równości były prawdziwe.</p>" +
      "<p class=\"question-math\">1440<sub>5</sub> + {{blank}}<sub>5</sub> = 427<sub>10</sub> = {{blank}}<sub>3</sub> &minus; 110002<sub>3</sub></p>",
    answers: ["1212", "1000220"]
  },
  {
    id: "q-005",
    category: "sieci",
    type: "fill",
    source: "CKE maj 2026 · F2023",
    level: "PR",
    html:
      "<p>Uzupełnij zdania. Wpisz właściwe liczby bitów.</p>" +
      "<div class=\"question-fill-lines\">" +
      "<div class=\"question-fill-line\">Adres IP w wersji 4 ma długość {{blank}} bity.</div>" +
      "<div class=\"question-fill-line\">Adres IP w wersji 6 ma długość {{blank}} bitów.</div>" +
      "</div>",
    answers: ["32", "128"]
  },
  {
    id: "q-006",
    category: "systemy",
    type: "fill",
    source: "CKE czerwiec 2025 · F2023",
    level: "PR",
    html:
      "<p>Poniżej sposobem pisemnym dodano dwie liczby zapisane w systemie trójkowym. Uzupełnij brakujące cyfry tak, aby działanie było wykonane poprawnie.</p>" +
      "<div class=\"question-addition\" style=\"--digit-cols: 6\" aria-label=\"Dodawanie w systemie trójkowym\">" +
      "<div class=\"addition-grid\">" +
      "<span class=\"addition-op\" aria-hidden=\"true\"></span><span class=\"addition-pad\" aria-hidden=\"true\"></span><span>1</span><span>2</span>{{d}}<span>1</span><span>2</span>" +
      "<span class=\"addition-op\" aria-hidden=\"true\">+</span><span class=\"addition-pad\" aria-hidden=\"true\"></span><span>2</span><span>1</span><span>1</span><span>0</span><span>2</span>" +
      "<span class=\"addition-rule\" role=\"presentation\"></span>" +
      "<span class=\"addition-op\" aria-hidden=\"true\"></span><span>1</span><span>1</span>{{d}}<span>2</span>{{d}}{{d}}" +
      "</div></div>",
    answers: ["1", "0", "2", "1"]
  },
  {
    id: "q-007",
    category: "multimedia",
    type: "truefalse",
    source: "CKE czerwiec 2025 · F2023",
    level: "PR",
    html:
      "<p>Oceń prawdziwość podanych zdań. Zaznacz <strong>P</strong>, jeśli zdanie jest prawdziwe, albo <strong>F</strong> - jeśli jest fałszywe.</p>",
    items: [
      {
        text: "W pliku w formacie GIF zapiszemy obraz w 16 milionach kolorów bez utraty informacji o nich.",
        answer: "F"
      },
      {
        text: "W plikach w formacie JPG są wykorzystywane metody kompresji danych.",
        answer: "P"
      },
      {
        text: "Format JPG obsługuje przezroczyste tła obrazów.",
        answer: "F"
      }
    ]
  },
  {
    id: "q-008",
    category: "systemy",
    type: "truefalse",
    source: "CKE czerwiec 2025 · F2015",
    level: "PR",
    html:
      "<p>Dla liczb <strong>11010101<sub>2</sub></strong>, <strong>1222<sub>4</sub></strong>, <strong>333<sub>8</sub></strong>, <strong>D6<sub>16</sub></strong> zapisanych w systemach pozycyjnych o podstawach 2, 4, 8 i 16:</p>",
    items: [
      { text: "11010101₂ > 1222₄", answer: "P" },
      { text: "1222₄ > 333₈", answer: "F" },
      { text: "333₈ > D6₁₆", answer: "P" },
      { text: "D6₁₆ > 11010101₂", answer: "P" }
    ]
  },
  {
    id: "q-009",
    category: "multimedia",
    type: "truefalse",
    source: "CKE czerwiec 2025 · F2015",
    level: "PR",
    html:
      "<p>Oceń prawdziwość podanych zdań. Zaznacz <strong>P</strong>, jeśli zdanie jest prawdziwe, albo <strong>F</strong> - jeśli jest fałszywe.</p>",
    items: [
      {
        text: "W pliku w formacie GIF można zapisać obraz z 16 milionami kolorów bez utraty informacji o nich.",
        answer: "F"
      },
      {
        text: "W formacie JPG są wykorzystywane metody kompresji danych.",
        answer: "P"
      },
      {
        text: "Format JPG obsługuje przezroczyste tła obrazów.",
        answer: "F"
      },
      {
        text: "Pliki w formacie JPG mogą mieć rozszerzenie .jpg lub .jpeg.",
        answer: "P"
      }
    ]
  },
  {
    id: "q-010",
    category: "bezpieczenstwo",
    type: "choice",
    source: "CKE maj 2025 · F2023",
    level: "PR",
    html:
      "<p>Dokończ zdanie. Zaznacz właściwą odpowiedź spośród podanych.</p>" +
      "<p><strong>Program typu keylogger służy do</strong></p>",
    options: [
      {
        id: "A",
        text: "szyfrowania informacji do postaci uniemożliwiającej jej odczytanie bez zdefiniowanego klucza."
      },
      {
        id: "B",
        text: "przechowywania danych logowania, w tym haseł, w bezpiecznym miejscu na dysku użytkownika."
      },
      {
        id: "C",
        text: "generowania kodu, który umożliwia użytkownikowi bankowości elektronicznej wykonanie operacji."
      },
      {
        id: "D",
        text: "przechwytywania i gromadzenia informacji o naciśniętych klawiszach."
      }
    ],
    answer: "D"
  },
  {
    id: "q-011",
    category: "systemy",
    type: "fill",
    source: "CKE maj 2025 · F2023",
    level: "PR",
    html:
      "<p>Poniżej sposobem pisemnym dodano dwie liczby podane w zapisie binarnym. Uzupełnij brakujące cyfry tak, aby działanie było wykonane poprawnie.</p>" +
      "<div class=\"question-addition addition--wide\" style=\"--digit-cols: 12\" aria-label=\"Dodawanie binarne\">" +
      "<div class=\"addition-grid\">" +
      "<span class=\"addition-op\" aria-hidden=\"true\"></span><span class=\"addition-pad\" aria-hidden=\"true\"></span><span>1</span><span>1</span>{{d}}<span>0</span><span>1</span><span>0</span><span>1</span><span>1</span><span>0</span>{{d}}<span>1</span>" +
      "<span class=\"addition-op\" aria-hidden=\"true\">+</span><span class=\"addition-pad\" aria-hidden=\"true\"></span><span class=\"addition-pad\" aria-hidden=\"true\"></span><span>1</span><span>1</span><span>0</span><span>0</span>{{d}}<span>1</span><span>0</span><span>1</span><span>1</span><span>1</span>" +
      "<span class=\"addition-rule\" role=\"presentation\"></span>" +
      "<span class=\"addition-op\" aria-hidden=\"true\"></span><span>1</span>{{d}}<span>0</span><span>1</span><span>1</span><span>0</span><span>0</span><span>1</span>{{d}}{{d}}<span>1</span><span>0</span>" +
      "</div></div>",
    answers: ["0", "1", "1", "0", "0", "0"]
  },
  {
    id: "q-012",
    category: "bezpieczenstwo",
    type: "truefalse",
    source: "CKE maj 2025 · F2015",
    level: "PR",
    html: "<p>Program typu keylogger służy do</p>",
    items: [
      {
        text: "szyfrowania informacji do postaci uniemożliwiającej jej odczytanie bez zdefiniowanego klucza.",
        answer: "F"
      },
      {
        text: "przechowywania danych logowania, w tym - haseł, w bezpiecznym miejscu na dysku użytkownika.",
        answer: "F"
      },
      {
        text: "generowania kodu, który umożliwia użytkownikowi bankowości elektronicznej wykonanie operacji.",
        answer: "F"
      },
      {
        text: "przechwytywania i gromadzenia informacji o naciśniętych klawiszach.",
        answer: "P"
      }
    ]
  },
  {
    id: "q-013",
    category: "systemy",
    type: "truefalse",
    source: "CKE maj 2025 · F2015",
    level: "PR",
    html:
      "<p>Liczba <strong>1111 1111 1111 1111<sub>2</sub></strong> (zapisana w systemie binarnym) jest równa</p>",
    items: [
      { text: "33333333₄", answer: "P" },
      { text: "777777₈", answer: "F" },
      { text: "65535₁₀", answer: "P" },
      { text: "FFFF₁₆", answer: "P" }
    ]
  },
  {
    id: "q-014",
    category: "bezpieczenstwo",
    type: "truefalse",
    source: "CKE grudzień 2024 · F2023",
    level: "PR",
    html:
      "<p>Oceń prawdziwość podanych zdań dotyczących podpisu elektronicznego. Zaznacz <strong>P</strong>, jeśli zdanie jest prawdziwe, albo <strong>F</strong> - jeśli jest fałszywe.</p>",
    items: [
      {
        text: "Podpis elektroniczny jest gwarancją poufności treści (szyfruje zawartość dokumentu).",
        answer: "F"
      },
      {
        text: "Podpis elektroniczny służy do uwierzytelniania tożsamości podmiotu wystawiającego dokument.",
        answer: "P"
      },
      {
        text: "Podpis elektroniczny zabezpiecza przed utratą danych.",
        answer: "F"
      }
    ]
  },
  {
    id: "q-015",
    category: "systemy",
    type: "fill",
    source: "CKE grudzień 2024 · F2023",
    level: "PR",
    html:
      "<p>Wykonaj działania na liczbach zapisanych w systemie piątkowym. Wyniki podaj także w systemie piątkowym.</p>" +
      "<div class=\"question-fill-lines\">" +
      "<div class=\"question-fill-line\">2024<sub>5</sub> + 1044<sub>5</sub> = {{blank}}<sub>5</sub></div>" +
      "<div class=\"question-fill-line\">2024<sub>5</sub> &minus; 1044<sub>5</sub> = {{blank}}<sub>5</sub></div>" +
      "</div>",
    answers: ["3123", "430"]
  },
  {
    id: "q-016",
    category: "oprogramowanie",
    type: "truefalse",
    source: "CKE czerwiec 2024 · F2023",
    level: "PR",
    html:
      "<p>Oceń prawdziwość podanych zdań. Zaznacz <strong>P</strong>, jeśli zdanie jest prawdziwe, albo <strong>F</strong> - jeśli jest fałszywe.</p>",
    items: [
      {
        text: "Ochrona praw autorskich przysługuje twórcy niezależnie od spełnienia jakichkolwiek formalności.",
        answer: "P"
      },
      {
        text: "Programy komputerowe nie są dziełami chronionymi prawami autorskimi.",
        answer: "F"
      }
    ]
  },
  {
    id: "q-017",
    category: "systemy",
    type: "fill",
    source: "CKE czerwiec 2024 · F2023",
    level: "PR",
    html:
      "<p>Wykonaj działania na liczbach zapisanych w systemach pozycyjnych o podstawach 5 i 6. " +
      "Wynik dodawania liczb w systemie o podstawie 5 zapisz w tym systemie, wynik odejmowania liczb zapisanych w systemie o podstawie 6 zapisz w systemie o podstawie 6.</p>" +
      "<div class=\"question-fill-lines\">" +
      "<div class=\"question-fill-line\">203<sub>5</sub> + 4401<sub>5</sub> = {{blank}}<sub>5</sub></div>" +
      "<div class=\"question-fill-line\">4541<sub>6</sub> &minus; 2455<sub>6</sub> = {{blank}}<sub>6</sub></div>" +
      "</div>",
    answers: ["10104", "2042"]
  },
  {
    id: "q-018",
    category: "sql",
    type: "truefalse",
    source: "CKE czerwiec 2024 · F2015",
    level: "PR",
    html:
      "<p>W tabeli <code>miasta</code> zamieszczono informacje o liczbie ludności miast Polski. Zawartość tabeli <code>miasta</code>:</p>" +
      "<div class=\"question-data-table-wrap\">" +
      "<table class=\"question-data-table\">" +
      "<thead><tr><th>identyfikator</th><th>miasto</th><th>wojewodztwo</th><th>ludnosc</th></tr></thead>" +
      "<tbody>" +
      "<tr><td>767</td><td>Szamotuły</td><td>wielkopolskie</td><td>18853</td></tr>" +
      "<tr><td>768</td><td>Szczawnica</td><td>małopolskie</td><td>5711</td></tr>" +
      "<tr><td>769</td><td>Szczawno-Zdrój</td><td>dolnośląskie</td><td>5569</td></tr>" +
      "<tr><td>770</td><td>Szczebrzeszyn</td><td>lubelskie</td><td>4964</td></tr>" +
      "<tr><td>771</td><td>Szczecin</td><td>zachodniopomorskie</td><td>401907</td></tr>" +
      "</tbody></table></div>" +
      "<p>Dla podanych danych w wyniku zapytania</p>" +
      "<pre class=\"question-code\">SELECT ludnosc\nFROM miasta\nWHERE identyfikator &gt; 770 OR miasto = \"Szamotuły\"</pre>" +
      "<p>otrzymamy</p>",
    items: [
      { text: "dwie liczby", answer: "P" },
      { text: "pusty wynik", answer: "F" },
      { text: "401907", answer: "F" },
      { text: "420760", answer: "F" }
    ]
  },
  {
    id: "q-019",
    category: "systemy",
    type: "truefalse",
    source: "CKE czerwiec 2024 · F2015",
    level: "PR",
    html:
      "<p>Wynik dodawania liczb binarnych <strong>1011101<sub>2</sub></strong> oraz <strong>111<sub>2</sub></strong> jest:</p>",
    items: [
      { text: "równy 1100110₂", answer: "F" },
      { text: "mniejszy niż 1111111₂", answer: "P" },
      { text: "większy niż 1110000₂", answer: "F" },
      { text: "równy 1100100₂", answer: "P" }
    ]
  },
  {
    id: "q-020",
    category: "sieci",
    type: "truefalse",
    source: "CKE maj 2024 · F2023",
    level: "PR",
    html:
      "<p>Oceń prawdziwość podanych zdań. Zaznacz <strong>P</strong>, jeśli zdanie jest prawdziwe, albo <strong>F</strong> - jeśli jest fałszywe.</p>",
    items: [
      {
        text: "HTTP to protokół komunikacyjny opisujący sposób przekazywania poczty elektronicznej w internecie.",
        answer: "F"
      },
      {
        text: "FTP to protokół zamiany nazw domenowych na adresy IP.",
        answer: "F"
      },
      {
        text: "DHCP to protokół umożliwiający hostom uzyskanie od serwera danych konfiguracyjnych, np. adresu IP, adresu bramy sieciowej, adresu serwera DNS.",
        answer: "P"
      }
    ]
  },
  {
    id: "q-021",
    category: "systemy",
    type: "fill",
    source: "CKE maj 2024 · F2023",
    level: "PR",
    html:
      "<p>Wykonaj działania na liczbach zapisanych w systemie trójkowym i systemie dziewiątkowym. Wyniki podaj w systemie trójkowym.</p>" +
      "<div class=\"question-fill-lines\">" +
      "<div class=\"question-fill-line\">101112<sub>3</sub> + 121<sub>9</sub> = {{blank}}<sub>3</sub></div>" +
      "<div class=\"question-fill-line\">101112<sub>3</sub> &minus; 121<sub>9</sub> = {{blank}}<sub>3</sub></div>" +
      "</div>",
    answers: ["112020", "20211"]
  },
  {
    id: "q-022",
    category: "systemy",
    type: "truefalse",
    source: "CKE maj 2024 · F2015",
    level: "PR",
    html:
      "<p>Różnica <strong>100100111<sub>2</sub> &minus; 1111100<sub>2</sub></strong> jest równa:</p>",
    items: [
      { text: "10101011₂", answer: "P" },
      { text: "253₈", answer: "P" },
      { text: "AB₁₆", answer: "P" },
      { text: "2323₄", answer: "F" }
    ]
  },
  {
    id: "q-023",
    category: "systemy",
    type: "truefalse",
    source: "CKE maj 2024 · F2015",
    level: "PR",
    html:
      "<p>Suma <strong>100100111<sub>2</sub> + 1111100<sub>2</sub></strong> jest równa:</p>",
    items: [
      { text: "110100010₂", answer: "F" },
      { text: "645₈", answer: "F" },
      { text: "1A3₁₆", answer: "P" },
      { text: "12203₄", answer: "P" }
    ]
  },
  {
    id: "q-024",
    category: "systemy",
    type: "fill",
    source: "CKE czerwiec 2023 · F2023",
    level: "PR",
    html:
      "<p>Uzupełnij brakujące pola tabeli:</p>" +
      "<ul>" +
      "<li>w wierszu pierwszym dla liczby zapisanej w systemie o podstawie 3 podaj jej zapis w systemie o podstawie 9</li>" +
      "<li>w wierszu drugim dla liczby zapisanej w systemie o podstawie 9 podaj jej zapis w systemie o podstawie 3</li>" +
      "</ul>" +
      "<div class=\"question-data-table-wrap\"><table class=\"question-data-table\">" +
      "<tbody>" +
      "<tr><td>1.</td><td>101201<sub>3</sub></td><td>{{blank}}<sub>9</sub></td></tr>" +
      "<tr><td>2.</td><td>{{blank}}<sub>3</sub></td><td>2487<sub>9</sub></td></tr>" +
      "</tbody></table></div>",
    answers: ["351", "2112221"]
  },
  {
    id: "q-025",
    category: "multimedia",
    type: "truefalse",
    source: "CKE czerwiec 2023 · F2023",
    level: "PR",
    html:
      "<p>Zapis koloru tła w arkuszu CSS został wyrażony w postaci</p>" +
      "<pre class=\"question-code\">background-color: #E9967A;</pre>",
    items: [
      {
        text: "Zapis dziesiętny składowej czerwonej koloru #E9967A to 233.",
        answer: "P"
      },
      {
        text: "Zmiana zapisu #E9967A na rgb(255,255,255) da w efekcie biały kolor tła.",
        answer: "P"
      }
    ]
  },
  {
    id: "q-026",
    category: "systemy",
    type: "truefalse",
    source: "CKE czerwiec 2023 · F2015",
    level: "PR",
    html: "<p>Oceń prawdziwość podanych równości.</p>",
    items: [
      { text: "101₁₆ = 11001011₂", answer: "F" },
      { text: "101₁₆ = 401₈", answer: "P" },
      { text: "401₈ = 10000001₂", answer: "P" },
      { text: "101₈ = 41₁₆", answer: "P" }
    ]
  },
  {
    id: "q-027",
    category: "bezpieczenstwo",
    type: "truefalse",
    source: "CKE maj 2023 · F2023",
    level: "PR",
    html:
      "<p>Oceń prawdziwość podanych zdań. Zaznacz <strong>P</strong>, jeśli zdanie jest prawdziwe, albo <strong>F</strong> - jeśli jest fałszywe.</p>" +
      "<p>W komunikacji między dwoma osobami A i B z wykorzystaniem <strong>szyfrowania asymetrycznego</strong> klucz prywatny osoby A stosuje się do</p>",
    items: [
      {
        text: "odszyfrowania wiadomości wysłanej do osoby A przez osobę B.",
        answer: "P"
      },
      {
        text: "uwierzytelnienia osoby B przez osobę A.",
        answer: "F"
      }
    ]
  },
  {
    id: "q-028",
    category: "systemy",
    type: "fill",
    source: "CKE maj 2023 · F2023",
    level: "PR",
    selectOptions: ["<", "=", ">"],
    html:
      "<p>Dane są liczby zapisane w systemach pozycyjnych o podstawach 3, 5 i 6. " +
      "Wybierz w miejsce kropek odpowiedni znak spośród: <strong>&lt;</strong>, <strong>=</strong>, <strong>&gt;</strong>, tak aby wyrażenie było poprawne.</p>" +
      "<div class=\"compare-lines\">" +
      "<div class=\"compare-line\"><span>(2011)<sub>3</sub></span>{{select}}<span>(134)<sub>6</sub></span></div>" +
      "<div class=\"compare-line\"><span>(134)<sub>5</sub></span>{{select}}<span>(134)<sub>6</sub></span></div>" +
      "<div class=\"compare-line\"><span>(2222)<sub>3</sub></span>{{select}}<span>(1111)<sub>6</sub></span></div>" +
      "</div>",
    answers: ["=", "<", "<"]
  },
  {
    id: "q-029",
    category: "algorytmy",
    type: "truefalse",
    source: "CKE maj 2023 · F2015",
    level: "PR",
    html:
      "<p>Rozważamy dwie funkcje <strong>F</strong> i <strong>G</strong>, których argumentem jest liczba całkowita <em>x</em> &gt; 1 (gdzie <em>mod</em> oznacza resztę z dzielenia):</p>" +
      "<pre class=\"question-code\">F(x):\n  i ← 2\n  dopóki x mod i ≠ 0 wykonuj\n    i ← i + 1\n  zwróć i\n\nG(x):\n  i ← x − 1\n  dopóki x mod i ≠ 0 wykonuj\n    i ← i − 1\n  zwróć i</pre>",
    items: [
      { text: "F(2)=2 oraz G(2)=1.", answer: "P" },
      {
        text: "Dla każdej liczby parzystej x wartość F(x) jest parzysta.",
        answer: "P"
      },
      {
        text: "Dla każdej liczby parzystej x wartość G(x) jest parzysta.",
        answer: "F"
      },
      {
        text: "Dla każdej liczby x większej od 2 F(x) dzieli liczbę x.",
        answer: "P"
      }
    ]
  },
  {
    id: "q-030",
    category: "systemy",
    type: "truefalse",
    source: "CKE maj 2023 · F2015",
    level: "PR",
    html: "<p>Oceń prawdziwość podanych zdań dotyczących liczb w różnych systemach pozycyjnych.</p>",
    items: [
      { text: "A5₁₆ = 245₈", answer: "P" },
      { text: "A5₁₆ < 10100100₂", answer: "F" },
      { text: "10100100₂ = 2210₄", answer: "P" },
      { text: "2210₄ < 245₈", answer: "P" }
    ]
  },
  {
    id: "q-031",
    category: "sieci",
    type: "fill",
    source: "CKE grudzień 2022 · F2023",
    level: "PR",
    html:
      "<p>Dopasuj odpowiedni protokół (FTP, SMTP, IMAP, HTTPS) do podanego opisu:</p>" +
      "<div class=\"question-fill-lines\">" +
      "<div class=\"question-fill-line\">Protokół wysyłania poczty elektronicznej: {{blank}}</div>" +
      "<div class=\"question-fill-line\">Protokół przesyłania plików: {{blank}}</div>" +
      "<div class=\"question-fill-line\">Szyfrowany protokół przesyłania dokumentów hipertekstowych: {{blank}}</div>" +
      "<div class=\"question-fill-line\">Protokół odbierania poczty elektronicznej: {{blank}}</div>" +
      "</div>",
    answers: ["smtp", "ftp", "https", "imap"]
  },
  {
    id: "q-032",
    category: "bezpieczenstwo",
    type: "truefalse",
    source: "CKE grudzień 2022 · F2023",
    level: "PR",
    html:
      "<p>Oceń prawdziwość podanych zdań. Zaznacz <strong>P</strong>, jeśli zdanie jest prawdziwe, albo <strong>F</strong> - jeśli jest fałszywe.</p>",
    items: [
      {
        text: "Klucz symetryczny umożliwia przeprowadzanie operacji szyfrowania i deszyfrowania.",
        answer: "P"
      },
      {
        text: "W szyfrowaniu symetrycznym używa się dwóch kluczy: prywatnego i publicznego.",
        answer: "F"
      }
    ]
  },
  {
    id: "q-033",
    category: "systemy",
    type: "fill",
    source: "CKE grudzień 2022 · F2023",
    level: "PR",
    html:
      "<p>Uzupełnij tabelę. Zapisz wyniki działania w zapisie czwórkowym i szesnastkowym.</p>" +
      "<div class=\"question-data-table-wrap\"><table class=\"question-data-table\">" +
      "<thead><tr><th>Działanie (czwórkowy)</th><th>Wynik (czwórkowy)</th><th>Wynik (szesnastkowy)</th></tr></thead>" +
      "<tbody>" +
      "<tr><td>3211<sub>4</sub> + 2322<sub>4</sub></td><td>{{blank}}</td><td>{{blank}}</td></tr>" +
      "<tr><td>3211<sub>4</sub> &minus; 2322<sub>4</sub></td><td>{{blank}}</td><td>{{blank}}</td></tr>" +
      "</tbody></table></div>",
    answers: ["12133", "19f", "223", "2b"]
  },
  {
    id: "q-034",
    category: "systemy",
    type: "truefalse",
    source: "CKE czerwiec 2022 · F2015",
    level: "PR",
    html:
      "<p>Po dodaniu dwóch liczb <strong>101101<sub>2</sub></strong> i <strong>111011<sub>2</sub></strong> zapisanych w systemie binarnym otrzymamy:</p>",
    items: [
      { text: "1101000₂", answer: "P" },
      { text: "68₁₆", answer: "P" },
      { text: "140₈", answer: "F" },
      { text: "1120₄", answer: "F" }
    ]
  },
  {
    id: "q-035",
    category: "algorytmy",
    type: "truefalse",
    source: "CKE maj 2022 · F2015",
    level: "PR",
    html:
      "<p>Dany jest algorytm:</p>" +
      "<pre class=\"question-code\">s ← 0\ndla i = 1, 2, …, n\n  dla j = i, i + 1, …, n\n    s ← s + 1</pre>" +
      "<p>Złożoność obliczeniowa powyższego algorytmu oceniona liczbą wykonań instrukcji <code>s ← s + 1</code>, w zależności od dodatniej liczby całkowitej <em>n</em>, jest</p>",
    items: [
      { text: "liniowa.", answer: "F" },
      { text: "kwadratowa.", answer: "P" },
      { text: "n log n.", answer: "F" },
      { text: "nie większa niż sześcienna.", answer: "P" }
    ]
  },
  {
    id: "q-036",
    category: "systemy",
    type: "truefalse",
    source: "CKE maj 2022 · F2015",
    level: "PR",
    html:
      "<p>Po dodaniu liczb <strong>132<sub>4</sub></strong> oraz <strong>3111<sub>4</sub></strong> zapisanych w systemie czwórkowym otrzymamy:</p>",
    items: [
      { text: "1111011₂", answer: "F" },
      { text: "362₈", answer: "F" },
      { text: "F3₁₆", answer: "P" },
      { text: "3303₄", answer: "P" }
    ]
  },
  {
    id: "q-037",
    category: "oprogramowanie",
    type: "truefalse",
    source: "CKE marzec 2022 · F2023",
    level: "PR",
    html:
      "<p>Oceń prawdziwość podanych zdań. Zaznacz <strong>P</strong>, jeśli zdanie jest prawdziwe, albo <strong>F</strong> - jeśli jest fałszywe.</p>" +
      "<p>W myśl polskiego prawa dozwolone jest</p>",
    items: [
      {
        text: "skopiowanie treści z wikipedia.org i użycie jej jako części własnego referatu, z nieznaczną zmianą tak, aby sformułowania nie były dokładnie takie same.",
        answer: "F"
      },
      {
        text: "użycie na własnym blogu zdjęcia z wikipedia.org z uwagą „zdjęcie pochodzi z wikipedia.org” i identyfikatorem autora.",
        answer: "P"
      },
      {
        text: "wklejenie własnego referatu jako część odpowiedniego hasła na wikipedia.org.",
        answer: "P"
      }
    ]
  },
  {
    id: "q-038",
    category: "bezpieczenstwo",
    type: "fill",
    source: "CKE marzec 2022 · F2023",
    level: "PR",
    selectOptions: ["login", "hasło", "dane karty kredytowej"],
    html:
      "<p>Przy transakcjach wykonywanych w pewnym sklepie internetowym potrzebne są między innymi trzy wrażliwe informacje: login (nazwa użytkownika), hasło do serwisu i dane karty kredytowej.</p>" +
      "<p>Dla każdej z informacji wskaż zalecany i prawidłowy sposób postępowania z danymi - wybierz odpowiednią kolumnę (rodzaj danych) dla każdego wiersza.</p>" +
      "<div class=\"question-fill-lines\">" +
      "<div class=\"question-fill-line\">Należy zapisać w bazie danych sklepu w całości → {{select}}</div>" +
      "<div class=\"question-fill-line\">Nie należy przechowywać w bazie danych sklepu w żadnej formie → {{select}}</div>" +
      "<div class=\"question-fill-line\">Należy zapisać jedynie skrót (hash) danych, a nie całą oryginalną treść → {{select}}</div>" +
      "</div>",
    answers: ["login", "dane karty kredytowej", "hasło"]
  },
  {
    id: "q-039",
    category: "algorytmy",
    type: "truefalse",
    source: "CKE czerwiec 2021 · F2015",
    level: "PR",
    html:
      "<p>Mamy dane operacje logiczne na bitach <strong>not</strong>, <strong>and</strong> i <strong>or</strong> oraz wyrażenie <strong>W(a,b)</strong>:</p>" +
      "<pre class=\"question-code\">W(a,b) = ((not a) and b) or (a and (not b))</pre>",
    items: [
      { text: "W(0,0)=1", answer: "F" },
      { text: "W(1,0)=1", answer: "P" },
      { text: "W(0,1)=0", answer: "F" },
      { text: "W(1,1)=0", answer: "P" }
    ]
  },
  {
    id: "q-040",
    category: "systemy",
    type: "truefalse",
    source: "CKE czerwiec 2021 · F2015",
    level: "PR",
    html: "<p>Oceń prawdziwość podanych równości.</p>",
    items: [
      { text: "(10101)₂ + (101011)₂ = (111111)₂", answer: "F" },
      { text: "(A)₁₆ + (B)₁₆ = (F)₁₆", answer: "F" },
      { text: "(12)₈ + (12)₈ = (14)₁₆", answer: "P" },
      { text: "(123)₁₀ = (1111101)₂", answer: "F" }
    ]
  },
  {
    id: "q-041",
    category: "algorytmy",
    type: "truefalse",
    source: "CKE maj 2021 · F2015",
    level: "PR",
    html:
      "<p>Dana jest następująca funkcja:</p>" +
      "<pre class=\"question-code\">funkcja f(n):\n  jeżeli n &gt; 0\n    wypisz n\n    f(n − 2)\n    wypisz n</pre>",
    items: [
      {
        text: "W wyniku wywołania f(5) otrzymamy ciąg 5 5 5 5 5.",
        answer: "F"
      },
      {
        text: "W wyniku wywołania f(6) otrzymamy ciąg 6 4 2 2 4 6.",
        answer: "P"
      },
      {
        text: "W wyniku wywołania f(7) otrzymamy ciąg 7 5 3 1 1 3 5 7.",
        answer: "P"
      },
      {
        text: "W wyniku wywołania f(8) otrzymamy ciąg 8 6 4 2 0 0 2 4 6 8.",
        answer: "F"
      }
    ]
  },
  {
    id: "q-042",
    category: "systemy",
    type: "truefalse",
    source: "CKE maj 2021 · F2015",
    level: "PR",
    html: "<p>Oceń prawdziwość podanych zdań o porównaniu liczb w różnych systemach.</p>",
    items: [
      {
        text: "(10000000)₂ jest liczbą większą od liczby (A9)₁₆",
        answer: "F"
      },
      {
        text: "(1111)₄ jest liczbą większą od liczby (1111111)₂",
        answer: "F"
      },
      {
        text: "(3003)₄ jest liczbą większą od liczby (C2)₁₆",
        answer: "P"
      },
      {
        text: "(333)₈ jest liczbą większą od liczby (10100101)₂",
        answer: "P"
      }
    ]
  },
  {
    id: "q-043",
    category: "algorytmy",
    type: "truefalse",
    source: "CKE marzec 2021 · F2015",
    level: "PR",
    html:
      "<p>Mamy dane operacje (bramki) logiczne na bitach: <strong>not</strong> oraz <strong>and</strong> oraz wyrażenie <strong>W(a,b)</strong>:</p>" +
      "<pre class=\"question-code\">W(a,b) = (not ((not a) and b)) and (not (a and (not b)))</pre>",
    items: [
      { text: "W(0,0)=0", answer: "F" },
      { text: "W(1,0)=0", answer: "P" },
      { text: "W(0,1)=1", answer: "F" },
      { text: "W(1,1)=1", answer: "P" }
    ]
  },
  {
    id: "q-044",
    category: "arkusz",
    type: "truefalse",
    source: "CKE marzec 2021 · F2015",
    level: "PR",
    html:
      "<p>W komórce C1 arkusza kalkulacyjnego zapisano formułę:</p>" +
      "<pre class=\"question-code\">=JEŻELI(ORAZ(MOD(A1;2)=1;MOD(B1;2)=1);A1+B1;A1*B1)</pre>",
    items: [
      {
        text: "Jeśli w A1 wpisano liczbę 1, a w B1 liczbę 3, to w C1 w wyniku obliczenia formuły pojawi się liczba 4.",
        answer: "P"
      },
      {
        text: "Jeśli w A1 wpisano liczbę 4, a w B1 liczbę 3, to w C1 w wyniku obliczenia formuły pojawi się liczba 3.",
        answer: "F"
      },
      {
        text: "Jeśli w A1 i B1 wpiszemy dowolną liczbę całkowitą dodatnią, to w wyniku obliczenia formuły w C1 zawsze pojawi się liczba parzysta.",
        answer: "P"
      },
      {
        text: "Jeśli w A1 i B1 wpiszemy dowolną liczbę całkowitą dodatnią, to w wyniku obliczenia formuły w C1 zawsze pojawi się liczba większa niż 1.",
        answer: "P"
      }
    ]
  },
  {
    id: "q-045",
    category: "systemy",
    type: "truefalse",
    source: "CKE marzec 2021 · F2015",
    level: "PR",
    html:
      "<p>Różnica <strong>1011101<sub>2</sub> &minus; 10111<sub>2</sub></strong> dwóch liczb zapisanych w systemie binarnym jest:</p>",
    items: [
      { text: "mniejsza niż 100111₂", answer: "F" },
      { text: "równa 1000110₂", answer: "P" },
      { text: "większa niż 10111₂", answer: "P" },
      { text: "równa 1001000₂", answer: "F" }
    ]
  },
  {
    id: "q-046",
    category: "algorytmy",
    type: "truefalse",
    source: "CKE lipiec 2020 · F2015",
    level: "PR",
    html:
      "<p>Dana jest rekurencyjna funkcja <em>f(n)</em>:</p>" +
      "<pre class=\"question-code\">f(n):\n  jeżeli n = 0\n    wynikiem jest 1\n  w przeciwnym przypadku\n    s ← 1\n    dla i = 0, 1, …, n − 1\n      s ← s + f(i)\n    wynikiem jest s</pre>",
    items: [
      {
        text: "Dla n < 10 wynikiem działania funkcji f jest liczba mniejsza od 1000.",
        answer: "P"
      },
      {
        text: "Obliczenie poprawnego wyniku f(200) zajmie na komputerze w dowolnej szkolnej pracowni najwyżej kilka sekund.",
        answer: "F"
      },
      {
        text: "W trakcie obliczania wartości funkcji f dla dowolnego n > 0 nastąpi łącznie co najwyżej 2n wywołań tej funkcji.",
        answer: "F"
      },
      { text: "f(10) = 1024.", answer: "P" }
    ]
  },
  {
    id: "q-047",
    category: "systemy",
    type: "truefalse",
    source: "CKE lipiec 2020 · F2015",
    level: "PR",
    html:
      "<p>Liczba <strong>BA<sub>16</sub></strong> (zapisana w systemie szesnastkowym) jest równa</p>",
    items: [
      { text: "186₁₀", answer: "P" },
      { text: "252₈", answer: "F" },
      { text: "10111010₂", answer: "P" },
      { text: "2232₄", answer: "F" }
    ]
  },
  {
    id: "q-048",
    category: "arkusz",
    type: "truefalse",
    source: "CKE lipiec 2020 · F2015",
    level: "PR",
    html:
      "<p>W komórkach A1 i B1 arkusza kalkulacyjnego zapisano pewne liczby całkowite dodatnie. W komórce C1 wpisano formułę:</p>" +
      "<pre class=\"question-code\">=JEŻELI(MOD(A1;2)=0;JEŻELI(MOD(B1;2)=0;A1*B1/4;A1*B1);JEŻELI(MOD(B1;2)=0;A1*B1;(A1+B1)/2))</pre>",
    items: [
      {
        text: "Wartość w komórce C1 (wynik działania formuły) będzie zawsze liczbą całkowitą.",
        answer: "P"
      },
      {
        text: "Jeżeli w komórce A1 wpiszemy wartość 4, a w komórce B1 wpiszemy wartość 3, to w komórce C1 otrzymamy wartość 3.",
        answer: "F"
      },
      {
        text: "Wartość w komórce C1 będzie zawsze liczbą większą lub równą średniej arytmetycznej liczb wpisanych w komórkach A1 i B1.",
        answer: "F"
      },
      {
        text: "Jeżeli w komórce A1 wpiszemy wartość 2, a w komórce B1 wpiszemy wartość 4, to w komórce C1 otrzymamy wartość 2.",
        answer: "P"
      }
    ]
  },
  {
    id: "q-049",
    category: "algorytmy",
    type: "truefalse",
    source: "CKE czerwiec 2020 · F2007",
    level: "PR",
    html:
      "<p>W poniższym algorytmie <em>n</em> jest nieujemną liczbą całkowitą, <em>mod</em> to operator reszty z dzielenia, <em>div</em> to operator dzielenia całkowitego.</p>" +
      "<pre class=\"question-code\">w ← 0\ndopóki n ≠ 0 wykonuj\n  w ← w + (n mod 10)\n  n ← n div 10</pre>",
    items: [
      {
        text: "Po wykonaniu algorytmu dla n = 45778 zmienna w przyjmuje wartość 30.",
        answer: "F"
      },
      {
        text: "Po wykonaniu algorytmu dla liczby n wartością zmiennej w jest suma cyfr liczby n w zapisie dziesiętnym.",
        answer: "P"
      },
      {
        text: "Podczas wykonywania algorytmu dla n = 1234 w kolejnych iteracjach pętli dopóki, zmienna w przyjmuje wartości 1, 3, 6, 10.",
        answer: "F"
      },
      {
        text: "Po wykonaniu algorytmu dla n = 11111 zmienna w przyjmuje wartość 5.",
        answer: "P"
      }
    ]
  },
  {
    id: "q-050",
    category: "sieci",
    type: "truefalse",
    source: "CKE czerwiec 2020 · F2007",
    level: "PR",
    html:
      "<p>Dana jest konfiguracja interfejsu sieciowego komputerów A i B.</p>" +
      "<p><strong>Komputer A:</strong> IPv4 192.168.10.65, maska 255.255.255.0<br>" +
      "<strong>Komputer B:</strong> IPv4 192.168.10.128, maska 255.255.255.0</p>",
    items: [
      { text: "Komputer A i komputer B są w tej samej sieci.", answer: "P" },
      {
        text: "Adresem sieci dla komputera A jest adres 192.168.10.0.",
        answer: "P"
      },
      {
        text: "Dla maski 255.255.255.0 są dostępne 254 adresy hostów.",
        answer: "P"
      },
      {
        text: "Adres rozgłoszeniowy sieci, do której należy komputer B, to 192.168.255.255.",
        answer: "F"
      }
    ]
  },
  {
    id: "q-051",
    category: "sql",
    type: "truefalse",
    source: "CKE kwiecień 2020 · F2015",
    level: "PR",
    html:
      "<p>W tabeli <code>T</code> zapisano wiele rekordów danych zawierających informacje o zawodnikach. Pola rekordu to: <code>id</code>, <code>nazwisko</code>, <code>imie</code>, <code>plec</code>, <code>wzrost</code>, <code>numer_startowy</code>, <code>punkty</code>, <code>id_klubu</code>.</p>" +
      "<p>Polecenie SQL obliczające średnią punktów zawodników z klubu o <code>id_klubu</code> równym 100 może mieć postać:</p>",
    items: [
      {
        text: "select count(punkty) as srednia from T where id_klubu=100;",
        answer: "F"
      },
      {
        text: "select avg(punkty) as srednia from T where id=100;",
        answer: "F"
      },
      {
        text: "select sum(punkty) from T where id_klubu=100;",
        answer: "F"
      },
      {
        text: "select avg(punkty) from T where id_klubu=100;",
        answer: "P"
      }
    ]
  },
  {
    id: "q-052",
    category: "systemy",
    type: "truefalse",
    source: "CKE kwiecień 2020 · F2015",
    level: "PR",
    html:
      "<p>Różnica <strong>11001001<sub>2</sub> &minus; 1111110<sub>2</sub></strong> (dwóch liczb zapisanych w systemie binarnym) jest równa</p>",
    items: [
      { text: "4C₁₆", answer: "F" },
      { text: "113₈", answer: "P" },
      { text: "1023₄", answer: "P" },
      { text: "1001010₂", answer: "F" }
    ]
  },
  {
    id: "q-053",
    category: "sieci",
    type: "truefalse",
    source: "CKE kwiecień 2020 · F2015",
    level: "PR",
    html: "<p>Protokół <strong>HTTPS</strong></p>",
    items: [
      {
        text: "jest protokołem pobierania poczty elektronicznej ze zdalnego serwera przez połączenie TCP/IP.",
        answer: "F"
      },
      {
        text: "jest szyfrowaną wersją protokołu HTTP.",
        answer: "P"
      },
      {
        text: "przydziela adresy IP poszczególnym komputerom.",
        answer: "F"
      },
      {
        text: "obsługuje system nazywania domen.",
        answer: "F"
      }
    ]
  },
  {
    id: "q-054",
    category: "systemy",
    type: "truefalse",
    source: "CKE kwiecień 2020 · F2015",
    level: "PR",
    html:
      "<p>Liczba, która w zapisie binarnym ma dokładnie 16 cyfr i jedynkę na najbardziej znaczącej pozycji ma w zapisie</p>",
    items: [
      { text: "czwórkowym dokładnie 9 cyfr.", answer: "F" },
      { text: "ósemkowym dokładnie 7 cyfr.", answer: "F" },
      { text: "szesnastkowym dokładnie 4 cyfry.", answer: "P" },
      { text: "dziesiętnym dokładnie 5 cyfr.", answer: "P" }
    ]
  },
  {
    id: "q-055",
    category: "sql",
    type: "truefalse",
    source: "CKE czerwiec 2019 · F2015",
    level: "PR",
    html:
      "<p>Dane są tabele <code>Uczniowie</code> i <code>Oceny</code>. Przeanalizuj i oceń poniższe zapytanie w języku SQL.</p>" +
      "<pre class=\"question-code\">SELECT Uczniowie.imie, Uczniowie.nazwisko, AVG(Oceny.ocena)\n" +
      "FROM Uczniowie INNER JOIN Oceny ON Uczniowie.id_ucznia = Oceny.id_ucznia\n" +
      "GROUP BY Uczniowie.id_ucznia, Uczniowie.imie, Uczniowie.nazwisko\n" +
      "HAVING AVG(Oceny.ocena) &gt;= 4\n" +
      "ORDER BY AVG(Oceny.ocena), Uczniowie.nazwisko;</pre>",
    items: [
      {
        text: "W wyniku zapytania, przy odpowiednich danych, mogą pojawić się następujące po sobie wiersze: Jan Abacki 4.08; Jan Kowalski 4.85.",
        answer: "P"
      },
      {
        text: "W wyniku zapytania to samo imię i nazwisko może pojawić się tylko raz, nawet jeśli dwóch uczniów ma takie samo imię i nazwisko.",
        answer: "F"
      },
      {
        text: "W wyniku zapytania otrzymamy trzy kolumny z danymi.",
        answer: "P"
      },
      {
        text: "Jedynym kryterium określającym kolejność wierszy w odpowiedzi jest średnia ocena.",
        answer: "F"
      }
    ]
  },
  {
    id: "q-056",
    category: "systemy",
    type: "truefalse",
    source: "CKE maj 2019 · F2015",
    level: "PR",
    html:
      "<p>Po pomnożeniu dwóch liczb <strong>1111110<sub>2</sub></strong> oraz <strong>101<sub>2</sub></strong> zapisanych w systemie dwójkowym otrzymamy:</p>",
    items: [
      { text: "21312₄", answer: "P" },
      { text: "1001010110₂", answer: "F" },
      { text: "1166₈", answer: "P" },
      { text: "276₁₆", answer: "P" }
    ]
  },
  {
    id: "q-057",
    category: "sieci",
    type: "truefalse",
    source: "CKE maj 2019 · F2015",
    level: "PR",
    html: "<p>Oceń prawdziwość podanych zdań dotyczących systemu DNS.</p>",
    items: [
      { text: "DNS to skrót od Domain Name System.", answer: "P" },
      { text: "Do danego adresu IP może być przypisanych wiele różnych nazw.", answer: "P" },
      {
        text: "Przy zmianie adresu IP komputera pełniącego funkcję serwera WWW jest konieczna zmiana nazwy domeny internetowej.",
        answer: "F"
      },
      {
        text: "System DNS ma jedną centralną bazę danych adresów IP i nazw.",
        answer: "F"
      }
    ]
  },
  {
    id: "q-058",
    category: "arkusz",
    type: "truefalse",
    source: "CKE czerwiec 2019 · F2015",
    level: "PR",
    html:
      "<p>Powyższą tablicę kwadratów w arkuszu kalkulacyjnym można otrzymać, jeżeli skopiuje się tylko jedną formułę z komórki B2 do pozostałych komórek z zakresu B2:K10. " +
      "W tym celu do komórki B2 należy wpisać</p>" +
      "<div class=\"question-data-table-wrap\"><table class=\"question-data-table\">" +
      "<thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th><th>H</th><th>I</th><th>J</th><th>K</th></tr></thead>" +
      "<tbody>" +
      "<tr><td>1</td><td></td><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td></tr>" +
      "<tr><td>2</td><td>10</td><td>100</td><td>121</td><td>144</td><td>169</td><td>196</td><td>225</td><td>256</td><td>289</td><td>324</td><td>361</td></tr>" +
      "<tr><td>3</td><td>20</td><td>400</td><td>441</td><td>484</td><td>529</td><td>576</td><td>625</td><td>676</td><td>729</td><td>784</td><td>841</td></tr>" +
      "</tbody></table></div>" +
      "<p>(Fragment tabeli; wiersze 2-10 zawierają kwadraty sumy wartości z kolumny A i wiersza 1.)</p>",
    items: [
      { text: "=($A2+B$1)*($A2+B$1)", answer: "P" },
      { text: "=(A2+B1)*(A2+B1)", answer: "F" },
      { text: "=($A2+B$1)^2", answer: "P" },
      { text: "=($A$2+$B$1)^2", answer: "F" }
    ]
  },
  {
    id: "q-059",
    category: "sieci",
    type: "truefalse",
    source: "CKE czerwiec 2019 · F2015",
    level: "PR",
    html: "<p>Protokół <strong>HTTPS</strong></p>",
    items: [
      {
        text: "jest protokołem pobierania poczty elektronicznej ze zdalnego serwera przez połączenie TCP/IP.",
        answer: "F"
      },
      { text: "obsługuje system nazywania domen.", answer: "F" },
      { text: "przydziela adresy IP poszczególnym komputerom.", answer: "F" },
      { text: "jest szyfrowaną wersją protokołu http.", answer: "P" }
    ]
  },
  {
    id: "q-060",
    category: "systemy",
    type: "truefalse",
    source: "CKE czerwiec 2019 · F2015",
    level: "PR",
    html:
      "<p>Różnica <strong>11001001<sub>2</sub> − 1111111<sub>2</sub></strong> jest równa</p>",
    items: [
      { text: "2A₁₆", answer: "F" },
      { text: "112₈", answer: "P" },
      { text: "2110₄", answer: "F" },
      { text: "1001010₂", answer: "P" }
    ]
  },
  {
    id: "q-061",
    category: "sieci",
    type: "truefalse",
    source: "CKE maj 2019 · F2007",
    level: "PR",
    html: "<p>Oceń prawdziwość podanych zdań dotyczących systemu DNS.</p>",
    items: [
      { text: "DNS to skrót od Domain Name System.", answer: "P" },
      { text: "Do danego adresu IP może być przypisanych wiele różnych nazw.", answer: "P" },
      {
        text: "Przy zmianie adresu IP komputera pełniącego funkcję serwera WWW jest konieczna zmiana nazwy domeny internetowej.",
        answer: "F"
      },
      {
        text: "System DNS ma jedną centralną bazę danych adresów IP i nazw.",
        answer: "F"
      }
    ]
  },
  {
    id: "q-062",
    category: "systemy",
    type: "truefalse",
    source: "CKE maj 2019 · F2007",
    level: "PR",
    html:
      "<p>Po pomnożeniu dwóch liczb <strong>1111110<sub>2</sub></strong> oraz <strong>101<sub>2</sub></strong> zapisanych w systemie dwójkowym otrzymamy:</p>",
    items: [
      { text: "21312₄", answer: "P" },
      { text: "1001010110₂", answer: "F" },
      { text: "1166₈", answer: "P" },
      { text: "276₁₆", answer: "P" }
    ]
  },
  {
    id: "q-063",
    category: "sieci",
    type: "truefalse",
    source: "CKE maj 2019 · F2007",
    level: "PR",
    html: "<p>Oceń prawdziwość podanych zdań dotyczących adresów IP.</p>",
    items: [
      { text: "Adres IPv6 składa się z 64 bitów.", answer: "F" },
      { text: "Adres IPv6 składa się z 128 bitów.", answer: "P" },
      { text: "Adres IPv4 składa się z 64 bitów.", answer: "F" },
      { text: "Adres IPv4 składa się z 32 bitów.", answer: "P" }
    ]
  },
  {
    id: "q-064",
    category: "oprogramowanie",
    type: "truefalse",
    source: "CKE maj 2019 · F2007",
    level: "PR",
    html:
      "<p>Skrótem nazwy złącza, przez które można podłączyć urządzenia peryferyjne do komputera, jest</p>",
    items: [
      { text: "USB", answer: "P" },
      { text: "FTP", answer: "F" },
      { text: "PHP", answer: "F" },
      { text: "HDMI", answer: "P" }
    ]
  },
  {
    id: "q-065",
    category: "sql",
    type: "truefalse",
    source: "CKE czerwiec 2018 · F2015",
    level: "PR",
    html:
      "<p>W tabeli <code>T</code> zapisano wiele rekordów danych zawierających informacje o zawodnikach. " +
      "Pola rekordu to: <code>id</code>, <code>nazwisko</code>, <code>imie</code>, <code>plec</code>, <code>wzrost</code>, " +
      "<code>numer_startowy</code>, <code>punkty</code>, <code>id_klubu</code>.</p>" +
      "<p>Polecenie SQL obliczające sumę punktów zawodników z klubu o <code>id_klubu</code> równym liczbie 100 może mieć postać:</p>",
    items: [
      {
        text: "select sum(punkty) as suma from T where id_klubu=100;",
        answer: "P"
      },
      {
        text: "select avg(punkty) from T where id=100;",
        answer: "F"
      },
      {
        text: "select punkty as suma from T where id_klubu=100;",
        answer: "F"
      },
      {
        text: "select sum(punkty) from T where id_klubu=100;",
        answer: "P"
      }
    ]
  },
  {
    id: "q-066",
    category: "algorytmy",
    type: "truefalse",
    source: "CKE czerwiec 2018 · F2015",
    level: "PR",
    html: "<p>Które zdania dotyczące struktury danych zwanej <strong>stosem</strong> są prawdziwe?</p>",
    items: [
      {
        text: "Elementy stosu są zdejmowane w odwrotnej kolejności niż kolejność ich wkładania na stos.",
        answer: "P"
      },
      {
        text: "Tylko pierwszy dodany element jest zawsze dostępny na stosie.",
        answer: "F"
      },
      {
        text: "Stos może być używany m.in. przy obliczaniu wartości wyrażeń zapisanych w Odwrotnej Notacji Polskiej (ONP).",
        answer: "P"
      },
      {
        text: "Tylko ostatnio dodany element jest zawsze dostępny na stosie.",
        answer: "P"
      }
    ]
  },
  {
    id: "q-067",
    category: "systemy",
    type: "truefalse",
    source: "CKE czerwiec 2018 · F2015",
    level: "PR",
    html:
      "<p>Do jednoznacznego zakodowania znaków pięcioelementowego alfabetu wystarczą/y:</p>",
    items: [
      { text: "2 bity.", answer: "F" },
      { text: "3 bity.", answer: "P" },
      { text: "5 bitów.", answer: "P" },
      { text: "8 bitów.", answer: "P" }
    ]
  },
  {
    id: "q-068",
    category: "algorytmy",
    type: "truefalse",
    source: "CKE czerwiec 2018 · F2015",
    level: "PR",
    html:
      "<p>Dana jest funkcja rekurencyjna <strong>Rek</strong>, której argumentem jest nieujemna liczba całkowita <em>n</em>.</p>" +
      "<pre class=\"question-code\">funkcja Rek(n)\n" +
      "  jeśli (n &gt; 0) to wykonaj kolejno dwie instrukcje:\n" +
      "    1. wywołaj Rek dla argumentu n − 1\n" +
      "    2. wypisz n</pre>" +
      "<p>Jeśli wywołamy ją dla <em>n</em> równego 5, to:</p>",
    items: [
      { text: "Zero będzie wypisane.", answer: "F" },
      { text: "Największą wypisaną liczbą będzie 5.", answer: "P" },
      { text: "Zostanie wypisanych 5 liczb.", answer: "P" },
      { text: "Liczby zostaną wypisane w kolejności malejącej.", answer: "F" }
    ]
  },
  {
    id: "q-069",
    category: "sieci",
    type: "truefalse",
    source: "CKE maj 2018 · F2015",
    level: "PR",
    html:
      "<p>Na pewnym serwerze WWW znajduje się strona napisana w języku PHP, a jej kod zawiera fragmenty w języku JavaScript. " +
      "Pewien komputer-klient pobrał i wyświetlił tę stronę. Wiadomo, że:</p>",
    items: [
      { text: "kod PHP jest wykonywany przez komputer - serwer.", answer: "P" },
      { text: "kod JavaScript jest wykonywany przez komputer - klient.", answer: "P" },
      {
        text: "podczas wykonywania kodu PHP zawsze pobierane są dane od klienta.",
        answer: "F"
      },
      {
        text: "podczas wykonywania kodu JavaScript mogą być pobierane dodatkowe dane zarówno od klienta, jak i od serwera.",
        answer: "P"
      }
    ]
  },
  {
    id: "q-070",
    category: "multimedia",
    type: "truefalse",
    source: "CKE maj 2018 · F2015",
    level: "PR",
    html: "<p>Oceń prawdziwość podanych zdań dotyczących modeli barw.</p>",
    items: [
      {
        text: "Plakat do druku lepiej przygotować w modelu barw RGB niż CMYK.",
        answer: "F"
      },
      { text: "Kolor żółty jest kolorem podstawowym w modelu RGB.", answer: "F" },
      {
        text: "W wyniku nałożenia się składowych Yellow i Magenta w modelu CMYK otrzymamy kolor czerwony.",
        answer: "P"
      },
      {
        text: "W modelu barw CMYK litera C pochodzi od angielskiego słowa contrast.",
        answer: "F"
      }
    ]
  },
  {
    id: "q-071",
    category: "sql",
    type: "truefalse",
    source: "CKE maj 2018 · F2015",
    level: "PR",
    html: "<p>Wskaż zdania prawdziwe dla języka SQL.</p>",
    items: [
      {
        text: "W wynikach zapytania postaci SELECT (...) ORDER BY (...) zawsze dostajemy rekordy uporządkowane ściśle rosnąco według wskazanego pola.",
        answer: "F"
      },
      {
        text: "Zapytanie UPDATE może zmienić wartości pól w bazie danych.",
        answer: "P"
      },
      {
        text: "Zapytanie postaci SELECT * FROM tabela1 WHERE pole LIKE (...) może w pewnych warunkach dać wszystkie rekordy z tabeli tabela1.",
        answer: "P"
      },
      {
        text: "Wynik zapytania SELECT * FROM tabela1 JOIN tabela2 ON tabela1.pole = tabela2.pole może być pusty przy niepustych tabelach tabela1 oraz tabela2.",
        answer: "P"
      }
    ]
  },
  {
    id: "q-072",
    category: "systemy",
    type: "truefalse",
    source: "CKE maj 2018 · F2007",
    level: "PR",
    html: "<p>Oceń prawdziwość podanych równości w różnych systemach pozycyjnych.</p>",
    items: [
      { text: "A5₁₆ + 234₈ = 149₁₆", answer: "F" },
      { text: "A5₁₆ − 234₈ = 9₁₆", answer: "P" },
      { text: "A5₁₆ * 1000₂ = A50₁₆", answer: "F" },
      { text: "128₁₀ / 2₈ = 1000000₂", answer: "P" }
    ]
  },
  {
    id: "q-073",
    category: "sieci",
    type: "truefalse",
    source: "CKE maj 2018 · F2007",
    level: "PR",
    html:
      "<p>Dane są następujące adresy IPv4 komputerów:</p>" +
      "<pre class=\"question-code\">Komputer nr 1: 196.122.128.0\nKomputer nr 2: 196.122.129.0\nKomputer nr 3: 196.123.129.0</pre>",
    items: [
      {
        text: "Dla maski 255.255.0.0 komputery pierwszy i drugi należą do tej samej sieci.",
        answer: "P"
      },
      {
        text: "Dla maski 255.255.255.0 komputery drugi i trzeci należą do tej samej sieci.",
        answer: "F"
      },
      {
        text: "Dla maski 255.255.0.0 adres sieci, w której jest pierwszy komputer, to 196.122.0.0.",
        answer: "P"
      },
      {
        text: "Dla maski 255.255.255.0 adres rozgłoszeniowy sieci, w której jest trzeci komputer, to 196.123.129.255.",
        answer: "P"
      }
    ]
  },
  {
    id: "q-074",
    category: "algorytmy",
    type: "truefalse",
    source: "CKE maj 2018 · F2007",
    level: "PR",
    html:
      "<p>Dana jest funkcja rekurencyjna:</p>" +
      "<p class=\"question-math\">" +
      "f(x) = 1 &nbsp;&nbsp;dla <em>x</em> ≤ 1<br>" +
      "f(x) = <em>x</em> + f(<em>x</em> div 2) &nbsp;&nbsp;dla <em>x</em> &gt; 1" +
      "</p>" +
      "<p>gdzie <em>x</em> jest nieujemną liczbą całkowitą, a operacja <em>x</em> div 2 oznacza część całkowitą z dzielenia <em>x</em> przez 2.</p>",
    items: [
      { text: "f(15) = 25", answer: "F" },
      { text: "f(12) = 22", answer: "P" },
      {
        text: "Podczas obliczania wartości f(12) operacja dodawania zostanie wykonana 4 razy.",
        answer: "F"
      },
      {
        text: "Dla x równych potędze dwójki f(x) = 2 * x − 1",
        answer: "P"
      }
    ]
  },
  {
    id: "q-075",
    category: "multimedia",
    type: "truefalse",
    source: "CKE maj 2018 · F2007",
    level: "PR",
    html: "<p>Prawidłowe przyporządkowania rozszerzeń plików i ich zastosowanie to</p>",
    items: [
      {
        text: "TIFF, OCR, OGG - pliki w grafice wektorowej",
        answer: "F"
      },
      {
        text: "BMP, JPG, PNG - pliki w grafice rastrowej",
        answer: "P"
      },
      {
        text: "AVI, MOV, MPEG - pliki filmowe",
        answer: "P"
      },
      {
        text: "WMA, WAV, MIDI - pliki dźwiękowe",
        answer: "P"
      }
    ]
  },
  {
    id: "q-076",
    category: "algorytmy",
    type: "truefalse",
    source: "CKE maj 2018 · F2007",
    level: "PR",
    html:
      "<p>Dana jest tablica <strong>T[0..3, 0..3]</strong> wypełniona następującymi wartościami:</p>" +
      "<div class=\"question-data-table-wrap\"><table class=\"question-data-table\">" +
      "<thead><tr><th><em>i</em> \\ <em>k</em></th><th>0</th><th>1</th><th>2</th><th>3</th></tr></thead>" +
      "<tbody>" +
      "<tr><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td></tr>" +
      "<tr><td>1</td><td>2</td><td>2</td><td>4</td><td>6</td></tr>" +
      "<tr><td>2</td><td>4</td><td>4</td><td>6</td><td>6</td></tr>" +
      "<tr><td>3</td><td>4</td><td>5</td><td>6</td><td>8</td></tr>" +
      "</tbody></table></div>" +
      "<p>Dla podanych algorytmów oceń poprawność podanego wyniku ich działania.</p>" +
      "<pre class=\"question-code\">1. suma=0;\n   Dla każdego i od 0 do 2\n     Dla każdego k od 0 do 2\n       suma=suma+T[i,k];\n   wypisz suma;\n   Podany wynik: 64\n\n" +
      "2. k=3;\n   suma=0;\n   Dla każdego i od 0 do 3\n     suma=suma+T[i,k];\n     k=k-1;\n   wypisz suma;\n   Podany wynik: 16\n\n" +
      "3. Dla każdego i od 0 do 3\n     Dla każdego k od 0 do 3\n       W[k,i]=T[i,k];\n   k=2;\n   Dla każdego i od 0 do 3\n     wypisz W[i,k];\n   Podany wynik: 2, 2, 4, 6\n\n" +
      "4. Dla każdego i od 0 do 3\n     Dla każdego k od 0 do 3\n       W[k,i]=T[i,k];\n   Dla każdego i od 0 do 3\n     wypisz W[i,i];\n   Podany wynik: 1, 2, 6, 8</pre>",
    items: [
      { text: "Wynik algorytmu 1 (64) jest poprawny.", answer: "F" },
      { text: "Wynik algorytmu 2 (16) jest poprawny.", answer: "P" },
      { text: "Wynik algorytmu 3 (2, 2, 4, 6) jest poprawny.", answer: "F" },
      { text: "Wynik algorytmu 4 (1, 2, 6, 8) jest poprawny.", answer: "P" }
    ]
  },
  {
    id: "q-077",
    category: "sql",
    type: "truefalse",
    source: "CKE maj 2017 · F2015",
    level: "PR",
    html:
      "<p>Po wykonaniu podanego zapytania SQL do pewnej bazy danych wyniki będą zawsze uporządkowane niemalejąco według pola <code>nazwa</code>.</p>",
    items: [
      {
        text: "SELECT nazwa, wartosc FROM dane ORDER BY wartosc, nazwa",
        answer: "F"
      },
      {
        text: "SELECT nazwa, wartosc FROM dane ORDER BY nazwa",
        answer: "P"
      },
      {
        text: "SELECT nazwa, sum(wartosc) FROM dane GROUP BY nazwa",
        answer: "F"
      },
      {
        text: "SELECT nazwa, sum(wartosc) FROM dane GROUP BY nazwa ORDER BY nazwa",
        answer: "P"
      }
    ]
  },
  {
    id: "q-078",
    category: "sql",
    type: "truefalse",
    source: "CKE maj 2017 · F2015",
    level: "PR",
    html:
      "<p>Rozważ następujące zapytanie SQL do pewnej bazy danych:</p>" +
      "<pre class=\"question-code\">SELECT pesel, COUNT(*)\n" +
      "FROM samochody\n" +
      "WHERE pesel NOT IN (SELECT pesel FROM dokumenty_zastrzezone)\n" +
      "GROUP BY pesel HAVING COUNT(*) &gt; 1</pre>" +
      "<p>Po wykonaniu tego zapytania w odpowiedzi</p>" +
      "<p><em>Uwaga:</em> kolumna <code>pesel</code> zawiera numery PESEL.</p>",
    items: [
      {
        text: "ten sam numer PESEL może pojawić się więcej niż jeden raz.",
        answer: "F"
      },
      {
        text: "nie pojawi się żaden numer PESEL, który jest zapisany w tabeli dokumenty_zastrzezone.",
        answer: "P"
      },
      {
        text: "otrzymasz tabelę o 2 kolumnach.",
        answer: "P"
      },
      {
        text: "przy odpowiednich danych może pojawić się wiersz „82122302134, 1”.",
        answer: "F"
      }
    ]
  },
  {
    id: "q-079",
    category: "bezpieczenstwo",
    type: "truefalse",
    source: "CKE maj 2017 · F2015",
    level: "PR",
    html:
      "<p>Pewien oszust chce rozesłać wiadomość, podszywając się pod Jana Kowalskiego, ale nie zdołał wykraść żadnych należących do Jana haseł ani innych prywatnych informacji. " +
      "Posiada jednak klucz publiczny Jana Kowalskiego, który ten udostępnił w sieci, a także znaleziony w internecie adres e-mail Jana. Może zatem</p>",
    items: [
      {
        text: "założyć konto „Jan Kowalski” w serwisie społecznościowym i stamtąd rozsyłać wiadomości.",
        answer: "P"
      },
      {
        text: "na podstawie klucza publicznego Jana Kowalskiego szybko wygenerować jego podpis cyfrowy.",
        answer: "F"
      },
      {
        text: "na podstawie klucza publicznego Jana Kowalskiego szybko obliczyć jego klucz prywatny.",
        answer: "F"
      },
      {
        text: "rozsyłać listy elektroniczne, które w nagłówku „Od:” będą miały adres e-mail Jana Kowalskiego.",
        answer: "P"
      }
    ]
  },
  {
    id: "q-080",
    category: "algorytmy",
    type: "truefalse",
    source: "CKE maj 2017 · F2007",
    level: "PR",
    html:
      "<p>Dane są tablica <strong>A[1..6]</strong> o zawartości [6, 2, −1, 5, 1, 2] oraz następujący fragment algorytmu:</p>" +
      "<pre class=\"question-code\">s ← 0\n" +
      "n ← 3\n" +
      "i ← 6\n" +
      "dopóki i &gt; n − 1 wykonuj\n" +
      "  s ← s + A[i]\n" +
      "  i ← i − 1</pre>" +
      "<p>Po wykonaniu tego algorytmu spełniony jest warunek</p>",
    items: [
      { text: "s jest parzyste.", answer: "F" },
      { text: "s = 7.", answer: "P" },
      { text: "s > 6.", answer: "P" },
      { text: "s = 3.", answer: "F" }
    ]
  },
  {
    id: "q-081",
    category: "sieci",
    type: "truefalse",
    source: "CKE maj 2017 · F2007",
    level: "PR",
    html: "<p>Realizacji usług poczty elektronicznej służy protokół</p>",
    items: [
      { text: "SMTP.", answer: "P" },
      { text: "IMAP.", answer: "P" },
      { text: "EMAIL.", answer: "F" },
      { text: "POP3.", answer: "P" }
    ]
  },
  {
    id: "q-082",
    category: "systemy",
    type: "truefalse",
    source: "CKE maj 2017 · F2007",
    level: "PR",
    html: "<p>Liczbą większą od <strong>150<sub>10</sub></strong> jest</p>",
    items: [
      { text: "10011001₂", answer: "P" },
      { text: "1222₄", answer: "F" },
      { text: "227₈", answer: "P" },
      { text: "9B₁₆", answer: "P" }
    ]
  },
  {
    id: "q-083",
    category: "multimedia",
    type: "truefalse",
    source: "CKE maj 2017 · F2007",
    level: "PR",
    html: "<p>Obrazy rastrowe</p>",
    items: [
      {
        text: "są reprezentowane jako tablice pikseli, co powoduje istotną utratę jakości przy powiększaniu obrazu.",
        answer: "P"
      },
      {
        text: "tworzone są przy użyciu wyrażeń matematycznych opisujących występujące w obrazie odcinki, krzywe, elipsy itp.",
        answer: "F"
      },
      {
        text: "mogą być wprowadzane do komputera przy użyciu urządzeń takich jak aparat cyfrowy lub skaner.",
        answer: "P"
      },
      {
        text: "mogą powstać w efekcie cyfrowego zapisu obrazu widzialnego.",
        answer: "P"
      }
    ]
  },
  {
    id: "q-084",
    category: "algorytmy",
    type: "truefalse",
    source: "CKE maj 2017 · F2007",
    level: "PR",
    html:
      "<p>Algorytm zwany sitem Eratostenesa opierający się na „wykreślaniu” wielokrotności kolejnych (niewykreślonych wcześniej) liczb naturalnych służy wyznaczeniu</p>",
    items: [
      { text: "największego wspólnego dzielnika dwóch liczb.", answer: "F" },
      { text: "najmniejszej wspólnej wielokrotności dwóch liczb.", answer: "F" },
      { text: "liczb pierwszych z zadanego przedziału.", answer: "P" },
      { text: "potęg dwójki z zadanego przedziału.", answer: "F" }
    ]
  },
  {
    id: "q-085",
    category: "oprogramowanie",
    type: "truefalse",
    source: "CKE maj 2017 · F2007",
    level: "PR",
    html:
      "<p>Przykładem programu, który służy do tłumaczenia instrukcji kodu źródłowego programu komputerowego na język maszynowy, jest</p>",
    items: [
      { text: "walidator.", answer: "F" },
      { text: "kompilator.", answer: "P" },
      { text: "edytor tekstu.", answer: "F" },
      { text: "defragmentator.", answer: "F" }
    ]
  },
  {
    id: "q-086",
    category: "algorytmy",
    type: "truefalse",
    source: "CKE czerwiec 2016 · F2015",
    level: "PR",
    html:
      "<p>W językach programowania: Pascal, C++, Java tablica jest strukturą danych,</p>",
    items: [
      { text: "która ma maksymalnie 256 elementów.", answer: "F" },
      { text: "w której można przechowywać tylko liczby.", answer: "F" },
      {
        text: "w której możemy się odwoływać do poszczególnych elementów za pomocą indeksów.",
        answer: "P"
      }
    ]
  },
  {
    id: "q-087",
    category: "systemy",
    type: "truefalse",
    source: "CKE czerwiec 2016 · F2015",
    level: "PR",
    html: "<p>Suma <strong>200<sub>10</sub> + 10<sub>2</sub></strong> jest równa</p>",
    items: [
      { text: "210₁₀", answer: "F" },
      { text: "312₈", answer: "P" },
      { text: "CA₁₆", answer: "P" }
    ]
  },
  {
    id: "q-088",
    category: "algorytmy",
    type: "truefalse",
    source: "CKE czerwiec 2016 · F2015",
    level: "PR",
    html:
      "<p>Jednym z podstawowych pojęć w informatyce jest algorytm. Każdy algorytm powinien spełniać własność:</p>",
    items: [
      {
        text: "dowolnego porządku operacji, tzn. działania wykonywane w algorytmie można wykonać w dowolnej kolejności.",
        answer: "F"
      },
      {
        text: "skończonej liczby operacji, tzn. algorytm można zapisać w postaci skończonego ciągu instrukcji lub operacji.",
        answer: "P"
      },
      {
        text: "jednoznaczności operacji, tzn. algorytm może zawierać tylko takie operacje, których działanie jest jednoznacznie określone.",
        answer: "P"
      }
    ]
  },
  {
    id: "q-089",
    category: "multimedia",
    type: "truefalse",
    source: "CKE czerwiec 2016 · F2015",
    level: "PR",
    html: "<p>Grafika wektorowa</p>",
    items: [
      {
        text: "pozwala skalować obraz bez utraty jego jakości.",
        answer: "P"
      },
      {
        text: "używa figur geometrycznych do przechowywania informacji o obrazie.",
        answer: "P"
      },
      {
        text: "jest powszechnie stosowana do zapisu zdjęć w tabletach, aparatach fotograficznych i telefonach komórkowych.",
        answer: "F"
      }
    ]
  },
  {
    id: "q-090",
    category: "sieci",
    type: "truefalse",
    source: "CKE maj 2016 · F2015",
    level: "PR",
    html:
      "<p>Po wpisaniu w pasku adresu przeglądarki <code>http://81.219.47.83</code> otwiera się strona Centralnej Komisji Egzaminacyjnej, " +
      "ale po wpisaniu <code>http://cke.edu.pl</code> pojawia się błąd „Nie można odnaleźć podanej strony”. " +
      "Możliwe przyczyny tego stanu rzeczy to:</p>",
    items: [
      {
        text: "awaria serwera SMTP Centralnej Komisji Egzaminacyjnej,",
        answer: "F"
      },
      {
        text: "awaria serwera poczty użytkownika,",
        answer: "F"
      },
      {
        text: "awaria serwera DNS,",
        answer: "P"
      },
      {
        text: "brak prawidłowego klucza szyfrującego w przeglądarce.",
        answer: "F"
      }
    ]
  },
  {
    id: "q-091",
    category: "algorytmy",
    type: "truefalse",
    source: "CKE maj 2016 · F2015",
    level: "PR",
    html:
      "<p>Dana jest funkcja <em>f</em> określona wzorem rekurencyjnym</p>" +
      "<p class=\"question-math\">" +
      "f(1) = 4<br>" +
      "f(n + 1) = 1 / (1 − f(n)) &nbsp;&nbsp;dla <em>n</em> ≥ 1" +
      "</p>" +
      "<p>Wtedy:</p>",
    items: [
      { text: "f(8) = 1/3", answer: "F" },
      { text: "f(9) = 3/4", answer: "P" },
      { text: "f(10) = 4", answer: "P" },
      { text: "f(100) = −1/3", answer: "F" }
    ]
  },
  {
    id: "q-092",
    category: "systemy",
    type: "truefalse",
    source: "CKE maj 2016 · F2015",
    level: "PR",
    html: "<p>Dla dwóch liczb <strong>1111<sub>2</sub></strong> i <strong>101<sub>2</sub></strong> ich</p>",
    items: [
      { text: "suma jest równa 10110₂.", answer: "F" },
      { text: "różnica jest równa 1010₂.", answer: "P" },
      { text: "iloczyn jest mniejszy od 11000₂.", answer: "F" },
      { text: "iloraz jest większy od 10₂.", answer: "P" }
    ]
  },
  {
    id: "q-093",
    category: "oprogramowanie",
    type: "truefalse",
    source: "CKE maj 2016 · F2015",
    level: "PR",
    html: "<p>Oceń prawdziwość podanych zdań dotyczących systemów operacyjnych.</p>",
    items: [
      {
        text: "Jednym z zadań systemu operacyjnego jest przydział pamięci działającym programom.",
        answer: "P"
      },
      {
        text: "Na jednym dysku twardym mogą być zainstalowane dwa systemy operacyjne.",
        answer: "P"
      },
      {
        text: "System operacyjny musi być przechowywany w pamięci ROM.",
        answer: "F"
      },
      {
        text: "System operacyjny musi być przechowywany na twardym dysku.",
        answer: "F"
      }
    ]
  },
  {
    id: "q-094",
    category: "algorytmy",
    type: "truefalse",
    source: "CKE czerwiec 2015 · F2015",
    level: "PR",
    html: "<p>Algorytm Euklidesa</p>",
    items: [
      { text: "służy do obliczania potęgi aᵇ.", answer: "F" },
      {
        text: "służy do obliczania największego wspólnego dzielnika dwóch liczb.",
        answer: "P"
      },
      {
        text: "zastosowany do liczb a = 100, b = 10 da wynik 5.",
        answer: "F"
      },
      {
        text: "zastosowany do liczb a = 100, b = 8 da wynik 4.",
        answer: "P"
      }
    ]
  },
  {
    id: "q-095",
    category: "systemy",
    type: "truefalse",
    source: "CKE czerwiec 2015 · F2015",
    level: "PR",
    html: "<p>Liczba szesnastkowa <strong>FCA<sub>16</sub></strong> jest</p>",
    items: [
      { text: "mniejsza od liczby FFF₁₆.", answer: "P" },
      { text: "większa od liczby AAAA₁₆.", answer: "F" },
      { text: "mniejsza od liczby 1111₁₆.", answer: "P" },
      { text: "większa od liczby 9999₁₆.", answer: "F" }
    ]
  },
  {
    id: "q-096",
    category: "sql",
    type: "truefalse",
    source: "CKE czerwiec 2015 · F2015",
    level: "PR",
    html: "<p>Klucz obcy w tabeli bazy danych</p>",
    items: [
      { text: "pochodzi z innej tabeli.", answer: "P" },
      { text: "służy do łączenia tabeli z inną tabelą.", answer: "P" },
      { text: "musi być opisany za pomocą jednej kolumny.", answer: "F" },
      { text: "jednoznacznie identyfikuje wiersze tej tabeli.", answer: "F" }
    ]
  },
  {
    id: "q-097",
    category: "sieci",
    type: "truefalse",
    source: "CKE czerwiec 2015 · F2015",
    level: "PR",
    html: "<p>Adres IPv4</p>",
    items: [
      { text: "składa się z 48 bitów.", answer: "F" },
      { text: "jest unikatowy w skali świata.", answer: "F" },
      { text: "jest unikatowy w skali sieci lokalnej.", answer: "P" },
      { text: "300.200.256.1 jest poprawny.", answer: "F" }
    ]
  },
  {
    id: "q-098",
    category: "systemy",
    type: "truefalse",
    source: "CKE maj 2015 · F2015",
    level: "PR",
    html:
      "<p>Po wymnożeniu dwóch liczb <strong>1032<sub>4</sub></strong> oraz <strong>131<sub>4</sub></strong> zapisanych w systemie czwórkowym otrzymamy</p>",
    items: [
      { text: "78₁₀", answer: "F" },
      { text: "8D6₁₆", answer: "P" },
      { text: "4326₈", answer: "P" },
      { text: "10011010110₂", answer: "F" }
    ]
  },
  {
    id: "q-099",
    category: "multimedia",
    type: "truefalse",
    source: "CKE maj 2015 · F2015",
    level: "PR",
    html: "<p>Kompresja stratna w grafice</p>",
    items: [
      {
        text: "ma związek z plikami graficznymi w formacie BMP.",
        answer: "F"
      },
      {
        text: "ma związek z plikami graficznymi w formacie JPG.",
        answer: "P"
      },
      {
        text: "jest metodą zmniejszania rozmiaru pliku graficznego bez utraty szczegółów w obrazie.",
        answer: "F"
      },
      {
        text: "wykorzystuje algorytm szyfrowania RSA.",
        answer: "F"
      }
    ]
  },
  {
    id: "q-100",
    category: "sql",
    type: "truefalse",
    source: "CKE maj 2015 · F2015",
    level: "PR",
    html: "<p>Filtrowanie tabeli w bazie danych</p>",
    items: [
      {
        text: "polega na wyborze wierszy spełniających określone kryterium.",
        answer: "P"
      },
      {
        text: "polega na wyborze niektórych kolumn z tabeli.",
        answer: "F"
      },
      {
        text: "zmienia jej zawartość.",
        answer: "F"
      },
      {
        text: "wymaga podania warunku dla jednej lub kilku kolumn tabeli.",
        answer: "P"
      }
    ]
  },
  {
    id: "q-101",
    category: "oprogramowanie",
    type: "truefalse",
    source: "CKE maj 2015 · F2015",
    level: "PR",
    html:
      "<p>Na licencji <strong>ADWARE</strong> jest rozpowszechniane oprogramowanie, które</p>",
    items: [
      {
        text: "jest rozpowszechniane za darmo, ale zawiera funkcje wyświetlające reklamy.",
        answer: "P"
      },
      { text: "ma otwarty kod źródłowy.", answer: "F" },
      { text: "jest opłacane przez użytkownika.", answer: "F" },
      {
        text: "może być używane tylko przez z góry ustalony czas.",
        answer: "F"
      }
    ]
  },
  {
    id: "q-102",
    category: "arkusz",
    type: "truefalse",
    source: "CKE maj 2015 · F2015",
    level: "PR",
    html:
      "<p>W komórkach arkusza kalkulacyjnego umieszczone zostały poniższe wartości i formuły:</p>" +
      "<div class=\"question-data-table-wrap\"><table class=\"question-data-table\">" +
      "<thead><tr><th></th><th>A</th><th>B</th><th>C</th></tr></thead>" +
      "<tbody>" +
      "<tr><td>1</td><td>1</td><td>2</td><td>3</td></tr>" +
      "<tr><td>2</td><td>2</td><td>=A$2*B1</td><td></td></tr>" +
      "<tr><td>3</td><td>3</td><td></td><td></td></tr>" +
      "<tr><td>4</td><td>4</td><td></td><td></td></tr>" +
      "</tbody></table></div>" +
      "<p>Następnie zawartość komórki B2 została skopiowana do komórki C2 oraz do komórek B3, B4, …, B10. " +
      "Ustal, które z poniższych stwierdzeń są poprawne.</p>",
    items: [
      {
        text: "W komórce C2 umieszczona zostanie formuła =A$2*C1.",
        answer: "F"
      },
      {
        text: "W komórce B3 umieszczona zostanie formuła =A$2*B2.",
        answer: "P"
      },
      {
        text: "Wartość w komórce B10 wyniesie 1024.",
        answer: "P"
      },
      {
        text: "Wartość w komórce C2 wyniesie 4.",
        answer: "F"
      }
    ]
  },
  {
    id: "q-103",
    category: "algorytmy",
    type: "truefalse",
    source: "CKE maj 2015 · F2007",
    level: "PR",
    html:
      "<p>Dla danej tablicy <strong>Tab</strong>:</p>" +
      "<div class=\"question-data-table-wrap\"><table class=\"question-data-table\">" +
      "<thead><tr><th></th><th>k=1</th><th>k=2</th><th>k=3</th><th>k=4</th></tr></thead>" +
      "<tbody>" +
      "<tr><td>w=1</td><td>1</td><td>1</td><td>4</td><td>4</td></tr>" +
      "<tr><td>w=2</td><td>2</td><td>2</td><td>3</td><td>3</td></tr>" +
      "<tr><td>w=3</td><td>3</td><td>3</td><td>2</td><td>2</td></tr>" +
      "<tr><td>w=4</td><td>4</td><td>4</td><td>1</td><td>1</td></tr>" +
      "</tbody></table></div>" +
      "<p>wykonano poniższy algorytm:</p>" +
      "<pre class=\"question-code\">k ← 1; s ← 0; w ← 0;\npowtarzaj\n  w ← w + 1;\n  s ← s + Tab[w, k];\naż w = 4;\nwypisz s, w, k;</pre>" +
      "<p>W wyniku zostaną wypisane liczby:</p>",
    items: [
      { text: "10, 4, 1", answer: "P" },
      { text: "10, 1, 1", answer: "F" },
      { text: "40, 4, 4", answer: "F" },
      { text: "40, 4, 1", answer: "F" }
    ]
  },
  {
    id: "q-104",
    category: "algorytmy",
    type: "truefalse",
    source: "CKE maj 2015 · F2007",
    level: "PR",
    html:
      "<p>Poniżej zapisano wyrażenia w odwrotnej notacji polskiej (ONP). Wartościami tych wyrażeń są:</p>",
    items: [
      { text: "Wyrażenie ONP „7 3 − 2 /” ma wartość 2.", answer: "P" },
      { text: "Wyrażenie ONP „4 3 − 1 3 + *” ma wartość 8.", answer: "F" },
      { text: "Wyrażenie ONP „3 5 1 − *” ma wartość 12.", answer: "P" },
      { text: "Wyrażenie ONP „8 2 + 2 /” ma wartość 10.", answer: "F" }
    ]
  },
  {
    id: "q-105",
    category: "sieci",
    type: "truefalse",
    source: "CKE maj 2015 · F2007",
    level: "PR",
    html:
      "<p>Pewna podsieć ma maskę: <strong>255.255.255.248</strong>. Ile maksymalnie komputerów można podłączyć do danej podsieci? " +
      "Uwzględnij, że 2 z możliwych adresów w sieci to adres sieci oraz adres rozgłoszeniowy.</p>",
    items: [
      { text: "10", answer: "F" },
      { text: "8", answer: "F" },
      { text: "6", answer: "P" },
      { text: "4", answer: "F" }
    ]
  },
  {
    id: "q-106",
    category: "algorytmy",
    type: "truefalse",
    source: "CKE maj 2015 · F2007",
    level: "PR",
    html:
      "<p>W celu posortowania rosnąco ciągu liczb <strong>[2, 1, 0, 3]</strong> wykonano porównania i ewentualnie zamieniono liczby w parach otoczonych owalami. Jakie to sortowanie?</p>" +
      "<pre class=\"question-code\">(2 1) 0 3\n1 (2 0) 3\n1 0 (2 3)\n\n(1 0) 2 3\n0 (1 2) 3\n\n(0 1) 2 3\n\n0 1 2 3</pre>",
    items: [
      { text: "przez wstawianie", answer: "F" },
      { text: "bąbelkowe", answer: "P" },
      { text: "kubełkowe", answer: "F" },
      { text: "szybkie", answer: "F" }
    ]
  },
  {
    id: "q-107",
    category: "oprogramowanie",
    type: "truefalse",
    source: "CKE maj 2015 · F2007",
    level: "PR",
    html:
      "<p>Program rozpowszechniany za darmo, z którego możemy korzystać w pełni przez nieograniczony czas, może być na licencji</p>",
    items: [
      { text: "shareware.", answer: "F" },
      { text: "freeware.", answer: "P" },
      { text: "adware.", answer: "P" },
      { text: "GNU GPL.", answer: "P" }
    ]
  },
  {
    id: "q-108",
    category: "sql",
    type: "truefalse",
    source: "CKE maj 2015 · F2007",
    level: "PR",
    html:
      "<p>Dana jest tabela <strong>Lista</strong>:</p>" +
      "<div class=\"question-data-table-wrap\"><table class=\"question-data-table\">" +
      "<thead><tr><th>Lp.</th><th>Imie</th><th>Nazwisko</th><th>Miasto</th><th>DataUrodzenia</th></tr></thead>" +
      "<tbody>" +
      "<tr><td>1</td><td>Marian</td><td>Kubok</td><td>Gdynia</td><td>1980-12-07</td></tr>" +
      "<tr><td>2</td><td>Michalina</td><td>Przybysz</td><td>Kraków</td><td>1995-06-06</td></tr>" +
      "<tr><td>3</td><td>Marcelina</td><td>Marchewka</td><td>Mikołajki</td><td>1988-02-09</td></tr>" +
      "<tr><td>4</td><td>Zygmunt</td><td>Piotrowski</td><td>Katowice</td><td>1999-04-15</td></tr>" +
      "</tbody></table></div>" +
      "<p>Zastosowanie dla powyższej tabeli <strong>Lista</strong> zapytania</p>" +
      "<pre class=\"question-code\">SELECT Imie, Nazwisko\nFROM Lista\nWHERE Year(DataUrodzenia)&gt;1990\nORDER BY Nazwisko;</pre>" +
      "<p>spowoduje wypisanie:</p>",
    items: [
      {
        text: "Zygmunt Piotrowski, potem Michalina Przybysz.",
        answer: "P"
      },
      {
        text: "Michalina Przybysz, potem Zygmunt Piotrowski.",
        answer: "F"
      },
      {
        text: "Marcelina Marchewka, potem Marian Kubok.",
        answer: "F"
      },
      {
        text: "Marian Kubok, potem Marcelina Marchewka.",
        answer: "F"
      }
    ]
  },
  {
    id: "q-109",
    category: "systemy",
    type: "truefalse",
    source: "Zbiór zadań 2015",
    level: "PR",
    html:
      "<p>Oceń prawdziwość podanych zdań. Zaznacz <strong>P</strong>, jeśli zdanie jest prawdziwe, albo <strong>F</strong> - jeśli jest fałszywe.</p>" +
      "<p>Liczba <strong>100110010<sub>2</sub></strong></p>",
    items: [
      {
        text: "jest dwa razy większa od liczby 10011001₂.",
        answer: "P"
      },
      {
        text: "jest dwa razy mniejsza od liczby 1001100100₂.",
        answer: "P"
      },
      {
        text: "jest większa niż 512₁₀.",
        answer: "F"
      },
      {
        text: "jest mniejsza niż 472₈.",
        answer: "P"
      }
    ]
  },
  {
    id: "q-110",
    category: "oprogramowanie",
    type: "truefalse",
    source: "Zbiór zadań 2015",
    level: "PR",
    html:
      "<p>Oceń prawdziwość podanych zdań. Zaznacz <strong>P</strong>, jeśli zdanie jest prawdziwe, albo <strong>F</strong> - jeśli jest fałszywe.</p>" +
      "<p>Wskaż elementy, które są niezbędne do uruchomienia komputera i załadowania systemu operacyjnego.</p>",
    items: [
      { text: "procesor", answer: "P" },
      { text: "twardy dysk", answer: "F" },
      { text: "pamięć operacyjna", answer: "P" },
      { text: "monitor", answer: "F" }
    ]
  },
  {
    id: "q-111",
    category: "oprogramowanie",
    type: "truefalse",
    source: "Zbiór zadań 2015",
    level: "PR",
    html:
      "<p>Oceń prawdziwość podanych zdań. Zaznacz <strong>P</strong>, jeśli zdanie jest prawdziwe, albo <strong>F</strong> - jeśli jest fałszywe.</p>",
    items: [
      {
        text: "System operacyjny przydziela zadaniom czas pracy procesora.",
        answer: "P"
      },
      {
        text: "System operacyjny używa zawsze tego samego systemu plików dla wszystkich urządzeń.",
        answer: "F"
      },
      {
        text: "W skład systemu operacyjnego wchodzi zawsze graficzny interfejs użytkownika.",
        answer: "F"
      },
      {
        text: "System operacyjny przydziela uruchamianym aplikacjom pamięć operacyjną.",
        answer: "P"
      }
    ]
  },
  {
    id: "q-112",
    category: "oprogramowanie",
    type: "truefalse",
    source: "Zbiór zadań 2015",
    level: "PR",
    html:
      "<p>Oceń prawdziwość podanych zdań. Zaznacz <strong>P</strong>, jeśli zdanie jest prawdziwe, albo <strong>F</strong> - jeśli jest fałszywe.</p>" +
      "<p>System plików <strong>NTFS</strong></p>",
    items: [
      {
        text: "nie jest obsługiwany przez system Linux.",
        answer: "F"
      },
      {
        text: "przechowuje informację o rozmiarze, dacie utworzenia i modyfikacji pliku oraz o ścieżce dostępu do pliku.",
        answer: "P"
      },
      {
        text: "uniemożliwia zapisanie pojedynczego pliku o rozmiarze powyżej 4 GB.",
        answer: "F"
      },
      {
        text: "umożliwia administratorowi nadawanie pojedynczym użytkownikom lub grupom użytkowników praw dostępu do plików i katalogów.",
        answer: "P"
      }
    ]
  },
  {
    id: "q-113",
    category: "sieci",
    type: "truefalse",
    source: "Zbiór zadań 2015",
    level: "PR",
    html:
      "<p>Oceń prawdziwość podanych zdań. Zaznacz <strong>P</strong>, jeśli zdanie jest prawdziwe, albo <strong>F</strong> - jeśli jest fałszywe.</p>" +
      "<p>W pewnej firmie znajdują się m.in. komputery o następujących adresach IP:</p>" +
      "<ul>" +
      "<li>komputer A: 10.20.30.40 / maska 255.255.0.0;</li>" +
      "<li>komputer B: 10.0.0.10 / maska 255.255.255.0;</li>" +
      "<li>komputer C: 1.2.3.4 / maska 255.255.255.0;</li>" +
      "<li>komputer D: 1.2.3.250 / maska 255.255.255.0.</li>" +
      "</ul>",
    items: [
      {
        text: "Komputer A może być widoczny w sieci Internet pod innym adresem IP.",
        answer: "P"
      },
      {
        text: "Tylko dwa z wymienionych komputerów mogą mieć dostęp do sieci Internet.",
        answer: "F"
      },
      {
        text: "Komputery A i B znajdują się w jednej podsieci.",
        answer: "F"
      },
      {
        text: "Komputery C i D muszą znajdować się w jednym budynku.",
        answer: "F"
      }
    ]
  },
  {
    id: "q-114",
    category: "oprogramowanie",
    type: "truefalse",
    source: "Zbiór zadań 2015",
    level: "PR",
    html:
      "<p>Chmura obliczeniowa jest usługą polegającą na zdalnym udostępnieniu mocy obliczeniowej urządzeń IT, oferowaną przez zewnętrznego dostawcę. " +
      "Oceń prawdziwość podanych zdań. Zaznacz <strong>P</strong>, jeśli zdanie jest prawdziwe, albo <strong>F</strong> - jeśli jest fałszywe.</p>",
    items: [
      {
        text: "Z aplikacji i danych umieszczonych w chmurze można korzystać z dowolnej lokalizacji i dowolnego sprzętu IT umożliwiającego połączenie internetowe.",
        answer: "P"
      },
      {
        text: "Użytkownik nie jest zobowiązany do zakupu licencji na oprogramowanie używane w chmurze i udostępniane przez dostawcę, płaci jedynie za jego użycie (każdorazowo lub w formie abonamentu).",
        answer: "P"
      },
      {
        text: "Użytkownik może zdalnie instalować w przydzielonych zasobach chmury dowolne aplikacje i korzystać z nich tak jak na lokalnym komputerze.",
        answer: "F"
      },
      {
        text: "Pula zasobów użytkownika (w tym: procesory, pamięć RAM, przestrzeń dyskowa) jest elastycznie skalowana w zależności od jego potrzeb i ograniczona tylko możliwościami dostawcy.",
        answer: "P"
      }
    ]
  },
  {
    id: "q-115",
    category: "bezpieczenstwo",
    type: "truefalse",
    source: "Zbiór zadań 2015",
    level: "PR",
    html:
      "<p><strong>HTTP Cookie</strong> jest niewielką porcją informacji wysyłaną przez witrynę internetową do przeglądarki klienta i zapisywaną w jej ustawieniach. " +
      "Oceń prawdziwość podanych zdań. Zaznacz <strong>P</strong>, jeśli zdanie jest prawdziwe, albo <strong>F</strong> - jeśli jest fałszywe.</p>",
    items: [
      {
        text: "Cookie zawiera polecenia, które konfigurują ustawienia przeglądarki klienta.",
        answer: "F"
      },
      {
        text: "Cookie umożliwia serwisowi sprawdzenie, czy klient już go odwiedzał w przeszłości, oraz zapamiętanie upodobań klienta.",
        answer: "P"
      },
      {
        text: "Cookie zapisane przez serwis z domeny cwaniak.org może być odczytane przez serwis z domeny spryciarz.org.",
        answer: "F"
      },
      {
        text: "Zablokowanie obsługi cookie w przeglądarce może spowodować utrudnienia dla użytkownika dokonującego zakupów w sklepie internetowym.",
        answer: "P"
      }
    ]
  },
  {
    id: "q-116",
    category: "bezpieczenstwo",
    type: "truefalse",
    source: "Zbiór zadań 2015",
    level: "PR",
    html:
      "<p>Oceń prawdziwość podanych zdań. Zaznacz <strong>P</strong>, jeśli zdanie jest prawdziwe, albo <strong>F</strong> - jeśli jest fałszywe.</p>" +
      "<p>Zgodnie z prawem w Internecie można opublikować zdjęcie osoby:</p>",
    items: [
      {
        text: "po uzyskaniu od niej zezwolenia.",
        answer: "P"
      },
      {
        text: "gdy jest to osoba powszechnie znana i zdjęcie zostało wykonane podczas pełnienia przez nią funkcji publicznych, w szczególności politycznych, społecznych, zawodowych.",
        answer: "P"
      },
      {
        text: "gdy osoba ta jest naszym bliskim znajomym.",
        answer: "F"
      },
      {
        text: "gdy stanowi ona jedynie szczegół całości takiej jak: zgromadzenie, krajobraz, publiczna impreza.",
        answer: "P"
      }
    ]
  },
  {
    id: "q-117",
    category: "arkusz",
    type: "choice",
    source: "Zadanie przykładowe",
    html:
      "<p>Dokończ zdanie. Zaznacz właściwą odpowiedź spośród podanych.</p>" +
      "<p><strong>Narzędzie arkusza kalkulacyjnego pozwalające szybko podsumować, pogrupować i przekształcić duży zbiór danych bez zmiany danych źródłowych to</strong></p>",
    options: [
      { id: "A", text: "filtr zaawansowany" },
      { id: "B", text: "tabela przestawna" },
      { id: "C", text: "formatowanie warunkowe" },
      { id: "D", text: "walidacja danych" }
    ],
    answer: "B"
  },
  {
    id: "q-118",
    category: "arkusz",
    type: "choice",
    source: "Zadanie przykładowe",
    html:
      "<p>Dokończ zdanie. Zaznacz właściwą odpowiedź spośród podanych.</p>" +
      "<p><strong>Funkcja arkusza kalkulacyjnego, która zlicza liczbę komórek w zakresie spełniających więcej niż jeden warunek, to</strong></p>",
    options: [
      { id: "A", text: "LICZ.JEŻELI()" },
      { id: "B", text: "LICZ.WARUNKI()" },
      { id: "C", text: "SUMA.JEŻELI()" },
      { id: "D", text: "ILE.LICZB()" }
    ],
    answer: "B"
  },
  {
    id: "q-119",
    category: "sql",
    type: "choice",
    source: "Zadanie przykładowe",
    html:
      "<p>Dokończ zdanie. Zaznacz właściwą odpowiedź spośród podanych.</p>" +
      "<p><strong>Klauzula języka SQL, która pozwala filtrować grupy wierszy utworzone przez GROUP BY na podstawie wyniku funkcji agregującej, to</strong></p>",
    options: [
      { id: "A", text: "WHERE" },
      { id: "B", text: "ORDER BY" },
      { id: "C", text: "HAVING" },
      { id: "D", text: "DISTINCT" }
    ],
    answer: "C"
  },
  {
    id: "q-120",
    category: "sieci",
    level: "PP",
    type: "choice",
    source: "CKE czerwiec 2020 \u00B7 F2007",
    html:
      "<p>Rozróżniamy trzy podstawowe topologie połączeń komputerów w sieci:</p>",
    options: [
      { id: "A", text: "magistrala, pierścień i gwiazda." },
      { id: "B", text: "LAN, WAN, MAN." },
      { id: "C", text: "„każdy z każdym”, „klient – serwer”, „serwer – klient”." },
      { id: "D", text: "ARPANET, BITNET, SIPRNet." }
    ],
    answer: "A"
  },
  {
    id: "q-121",
    category: "multimedia",
    level: "PP",
    type: "choice",
    source: "CKE czerwiec 2020 \u00B7 F2007",
    html:
      "<p>Jednostka gęstości „dpi” określa</p>",
    options: [
      { id: "A", text: "liczbę bitów na cal." },
      { id: "B", text: "liczbę kropek (punktów) na cal wydruku." },
      { id: "C", text: "liczbę znaków alfanumerycznych na cal." },
      { id: "D", text: "liczbę bajtów na cal." }
    ],
    answer: "B"
  },
  {
    id: "q-122",
    category: "systemy",
    level: "PP",
    type: "choice",
    source: "CKE czerwiec 2020 \u00B7 F2007",
    html:
      "<p>Liczba binarna 111010101 to w systemie dziesiętnym</p>",
    options: [
      { id: "A", text: "481." },
      { id: "B", text: "467." },
      { id: "C", text: "469." },
      { id: "D", text: "471." }
    ],
    answer: "C"
  },
  {
    id: "q-123",
    category: "arkusz",
    level: "PP",
    type: "choice",
    source: "CKE czerwiec 2020 \u00B7 F2007",
    html:
      "<p>Jeżeli w arkuszu kalkulacyjnym komórka A4 zawiera liczbę 10, a komórka A5 – liczbę 12, to wpisanie formuły <code>=JEŻELI(A4&lt;10; A4/2; JEŻELI(A5&lt;&gt;12; 2; MOD(A4;A5)))</code> w komórce A6 poskutkuje wyświetleniem liczby</p>",
    options: [
      { id: "A", text: "2." },
      { id: "B", text: "5." },
      { id: "C", text: "10." },
      { id: "D", text: "8." }
    ],
    answer: "C"
  },
  {
    id: "q-124",
    category: "systemy",
    level: "PP",
    type: "choice",
    source: "CKE czerwiec 2020 \u00B7 F2007",
    html:
      "<p>Ploter to</p>",
    options: [
      { id: "A", text: "urządzenie elektroniczne, pozwalające nakładać na siebie obraz cyfrowy i analogowy." },
      { id: "B", text: "urządzenie wskazujące, służące przede wszystkim do rysowania elementów graficznych na komputerze." },
      { id: "C", text: "urządzenie umożliwiające druk 3D." },
      { id: "D", text: "komputerowe urządzenie peryferyjne, służące do pracy z dużymi płaskimi powierzchniami, mogące nanosić obrazy, wycinać wzory, grawerować." }
    ],
    answer: "D"
  },
  {
    id: "q-125",
    category: "algorytmy",
    level: "PP",
    type: "choice",
    source: "CKE czerwiec 2020 \u00B7 F2007",
    html:
      "<p>Dla tablicy <em>A</em> [1..<em>n</em>] algorytm:</p><pre class=\"question-code\">dla j=1,2, ... , n-1:\n  dla i=1,2, ... , n-1:\n    jeśli A[i] > A[i+1] to A[i] \u2194 A[i+1]</pre><p>(gdzie \u2194 oznacza zamianę wartości elementów)</p><p>opisuje algorytm sortowania</p>",
    options: [
      { id: "A", text: "szybkiego." },
      { id: "B", text: "przez wybór." },
      { id: "C", text: "przez wstawianie." },
      { id: "D", text: "bąbelkowego." }
    ],
    answer: "D"
  },
  {
    id: "q-126",
    category: "multimedia",
    level: "PP",
    type: "choice",
    source: "CKE maj 2019 \u00B7 F2007",
    html:
      "<p>Formatem grafiki wektorowej jest</p>",
    options: [
      { id: "A", text: "PNG" },
      { id: "B", text: "SVG" },
      { id: "C", text: "TIFF" },
      { id: "D", text: "GIF" }
    ],
    answer: "B"
  },
  {
    id: "q-127",
    category: "systemy",
    level: "PP",
    type: "choice",
    source: "CKE maj 2019 \u00B7 F2007",
    html:
      "<p>Liczba 4736<sub>9</sub> zapisana w systemie dziewiątkowym ma w systemie trójkowym postać</p>",
    options: [
      { id: "A", text: "21212011\u2083" },
      { id: "B", text: "11211020\u2083" },
      { id: "C", text: "10201221\u2083" },
      { id: "D", text: "112020\u2083" }
    ],
    answer: "B"
  },
  {
    id: "q-128",
    category: "oprogramowanie",
    level: "PP",
    type: "choice",
    source: "CKE maj 2019 \u00B7 F2007",
    html:
      "<p>Creative Commons to</p>",
    options: [
      { id: "A", text: "licencja umożliwiająca autorowi dzieła określenie praw do korzystania z utworu." },
      { id: "B", text: "format zapisu plików wideo umożliwiający zapis z wysoką rozdzielczością." },
      { id: "C", text: "technologia tworzenia zaawansowanej grafiki komputerowej." },
      { id: "D", text: "gra edukacyjna dla dzieci rozwijająca kreatywne myślenie." }
    ],
    answer: "A"
  },
  {
    id: "q-129",
    category: "arkusz",
    level: "PP",
    type: "choice",
    source: "CKE maj 2019 \u00B7 F2007",
    html:
      "<p>Komórki od A1 do C51 arkusza kalkulacyjnego zawierają zestawienie danych pracowników, ich wykształcenie i pensję miesięczną brutto. Wskaż formułę, która pozwoli obliczyć sumę pensji brutto pracowników mających wyższe wykształcenie.</p>\n<div class=\"question-data-table-wrap\">\n<table class=\"question-data-table\">\n<thead><tr><th></th><th>A</th><th>B</th><th>C</th></tr></thead>\n<tbody>\n<tr><th>1</th><td>Pracownik</td><td>Wykształcenie</td><td>Pensja brutto</td></tr>\n<tr><th>2</th><td>Kowalski Jan</td><td>wyższe</td><td>5 250,00 zł</td></tr>\n<tr><th>3</th><td>Król Maciej</td><td>średnie</td><td>2 800,00 zł</td></tr>\n<tr><th>4</th><td>Adamus Anna</td><td>wyższe</td><td>4 260,00 zł</td></tr>\n<tr><th>5</th><td>Nowak Barbara</td><td>podstawowe</td><td>2 200,00 zł</td></tr>\n<tr><th>6</th><td>Gerber Jadwiga</td><td>podstawowe</td><td>2 930,00 zł</td></tr>\n<tr><th>7</th><td>Wąs Maria</td><td>średnie</td><td>3 600,00 zł</td></tr>\n<tr><th>8</th><td>Berger Katarzyna</td><td>podstawowe</td><td>2 950,00 zł</td></tr>\n<tr><th>9</th><td>Zaręba Ewa</td><td>średnie</td><td>3 500,00 zł</td></tr>\n<tr><th>10</th><td>Wirek Piotr</td><td>wyższe</td><td>5 200,00 zł</td></tr>\n<tr><th>11</th><td>Wasowski Zenon</td><td>wyższe</td><td>4 900,00 zł</td></tr>\n</tbody>\n</table>\n</div>",
    options: [
      { id: "A", text: "= SUMA((C2:C51);JEŻELI(B2:B51)=\"wyższe\")" },
      { id: "B", text: "= JEŻELI(B2:B51=\"wyższe\";SUMA(C2:C51))" },
      { id: "C", text: "= JEŻELI.SUMA(C2:C51;\"wyższe\";B2:B51)" },
      { id: "D", text: "= SUMA.JEŻELI(B2:B51;\"wyższe\";C2:C51)" }
    ],
    answer: "D"
  },
  {
    id: "q-130",
    category: "multimedia",
    level: "PP",
    type: "choice",
    source: "CKE maj 2018 \u00B7 F2007",
    html:
      "<p>Format, w którym zapisywana jest grafika rastrowa, to</p>",
    options: [
      { id: "A", text: "wmf" },
      { id: "B", text: "avi" },
      { id: "C", text: "png" },
      { id: "D", text: "mp4" }
    ],
    answer: "C"
  },
  {
    id: "q-131",
    category: "multimedia",
    level: "PP",
    type: "choice",
    source: "CKE maj 2018 \u00B7 F2007",
    html:
      "<p>W pliku graficznym zapisano bez użycia kompresji obrazek o rozmiarach 1280 na 720 pikseli z użyciem 24 bitów na kolor. Ten plik zajmuje na dysku</p>",
    options: [
      { id: "A", text: "921 600 bitów." },
      { id: "B", text: "2 764 800 bajtów." },
      { id: "C", text: "176 947 kilobajtów." },
      { id: "D", text: "24 megabajty." }
    ],
    answer: "B"
  },
  {
    id: "q-132",
    category: "systemy",
    level: "PP",
    type: "choice",
    source: "CKE maj 2018 \u00B7 F2007",
    html:
      "<p class=\"question-math\">10110<sub>2</sub> + 111100<sub>2</sub> jest równe</p>",
    options: [
      { id: "A", text: "111110\u2082" },
      { id: "B", text: "84\u2081\u2080" },
      { id: "C", text: "1010010\u2082" },
      { id: "D", text: "124\u2088" }
    ],
    answer: "C"
  },
  {
    id: "q-133",
    category: "sieci",
    level: "PP",
    type: "choice",
    source: "CKE maj 2018 \u00B7 F2007",
    html:
      "<p>Poniżej zapisano adresy IPv4 dla komputerów w sieci lokalnej w systemie dziesiętnym w punktach A, B i D oraz w systemie binarnym w punkcie C. Nieprawidłowym adresem IP jest</p>",
    options: [
      { id: "A", text: "168.255.255.360" },
      { id: "B", text: "1.0.0.1" },
      { id: "C", text: "11000000.10101000.00000000.00000011" },
      { id: "D", text: "13.13.13.13" }
    ],
    answer: "A"
  },
  {
    id: "q-134",
    category: "arkusz",
    level: "PP",
    type: "choice",
    source: "CKE maj 2018 \u00B7 F2007",
    html:
      "<p>W komórce B2 wpisano formułę taką jak poniżej.</p>\n<div class=\"question-data-table-wrap\">\n<table class=\"question-data-table\">\n<thead><tr><th></th><th>A</th><th>B</th></tr></thead>\n<tbody>\n<tr><th>1</th><td>średnia ocen</td><td>nagroda</td></tr>\n<tr><th>2</th><td>4,5</td><td>=JEŻELI(A2>5;\"tablet\";JEŻELI(A2>4,5;\"słuchawki\";JEŻELI(A2>4;\"książka\";\"brak nagrody\")))</td></tr>\n</tbody>\n</table>\n</div>\n<p>Wartość formuły w komórce B2 to</p>",
    options: [
      { id: "A", text: "tablet." },
      { id: "B", text: "słuchawki." },
      { id: "C", text: "książka." },
      { id: "D", text: "brak nagrody." }
    ],
    answer: "C"
  },
  {
    id: "q-135",
    category: "sieci",
    level: "PP",
    type: "choice",
    source: "CKE maj 2017 \u00B7 F2007",
    html:
      "<p>Adres IP 196.168.1.5 w systemie dwójkowym ma postać:</p>",
    options: [
      { id: "A", text: "11000100.10101000.00000001.00000101" },
      { id: "B", text: "11000100.10101000.00000011.00000101" },
      { id: "C", text: "11000100.10101000.10000000.10100000" },
      { id: "D", text: "11000100.10101000.00000001.10100000" }
    ],
    answer: "A"
  },
  {
    id: "q-136",
    category: "oprogramowanie",
    level: "PP",
    type: "choice",
    source: "CKE maj 2017 \u00B7 F2007",
    html:
      "<p>Wskaż licencję, która pozwala na bezpłatne wykorzystanie kodu źródłowego programu w dowolnym celu niekomercyjnym.</p>",
    options: [
      { id: "A", text: "Freeware" },
      { id: "B", text: "Shareware" },
      { id: "C", text: "GPL" },
      { id: "D", text: "MOLP" }
    ],
    answer: "C"
  },
  {
    id: "q-137",
    category: "oprogramowanie",
    level: "PP",
    type: "choice",
    source: "CKE maj 2017 \u00B7 F2007",
    html:
      "<p>Językiem interpretowanym przez przeglądarki internetowe jest:</p>",
    options: [
      { id: "A", text: "PHP." },
      { id: "B", text: "Javascript." },
      { id: "C", text: "Python." },
      { id: "D", text: "C++." }
    ],
    answer: "B"
  },
  {
    id: "q-138",
    category: "bezpieczenstwo",
    level: "PP",
    type: "choice",
    source: "CKE maj 2017 \u00B7 F2007",
    html:
      "<p>Zagrożeniem dla bezpieczeństwa danych zapisanych na dysku twardym komputera jest:</p>",
    options: [
      { id: "A", text: "korzystanie z aktualizacji systemu operacyjnego dostępnych w internecie." },
      { id: "B", text: "czytanie i właściwie reagowanie na komunikaty systemu operacyjnego." },
      { id: "C", text: "korzystanie z komunikatorów internetowych." },
      { id: "D", text: "otwieranie wszystkich załączników do otrzymywanych e-mailów." }
    ],
    answer: "D"
  },
  {
    id: "q-139",
    category: "sieci",
    level: "PP",
    type: "fill",
    source: "CKE maj 2017 \u00B7 F2007",
    html:
      "<p>Uzupełnij tabelę. Spośród podanych protokołów (POP3, HTTP, SSH, FTP) wybierz zapewniające poprawne działanie wymienionych usług i odpowiednio je przyporządkuj.</p>\n<div class=\"question-data-table-wrap\">\n<table class=\"question-data-table\">\n<thead><tr><th>Usługi</th><th>Protokoły</th></tr></thead>\n<tbody>\n<tr><td>przeglądanie stron www</td><td>{{select}}</td></tr>\n<tr><td>odbiór poczty elektronicznej</td><td>{{select}}</td></tr>\n<tr><td>transfer plików</td><td>{{select}}</td></tr>\n<tr><td>szyfrowane połączenie zdalne</td><td>{{select}}</td></tr>\n</tbody>\n</table>\n</div>",
    answers: ["http", "pop3", "ftp", "ssh"],
    selectOptions: ["POP3", "HTTP", "SSH", "FTP"]
  },
  {
    id: "q-140",
    category: "sieci",
    level: "PP",
    type: "choice",
    source: "CKE maj 2016 \u00B7 F2007",
    html:
      "<p>Protokół DHCP</p>",
    options: [
      { id: "A", text: "odpowiedzialny jest za przydzielanie adresów IP." },
      { id: "B", text: "jest protokołem przesyłania dokumentów hipertekstowych." },
      { id: "C", text: "jest protokołem terminalu sieciowego zapewniający szyfrowanie połączenia." },
      { id: "D", text: "odpowiedzialny jest za tłumaczenie adresów domenowych na adresy IP i odwrotnie." }
    ],
    answer: "A"
  },
  {
    id: "q-141",
    category: "systemy",
    level: "PP",
    type: "choice",
    source: "CKE maj 2016 \u00B7 F2007",
    html:
      "<p>Unicode to</p>",
    options: [
      { id: "A", text: "sposób kodowania znaków." },
      { id: "B", text: "protokół komunikacyjny." },
      { id: "C", text: "sposób szyfrowania danych." },
      { id: "D", text: "protokół standardowego wejścia/wyjścia." }
    ],
    answer: "A"
  },
  {
    id: "q-142",
    category: "oprogramowanie",
    level: "PP",
    type: "choice",
    source: "CKE maj 2016 \u00B7 F2007",
    html:
      "<p>Programowanie polegające na określeniu i wykorzystaniu klas nazywamy programowaniem</p>",
    options: [
      { id: "A", text: "liniowym." },
      { id: "B", text: "obiektowym." },
      { id: "C", text: "strukturalnym." },
      { id: "D", text: "mikroprocesorów." }
    ],
    answer: "B"
  },
  {
    id: "q-143",
    category: "oprogramowanie",
    level: "PP",
    type: "choice",
    source: "CKE maj 2016 \u00B7 F2007",
    html:
      "<p>Ciąg deklaracji i instrukcji zapisany w języku programowania wysokiego poziomu nazywamy kodem</p>",
    options: [
      { id: "A", text: "wynikowym." },
      { id: "B", text: "pośrednim." },
      { id: "C", text: "źródłowym." },
      { id: "D", text: "maszynowym." }
    ],
    answer: "C"
  },
  {
    id: "q-144",
    category: "systemy",
    level: "PP",
    type: "choice",
    source: "CKE maj 2016 \u00B7 F2007",
    html:
      "<p class=\"question-math\">Ile jest równe Y, aby X+Y=60<sub>(10)</sub>, jeżeli X=10110<sub>(2)</sub>?</p>",
    options: [
      { id: "A", text: "100011\u2082" },
      { id: "B", text: "100110\u2082" },
      { id: "C", text: "100101\u2082" },
      { id: "D", text: "100111\u2082" }
    ],
    answer: "B"
  },
  {
    id: "q-145",
    category: "systemy",
    level: "PP",
    type: "choice",
    source: "CKE maj 2015 \u00B7 F2007",
    html:
      "<p class=\"question-math\">Jaką ostatnią cyfrę w zapisie dziesiętnym ma liczba 2<sup>2015</sup>?</p>",
    options: [
      { id: "A", text: "2" },
      { id: "B", text: "4" },
      { id: "C", text: "6" },
      { id: "D", text: "8" }
    ],
    answer: "D"
  },
  {
    id: "q-146",
    category: "sieci",
    level: "PP",
    type: "choice",
    source: "CKE maj 2015 \u00B7 F2007",
    html:
      "<p>Jaki serwer tłumaczy adres IP na adres domenowy i odwrotnie?</p>",
    options: [
      { id: "A", text: "serwer pocztowy" },
      { id: "B", text: "serwer WWW" },
      { id: "C", text: "serwer FTP" },
      { id: "D", text: "serwer DNS" }
    ],
    answer: "D"
  },
  {
    id: "q-147",
    category: "sql",
    level: "PP",
    type: "choice",
    source: "CKE maj 2015 \u00B7 F2007",
    html:
      "<p><strong>Zaznacz poprawne dokończenie zdania.</strong></p><p>Klucz podstawowy w tabeli bazy danych</p>",
    options: [
      { id: "A", text: "zawiera wartości wyłącznie numeryczne." },
      { id: "B", text: "umożliwia jednoznaczną identyfikację wiersza." },
      { id: "C", text: "umożliwia jednoznaczną identyfikację kolumny." },
      { id: "D", text: "nie może służyć do łączenia z inną tabelą." }
    ],
    answer: "B"
  },
  {
    id: "q-148",
    category: "arkusz",
    level: "PP",
    type: "choice",
    source: "CKE maj 2015 \u00B7 F2007",
    html:
      "<p><strong>Zaznacz poprawną odpowiedź.</strong></p><p>W komórce C2 wpisano formułę taką, jak poniżej, a następnie przekopiowano ją do komórki C6. W rezultacie uzyskano w komórce C6 następującą wartość:</p>\n<div class=\"question-data-table-wrap\">\n<table class=\"question-data-table\">\n<thead><tr><th></th><th>A</th><th>B</th><th>C</th></tr></thead>\n<tbody>\n<tr><th>1.</th><td>Produkcja</td><td>Sprzedaż</td><td>Magazyn</td></tr>\n<tr><th>2.</th><td>30</td><td>20</td><td>=SUMA($A$2:A2)-SUMA($B$2:B2)</td></tr>\n<tr><th>3.</th><td>20</td><td>10</td><td></td></tr>\n<tr><th>4.</th><td>30</td><td>25</td><td></td></tr>\n<tr><th>5.</th><td>15</td><td>18</td><td></td></tr>\n<tr><th>6.</th><td>23</td><td>18</td><td></td></tr>\n</tbody>\n</table>\n</div>",
    options: [
      { id: "A", text: "36" },
      { id: "B", text: "27" },
      { id: "C", text: "22" },
      { id: "D", text: "5" }
    ],
    answer: "B"
  },
  {
    id: "q-149",
    category: "arkusz",
    level: "PP",
    type: "choice",
    source: "CKE maj 2015 \u00B7 F2007",
    html:
      "<p><strong>Zaznacz poprawną odpowiedź.</strong></p><p>W komórce C2 wpisano formułę taką, jak poniżej, a następnie przekopiowano ją do komórki C4. W rezultacie uzyskano w komórce C4 następującą wartość:</p>\n<div class=\"question-data-table-wrap\">\n<table class=\"question-data-table\">\n<thead><tr><th></th><th>A</th><th>B</th><th>C</th></tr></thead>\n<tbody>\n<tr><th>1.</th><td>I</td><td>II</td><td>Zaliczenie</td></tr>\n<tr><th>2.</th><td>1</td><td>2</td><td>=JEŻELI(ORAZ(ŚREDNIA(A2:B2)>=2;ORAZ(A2&lt;&gt;1;B2&lt;&gt;1));\"zdał\";\"nie zdał\")</td></tr>\n<tr><th>3.</th><td>2</td><td>2</td><td></td></tr>\n<tr><th>4.</th><td>5</td><td>1</td><td></td></tr>\n</tbody>\n</table>\n</div>",
    options: [
      { id: "A", text: "3" },
      { id: "B", text: "zdał" },
      { id: "C", text: "nie zdał" },
      { id: "D", text: "PRAWDA" }
    ],
    answer: "C"
  },
  {
    id: "q-150",
    category: "multimedia",
    level: "PP",
    type: "choice",
    source: "CKE maj 2015 \u00B7 F2007",
    html:
      "<p>Który z poniższych formatów plików nie służy do zapisywania filmów?</p>",
    options: [
      { id: "A", text: "mov" },
      { id: "B", text: "avi" },
      { id: "C", text: "mp3" },
      { id: "D", text: "mp4" }
    ],
    answer: "C"
  }
];
