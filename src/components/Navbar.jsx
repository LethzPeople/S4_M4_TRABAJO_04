import React, { useState } from 'react';
import logo from '../assets/logo.png'; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white py-4 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="Rick and Morty Logo" className="h-12" />
          </div>

          {/* Menú para escritorio */}
          <div className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-green-200 transition">Inicio</a>
            <a href="#favorites" className="hover:text-green-200 transition">Favoritos</a>
            <a href="https://rickandmortyapi.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-200 transition">API</a>
          </div>

          {/* Botón para menú móvil */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <div className="flex flex-col space-y-4 pb-3">
              <a href="#" className="hover:text-blue-200 transition">Inicio</a>
              <a href="#favorites" className="hover:text-blue-200 transition">Favoritos</a>
              <a href="https://rickandmortyapi.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition">API</a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
