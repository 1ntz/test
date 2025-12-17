import { createCards } from './card.js';

// Kategorie-Eingabefelder abrufen
const categoryInputs = {
  cbook: document.querySelector('#category-book'),
  cgame: document.querySelector('#category-game'),
  cboardgame: document.querySelector('#category-boardgame'),
  cmovie: document.querySelector('#category-movie'),
  cseries: document.querySelector('#category-series'),
  cmusic: document.querySelector('#category-music'),
};

// Asynchrone Funktion fetchGet
async function fetchGet() {
  // Basis-URL des Servers
  const baseUrl = 'http://127.0.0.1:3000/api/items';

  // Abrufen der ausgewählten Kategorien
  const selectedCategories = getSelectedCategories();

  // Kategorien als URL-Parameter anhängen
  const searchParams = new URLSearchParams();
  selectedCategories.forEach((category) => searchParams.append('search', category));

  // Finalisierte URL mit Parametern
  const url = `${baseUrl}?${searchParams.toString()}`;

  try {
    // Daten vom Server abrufen
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Überprüfen, ob der Response-Status erfolgreich ist
    if (!response.ok) {
      throw new Error(`Server returned status: ${response.status}`);
    }

    // JSON-Antwort parsen
    const data = await response.json();

    // Daten zurückgeben
    return data;
  } catch (error) {
    // Fehler abfangen und ausgeben
    console.error('Fehler beim Abrufen der Daten:', error);

    // Leeres Array zurückgeben, um Aufrufer vor weiteren Fehlern zu schützen
    return [];
  }
}

// Asynchrone Funktion fetchPost
async function fetchPost(newItem) {
  // Basis-URL des Servers
  const baseUrl = 'http://127.0.0.1:3001/api/items';

  try {
    // HTTP-POST-Request senden
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem), // JSON-Daten senden
    });

    // Antwortstatus auswerten
    if (response.status === 201) {
      console.log('Item erfolgreich hinzugefügt:', await response.json());
    } else {
      throw new Error(`Fehler beim Hinzufügen des Items: Server returned status ${response.status}`);
    }
  } catch (error) {
    // Fehler ausgeben
    console.error('Fehler beim Hinzufügen des Items:', error);
  }
}

// Beispiel-Daten für ein neues Item (JSON-String aus Übung 09)
const newItem = {
  name: 'Beispiel Item',
  description: 'Dies ist ein Beispiel-Item.',
  categories: ['Game', 'Buch'],
  image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...', // Beispiel Base64-String
};

// Funktion testen
fetchPost(newItem);


// filterByCategory Funktion
function filterByCategory(inputArray, categoryArray) {
  return inputArray.filter((item) =>
    item.categories.some((category) => categoryArray.includes(category))
  );
}

// Funktion zum Abrufen der Daten und Erstellen der Karten
async function loadAndCreateCards() {
  try {
    // Abrufen der Items von der API
    const items = await fetchGet();

    // Abrufen der ausgewählten Kategorien
    const selectedCategories = getSelectedCategories();

    // Filtern der Items nach den ausgewählten Kategorien
    const filteredItems = filterByCategory(items, selectedCategories);

    createCards(filteredItems);
  } catch (error) {
    console.error('Fehler beim Laden der Karten:', error);
  }
}

// Funktion zum Abrufen der ausgewählten Kategorien
function getSelectedCategories() {
  const selectedCategories = [];

  // Kategorien durchsuchen und auswählen
  for (const key in categoryInputs) {
    const input = categoryInputs[key];
    if (input?.checked) {
      switch (key) {
        case 'cbook':
          selectedCategories.push('Buch');
          break;
        case 'cgame':
          selectedCategories.push('Game');
          break;
        case 'cboardgame':
          selectedCategories.push('Brettspiel');
          break;
        case 'cmovie':
          selectedCategories.push('Film');
          break;
        case 'cseries':
          selectedCategories.push('Serie');
          break;
        case 'cmusic':
          selectedCategories.push('Musikalbum');
          break;
      }
    }
  }
  return selectedCategories;
}

// Event-Listener für Änderungen der Kategorie-Eingabefelder
for (const key in categoryInputs) {
  const input = categoryInputs[key];
  if (input) {
    input.addEventListener('change', loadAndCreateCards);
  }
}
