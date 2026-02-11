import React, { useEffect, useState } from "react";
import GlobalApi from "../services/GlobalApi";
import { addToWatchlist } from "../utils/watcjlist";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    // 🚫 EMPTY SEARCH → NO RESULTS
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const delay = setTimeout(() => {
      GlobalApi.searchMulti(query).then((res) => {
        const filtered = res.data.results.filter(
          (item) =>
            (item.media_type === "movie" ||
              item.media_type === "tv") &&
            item.poster_path
        );
        setResults(filtered);
      });
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="p-4">
      {/* 🔍 SEARCH BAR */}
      <input
        type="text"
        placeholder="Search movies or series..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="
          w-full
          p-3
          rounded-lg
          bg-gray-900
          text-white
          placeholder-gray-400
          outline-none
          mb-6
        "
      />

      {/* RESULTS */}
      {results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {results.map((item) => (
            <div key={item.id} className="relative">
              {/* ❤️ WATCHLIST */}
              <button
                onClick={() =>
                  addToWatchlist({
                    id: item.id,
                    title: item.title || item.name,
                    poster: item.poster_path,
                    rating: item.vote_average,
                    type: item.media_type,
                  })
                }
                className="
                  absolute top-2 right-2
                  z-20
                  bg-black/80
                  text-white
                  w-8 h-8
                  flex items-center justify-center
                  rounded-full
                "
              >
                ❤️
              </button>

              {/* POSTER */}
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                className="rounded-lg w-full object-cover"
                alt={item.title || item.name}
              />

              {/* ⭐ RATING */}
              <span className="absolute top-2 left-2 bg-black/80 text-white px-2 py-0.5 text-xs rounded">
                ⭐ {item.vote_average?.toFixed(1) || "N/A"}
              </span>

              {/* TITLE */}
              <p className="mt-1 text-sm font-semibold text-center text-white">
                {item.title || item.name}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {query.trim() && results.length === 0 && (
        <p className="text-center text-gray-400 mt-10">
          No results found
        </p>
      )}
    </div>
  );
};

export default Search;
