import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';
import Navbar from './components/Navbar';
import ShoppingList from './pages/ShoppingList';


function App() {
  return (
    <div className="min-h-screen bg-orange-50/50">
         <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
         <Route path="/favorites" element={<Favorites />} /> 
          <Route path="/shopping-list" element={<ShoppingList />} />
      </Routes>
    </div>
  );
}

export default App;