// src/App.tsx
import './styles/index.css';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header'; // <-- Header importieren
import Footer from './components/Footer'; // <-- Footer importieren

const App: React.FC = () => {
  return (
    <div>
      <Header /> {/* Header oben */}
      <main style={{ padding: '1rem' }}>
        <Outlet /> {/* Hier wird LandingPage, OutputPage, etc. angezeigt */}
      </main>
      <Footer /> {/* Footer unten */}
    </div>
  );
};

export default App;
