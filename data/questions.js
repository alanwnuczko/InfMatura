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
  },
  {
    id: "q-055",
    type: "truefalse",
    source: "CKE czerwiec 2019 · F2015",
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
    type: "truefalse",
    source: "CKE maj 2019 · F2015",
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
    type: "truefalse",
    source: "CKE maj 2019 · F2015",
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
    type: "truefalse",
    source: "CKE czerwiec 2019 · F2015",
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
      "<p>(Fragment tabeli; wiersze 2–10 zawierają kwadraty sumy wartości z kolumny A i wiersza 1.)</p>",
    items: [
      { text: "=($A2+B$1)*($A2+B$1)", answer: "P" },
      { text: "=(A2+B1)*(A2+B1)", answer: "F" },
      { text: "=($A2+B$1)^2", answer: "P" },
      { text: "=($A$2+$B$1)^2", answer: "F" }
    ]
  },
  {
    id: "q-059",
    type: "truefalse",
    source: "CKE czerwiec 2019 · F2015",
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
    type: "truefalse",
    source: "CKE czerwiec 2019 · F2015",
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
    type: "truefalse",
    source: "CKE maj 2019 · F2007",
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
    type: "truefalse",
    source: "CKE maj 2019 · F2007",
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
    type: "truefalse",
    source: "CKE maj 2019 · F2007",
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
    type: "truefalse",
    source: "CKE maj 2019 · F2007",
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
    type: "truefalse",
    source: "CKE czerwiec 2018 · F2015",
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
    type: "truefalse",
    source: "CKE czerwiec 2018 · F2015",
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
    type: "truefalse",
    source: "CKE czerwiec 2018 · F2015",
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
    type: "truefalse",
    source: "CKE czerwiec 2018 · F2015",
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
    type: "truefalse",
    source: "CKE maj 2018 · F2015",
    html:
      "<p>Na pewnym serwerze WWW znajduje się strona napisana w języku PHP, a jej kod zawiera fragmenty w języku JavaScript. " +
      "Pewien komputer-klient pobrał i wyświetlił tę stronę. Wiadomo, że:</p>",
    items: [
      { text: "kod PHP jest wykonywany przez komputer – serwer.", answer: "P" },
      { text: "kod JavaScript jest wykonywany przez komputer – klient.", answer: "P" },
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
    type: "truefalse",
    source: "CKE maj 2018 · F2015",
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
    type: "truefalse",
    source: "CKE maj 2018 · F2015",
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
    type: "truefalse",
    source: "CKE maj 2018 · F2007",
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
    type: "truefalse",
    source: "CKE maj 2018 · F2007",
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
    type: "truefalse",
    source: "CKE maj 2018 · F2007",
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
    type: "truefalse",
    source: "CKE maj 2018 · F2007",
    html: "<p>Prawidłowe przyporządkowania rozszerzeń plików i ich zastosowanie to</p>",
    items: [
      {
        text: "TIFF, OCR, OGG — pliki w grafice wektorowej",
        answer: "F"
      },
      {
        text: "BMP, JPG, PNG — pliki w grafice rastrowej",
        answer: "P"
      },
      {
        text: "AVI, MOV, MPEG — pliki filmowe",
        answer: "P"
      },
      {
        text: "WMA, WAV, MIDI — pliki dźwiękowe",
        answer: "P"
      }
    ]
  },
  {
    id: "q-076",
    type: "truefalse",
    source: "CKE maj 2018 · F2007",
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
    type: "truefalse",
    source: "CKE maj 2017 · F2015",
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
    type: "truefalse",
    source: "CKE maj 2017 · F2015",
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
    type: "truefalse",
    source: "CKE maj 2017 · F2015",
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
    type: "truefalse",
    source: "CKE maj 2017 · F2007",
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
    type: "truefalse",
    source: "CKE maj 2017 · F2007",
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
    type: "truefalse",
    source: "CKE maj 2017 · F2007",
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
    type: "truefalse",
    source: "CKE maj 2017 · F2007",
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
    type: "truefalse",
    source: "CKE maj 2017 · F2007",
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
    type: "truefalse",
    source: "CKE maj 2017 · F2007",
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
    type: "truefalse",
    source: "CKE czerwiec 2016 · F2015",
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
    type: "truefalse",
    source: "CKE czerwiec 2016 · F2015",
    html: "<p>Suma <strong>200<sub>10</sub> + 10<sub>2</sub></strong> jest równa</p>",
    items: [
      { text: "210₁₀", answer: "F" },
      { text: "312₈", answer: "P" },
      { text: "CA₁₆", answer: "P" }
    ]
  },
  {
    id: "q-088",
    type: "truefalse",
    source: "CKE czerwiec 2016 · F2015",
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
    type: "truefalse",
    source: "CKE czerwiec 2016 · F2015",
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
    type: "truefalse",
    source: "CKE maj 2016 · F2015",
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
    type: "truefalse",
    source: "CKE maj 2016 · F2015",
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
    type: "truefalse",
    source: "CKE maj 2016 · F2015",
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
    type: "truefalse",
    source: "CKE maj 2016 · F2015",
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
    type: "truefalse",
    source: "CKE czerwiec 2015 · F2015",
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
    type: "truefalse",
    source: "CKE czerwiec 2015 · F2015",
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
    type: "truefalse",
    source: "CKE czerwiec 2015 · F2015",
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
    type: "truefalse",
    source: "CKE czerwiec 2015 · F2015",
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
    type: "truefalse",
    source: "CKE maj 2015 · F2015",
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
    type: "truefalse",
    source: "CKE maj 2015 · F2015",
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
    type: "truefalse",
    source: "CKE maj 2015 · F2015",
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
    type: "truefalse",
    source: "CKE maj 2015 · F2015",
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
    type: "truefalse",
    source: "CKE maj 2015 · F2015",
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
  }
];
