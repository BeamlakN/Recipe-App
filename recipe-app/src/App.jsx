import { Routes, Route, Link } from 'react-router-dom';
import { AlertTriangle, RefreshCcw, Home as HomeIcon } from 'lucide-react';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';
import Navbar from './components/Navbar';
import ShoppingList from './pages/ShoppingList';

// 1. Simple Error Fallback Component
// This is what users see if the code itself crashes
function ErrorFallback() {
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl p-10 text-center border-2 border-orange-100">
        <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="text-red-500" size={40} />
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-2 uppercase italic">Oops! Something went wrong</h1>
        <p className="text-gray-500 mb-8 font-medium">
          We encountered an unexpected error. Please try refreshing the page or head back home.
        </p>
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 bg-orange-500 text-white font-bold py-4 rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-100"
          >
            <RefreshCcw size={20} /> Refresh Page
          </button>
          <Link 
            to="/"
            className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-bold py-4 rounded-2xl hover:bg-gray-200 transition-all"
          >
            <HomeIcon size={20} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

// 2. 404 Not Found Component
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <h1 className="text-9xl font-black text-orange-200 tracking-tighter">404</h1>
      <p className="text-2xl font-bold text-gray-800 -mt-8 mb-6 uppercase italic">This recipe is missing!</p>
      <Link to="/" className="bg-orange-500 text-white px-8 py-3 rounded-full font-black hover:bg-orange-600 transition-all shadow-lg">
        Go Back to Discover
      </Link>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-orange-50/50 flex flex-col">
      <Navbar />
      
      {/* 
         In a production app, you could wrap this entire block in an 
         <ErrorBoundary FallbackComponent={ErrorFallback}> from 'react-error-boundary'
      */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/favorites" element={<Favorites />} /> 
          <Route path="/shopping-list" element={<ShoppingList />} />
          
          {/* 3. Catch-all Route for 404s */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Optional Footer for that "Real App" feel */}
      <footer className="py-10 text-center text-gray-400 text-sm font-medium border-t border-orange-100 bg-white">
        <p>© 2026 RecipeChef • Built with React & TheMealDB</p>
      </footer>
    </div>
  );
}

export default App;