import { Item } from './item.js';
import { createCards } from './card.js';

const categoryInputs = {
  cbook: document.querySelector<HTMLInputElement>('#category-book'),
  cgame: document.querySelector<HTMLInputElement>('#category-game'),
  cboardgame: document.querySelector<HTMLInputElement>('#category-boardgame'),
  cmovie: document.querySelector<HTMLInputElement>('#category-movie'),
  cseries: document.querySelector<HTMLInputElement>('#category-series'),
  cmusic: document.querySelector<HTMLInputElement>('#category-music'),
};

// Asynchrone Funktion fetchGet
async function fetchGet(): Promise<Item[]> {
  // Basis-URL des Servers
  const baseUrl = 'http://127.0.0.1:3001/api/items';

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
    const data: Item[] = await response.json();

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
async function fetchPost(newItem: Item): Promise<void> {
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
      const responseData = await response.json();
      console.log('Item erfolgreich hinzugefügt:', responseData);
    } else {
      throw new Error(`Fehler beim Hinzufügen des Items: Server returned status ${response.status}`);
    }
  } catch (error) {
    // Fehler ausgeben
    console.error('Fehler beim Hinzufügen des Items:', error);
  }
}


// Typ für die Filterfunktion
type filterFn = (inputArray: Item[], categoryArray: string[]) => Item[];

// filterByCategory Funktion
const filterByCategory: filterFn = (inputArray, categoryArray) => {
  return inputArray.filter((item) =>
    item.categories.some((category) => categoryArray.includes(category)),
  );
};

// Funktion zum Abrufen der Daten und Erstellen der Karten
async function loadAndCreateCards() {
  try {
    // Abrufen der Items von der API
    const items = await fetchGet();

    // Abrufen der ausgewählten Kategorien (hier sollte die Funktion zum Abrufen der Kategorien stehen)
    const selectedCategories = getSelectedCategories(); // Ersetzen Sie dies mit Ihrer Methode zur Kategorie-Ermittlung

    // Filtern der Items nach den ausgewählten Kategorien
    const filteredItems = filterByCategory(items, selectedCategories);

    createCards(filteredItems);
  } catch (error) {
    console.error('Fehler beim Laden der Karten:', error);
  }
}

// Funktion zum Abrufen der ausgewählten Kategorien (Beispiel)
function getSelectedCategories(): string[] {
  const selectedCategories: string[] = [];

  // Kategorien durchsuchen und auswählen
  for (const key in categoryInputs) {
    const input = categoryInputs[key as keyof typeof categoryInputs];
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

for (const key in categoryInputs) {
  const input = categoryInputs[key as keyof typeof categoryInputs];
  if (input) {
    input.addEventListener('change', loadAndCreateCards);
  }
}
