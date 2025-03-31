import React, { useState, useEffect, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchForm from './components/SearchForm';
import CharacterList from './components/CharacterList';
import FavoritesList from './components/FavoritesList';
import Loader from './components/Loader';

import { searchCharacters, getMultipleCharacters } from './services/api';
import useFetch from './hooks/useFetch';

function App() {
  const [characters, setCharacters] = useState([]);
  const [favorites, setFavorites] = useState(() => {    
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const { loading, error, fetchData } = useFetch();

  useEffect(() => {
    if (error) {
      toast.error(error.includes("404") ? "No se encontraron personajes con ese nombre" : `Error: ${error}`);
    }
  }, [error]);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } else {
      localStorage.removeItem('favorites'); 
    }
  }, [favorites]);

  const handleSearch = async (searchTerm) => {
    try {
      const result = await fetchData(searchCharacters, searchTerm);
      if (result) {
        setCharacters(result.results);
        toast.success(`Se encontraron ${result.results.length} personajes`);
      }
    } catch (err) {}
  };

  const handleRandomSearch = async (count) => {
    try {
      const result = await fetchData(getMultipleCharacters, count);
      if (result) {
        setCharacters(result);
        toast.success(`Se cargaron ${result.length} personajes aleatorios`);
      }
    } catch (err) {}
  };

  const addToFavorites = (character) => {
    if (!favorites.some(fav => fav.id === character.id)) {
      setFavorites(prevFavorites => {
        const newFavorites = [...prevFavorites, character];
        localStorage.setItem('favorites', JSON.stringify(newFavorites)); 
        return newFavorites;
      });
      toast.success(`"${character.name}" añadido a favoritos`);
    }
  };

  const removeFromFavorites = (characterId) => {
    setFavorites(prevFavorites => {
      const newFavorites = prevFavorites.filter(fav => fav.id !== characterId);
      localStorage.setItem('favorites', JSON.stringify(newFavorites)); 
      return newFavorites;
    });
    toast.info("Personaje eliminado de favoritos");
  };

  const memoizedFavorites = useMemo(() => favorites, [favorites]);

  return (
    <div className="min-h-screen bg-rick-morty flex flex-col">
      <div className="min-h-screen bg-gray-900/70 flex flex-col">
        <ToastContainer position="top-right" autoClose={3000} />
        
        <Navbar />

        <main className="container mx-auto px-4 py-8 flex-grow">
          <SearchForm onSearch={handleSearch} onRequestRandom={handleRandomSearch} />
          
          {memoizedFavorites.length > 0 && (
            <FavoritesList 
              favorites={memoizedFavorites} 
              removeFromFavorites={removeFromFavorites} 
            />
          )}
          
          {loading ? (
            <Loader />
          ) : (
            characters.length > 0 && (
              <CharacterList 
                characters={characters} 
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                favorites={memoizedFavorites}
              />
            )
          )}
          
          {!loading && characters.length === 0 && !error && (
            <div className="text-center py-12 bg-black rounded-lg">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">¡Bienvenido!</h2>
              <p className="text-white max-w-lg mx-auto">
                Busca personajes por nombre o carga algunos aleatorios para comenzar a explorar.
              </p>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;

