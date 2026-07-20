import { useState } from 'react'; // Added useState
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRecipeById } from '../api/recipeApi';
import { useShoppingList } from '../hooks/useShoppingList'; // Added Hook
import { 
  ArrowLeft, 
  Globe, 
  Utensils, 
  Clock, 
  PlayCircle, 
  CheckCircle2, 
  ShoppingCart, 
  CheckCircle 
} from 'lucide-react';

function RecipeDetail() {
  const { id } = useParams();
  const [isAdded, setIsAdded] = useState(false); // Feedback state
  const { addIngredients } = useShoppingList(); // Initialize shopping list logic

  const { data: recipe, isLoading } = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => getRecipeById(id),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <Clock className="animate-spin text-orange-500 mb-4" size={48} />
        <p className="text-gray-500 font-medium">Loading your recipe...</p>
      </div>
    );
  }

  if (!recipe) return <div className="text-center mt-20 text-red-500 font-bold">Recipe not found.</div>;

  // 1. Extract ingredients and measures into a clean array
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const name = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (name && name.trim()) {
      ingredients.push({ name, measure });
    }
  }

  // 2. Turn the instruction string into an array of steps
  const steps = recipe.strInstructions
    .split(/\r?\n/)
    .filter(step => step.trim().length > 5);

  // 3. Handler for Shopping List
  const handleAddToList = () => {
    addIngredients(recipe.strMeal, ingredients);
    setIsAdded(true);
    // Reset the button text after 2 seconds
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 pb-20">
      {/* Top Navigation */}
      <Link to="/" className="inline-flex items-center gap-2 text-orange-600 font-bold mb-8 hover:text-orange-700 transition-colors bg-orange-50 px-4 py-2 rounded-full shadow-sm">
        <ArrowLeft size={20} /> Back to Discover
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Image and Meta */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <img 
              src={recipe.strMealThumb} 
              alt={recipe.strMeal} 
              className="w-full rounded-[2.5rem] shadow-2xl object-cover h-[400px] mb-6 border-4 border-white" 
            />
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-2xl text-sm font-bold">
                <Utensils size={18} /> {recipe.strCategory}
              </span>
              <span className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-2xl text-sm font-bold">
                <Globe size={18} /> {recipe.strArea}
              </span>
            </div>

            {recipe.strYoutube && (
              <a 
                href={recipe.strYoutube} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-red-200"
              >
                <PlayCircle size={24} /> Watch Video Tutorial
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Title, Ingredients, Steps */}
        <div className="lg:col-span-7">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight italic">
            {recipe.strMeal}
          </h1>

          {/* Ingredients Section with Shopping List Button */}
          <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-orange-100 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
                <CheckCircle2 className="text-orange-500" /> Ingredients
              </h2>
              
              {/* Added to Shopping List Button */}
              <button 
                onClick={handleAddToList}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all transform active:scale-95 shadow-md ${
                  isAdded 
                    ? 'bg-green-500 text-white shadow-green-100' 
                    : 'bg-orange-500 text-white hover:bg-orange-600 shadow-orange-100'
                }`}
              >
                {isAdded ? (
                  <>
                    <CheckCircle size={20} />
                    <span>Added to List!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    <span>Add to Grocery List</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {ingredients.map((ing, index) => (
                <div key={index} className="flex justify-between items-center border-b border-gray-50 pb-2">
                  <span className="text-gray-700 font-medium">{ing.name}</span>
                  <span className="text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded text-sm italic">
                    {ing.measure}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions List */}
          <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-orange-100">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">Preparation Steps</h2>
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-6 relative group">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-black shadow-md shadow-orange-200 z-10">
                      {index + 1}
                    </div>
                    {index !== steps.length - 1 && (
                      <div className="w-0.5 h-full bg-orange-100 absolute top-10"></div>
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="text-gray-700 leading-relaxed text-lg font-medium">
                      {step.trim()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;