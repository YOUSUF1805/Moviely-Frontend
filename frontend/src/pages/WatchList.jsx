import React, { useEffect, useState } from "react";
import {
  getWatchlist,
  removeFromWatchlist,
} from "../utils/watcjlist";

const Watchlist = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(getWatchlist());
  }, []);

  const removeItem = (id) => {
    removeFromWatchlist(id);
    setList(getWatchlist());
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">❤️ My Watchlist</h2>

      {list.length === 0 && (
        <p className="text-gray-500">No items added yet.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {list.map((item) => (
          <div key={item.id} className="relative">
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster}`}
              className="rounded-lg"
            />

            {/* ⭐ Rating */}
            <span className="absolute top-1 left-1 bg-black/70 text-white px-2 py-0.5 text-xs rounded">
              ⭐ {item.rating.toFixed(1)}
            </span>

            {/* ❌ Remove */}
            <button
              onClick={() => removeItem(item.id)}
              className="absolute top-1 right-1 bg-red-600 text-white px-2 rounded-full text-xs"
            >
              ✕
            </button>

            <p className="mt-1 text-sm font-semibold text-center">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
