import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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

export const getCategories = async () => {
  const { data } = await api.get('list.php?c=list');
  return data.meals || [];
};

export const getRecipesByCategory = async (category) => {
  const { data } = await api.get(`filter.php?c=${category}`);
  return data.meals || [];
};

export const getRandomRecipe = async () => {
  const { data } = await api.get('random.php');
  return data.meals?.[0];
};