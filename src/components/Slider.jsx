import React, { useEffect, useState, useRef } from "react";
import GlobalApi from "../services/GlobalApi";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const Slider = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    getTrendingMovies();
  }, []);

  useEffect(() => {
    if (moviesList.length === 0) return;

    const interval = setInterval(() => {
      handleNext();
    }, 4000); // auto-slide every 4s

    return () => clearInterval(interval);
  }, [currentIndex, moviesList]);

  const getTrendingMovies = () => {
    GlobalApi.getTrendingVideos.then((resp) => {
      setMoviesList(resp.data.results);
    });
  };

  const handleNext = () => {
    const nextIndex =
      currentIndex === moviesList.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
    elementRef.current.scrollTo({
      left: nextIndex * elementRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    const prevIndex =
      currentIndex === 0 ? moviesList.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    elementRef.current.scrollTo({
      left: prevIndex * elementRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full">

      {/* Left Arrow */}
      <HiChevronLeft
        className="hidden md:block text-white text-3xl absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer z-20"
        onClick={handlePrev}
      />

      {/* Right Arrow */}
      <HiChevronRight
        className="hidden md:block text-white text-3xl absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer z-20"
        onClick={handleNext}
      />

      {/* Slider */}
      <div
        ref={elementRef}
        className="flex overflow-hidden w-full scroll-smooth"
      >
        {moviesList.map((item) => (
          <div
            key={item.id}
            className="min-w-full relative"
          >
            <img
              src={IMAGE_BASE_URL + item.backdrop_path}
              className="w-full h-[300px] md:h-[450px] object-cover"
              alt={item.title}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Movie Title */}
            <div className="absolute bottom-10 left-6 md:left-16 text-white">
              <h2 className="text-xl md:text-3xl font-bold">
                {item.title || item.name}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {moviesList.map((_, index) => (
          <div
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              elementRef.current.scrollTo({
                left: index * elementRef.current.clientWidth,
                behavior: "smooth",
              });
            }}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentIndex === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
