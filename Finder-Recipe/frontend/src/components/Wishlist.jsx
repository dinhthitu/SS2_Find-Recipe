import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import moreIcon from "../assets/more.png";
import closeIcon from "../assets/delete.png";
import heartIcon from "../assets/heart-icon.png";
import arrowIcon from "../assets/arrow.png";

const Wishlist = () => {
  const [wishlistRecipes, setWishlistRecipes] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [error, setError] = useState("");

  const fetchWishlist = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setError("Please log in to view your wishlist.");
        return;
      }

      const token = await user.token; // Assumes token is stored in user object after login
      const response = await fetch("http://localhost:3001/api/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch wishlist");
      }

      const data = await response.json();
      setWishlistRecipes(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching wishlist:", err);
    }
  };

  const handleDelete = async (recipeId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setError("Please log in to modify your wishlist.");
        return;
      }

      const token = await user.token;
      const response = await fetch(`http://localhost:3001/api/wishlist/${recipeId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove recipe from wishlist");
      }

      setWishlistRecipes(wishlistRecipes.filter((recipe) => recipe.recipe_id !== recipeId));
    } catch (err) {
      setError(err.message);
      console.error("Error removing recipe:", err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      {/* Navbar */}
      <div className="flex items-center justify-between px-4 py-4 relative bg-white border-b border-gray-200">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-10 h-10" />
          <span className="font-bold text-sm text-gray-800">RECIPE FINDER</span>
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <Link to="/product" className="hover:text-gray-600">Product</Link>
          <Link to="/features" className="hover:text-gray-600">Features</Link>
          <Link to="/AboutUs" className="hover:text-gray-600">About</Link>
          <Link to="/SearchRecipes" className="hover:text-gray-600">Search</Link>
          <Link to="/Wishlist" className="hover:text-gray-600">Wishlist</Link>
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium flex-row">
          <Link to="/login" className="hover:text-gray-600 flex items-center">
            Login via Google
            <img src={arrowIcon} className="w-4 h-5 ml-1" />
          </Link>
        </div>
        <div className="md:hidden relative">
          <img
            src={showMenu ? closeIcon : moreIcon}
            alt="More"
            className="w-8 h-8 cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          />
          {showMenu && (
            <div className="fixed right-0 w-1/2 min-h-screen bg-white shadow-lg z-50 p-6 flex flex-col gap-4 font-bold transition-all duration-300 ease-in-out">
              <Link to="/product" className="block py-1 hover:text-gray-600">Product</Link>
              <Link to="/features" className="block py-1 hover:text-gray-600">Features</Link>
              <Link to="/AboutUs" className="block py-1 hover:text-gray-600">About</Link>
              <Link to="/Wishlist" className="hover:text-gray-600">Wishlist</Link>
              <Link to="/SearchRecipes" className="block py-1 hover:text-gray-600">Search</Link>
              <Link to="/login" className="block py-1 hover:text-gray-600">Login via Google</Link>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow px-4 py-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">My Wishlist</h2>
        {error && <p className="text-red-500 mb-6">{error}</p>}
        {wishlistRecipes.length === 0 ? (
          <p className="text-gray-600">No recipes in wishlist yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistRecipes.map((recipe) => (
              <div
                key={recipe.recipe_id}
                className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{recipe.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Approx. {recipe.calories || "..."} calories, {recipe.fat || "-"} fat, {recipe.carbs || "-"} carbs
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <Link
                      to={`/recipe/${recipe.recipe_id}`}
                      className="bg-pink-300 text-white px-4 py-1 rounded-md hover:bg-pink-400"
                    >
                      See Recipe
                    </Link>
                    <button
                      onClick={() => handleDelete(recipe.recipe_id)}
                      className="text-gray-500 hover:text-red-500 border px-3 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#531A27] text-white py-8 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4">
            <h2 className="text-5xl font-extrabold font-serif">Discover.</h2>
            <h2 className="text-5xl font-extrabold font-serif text-[#EECED0]">Create.</h2>
            <h2 className="text-5xl font-extrabold font-serif text-[#C54F6A]">Savor.</h2>
          </div>
          <div className="flex flex-col gap-3">
            <p className="mt-2">Empowering you to find, customize, and cherish every recipe with ease.</p>
            <div className="flex flex-row space-x-2">
              <Link to="/about" className="hover:underline">Home | </Link>
              <Link to="/AboutUs" className="hover:underline">About Us | </Link>
              <Link to="/favorites" className="hover:underline">My Favorites | </Link>
              <Link to="/products" className="hover:underline">Products</Link>
            </div>
            <div className="">
              <p className="mb-2">Contact Us</p>
              <div className="flex gap-2 mt-3">
                <input
                  type="email"
                  placeholder="Email"
                  className="px-5 py-2 rounded-lg bg-gray-500 opacity-30"
                />
                <button className="px-3 py-2 bg-white text-[#4A2C2A] rounded-lg">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center mt-4 text-sm">
          © 2025 Personalized Recipe Finder & Collection Manager. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Wishlist;
