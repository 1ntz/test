export type Item = {
  id?: string; // Optional, da neue Items keine ID haben
  title: string; // Titel des Items
  description: string; // Beschreibung des Items
  price: number; // Kaufpreis in Euro
  date: string; // Kaufdatum als ISO-String
  categories: string[]; // Liste der Kategorien
  image: string; // Optional: vorerst leerer String
};
