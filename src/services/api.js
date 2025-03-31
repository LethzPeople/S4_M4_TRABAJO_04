const BASE_URL = 'https://rickandmortyapi.com/api';


export const searchCharacters = async (name, page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/character/?name=${name}&page=${page}`);
    
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al buscar personajes:", error);
    throw error;
  }
};


export const getCharacterById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/character/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener el personaje:", error);
    throw error;
  }
};


export const getMultipleCharacters = async (count = 5) => {
  try {
    
    const maxId = 826;
    const randomIds = Array.from({ length: count }, () => 
      Math.floor(Math.random() * maxId) + 1
    );
    
    const response = await fetch(`${BASE_URL}/character/${randomIds}`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [data]; 
  } catch (error) {
    console.error("Error al obtener personajes:", error);
    throw error;
  }
};