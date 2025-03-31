import React, { useState } from 'react';
import CharacterCard from './CharacterCard';

const FavoritesList = ({ favorites, removeFromFavorites }) => {
  const [showFavorites, setShowFavorites] = useState(true);

  if (favorites.length === 0) {
    return (
      <div className="bg-black p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Favoritos</h2>
        <p className="text-gray-600">No tienes personajes favoritos guardados.</p>
      </div>
    );
  }

  return (
    <div className="bg-black/90 p-6 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Favoritos ({favorites.length})</h2>
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className="text-green-600 hover:text-green-800 font-medium"
        >
          {showFavorites ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>

      {showFavorites && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map(character => (
            <CharacterCard
              key={character.id}
              character={character}
              removeFromFavorites={removeFromFavorites}
              isFavorite={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;