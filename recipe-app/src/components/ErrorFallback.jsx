import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl p-10 text-center border-2 border-orange-100">
        <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="text-red-500" size={40} />
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-2 uppercase italic">Oops! Something went wrong</h1>
        <p className="text-gray-500 mb-8 font-medium text-sm">
          {error.message}
        </p>
        <button 
          onClick={resetErrorBoundary}
          className="flex items-center justify-center gap-2 w-full bg-orange-500 text-white font-bold py-4 rounded-2xl hover:bg-orange-600 transition-all shadow-lg"
        >
          <RefreshCcw size={20} /> Try Again
        </button>
      </div>
    </div>
  );
}