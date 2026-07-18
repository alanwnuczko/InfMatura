/**
 * Baza pytań teoretycznych (źródło na stronie: ten plik).
 *
 * Typy:
 * - "fill"      - {{blank}} / {{d}} / {{select}} + answers[]
 * - "truefalse" - items[].answer: "P" | "F"
 * - "choice"    - options[] + answer: "A"|"B"|…
 *
 * Dla {{select}} podaj selectOptions: ["<", "=", ">"] (lub inne).
 * Sprawdzanie odpowiedzi: lokalnie w przeglądarce (js/questions.js).
N */
window.QUESTIONS_JSON = [
  {
    id: "q-001",
    type: "fill",
    source: "CKE czerwiec 2026 · F2023",
    html:
      "<p>Poniżej zapisano wyrażenie matematyczne zawierające dodatnie liczby całkowite zapisane w systemach: szóstkowym, dziesiętnym i trójkowym.<br>" +
      "W miejsce kropek wpisz odpowiednie liczby, tak aby obie równości były prawdziwe.</p>" +
      "<p class=\"question-math\">1251<sub>6</sub> + {{blank}}<sub>6</sub> = 500<sub>10</sub> = {{blank}}<sub>3</sub> &minus; 110102<sub>3</sub></p>",
    answers: ["501", "1010221"]
  },
  {
    id: "q-002",
    type: "truefalse",
    source: "CKE czerwiec 2026 · F2023",
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
    type: "truefalse",
    source: "CKE czerwiec 2026 · F2015",
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
    type: "fill",
    source: "CKE maj 2026 · F2023",
    html:
      "<p>Poniżej zapisano wyrażenie matematyczne zawierające liczby zapisane w systemach: piątkowym, dziesiętnym i trójkowym.<br>" +
      "W miejsce kropek wpisz odpowiednie liczby (zapisane w systemie piątkowym i trójkowym), tak aby obie równości były prawdziwe.</p>" +
      "<p class=\"question-math\">1440<sub>5</sub> + {{blank}}<sub>5</sub> = 427<sub>10</sub> = {{blank}}<sub>3</sub> &minus; 110002<sub>3</sub></p>",
    answers: ["1212", "1000220"]
  },
  {
    id: "q-005",
    type: "fill",
    source: "CKE maj 2026 · F2023",
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
    type: "fill",
    source: "CKE czerwiec 2025 · F2023",
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
    type: "truefalse",
    source: "CKE czerwiec 2025 · F2023",
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
    type: "truefalse",
    source: "CKE czerwiec 2025 · F2015",
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
    type: "truefalse",
    source: "CKE czerwiec 2025 · F2015",
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
    type: "choice",
    source: "CKE maj 2025 · F2023",
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
    type: "fill",
    source: "CKE maj 2025 · F2023",
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
    type: "truefalse",
    source: "CKE maj 2025 · F2015",
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
    type: "truefalse",
    source: "CKE maj 2025 · F2015",
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
    type: "truefalse",
    source: "CKE grudzień 2024 · F2023",
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
    type: "fill",
    source: "CKE grudzień 2024 · F2023",
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
    type: "truefalse",
    source: "CKE czerwiec 2024 · F2023",
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
    type: "fill",
    source: "CKE czerwiec 2024 · F2023",
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
    type: "truefalse",
    source: "CKE czerwiec 2024 · F2015",
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
    type: "truefalse",
    source: "CKE czerwiec 2024 · F2015",
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
    type: "truefalse",
    source: "CKE maj 2024 · F2023",
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
    type: "fill",
    source: "CKE maj 2024 · F2023",
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
    type: "truefalse",
    source: "CKE maj 2024 · F2015",
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
    type: "truefalse",
    source: "CKE maj 2024 · F2015",
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
    type: "fill",
    source: "CKE czerwiec 2023 · F2023",
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
    type: "truefalse",
    source: "CKE czerwiec 2023 · F2023",
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
    type: "truefalse",
    source: "CKE czerwiec 2023 · F2015",
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
    type: "truefalse",
    source: "CKE maj 2023 · F2023",
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
    type: "fill",
    source: "CKE maj 2023 · F2023",
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
    type: "truefalse",
    source: "CKE maj 2023 · F2015",
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
    type: "truefalse",
    source: "CKE maj 2023 · F2015",
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
    type: "fill",
    source: "CKE grudzień 2022 · F2023",
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
    type: "truefalse",
    source: "CKE grudzień 2022 · F2023",
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
    type: "fill",
    source: "CKE grudzień 2022 · F2023",
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
    type: "truefalse",
    source: "CKE czerwiec 2022 · F2015",
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
    type: "truefalse",
    source: "CKE maj 2022 · F2015",
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
    type: "truefalse",
    source: "CKE maj 2022 · F2015",
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
    type: "truefalse",
    source: "CKE marzec 2022 · F2023",
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
    type: "fill",
    source: "CKE marzec 2022 · F2023",
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
    type: "truefalse",
    source: "CKE czerwiec 2021 · F2015",
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
    type: "truefalse",
    source: "CKE czerwiec 2021 · F2015",
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
    type: "truefalse",
    source: "CKE maj 2021 · F2015",
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
    type: "truefalse",
    source: "CKE maj 2021 · F2015",
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
    type: "truefalse",
    source: "CKE marzec 2021 · F2015",
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
    type: "truefalse",
    source: "CKE marzec 2021 · F2015",
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
    type: "truefalse",
    source: "CKE marzec 2021 · F2015",
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
    type: "truefalse",
    source: "CKE lipiec 2020 · F2015",
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
    type: "truefalse",
    source: "CKE lipiec 2020 · F2015",
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
    type: "truefalse",
    source: "CKE lipiec 2020 · F2015",
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
    type: "truefalse",
    source: "CKE czerwiec 2020 · F2007",
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
    type: "truefalse",
    source: "CKE czerwiec 2020 · F2007",
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
    type: "truefalse",
    source: "CKE kwiecień 2020 · F2015",
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
    type: "truefalse",
    source: "CKE kwiecień 2020 · F2015",
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
    type: "truefalse",
    source: "CKE kwiecień 2020 · F2015",
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
    type: "truefalse",
    source: "CKE kwiecień 2020 · F2015",
    html:
      "<p>Liczba, która w zapisie binarnym ma dokładnie 16 cyfr i jedynkę na najbardziej znaczącej pozycji ma w zapisie</p>",
    items: [
      { text: "czwórkowym dokładnie 9 cyfr.", answer: "F" },
      { text: "ósemkowym dokładnie 7 cyfr.", answer: "F" },
      { text: "szesnastkowym dokładnie 4 cyfry.", answer: "P" },
      { text: "dziesiętnym dokładnie 5 cyfr.", answer: "P" }
    ]
  }
];
