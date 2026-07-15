import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { ArrowLeft, HeartOff } from 'lucide-react';
import FavoriteButton from '../components/FavoriteButton';

export default function Favorites() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Search
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">
          My Favorites <span className="text-orange-500">({favorites.length})</span>
        </h1>
      </div>

      {/* Grid Section */}
      {favorites.length === 0 ? (
        <div className="text-center mt-20 bg-white p-12 rounded-3xl border border-dashed border-gray-200">
          <HeartOff size={64} className="mx-auto mb-4 text-gray-300" />
          <p className="text-xl font-medium text-gray-500">Your cookbook is empty!</p>
          <p className="text-gray-400 mb-6">Start hearting recipes to see them here.</p>
          <Link 
            to="/" 
            className="bg-orange-500 text-white px-6 py-2 rounded-full font-bold hover:bg-orange-600 transition-colors"
          >
            Find Recipes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((recipe) => (
            <div 
              key={recipe.idMeal} 
              className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden relative group hover:shadow-md transition-shadow"
            >
              {/* Heart Button Overlay */}
              <div className="absolute top-3 right-3 z-10">
                <FavoriteButton 
                  recipe={recipe} 
                  isFavorite={isFavorite(recipe.idMeal)} 
                  toggleFavorite={toggleFavorite} 
                />
              </div>
              
              <Link to={`/recipe/${recipe.idMeal}`}>
                <div className="overflow-hidden">
                  <img 
                    src={recipe.strMealThumb} 
                    alt={recipe.strMeal} 
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 truncate mb-1">{recipe.strMeal}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-500 text-sm italic">{recipe.strCategory}</p>
                    <span className="text-orange-500 text-[10px] uppercase tracking-wider font-bold bg-orange-50 px-2 py-0.5 rounded">
                      {recipe.strArea}
                    </span>
                  </div>
                  
                  {/* THE ADDED BUTTON */}
                  <div className="w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-xl transition-colors">
                    View Recipe
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}