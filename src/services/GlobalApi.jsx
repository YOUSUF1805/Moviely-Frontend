import axios from "axios";

const baseUrl = "https://api.themoviedb.org/3";
const api_key = "d33aedcb6fdd966493c4340f13f121cd";

const getTrendingVideos=axios.get(baseUrl+"/trending/all/day?api_key="+api_key)

// Movies
const getMoviesGenreById = (genre, page = 1) =>
  axios.get(
    `${baseUrl}/discover/movie?api_key=${api_key}&with_genres=${genre}&page=${page}`
  );

const getMovieGenres = axios.get(
  `${baseUrl}/genre/movie/list?api_key=${api_key}`
);

const getMovieTrailer = (id) =>
  axios.get(
    `${baseUrl}/movie/${id}/videos?api_key=${api_key}`
  );

// TV Series
const getSeriesGenreById = (genre, page = 1) =>
  axios.get(
    `${baseUrl}/discover/tv?api_key=${api_key}&with_genres=${genre}&page=${page}`
  );

const getSeriesGenres = axios.get(
  `${baseUrl}/genre/tv/list?api_key=${api_key}`
);

const getSeriesTrailer = (id) =>
  axios.get(
    `${baseUrl}/tv/${id}/videos?api_key=${api_key}`
  );

//Search
const searchMulti = (query) =>
  axios.get(
    `${baseUrl}/search/multi?api_key=${api_key}&query=${query}`
  );

export default {
  getMoviesGenreById,
  getMovieGenres,
  getMovieTrailer,
  getSeriesGenreById,
  getSeriesGenres,
  getSeriesTrailer,
  getTrendingVideos,
  searchMulti,
};
