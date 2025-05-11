import { useState } from 'react'
import './App.css'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login'
import Register from './Register';
import Home from './Home';
import Indexx from './Indexx';
import Nav from './Nav';
import OTP from './OTP';


function App() {
  

  return (
    <>
     
        
        <BrowserRouter>
        {/* <Nav /> */}
        <Routes>
          <Route path='/' element={<Indexx />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='home/:userId' element={<Home />} />
          <Route path='otp' element={<OTP />} />
        </Routes>
        </BrowserRouter>
      
    </>
  )
}

export default App
