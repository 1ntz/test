import { Item } from './item.js';
import { encodeImageFileAsBase64 } from './imgEncoder.js';

// DOM-Elemente abrufen
const validateButton =
  document.querySelector<HTMLButtonElement>('#validateButton');
const formFields = {
  title: document.querySelector<HTMLInputElement>('#title'),
  description: document.querySelector<HTMLTextAreaElement>('#description'),
  price: document.querySelector<HTMLInputElement>('#price'),
  date: document.querySelector<HTMLInputElement>('#purchase-date'),
  file: document.querySelector<HTMLInputElement>('#fileInput'),
};
const categoryInputs = {
  cbook: document.querySelector<HTMLInputElement>('#category-book'),
  cgame: document.querySelector<HTMLInputElement>('#category-game'),
  cboardgame: document.querySelector<HTMLInputElement>('#category-boardgame'),
  cmovie: document.querySelector<HTMLInputElement>('#category-movie'),
  cseries: document.querySelector<HTMLInputElement>('#category-series'),
  cmusic: document.querySelector<HTMLInputElement>('#category-music'),
};

// Funktion zur Validierung der Felder
const validateForm = (): boolean => {
  let isValid = true;

  for (const key in formFields) {
    const field = formFields[key as keyof typeof formFields];
    if (field && field.value.trim() === '') {
      isValid = false;
      field.classList.add('border', 'border-red-500');
    } else {
      field?.classList.remove('border', 'border-red-500');
    }
  }

  let isCheckBoxValid = false;
  for (const key in categoryInputs) {
    const inputs = categoryInputs[key as keyof typeof categoryInputs];
    if (inputs?.checked) {
      isCheckBoxValid = true;
      break;
    }
  }

  for (const key in categoryInputs) {
    const inputs = categoryInputs[key as keyof typeof categoryInputs];
    inputs?.classList.remove(
      isCheckBoxValid ? 'border-red-500' : 'border-slate-700',
    );
    inputs?.classList.add(
      isCheckBoxValid ? 'border-slate-700' : 'border-red-500',
    );
  }

  return isValid && isCheckBoxValid;
};

// Funktion zum Erstellen eines Item-Objekts
const createItemFromForm = async (): Promise<Item> => {
  const title = formFields.title?.value.trim() || '';
  const description = formFields.description?.value.trim() || '';
  const price = parseFloat(formFields.price?.value.trim() || '0');
  const date = formFields.date?.value || '';
  const categories = Object.keys(categoryInputs)
    .filter(
      (key) => categoryInputs[key as keyof typeof categoryInputs]?.checked,
    )
    .map(
      (key) => categoryInputs[key as keyof typeof categoryInputs]?.value || '',
    );

  let image = ''; // Standardwert für das Bild

  // Überprüfen, ob eine Datei ausgewählt wurde
  if (formFields.file?.files?.length) {
    try {
      image = await encodeImageFileAsBase64(formFields.file.files[0]); // Datei als Base64 encodieren
    } catch (error) {
      console.error('Fehler beim Encodieren der Datei:', error);
    }
  }

  return { title, description, price, date, categories, image };
};

// Funktion zur Verarbeitung des Items
const processItem = (item: Item): void => {
  console.log('Verarbeitetes Item:', item);

  const itemJson = JSON.stringify(item); // Objekt in JSON-String umwandeln

  // JSON-String in der Konsole ausgeben
  console.log('JSON-String des Items:', itemJson);
  // Ausgabe des JSON-Strings zur Überprüfung
};

// Event-Listener hinzufügen
if (validateButton) {
  validateButton.addEventListener('click', async () => {
    const isFormValid = validateForm();

    if (isFormValid) {
      try {
        const item = await createItemFromForm(); // Auf das Item warten
        processItem(item);
        alert('Eintrag erfolgreich!');
      } catch (error) {
        console.error('Fehler beim Verarbeiten des Items:', error);
        alert('Es gab einen Fehler beim Erstellen des Eintrags.');
      }
    } else {
      alert('Bitte alle Pflichtfelder ausfüllen.');
    }
  });
}
