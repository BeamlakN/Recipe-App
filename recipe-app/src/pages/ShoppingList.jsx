import { useShoppingList } from '../hooks/useShoppingList';
import { Trash2, ShoppingBasket, CheckCircle, Circle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ShoppingList() {
  const { list, toggleItem, removeItem, clearList } = useShoppingList();

  return (
    <div className="max-w-3xl mx-auto p-6 pb-20">
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="text-orange-600 font-bold flex items-center gap-2">
          <ArrowLeft size={20} /> Browse More
        </Link>
        <button 
          onClick={clearList}
          className="text-red-500 text-sm font-bold hover:underline"
        >
          Clear All Items
        </button>
      </div>

      <h1 className="text-4xl font-black text-gray-900 mb-8 uppercase italic tracking-tighter">
        Grocery List <span className="text-orange-500">({list.length})</span>
      </h1>

      {list.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-orange-100">
          <ShoppingBasket size={64} className="mx-auto mb-4 text-orange-200" />
          <p className="text-gray-500 font-medium">Your shopping list is empty!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {list.map((item) => (
            <div 
              key={item.id} 
              className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${
                item.completed ? 'bg-gray-50 border-transparent opacity-60' : 'bg-white border-orange-100 shadow-sm'
              }`}
            >
              <div 
                className="flex items-center gap-4 cursor-pointer flex-1"
                onClick={() => toggleItem(item.id)}
              >
                {item.completed ? (
                  <CheckCircle className="text-green-500" />
                ) : (
                  <Circle className="text-orange-300" />
                )}
                <div>
                  <p className={`font-bold text-lg ${item.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {item.name}
                  </p>
                  <p className="text-orange-500 text-sm font-medium">{item.measure} — <span className="text-gray-400 font-normal">{item.recipeName}</span></p>
                </div>
              </div>
              <button 
                onClick={() => removeItem(item.id)}
                className="text-gray-300 hover:text-red-500 transition-colors p-2"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}