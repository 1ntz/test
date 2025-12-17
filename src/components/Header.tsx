import React from 'react';
import { Link } from 'react-router-dom';
import imageUrl from '../assets/logo.png';


const Header: React.FC = () => {
  return (
    <header className="bg-green-300 text-green-700 shadow-md text-center">
      <div>
      <img src={imageUrl} className='w-80 h-80 mx-auto'/>
        <h1 className="text-5xl font-bold">Lebensmittelfinder</h1>
      </div>
      {/* Navigation */}
      <nav>
        <Link to="/" className="m-8 text-2xl">Landing Page</Link>
        <Link to="/output" className="m-8 text-2xl">Output Page</Link>
        <Link to="/input" className="m-8 text-2xl">Input Page</Link>
        <Link to="/usp" className="m-8 text-2xl">USP Page</Link>
      </nav>
    </header>
  );
};

export default Header;

