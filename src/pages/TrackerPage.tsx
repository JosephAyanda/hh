import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../lib/db';
import { Heart, Copy, ExternalLink, RefreshCw } from 'lucide-react';

const TrackerPage = () => {
  const { id } = useParams();
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const valentineLink = `${window.location.origin}/u/${id}`;

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const result = await db.query('SELECT status FROM cards WHERE id = $1', [id]);
      if (result.rows.length > 0) {
        setStatus(result.rows[0].status);
      }
    } catch (error) {
      console.error('Error fetching status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    // Poll every 5 seconds
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, [id]);

  const copyLink = () => {
    navigator.clipboard.writeText(valentineLink);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white text-center">
           <h2 className="text-2xl font-bold">Valentine Tracker</h2>
           <p className="opacity-90 text-sm mt-1">Secret Key: {id}</p>
        </div>

        <div className="p-8">
            <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Your Valentine Link
                </label>
                <div className="flex gap-2">
                    <input 
                        readOnly 
                        value={valentineLink} 
                        className="flex-1 bg-gray-50 border border-gray-200 text-gray-600 text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <button 
                        onClick={copyLink}
                        className="p-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                        title="Copy"
                    >
                        <Copy className="w-5 h-5" />
                    </button>
                    <a 
                        href={valentineLink}
                        target="_blank"
                        className="p-3 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200 transition-colors"
                        title="Open"
                    >
                        <ExternalLink className="w-5 h-5" />
                    </a>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    Send this link to your valentine. Do not share this tracker page!
                </p>
            </div>

            <div className="border-t border-gray-100 pt-8 text-center">
                <h3 className="text-gray-900 font-semibold mb-4">Current Status</h3>
                
                {loading && !status ? (
                    <div className="animate-pulse flex justify-center">
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    </div>
                ) : (
                    <div className={`inline-flex flex-col items-center justify-center p-6 rounded-2xl transition-all ${
                        status === 'yes' ? 'bg-green-50 text-green-600' :
                        status === 'no' ? 'bg-red-50 text-red-600' :
                        'bg-yellow-50 text-yellow-600'
                    }`}>
                        {status === 'yes' && <Heart className="w-12 h-12 mb-2 fill-current animate-bounce" />}
                        {status === 'no' && <span className="text-4xl mb-2">💔</span>}
                        {status === 'waiting' && <RefreshCw className="w-12 h-12 mb-2 animate-spin" />}
                        
                        <span className="text-xl font-bold uppercase tracking-wider">
                            {status === 'waiting' ? 'Waiting...' : `They said ${status}!`}
                        </span>
                    </div>
                )}
            </div>
            
            <div className="mt-8 text-center text-gray-400 text-sm">
                Status updates automatically every 5 seconds.
            </div>
        </div>
      </div>
    </div>
  );
};

export default TrackerPage;
