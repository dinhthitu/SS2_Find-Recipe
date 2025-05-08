import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Features from "./components/features";
import Product from "./components/product";
import AboutUs from "./components/AboutUs";
import Login from "./components/login";
import Signup from "./components/signup";
import SearchRecipes from './components/SearchRecipes';
import RecipeDetails from './components/RecipeDetails';
import Wishlist from "./components/Wishlist";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Product" element={<Product />} />  
        <Route path="/Features" element={<Features />} />
        <Route path = "/AboutUs" element = {<AboutUs />} />
        <Route path = "/Login" element = {<Login />} />
        <Route path = "/Signup" element = {<Signup />} />
        <Route path = "/SearchRecipes" element = {<SearchRecipes/>}/>
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/Wishlist" element={<Wishlist />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
