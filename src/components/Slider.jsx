import React, { useEffect, useState,useRef } from 'react'
import GlobalApi from '../services/GlobalApi'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
const IMAGE_BASE_URL='https://image.tmdb.org/t/p/original'
const screenWidth=window.innerWidth
const Slider = () => {
  const[moviesList,setMoviesList]=useState([])
  const elementRef=useRef();
  useEffect(()=>{
    getTrendingMovies()
  },[])
  const getTrendingMovies=()=>{
    GlobalApi.getTrendingVideos.then(resp=>{
        console.log(resp.data.results)
        setMoviesList(resp.data.results)
    })
  }

  const sliderLeft=(element)=>{
    element.scrollLeft-=screenWidth-110;
  }
   const sliderRight=(element)=>{
    element.scrollLeft+=screenWidth-110;
  }
  return (
    <div>
      <HiChevronLeft className="hidden md:block text-white text-[30px] absolute
        mx-8 mt-[150px] cursor-pointer " 
        onClick={()=>sliderLeft(elementRef.current)}/>
        <HiChevronRight className='hidden md:block text-white text-[30px] absolute
        mx-8 mt-[150px] cursor-pointer right-0' 
        onClick={()=>sliderRight(elementRef.current)}/>
   <div
  ref={elementRef}
  className="flex overflow-x-auto w-full px-16 py-4 scrollbar-hide scroll-smooth"
>
  {moviesList.map((item) => (
    <div
      key={item.id}
      className="min-w-full mr-5 rounded-xl overflow-hidden"
    >
      <div className="w-full h-[280px] md:h-[380px] bg-black">
        <img
          src={IMAGE_BASE_URL + item.backdrop_path}
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  ))}
</div>

    </div>
  )
}

export default Slider