import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchRecipes, getCategories, getRecipesByCategory } from '../api/recipeApi';
import FavoriteButton from '../components/FavoriteButton';
import { useFavorites } from '../hooks/useFavorites';
import { Search, Loader2, Flame, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Beef');

  const { toggleFavorite, isFavorite } = useFavorites();

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const { data: recipes, isLoading } = useQuery({
    queryKey: ['recipes', searchTerm, selectedCategory],
    queryFn: () => {
      if (searchTerm.length > 2) {
        return searchRecipes(searchTerm);
      }
      return getRecipesByCategory(selectedCategory);
    },
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 2) {
      setSelectedCategory(null);
    }
  };

  return (
    <div className="pb-20">
      {/* SEARCH & FILTER SECTION */}
      <div className="bg-white border-b border-orange-100 sticky top-[64px] md:top-[73px] z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Search Input */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
              <input
                type="text"
                value={searchTerm}
                placeholder="What do you want to cook?"
                className="w-full bg-gray-50 border-2 border-transparent focus:border-orange-500 rounded-2xl py-3 pl-12 pr-4 outline-none transition-all shadow-inner"
                onChange={handleSearch}
              />
            </div>

            {/* Category Chips Container */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar w-full pb-2 md:pb-0">
              <div className="flex items-center gap-2 text-orange-500 font-bold pr-4 border-r border-orange-100 shrink-0">
                <Flame size={20} />
                <span className="text-xs uppercase tracking-tighter">Categories</span>
              </div>
              {categories?.map((cat) => (
                <button
                  key={cat.strCategory}
                  onClick={() => {
                    setSelectedCategory(cat.strCategory);
                    setSearchTerm('');
                  }}
                  className={`px-6 py-2 rounded-xl whitespace-nowrap font-bold text-sm transition-all ${
                    selectedCategory === cat.strCategory
                      ? 'bg-orange-600 text-white shadow-lg shadow-orange-200'
                      : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                  }`}
                >
                  {cat.strCategory}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
            {searchTerm ? `Search: ${searchTerm}` : `${selectedCategory} Selection`}
          </h2>
          <span className="text-gray-400 font-medium">{recipes?.length || 0} Recipes</span>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center mt-20">
             <Loader2 className="animate-spin text-orange-500 size-12" />
             <p className="mt-4 text-gray-500 font-bold animate-pulse text-lg italic">Gathering Ingredients...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {recipes?.map((recipe) => (
              <div 
                key={recipe.idMeal} 
                className="group bg-white rounded-[2rem] border border-orange-50 overflow-hidden relative hover:shadow-2xl transition-all duration-500"
              >
                <div className="absolute top-4 right-4 z-10">
                  <FavoriteButton 
                    recipe={recipe}
                    isFavorite={isFavorite(recipe.idMeal)}
                    toggleFavorite={toggleFavorite}
                  />
                </div>

                <Link to={`/recipe/${recipe.idMeal}`}>
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src={recipe.strMealThumb} 
                      alt={recipe.strMeal} 
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                       <span className="text-white font-bold flex items-center gap-2 text-sm uppercase tracking-widest">
                         <Utensils size={16}/> Cook this meal
                       </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-black text-gray-800 text-xl line-clamp-2 leading-tight uppercase italic mb-4">
                      {recipe.strMeal}
                    </h3>
                    <div className="w-full text-center border-2 border-orange-500 text-orange-600 font-bold py-3 rounded-2xl group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                      View Full Recipe
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;