# InfMatura

Wyszukiwarka arkuszy maturalnych z informatyki rozszerzonej z podgladem rozwiązan i testami z pytań teoretycznych.

**[infmatura.dev](https://infmatura.dev)**

---

## Funkcje

- Filtrowanie arkuszy CKE po roku, formule egzaminu i poziomie (rozszerzony / podstawowy)
- Wyszukiwanie po nazwie sesji
- Dedykowane podstrony arkuszy z podgladem kodu rozwiązan (Python, SQL, Markdown), kolorowaniem składni i przyciskiem kopiowania
- Testy z pytań teoretycznych z losowym wyborem i natychmiastową weryfikacją odpowiedzi
- Bezpośredni dostęp do arkuszy PDF, plików z danymi (ZIP) i zasad oceniania CKE

## Zrzuty ekranu

<img src="https://raw.githubusercontent.com/alanwnuczko/matura-informatyka-rozszerzona/main/.github/images/screenshot-1.jpg" alt="Strona główna z bazą arkuszy" width="49%"> <img src="https://raw.githubusercontent.com/alanwnuczko/matura-informatyka-rozszerzona/main/.github/images/screenshot-2.jpg" alt="Podstrona arkusza z podglądem kodu" width="49%">

## Technologie

<br>

[![Tech Stack](https://skillicons.dev/icons?i=html,css,js,github,md&theme=dark)](https://skillicons.dev)

**HTML5, CSS3, JavaScript** bez frameworków, hostowany na **GitHub Pages**. Kolorowanie składni kodu przez **Prism.js**, renderowanie Markdown przez **Marked.js**, pliki z repozytorium danych serwowane przez **jsDelivr CDN**. Podstrony generowane skryptem **PowerShell** (`scripts/generate.ps1`).


## Dane i rozwiązania

Arkusze PDF, pliki z danymi, zasady oceniania oraz kod źródłowy rozwiązań w Pythonie znajdują się w osobnym repozytorium:

**[alanwnuczko/matura-informatyka-rozszerzona](https://github.com/alanwnuczko/matura-informatyka-rozszerzona)**

Podstrony arkuszy generowane są skryptem PowerShell (`scripts/generate.ps1`), który pobiera kod rozwiązań bezpośrednio z tego repozytorium i renderuje go ze statycznym kolorowaniem składni.

## Uruchomienie lokalne

```bash
git clone https://github.com/alanwnuczko/InfMatura.git
cd InfMatura
```

Otwórz `index.html` w przeglądarce lub uruchom lokalny serwer:

```bash
python -m http.server 8000
```

Strona będzie dostępna pod adresem `http://localhost:8000`.

## Licencja

[MIT](LICENSE)
