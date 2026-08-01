import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('foodfinder-favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('foodfinder-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = useCallback((recipeId) => {
    setFavorites(prev => {
      if (prev.includes(recipeId)) return prev;
      return [...prev, recipeId];
    });
  }, []);

  const removeFavorite = useCallback((recipeId) => {
    setFavorites(prev => prev.filter(id => id !== recipeId));
  }, []);

  const toggleFavorite = useCallback((recipeId) => {
    setFavorites(prev =>
      prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  }, []);

  const isFavorite = useCallback((recipeId) => {
    return favorites.includes(recipeId);
  }, [favorites]);

  const favoritesCount = favorites.length;

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorite,
      favoritesCount,
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
}
