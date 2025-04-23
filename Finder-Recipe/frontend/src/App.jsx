import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Features from "./components/features";
import Product from "./components/product";
import About from "./components/about";
import Login from "./components/login";
import Signup from "./components/signup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Product" element={<Product />} />  
        <Route path="/Features" element={<Features />} />
        <Route path = "/About" element = {<About />} />
        <Route path = "/Login" element = {<Login />} />
        <Route path = "/Signup" element = {<Signup />} />

        </Routes>
    </BrowserRouter>
  );
};

export default App;
