import React from 'react'
import genere from '../constant/GenresList'
import MoviesList from './MoviesList'

const GenresList = () => {
  return (
    <div className="mt-3">
      {genere.map((item, index) => (
        <div 
          key={item.id}
          className="px-4 py-3 md:px-16 md:py-6"
        >
          {/* Genre Title */}
          <h1 className="text-[16px] md:text-[20px] text-white font-bold mb-2">
            {item.name}
          </h1>

          {/* Movie List */}
          <MoviesList genreId={item.id} index_={index} />
        </div>
      ))}
    </div>
  )
}

export default GenresList
