// --- Funkcja pomocnicza do wyświetlania wyniku ---
function showResult(elementId, isCorrect, message) {
    const el = document.getElementById(elementId);
    el.className = isCorrect ? 'feedback correct' : 'feedback wrong';
    el.innerText = message;
    el.style.display = 'block';
}

// 1. Radio Buttons
function checkQ1() {
    const radios = document.getElementsByName('q1');
    let val = '';
    for (let r of radios) if (r.checked) val = r.value;

    if (val === 'b') showResult('f1', true, "Świetnie! MonoBehaviour to podstawa.");
    else showResult('f1', false, "Błąd. Prawidłowa odpowiedź to MonoBehaviour.");
}

// 2. Checkboxes
function checkQ2() {

// Funkcja do wyświetlania wyniku
function showResult(elementId, isCorrect, message) {
    var el = document.getElementById(elementId);
    
    // Ustawienie klasy w zależności od wyniku
    if (isCorrect == true) {
        el.className = 'feedback correct';
    } else {
        el.className = 'feedback wrong';
    }
    
    el.innerText = message;
    el.style.display = 'block';
}

// === ZADANIE 1: Radio Buttons  ===
function checkQ1() {
    // Pobieranie wszystkich inputów o nazwie 'q1'
    var radios = document.getElementsByName('q1');
    var val = '';
    
    // Pętla sprawdzająca, który radio jest zaznaczony
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            val = radios[i].value;
            break;
        }
    }

    
    if (val === 'b') {
        showResult('f1', true, "Świetnie! MonoBehaviour to podstawa.");
    } else {
        showResult('f1', false, "Błąd. Prawidłowa odpowiedź to MonoBehaviour.");
    }
}

// === ZADANIE 2: Checkboxy ===
function checkQ2() {
    // Poprawne odpowiedzi
    var correctAnswers = ['unity', 'blender', 'csharp'];
    
    // Pobranie checkboxa
    var inputs = document.getElementsByName('q2');
    var selected = [];
    
    // Zapisanie w tablicy
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            selected.push(inputs[i].value);
        }
    }

    // Czy równa się 3
    var isLengthOk = (selected.length === 3);
    
    // Sprawdzamy poprawności w tablicy
    var allMatch = true;
    for (var j = 0; j < selected.length; j++) {
        // Jeśli elementu nie ma w tablicy poprawnych (indexOf zwraca -1)
        if (correctAnswers.indexOf(selected[j]) === -1) {
            allMatch = false;
        }
    }

    if (isLengthOk && allMatch) {
        showResult('f2', true, "Zgadza się! Unity, Blender i C# to trzon projektu.");
    } else {
        showResult('f2', false, "Nie do końca. Zaznacz tylko: Unity, Blender i C#.");
    }
}

// === ZADANIE 3: Input tekstowy ===
function checkQ3() {
    var inputElement = document.getElementById('input-q3');
    // Pobranie wartości, usuwanie białych znaków z boków i zamiana na małe litery
    var val = inputElement.value.trim().toLowerCase();

    // Walidacja - czy pole nie jest puste
    if (val === "") {
        showResult('f3', false, "Wpisz odpowiedź w pole tekstowe!");
        return;
    }

    if (val === 'fbx' || val === '.fbx') {
        showResult('f3', true, "Brawo! FBX to uniwersalny format.");
    } else {
        showResult('f3', false, "Niestety nie. Chodzi o format FBX.");
    }
}

// === ZADANIE 4: Sortowanie (Drag & Drop) ===
// Zmienna globalna przechowująca przeciągany element
var draggedItem = null;
var list = document.getElementById('sortable-list');
var items = list.getElementsByTagName('li');

// Dodajemy zdarzenia do każdego elementu listy
for (var i = 0; i < items.length; i++) {
    var item = items[i];

    item.addEventListener('dragstart', function(e) {
        draggedItem = e.target;
        // Używamy setTimeout żeby element zniknął dopiero po rozpoczęciu przeciągania
        setTimeout(function() {
            e.target.style.display = 'none';
        }, 0);
    });

    item.addEventListener('dragend', function(e) {
        // Przywracamy widoczność po upuszczeniu
        e.target.style.display = 'block';
        draggedItem = null;
    });
    
    // Zezwalamy na upuszczanie
    item.addEventListener('dragover', function(e) {
        e.preventDefault();
    });

    // Podświetlenie gdzie upuszczamy
    item.addEventListener('dragenter', function(e) {
        e.target.style.borderTop = "2px solid #5b4174";
    });

    item.addEventListener('dragleave', function(e) {
        e.target.style.borderTop = "";
    });

    item.addEventListener('drop', function(e) {
        e.preventDefault();
        e.target.style.borderTop = "";
        // Wstawiamy przeciągany element przed element na który upuściliśmy
        list.insertBefore(draggedItem, e.target);
    });
}

