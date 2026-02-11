import React from 'react'
import Header from '../components/Header'
import Slider from '../components/Slider'
import GenresList from '../components/GenresList'

const Home = () => {
  return (
    <div>
        <Header/>
        <Slider/>
        <GenresList/>
    </div>
  )
}

export default Home