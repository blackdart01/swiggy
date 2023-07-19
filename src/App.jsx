import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import MainPage from './Pages/MainPage'
import RestroMenu from './Pages/RestroMenu'
import Product from './Components/Product'
import { CartProvider } from './Components/cartContext'
import Cart from './Pages/Cart'
import Cards from './Components/Cards'
import Login from './Pages/Login'
import Signup from './Pages/Signup'



function App() {

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/restroMenu/:id" element={<RestroMenu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App