function checkQ4() {
    var currentItems = list.getElementsByTagName('li');
    // Sprawdzamy atrybut data-index każdego elementu po kolei
    var first = currentItems[0].getAttribute('data-index');
    var second = currentItems[1].getAttribute('data-index');
    var third = currentItems[2].getAttribute('data-index');

    if (first === '1' && second === '2' && third === '3') {
        showResult('f4', true, "Doskonale! Kolejność jest poprawna.");
    } else {
        showResult('f4', false, "Kolejność jest niewłaściwa. Najpierw zaznaczamy, potem export.");
    }
}

// === ZADANIE 5: Dopasowanie (Drag & Drop) ===
var draggables = document.querySelectorAll('#q5 .draggable-item');
var dropZones = document.querySelectorAll('#q5 .drop-zone');
var sourceContainer = document.getElementById('source-q5');

// Obsługa przeciągania klocków
for (var i = 0; i < draggables.length; i++) {
    draggables[i].addEventListener('dragstart', function(e) {
        // Zapisujemy ID przeciąganego elementu
        e.dataTransfer.setData('text', e.target.id);
    });
}

// Obsługa stref zrzutu
for (var i = 0; i < dropZones.length; i++) {
    var zone = dropZones[i];
    
    zone.addEventListener('dragover', function(e) {
        e.preventDefault(); // To pozwala na upuszczenie
    });

    zone.addEventListener('drop', function(e) {
        e.preventDefault();
        var id = e.dataTransfer.getData('text');
        var draggableElement = document.getElementById(id);
        
        // Zabezpieczenie: jeśli w strefie już coś jest, nie dokładamy drugiego
        if (e.target.children.length === 0 && e.target.classList.contains('drop-zone')) {
             e.target.appendChild(draggableElement);
        }
    });
}

function checkQ5() {
    var correctCount = 0;
    
    for (var i = 0; i < dropZones.length; i++) {
        var zone = dropZones[i];
        // Sprawdzamy czy strefa ma dziecko i czy ID dziecka zgadza się z data-correct strefy
        if (zone.firstElementChild) {
             if (zone.firstElementChild.id === zone.getAttribute('data-correct')) {
                 correctCount++;
             }
        }
    }

    if (correctCount === 3) {
        showResult('f5', true, "Wszystkie pary dopasowane!");
    } else {
        showResult('f5', false, "Błąd. Upewnij się, że Unity to silnik, Blender to modele, a C# to kod.");
    }
}

function resetQ5() {
    // Przenosimy wszystkie klocki z powrotem do góry
    var allItems = document.querySelectorAll('#q5 .draggable-item');
    for (var i = 0; i < allItems.length; i++) {
        sourceContainer.appendChild(allItems[i]);
    }
    
    // Ukrywamy wynik
    document.getElementById('f5').style.display = 'none';
}

// === ZADANIE 6: Suwak (Range) ===
function checkQ6() {
    var slider = document.getElementById('slider-q6');
    // Wartość z suwaka jest stringiem, ale porównanie luźne (==) zadziała
    if (slider.value == 5) {
        showResult('f6', true, "Zgadza się! W kodzie było 5.0f.");
    } else {
        showResult('f6', false, "Zła wartość. Spójrz na zmienną 'predkosc' w kodzie wyżej.");
    }
}

// === ZADANIE 7: Lista rozwijana (Select) ===
function checkQ7() {
    var select = document.getElementById('select-q7');
    var val = select.value;

    if (val === 'correct') {
        showResult('f7', true, "Tak jest! Time.deltaTime zapewnia płynność ruchu.");
    } else if (val === 'error') {
        showResult('f7', false, "Musisz wybrać jakąś opcję.");
    } else {
        showResult('f7', false, "Błąd. Potrzebujemy wartości czasu jednej klatki.");
    }
}

// === ZADANIE 8: Przełącznik (Toggle/Checkbox) ===
function checkQ8() {
    var checkbox = document.getElementById('toggle-q8');
    // Jeśli checkbox NIE jest zaznaczony (Fałsz) -> to jest dobra odpowiedź
    if (checkbox.checked == false) {
        showResult('f8', true, "Poprawnie! Start() wykonuje się tylko RAZ.");
    } else {
        showResult('f8', false, "Błąd. Start() uruchamia się raz na początku gry.");
    }
}

