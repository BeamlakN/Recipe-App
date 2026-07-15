import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1/',
});

export const searchRecipes = async (term) => {
  if (!term) return [];
  const { data } = await api.get(`search.php?s=${term}`);
  return data.meals || [];
};

export const getRecipeById = async (id) => {
  const { data } = await api.get(`lookup.php?i=${id}`);
  return data.meals?.[0];
};

// 1. Get the list of all categories (for the chips)
export const getCategories = async () => {
  const { data } = await api.get('list.php?c=list');
  return data.meals || [];
};

// 2. Filter recipes by a specific category
export const getRecipesByCategory = async (category) => {
  const { data } = await api.get(`filter.php?c=${category}`);
  return data.meals || [];
};
// Add this to src/api/recipeApi.js
export const getRandomRecipe = async () => {
  const { data } = await api.get('random.php');
  return data.meals?.[0]; // Returns the single random meal object
};