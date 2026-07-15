import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UtensilsCrossed, Heart, Dices, Loader2 } from 'lucide-react';
import { getRandomRecipe } from '../api/recipeApi';

export default function Navbar() {
  const navigate = useNavigate();
  const [isSurprising, setIsSurprising] = useState(false);

  const handleSurpriseMe = async () => {
    try {
      setIsSurprising(true);
      const randomRecipe = await getRandomRecipe();
      if (randomRecipe) {
        navigate(`/recipe/${randomRecipe.idMeal}`);
      }
    } catch (error) {
      console.error("Failed to get a surprise recipe", error);
    } finally {
      setIsSurprising(false);
    }
  };

  return (
    <nav className="bg-white border-b border-orange-100 p-4 sticky top-0 z-30 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 md:gap-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-orange-600 font-bold text-xl md:text-2xl shrink-0">
          <UtensilsCrossed />
          <span className="hidden sm:inline italic">RecipeChef</span>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={handleSurpriseMe}
            disabled={isSurprising}
            className="flex items-center gap-2 bg-amber-100 text-amber-700 px-3 md:px-5 py-2.5 rounded-full font-bold hover:bg-amber-200 transition-all shadow-sm disabled:opacity-50"
          >
            {isSurprising ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Dices size={20} />
            )}
            <span className="hidden md:inline font-black uppercase tracking-tight">Surprise Me</span>
          </button>

          <Link 
            to="/favorites" 
            className="flex items-center gap-2 bg-orange-500 text-white px-3 md:px-5 py-2.5 rounded-full font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-100"
          >
            <Heart size={20} fill="currentColor" />
            <span className="hidden md:inline font-black uppercase tracking-tight">Favorites</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}