// === ZADANIE 9: Wybór obrazka + Modal ===

// Funkcja zaznaczająca obrazek (dodaje ramkę)
function selectImg(element, value) {
    // Najpierw usuwamy klasę 'selected' ze wszystkich obrazków
    var images = document.querySelectorAll('.img-option');
    for (var i = 0; i < images.length; i++) {
        images[i].classList.remove('selected');
    }

    // Dodajemy klasę do klikniętego
    element.classList.add('selected');
    
    // Zapisujemy wybór w ukrytym polu
    document.getElementById('q9-val').value = value;
}

function checkQ9() {
    var val = document.getElementById('q9-val').value;

    if (val === '') {
        showResult('f9', false, "Najpierw wybierz obrazek klikając w niego.");
    } else if (val === 'correct') {
        showResult('f9', true, "Brawo! To jest panel Inspektora.");
    } else {
        showResult('f9', false, "Nie. Poszukaj panelu z właściwościami (po prawej stronie).");
    }
}

// Obsługa powiększania zdjęć (Modal)
function openModal(src) {
    var modal = document.getElementById('img-modal');
    var modalImg = document.getElementById('modal-image');
    
    modal.style.display = "flex";
    modalImg.src = src;
}

function closeModal() {
    document.getElementById('img-modal').style.display = "none";
}

// === ZADANIE 10: Sekwencja przycisków ===
var userSequence = [];

function seqClick(btn, number) {
    // Jeśli przycisk nie ma jeszcze klasy active
    if (!btn.classList.contains('active')) {
        btn.classList.add('active');
        userSequence.push(number);
    }
}

function checkQ10() {
    // Sprawdzamy czy kliknięto 3 razy
    if (userSequence.length < 3) {
        showResult('f10', false, "Kliknij wszystkie 3 przyciski w dobrej kolejności.");
        return;
    }

    // Sprawdzamy kolejność: 1 -> 2 -> 3
    if (userSequence[0] === 1 && userSequence[1] === 2 && userSequence[2] === 3) {
        showResult('f10', true, "Gratulacje! Dobra organizacja pracy to podstawa.");
    } else {
        // Resetujemy jak źle
        userSequence = [];
        var btns = document.querySelectorAll('.seq-btn');
        for (var i = 0; i < btns.length; i++) {
            btns[i].classList.remove('active');
        }
        showResult('f10', false, "Zła kolejność. Spróbuj jeszcze raz (zresetowano).");
    }
}
    const correct = ['unity', 'blender', 'csharp'];
    const checkboxes = document.querySelectorAll('input[name="q2"]:checked');
    const selected = Array.from(checkboxes).map(c => c.value);

    const isCorrect = selected.length === 3 && selected.every(val => correct.includes(val));

    if (isCorrect) showResult('f2', true, "Zgadza się! Unity, Blender i C# to trzon projektu.");
    else showResult('f2', false, "Nie do końca. Upewnij się, że zaznaczyłeś tylko te technologie, o których była mowa (Unity, Blender, C#).");
}

// 3. String Match
function checkQ3() {
    const val = document.getElementById('input-q3').value.trim().toLowerCase();
    if (val === 'fbx' || val === '.fbx') showResult('f3', true, "Brawo! FBX to uniwersalny format.");
    else showResult('f3', false, "Niestety nie. Chodzi o format FBX.");
}

// 4. Drag and Drop Sort
const list = document.getElementById('sortable-list');
let draggedItem = null;

list.addEventListener('dragstart', (e) => {
    draggedItem = e.target;
    setTimeout(() => e.target.style.display = 'none', 0);
});
list.addEventListener('dragend', (e) => {
    e.target.style.display = 'block';
    draggedItem = null;
});
list.addEventListener('dragover', (e) => { e.preventDefault(); });
list.addEventListener('dragenter', (e) => {
    if (e.target.tagName === 'LI') e.target.style.borderTop = "2px solid #5b4174";
});
list.addEventListener('dragleave', (e) => {
    if (e.target.tagName === 'LI') e.target.style.borderTop = "";
});
list.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.target.tagName === 'LI') {
        e.target.style.borderTop = "";
        list.insertBefore(draggedItem, e.target);
    }
});

function checkQ4() {
    const items = list.querySelectorAll('li');
    const order = Array.from(items).map(i => i.getAttribute('data-index'));
    if (order[0] === '1' && order[1] === '2' && order[2] === '3') {
        showResult('f4', true, "Doskonale! Kolejność jest poprawna.");
    } else {
        showResult('f4', false, "Kolejność jest niewłaściwa. Najpierw zaznaczamy, potem wybieramy export.");
    }
}

