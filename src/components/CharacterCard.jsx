import React, { useState } from 'react';

const CharacterCard = ({ character, addToFavorites, removeFromFavorites, isFavorite }) => {
  const [showDetails, setShowDetails] = useState(false);
  

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(character.id);
    } else {
      addToFavorites(character);
    }
  };

  return (
    <div className="bg-black rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <img 
        src={character.image} 
        alt={character.name}
        className="w-full h-64 object-cover"
      />
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-cyan-400 mb-2">{character.name}</h3>
        
        <div className="flex items-center mb-3">
          <span 
            className={`inline-block w-3 h-3 rounded-full mr-2 ${
              character.status === 'Alive' ? 'bg-green-500' : 
              character.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500'
            }`}
          ></span>
          <span className="text-white">
            {character.status} - {character.species}
          </span>
        </div>
        
        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="text-green-600 hover:text-green-800 text-sm font-medium mb-3"
        >
          {showDetails ? 'Ocultar detalles' : 'Ver detalles'}
        </button>
        
        {showDetails && (
          <div className="mt-2 text-sm text-white space-y-1 bg-black border border-green-400 p-2 rounded">
            <p><span className="font-medium">Género:</span> {character.gender}</p>
            <p><span className="font-medium">Origen:</span> {character.origin.name}</p>
            <p><span className="font-medium">Ubicación:</span> {character.location.name}</p>
            <p><span className="font-medium">Creado:</span> {new Date(character.created).toLocaleDateString()}</p>
          </div>
        )}
        
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleFavoriteToggle}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isFavorite 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-green-100 text-black hover:bg-green-500'
            }`}
          >
            {isFavorite ? '❤️ Quitar de favoritos' : '🤍 Añadir a favoritos'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;