import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../lib/db';
import { Heart, Sparkles } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const createCard = async () => {
    setLoading(true);
    // tailored for no auth: simple random ID
    const id = Math.random().toString(36).substring(2, 10); 
    
    try {
      await db.query('INSERT INTO cards (id, status) VALUES ($1, $2)', [id, 'waiting']);
      navigate(`/track/${id}`);
    } catch (error) {
      console.error('Error creating card:', error);
      alert('Failed to create card. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF2F8] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Background blobs */}
       <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#FFD1DC] blur-[100px] opacity-50" />
       <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#FFE4E1] blur-[100px] opacity-50" />

      <div className="relative z-10 max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 text-center">
        <div className="mb-6 inline-flex p-3 rounded-full bg-red-50 text-red-500">
           <Heart className="w-8 h-8 fill-current animate-pulse" />
        </div>
        
        <h1 className="font-display text-4xl font-bold text-gray-800 mb-4">
          Ask your Valentine
        </h1>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Create a magical, interactive card to ask that special someone. 
          Send them the link and track their answer!
        </p>

        <button
          onClick={createCard}
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-red-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
        >
           {loading ? 'Creating...' : (
             <>
               <span>Create My Card</span>
               <Sparkles className="w-5 h-5 group-hover:animate-spin-slow" />
             </>
           )}
        </button>
      </div>
    </div>
  );
};

export default HomePage;