// 5. Drag Match
const draggables = document.querySelectorAll('#q5 .draggable-item');
const dropZones = document.querySelectorAll('#q5 .drop-zone');
const sourceContainer = document.getElementById('source-q5');

// Dodajemy event listenery
draggables.forEach(d => {
    d.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text', e.target.id);
    });
});

dropZones.forEach(z => {
    z.addEventListener('dragover', e => e.preventDefault());
    z.addEventListener('drop', e => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text');
        const draggableElement = document.getElementById(id);
        if (z.hasChildNodes()) return; // Zablokuj jeśli już coś tam jest
        z.appendChild(draggableElement);
    });
});

// Funkcja sprawdzająca
function checkQ5() {
    let correctCount = 0;
    dropZones.forEach(z => {
        if (z.firstChild && z.firstChild.id === z.getAttribute('data-correct')) correctCount++;
    });
    if (correctCount === 3) showResult('f5', true, "Wszystkie pary dopasowane!");
    else showResult('f5', false, "Coś nie pasuje. Upewnij się, że Unity to silnik, Blender to modele, a kod C# to logika.");
}

// Funkcja Resetująca (Reset)
function resetQ5() {
    // Pobierz wszystkie przeciągalne elementy w zadaniu 5
    const allDraggables = document.querySelectorAll('#q5 .draggable-item');

    // Przenieś każdy z nich z powrotem do kontenera źródłowego
    allDraggables.forEach(item => {
        sourceContainer.appendChild(item);
    });

    // Ukryj/Wyczyść feedback
    const feedback = document.getElementById('f5');
    feedback.style.display = 'none';
    feedback.innerText = '';
}

// 6. Range Slider
function checkQ6() {
    const val = document.getElementById('slider-q6').value;
    if (val == 5) showResult('f6', true, "Zgadza się! W kodzie było public float predkosc = 5.0f;");
    else showResult('f6', false, "Niepoprawna wartość. Spójrz na zmienną 'predkosc' w sekcji kodu.");
}

// 7. Select Code
function checkQ7() {
    const val = document.getElementById('select-q7').value;
    if (val === 'correct') showResult('f7', true, "Tak jest! Time.deltaTime zapewnia płynność niezależną od FPS.");
    else showResult('f7', false, "Błąd. Potrzebujemy czegoś, co normalizuje czas klatki.");
}

// 8. Toggle
function checkQ8() {
    const isChecked = document.getElementById('toggle-q8').checked;
    if (!isChecked) showResult('f8', true, "Poprawnie! Start() wykonuje się tylko RAZ.");
    else showResult('f8', false, "Błąd. Start() uruchamia się raz. Update() działa co klatkę.");
}

// 9. Image Select + MODAL
function selectImg(el, val) {
    document.querySelectorAll('.img-option').forEach(img => img.classList.remove('selected'));
    el.classList.add('selected');
    document.getElementById('q9-val').value = val;
}

function checkQ9() {
    const val = document.getElementById('q9-val').value;
    if (val === 'correct') showResult('f9', true, "Brawo! To jest panel Inspektora ze światłem.");
    else if (val === '') showResult('f9', false, "Wybierz obrazek przed sprawdzeniem.");
    else showResult('f9', false, "Nie. Poszukaj obrazka z panelem po prawej stronie (Inspector).");
}

// Logika Modala 
function openModal(src) {
    const modal = document.getElementById('img-modal');
    const modalImg = document.getElementById('modal-image');
    modal.style.display = "flex";
    modalImg.src = src;
}

function closeModal() {
    const modal = document.getElementById('img-modal');
    modal.style.display = "none";
}

// Zamknij modal klikając poza obrazek
window.onclick = function (event) {
    const modal = document.getElementById('img-modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// 10. Sequence Clicker
let currentStep = 1;
let userSequence = [];

function seqClick(btn, stepVal) {
    if (!btn.classList.contains('active')) {
        btn.classList.add('active');
        userSequence.push(stepVal);
    }
}

function checkQ10() {
    if (userSequence.length !== 3) {
        showResult('f10', false, "Kliknij wszystkie 3 przyciski w dobrej kolejności.");
        return;
    }
    if (userSequence[0] === 1 && userSequence[1] === 2 && userSequence[2] === 3) {
        showResult('f10', true, "Gratulacje! Dobra organizacja pracy to podstawa.");
    } else {
        userSequence = [];
        document.querySelectorAll('.seq-btn').forEach(b => b.classList.remove('active'));
        showResult('f10', false, "Zła kolejność. ");
    }
}