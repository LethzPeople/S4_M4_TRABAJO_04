import { useState, useEffect, useCallback } from 'react';

const useFetch = (initialFetchFunction = null, initialParams = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para ejecutar la petición fetch
  const fetchData = useCallback(async (fetchFunction, params) => {
    if (!fetchFunction) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchFunction(params);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'Ha ocurrido un error');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialFetchFunction) {
      fetchData(initialFetchFunction, initialParams);
    }
  }, [initialFetchFunction, initialParams, fetchData]);

  return { data, loading, error, fetchData };
};

export default useFetch;