import React from 'react';
import CharacterCard from './CharacterCard';

const CharacterList = ({ characters, addToFavorites, removeFromFavorites, favorites }) => {

  if (!characters || characters.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 text-lg">No se encontraron personajes.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-cyan-400">Personajes ({characters.length})</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {characters.map(character => (
          <CharacterCard
            key={character.id}
            character={character}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            isFavorite={favorites.some(fav => fav.id === character.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CharacterList;