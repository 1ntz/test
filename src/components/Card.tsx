// src/components/Card.tsx
import React from 'react';
import type Product from '../assets/product';

type CardProps = {
  product: Product;
};

const Card: React.FC<CardProps> = ({ product }) => {
  const {
    product_name,
    brands,
    image_url,
    nutriscore_grade,
    categories,
    code,
    url,
    rowid,
    creator,
    created_datetime,
  } = product;

  return (
    <div className="max-w-50 bg-green-300 p-5 shadow-md">
      <img
        src={image_url}
        alt={product_name}
        className="max-h-50"
      />
      <div className="text-green-700">
        <h3 className="font-bold">{product_name}</h3>
        <p>Marke: {brands}</p>
        <p>Hersteller: {creator}</p>
        <p>Herstellungsdatum: {created_datetime}</p>
        <p>Nutri-Score: {nutriscore_grade.toUpperCase()}</p>
        <p>Kategorie: {categories.split(',')[0]}</p>
        <p>EAN: {code}</p>
        <p>UUID: {rowid}</p>
        <a href={url} target="_blank" rel="noopener noreferrer">Produkt-Link</a>
      </div>
    </div>
  );
};

export default Card;
