import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchRecipes, getCategories, getRecipesByCategory } from '../api/recipeApi';
import FavoriteButton from '../components/FavoriteButton';
import { useFavorites } from '../hooks/useFavorites';
import { Search, Loader2, UtensilsCrossed, Heart, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Beef'); // Default category

  const { toggleFavorite, isFavorite } = useFavorites();

  // Fetch Category List for the chips
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  // Main Recipe Query
  // Logic: If user is typing, use search. If not, use category filter.
  const { data: recipes, isLoading } = useQuery({
    queryKey: ['recipes', searchTerm, selectedCategory],
    queryFn: () => {
      if (searchTerm.length > 2) {
        return searchRecipes(searchTerm);
      }
      return getRecipesByCategory(selectedCategory);
    },
    // This query is always enabled because we have a default category
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 2) {
      setSelectedCategory(null); // Clear category highlights when searching
    }
  };

  return (
    <>
<div className="bg-white border-b border-orange-50 sticky top-[73px] z-20">
  <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center gap-4">
    {/* Search Input moved here */}
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
      <input
        type="text"
        value={searchTerm}
        placeholder="Search recipes (e.g. Pasta)..."
        className="w-full bg-gray-100 border-none rounded-full py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
        onChange={handleSearch}
      />
    </div>

    {/* Category Chips */}
    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar w-full">
      {categories?.map((cat) => (
        <button
          key={cat.strCategory}
          onClick={() => {
            setSelectedCategory(cat.strCategory);
            setSearchTerm('');
          }}
          className={`px-5 py-1.5 rounded-full whitespace-nowrap font-bold text-xs transition-all border-2 ${
            selectedCategory === cat.strCategory
              ? 'bg-orange-600 border-orange-600 text-white shadow-md'
              : 'bg-white border-orange-100 text-gray-500 hover:border-orange-300'
          }`}
        >
          {cat.strCategory}
        </button>
      ))}
    </div>
  </div>
</div>

      {/* CATEGORY CHIPS - Horizontal Scroll */}
      {/* <div className="bg-white border-b border-orange-50 sticky top-[73px] z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 text-orange-500 font-bold pr-4 border-r border-gray-100 shrink-0">
            <Flame size={18} />
            <span className="text-sm uppercase tracking-wider">Mood</span>
          </div>
          
          {categories?.map((cat) => (
            <button
              key={cat.strCategory}
              onClick={() => {
                setSelectedCategory(cat.strCategory);
                setSearchTerm(''); // Clear search when picking a category
              }}
              className={`px-6 py-2 rounded-full whitespace-nowrap font-bold text-sm transition-all border-2 ${
                selectedCategory === cat.strCategory
                  ? 'bg-orange-600 border-orange-600 text-white shadow-md scale-105'
                  : 'bg-white border-orange-100 text-gray-600 hover:border-orange-300'
              }`}
            >
              {cat.strCategory}
            </button>
          ))}
        </div>
      </div> */}

      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-black text-gray-800 mb-8 flex items-center gap-2 uppercase tracking-tight">
          {searchTerm ? `Results for "${searchTerm}"` : `${selectedCategory} Specials`}
        </h2>

        {isLoading ? (
          <div className="flex flex-col items-center mt-20">
             <Loader2 className="animate-spin text-orange-500 size-12" />
             <p className="mt-4 text-gray-400 font-medium">Fetching deliciousness...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {recipes?.map((recipe) => (
              <div 
                key={recipe.idMeal} 
                className="bg-white rounded-3xl shadow-sm border border-orange-50 overflow-hidden relative group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute top-3 right-3 z-10">
                  <FavoriteButton 
                    recipe={recipe}
                    isFavorite={isFavorite(recipe.idMeal)}
                    toggleFavorite={toggleFavorite}
                  />
                </div>

                <Link to={`/recipe/${recipe.idMeal}`}>
                  <div className="overflow-hidden h-52">
                    <img 
                      src={recipe.strMealThumb} 
                      alt={recipe.strMeal} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-800 text-lg line-clamp-1 mb-4 italic uppercase">
                      {recipe.strMeal}
                    </h3>
                    <div className="flex items-center justify-between bg-orange-500 text-white font-bold py-2.5 px-4 rounded-2xl group-hover:bg-orange-600 transition-colors">
                      View Recipe
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default Home;