// src/pages/OutputPage.tsx
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import type Product from '../assets/product';

const nutriScoreRange = ['A', 'B', 'C', 'D', 'E'];
const parseNutriScoreNumberToLetter = (nutriScore: number) => 
  nutriScoreRange[nutriScore];

const parseNutriScoreLetterToNumber = (nutriScore: string) =>
  nutriScoreRange.indexOf(nutriScore.toUpperCase());

const OutputPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [nutriScore, setNutriScore] = useState<number>(4);
  const [categoryQuery, setCategoryQuery] = useState<string>('Pizza');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Lade Daten neu bei Änderung der Kategorie
  useEffect(() => {
    if (categoryQuery.trim() === '') {
      setProducts([]);
      return;
    }

    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://intersys.imis.uni-luebeck.de/api/openfoodfacts/${encodeURIComponent(categoryQuery)}`
        );

        if (!response.ok) {
          throw new Error('Fehler beim Abrufen der Daten');
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unbekannter Fehler');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [categoryQuery]);

  const handleNutriScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNutriScore(Number(e.target.value));
  };

  const handleCategoryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryQuery(e.target.value);
  };

  // Lokaler Nutri-Score-Filter auf Serverdaten
  const filteredData: Product[] = products.filter((product) => {
    const productScore = parseNutriScoreLetterToNumber(product.nutriscore_grade);
    return productScore >= 0 && productScore <= nutriScore;
  });

  return (
    <div className="bg-green-200 p-5 shadow-md min-h-screen">
      <h2 className="text-green-700 text-2xl font-bold mb-4">Produktsuche nach Kategorie</h2>

      {/* Kategorie-Eingabe */}
      <label htmlFor="categoryInput" className="block text-green-700 font-medium">Kategorie eingeben:</label>
      <input
        id="categoryInput"
        type="text"
        value={categoryQuery}
        onChange={handleCategoryInput}
        placeholder="z. B. Pizza, Getränke, Kuchen"
        className="block w-full p-2 my-2 border rounded"
      />

      {/* Nutri-Score Auswahl */}
      <label htmlFor="nutriScoreRange" className="block text-green-700 font-medium">Nutri-Score auswählen:</label>
      <input
        id="nutriScoreRange"
        type="range"
        min="0"
        max="4"
        value={nutriScore}
        onChange={handleNutriScoreChange}
        className="w-full my-2"
      />
      <p className="text-green-700 mb-4">
        Bereich: <span className="text-xl font-bold">A – {parseNutriScoreNumberToLetter(nutriScore)}</span>
      </p>

      {/* Statusausgaben */}
      {isLoading ? (
        <p className="text-green-800">Lade Produkte...</p>
      ) : error ? (
        <p className="text-red-600">Fehler: {error}</p>
      ) : filteredData.length === 0 && categoryQuery.trim() !== '' ? (
        <p className="text-green-800 mt-6">Keine passenden Produkte gefunden.</p>
      ) : (
        <div className="mt-6 flex flex-wrap gap-6">
          {filteredData.map((product) => (
            <Card key={product.rowid} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OutputPage;
