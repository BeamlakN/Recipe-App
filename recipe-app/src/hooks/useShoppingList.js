import { useState, useEffect } from 'react';

export const useShoppingList = () => {
  const [list, setList] = useState(() => {
    const saved = localStorage.getItem('recipe-shopping-list');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('recipe-shopping-list', JSON.stringify(list));
  }, [list]);

  const addIngredients = (recipeName, ingredients) => {
    const newItems = ingredients.map((ing) => ({
      id: crypto.randomUUID(),
      recipeName,
      name: ing.name,
      measure: ing.measure,
      completed: false,
    }));
    setList((prev) => [...prev, ...newItems]);
  };

  const toggleItem = (id) => {
    setList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const removeItem = (id) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  const clearList = () => setList([]);

  return { list, addIngredients, toggleItem, removeItem, clearList };
};