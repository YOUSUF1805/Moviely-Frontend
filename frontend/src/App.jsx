import React from 'react'
import Home from './pages/Home'
import {Route,Routes} from 'react-router-dom'
import Movies from './pages/Movies'
import Series from './pages/Series'
import WatchList from './pages/WatchList'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Search from './pages/Search'
import ProtectedRoute from './components/ProtectedRoute'
import AuthRedirect from './components/AuthRedirect'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/movies' element={<ProtectedRoute><Movies/></ProtectedRoute>}/>
      <Route path='/series' element={<ProtectedRoute><Series/></ProtectedRoute>}/>
      <Route path='/watchlist' element={<WatchList/>}/>
      <Route path='/login' element={<AuthRedirect><Login/></AuthRedirect>}/>
      <Route path='/signup' element={<AuthRedirect><SignUp/></AuthRedirect>}/>
      <Route path='/search' element={<ProtectedRoute><Search/></ProtectedRoute>}/>
    </Routes>
    </>
  )
}

export default App