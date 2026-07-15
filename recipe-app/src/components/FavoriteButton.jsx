import { Heart } from 'lucide-react';

// Notice the "export default" here
export default function FavoriteButton({ recipe, isFavorite, toggleFavorite }) {
  return (
    <button
      onClick={(e) => {
        // These are crucial to prevent opening the recipe page when clicking the heart
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(recipe);
      }}
      className={`p-2 rounded-full transition-all cursor-pointer shadow-sm ${
        isFavorite 
          ? 'bg-red-500 text-white shadow-md' 
          : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500'
      }`}
    >
      <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
    </button>
  );
}