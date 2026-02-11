import React, { useEffect, useState } from "react";
import GlobalApi from "../services/GlobalApi";
import TrailerModal from "../components/TrailerModal";
import { addToWatchlist } from "../utils/watcjlist";
import Header from '../components/Header'

const Movies = () => {
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState(null);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    GlobalApi.getMovieGenres.then((res) => {
      setGenres(res.data.genres);
      setGenreId(res.data.genres[0].id);
    });
  }, []);

  useEffect(() => {
    if (genreId) {
      GlobalApi.getMoviesGenreById(genreId, page).then((res) => {
        setMovies((prev) =>
          page === 1 ? res.data.results : [...prev, ...res.data.results]
        );
      });
    }
  }, [genreId, page]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        setPage((p) => p + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openTrailer = (id) => {
    GlobalApi.getMovieTrailer(id).then((res) => {
      const trailer = res.data.results.find((v) => v.type === "Trailer");
      if (trailer) setTrailerKey(trailer.key);
    });
  };

 return (
  <div className="p-3 sm:p-4">
    {/* GENRES */}
    <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
      {genres.map((g) => (
        <button
          key={g.id}
          onClick={() => {
            setGenreId(g.id);
            setMovies([]);
            setPage(1);
          }}
          className={`px-4 py-2 text-sm sm:text-base rounded-full whitespace-nowrap transition
            ${
              genreId === g.id
                ? "bg-red-600 text-black"
                : "bg-gray-200 active:scale-95 text-black"
            }`}
        >
          {g.name}
        </button>
      ))}
    </div>

    {/* MOVIES GRID */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
      {movies.map((m) => (
       <div
  key={m.id}
  onClick={() => openTrailer(m.id)}
  className="relative cursor-pointer transition hover:scale-105"
>
  {/* ❤️ WATCHLIST BUTTON */}
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
    className="
      absolute top-2 right-2 
      z-20 
      bg-black/80 text-white 
      w-8 h-8 
      flex items-center justify-center
      rounded-full
      active:scale-90
    "
  >
    ❤️
  </button>

  {/* POSTER IMAGE */}
  <img
    src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
    className="rounded-lg w-full object-cover pointer-events-none"
  />

  {/* ⭐ RATING */}
  <span className="
    absolute top-2 left-2 
    z-20
    bg-black/80 text-white 
    px-2 py-0.5 
    text-xs rounded
  ">
    ⭐ {m.vote_average.toFixed(1)}
  </span>
</div>


      ))}
    </div>

    <TrailerModal trailerKey={trailerKey} onClose={() => setTrailerKey(null)} />
  </div>
);
}

export default Movies;
