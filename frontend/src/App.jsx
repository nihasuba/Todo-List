import { useState } from 'react'
import './App.css'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './Indexx'
import Login from './Login'
import Register from './Register';
import Home from './Home';


function App() {
  

  return (
    <>
     
        
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='home/:userId' element={<Home />} />
        </Routes>
        </BrowserRouter>
      
    </>
  )
}

export default App
