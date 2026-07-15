import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('recipe-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('recipe-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (recipe) => {
    setFavorites((prev) => {
      const isFav = prev.find((fav) => fav.idMeal === recipe.idMeal);
      if (isFav) {
        return prev.filter((fav) => fav.idMeal !== recipe.idMeal);
      } else {
        return [...prev, recipe];
      }
    });
  };

  const isFavorite = (id) => favorites.some((fav) => fav.idMeal === id);

  return { favorites, toggleFavorite, isFavorite };
};