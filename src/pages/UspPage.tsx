// UspPage.tsx
import React from 'react';

const UspPage: React.FC = () => {
  return (
    <div className="bg-[url(../assets/usp-background.jpg)] bg-cover bg-center h-screen">
      <h1 className="text-white font-bold text-4xl p-20">Vetrauchlich und verlässlich</h1>
      <div className="text-white text-2xl pl-20 max-w-xl">Alle Informationen zu den Lebensmitteln
        sind stets aktuell und wir überprüfen regelmäßig, ob die Informationen zu den einzelnen
        Lebensmitteln aktuell sind oder nicht. Bei Abweichung aktualisieren wir die Informationen
        entsprechend. Falls du abweichende bzw. falsche Informationen zu den Lebensmitteln finden
        kannst, kontaktiere und gebe uns gerne Bescheid!
      </div>
    </div>
  );
};

export default UspPage;
