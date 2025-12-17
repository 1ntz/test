import { Item } from './item.js';

/**
 * Dynamische Generierung von Item-Cards
 * @param items Array von Item-Objekten
 */
export function createCards(items: Item[]): void {
  // Zielcontainer im DOM (z. B. ein <div> mit der ID "cardContainer")
  const container = document.getElementById('cardContainer');
  if (!container) {
    console.error('Card container not found!');
    return;
  }

  // Vorherige Inhalte leeren
  container.innerHTML = '';

  // Für jedes Item eine Card erstellen
  items.forEach((item) => {
    // Card-Element
    const card = document.createElement('div');
    card.className = 'card bg-slate-100 p-4 rounded-lg shadow-md';

    // Titel
    const title = document.createElement('h3');
    title.className = 'text-lg font-bold';
    title.textContent = item.title;

    // Beschreibung
    const description = document.createElement('p');
    description.className = 'text-gray-600';
    description.textContent = item.description;

    // Preis
    const price = document.createElement('p');
    price.className = 'text-sm text-gray-500';
    price.textContent = `Kaufpreis: ${item.price.toFixed(2)} €`;

    // Kaufdatum
    const purchaseDate = document.createElement('p');
    purchaseDate.className = 'text-sm text-gray-500';
    purchaseDate.textContent = `Kaufdatum: ${item.date}`;

    // Kategorien
    const categories = document.createElement('p');
    categories.className = 'text-sm text-gray-500';
    categories.textContent = `Kategorien: ${item.categories.join(', ')}`;

    // Bild
    const image = document.createElement('img');
    image.className = 'object-cover rounded-md mb-2 max-w-40 max-h-40';
    image.src = item.image; // base64-Daten als src
    image.alt = `${item.title} Bild`;

    // Elemente in die Card einfügen
    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(purchaseDate);
    card.appendChild(categories);

    // Card in den Container einfügen
    container.appendChild(card);
  });
}
