import React, { useEffect, useState } from "react";
import GlobalApi from "../services/GlobalApi";
import TrailerModal from "./TrailerModal";
import { addToWatchlist } from "../utils/watcjlist";

const MoviesList = ({ genreId }) => {
  const [movies, setMovies] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    if (genreId) {
      GlobalApi.getMoviesGenreById(genreId, 1).then((res) => {
        setMovies(res.data.results);
      });
    }
  }, [genreId]);

  const openTrailer = (id) => {
    GlobalApi.getMovieTrailer(id).then((res) => {
      const trailer = res.data.results.find(
        (v) => v.type === "Trailer"
      );
      if (trailer) setTrailerKey(trailer.key);
    });
  };

  return (
    <>
      {/* MOVIES ROW */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        {movies.map((m) => (
          <div
            key={m.id}
            onClick={() => openTrailer(m.id)}
            className="relative min-w-[120px] sm:min-w-[150px] cursor-pointer transition hover:scale-105"
          >
            {/* ❤️ WATCHLIST */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToWatchlist({
                  id: m.id,
                  title: m.title,
                  poster: m.poster_path,
                  rating: m.vote_average,
                  type: "movie",
                });
              }}
              className="absolute top-2 right-2 z-20 bg-black/80 text-white w-7 h-7 rounded-full flex items-center justify-center"
            >
              ❤️
            </button>

            {/* POSTER */}
            <img
              src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
              className=" rounded-xl w-full h-[240px] sm:h-[260px] object-cover"
            />

            {/* ⭐ RATING */}
            <span className="absolute top-2 left-2 bg-black/80 text-white px-2 py-0.5 text-xs rounded">
              ⭐ {m.vote_average.toFixed(1)}
            </span>
          </div>
        ))}
      </div>

      {/* TRAILER MODAL */}
      <TrailerModal
        trailerKey={trailerKey}
        onClose={() => setTrailerKey(null)}
      />
    </>
  );
};

export default MoviesList;
