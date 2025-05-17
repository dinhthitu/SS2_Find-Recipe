import React from 'react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          Your Wishlist
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mb-6">
          This is where your saved recipes will appear. Start adding recipes to your wishlist!
        </p>
        <Link to="/SearchRecipes" className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-full text-sm shadow-md">
          Explore Recipes
        </Link>
      </div>
    </div>
  );
};

export default Wishlist;