// LandingPage.tsx
import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-[url(../assets/background.jpg)] bg-cover bg-center h-screen">
      <h1 className="text-gray-600 font-bold text-4xl p-20">Willkommen</h1>
      <div className="text-gray-800 text-2xl pl-20 max-w-xl">Hier kannst du mit bestimmten
         Filtern, wie <strong>Nutri-Score</strong> nach Lebensmitteln suchen! Zu den gefilterten
         Lebensmitteln erhälst du Informationen, wie Marke, Hersteller, 
         Herstellungsdatum und mehr. Bald kannst du selber Lebensmittel hinzufügen und wir 
         überprüfen die Eingabe nach Korrektheit und nehmen diese in unsere Datenbank auf.</div>

    </div>
  );
};

export default LandingPage;