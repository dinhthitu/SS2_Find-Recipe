import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import moreIcon from "../assets/more.png";
import closeIcon from "../assets/delete.png";
import arrowIcon from "../assets/arrow.png";

const SearchRecipes = () => {
  const [searchValue, setSearchValue] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const apiKey = "4d907507d3444003a838e03417bb13c4";

  const searchRecipes = async () => {
    if (!searchValue.trim()) {
      setError("Please enter at least one ingredient.");
      setRecipes([]);
      return;
    }

    try {
      const ingredients = searchValue.split(",").map(item => item.trim()).join(",");
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${ingredients}&apiKey=${apiKey}&addRecipeNutrition=true`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setRecipes(data.results || []);
      setError("");
    } catch (err) {
      setError("Failed to fetch recipes. Please try again later.");
      setRecipes([]);
      console.error(err);
    }
  };

  const popularIngredients = [
    "chicken", "beef", "rice", "pasta", "tomato", "cheese", "potato", "egg", "onion", "garlic"
  ];

  const handleIngredientClick = (ingredient) => {
    setSearchValue(ingredient);
    searchRecipes();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      {/* Navbar */}
      <div className="flex items-center justify-between px-4 py-4 relative bg-white border-b border-gray-200">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-10 h-10" />
          <span className="font-bold text-sm text-gray-800">SMART RECIPE GENERATOR</span>
        </div>

        <div className="hidden md:flex gap-6 text-sm font-medium">
          <Link to="/product" className="hover:text-gray-600">Product</Link>
          <Link to="/features" className="hover:text-gray-600">Features</Link>
          <Link to="/about" className="hover:text-gray-600">About</Link>
          <Link to="/SearchRecipes" className="hover:text-gray-600">Search</Link>
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
              <Link to="/about" className="block py-1 hover:text-gray-600">About</Link>
              <Link to="/SearchRecipes" className="block py-1 hover:text-gray-600">Search</Link>
              <Link to="/login" className="block py-1 hover:text-gray-600">Login via Google</Link>
            </div>
          )}
        </div>
      </div>

      {/* Header Section */}
      <div
        className="w-full h-64 bg-cover bg-center flex flex-col items-center justify-center text-white"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backgroundBlendMode: "overlay"
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Create Magic from Simple Ingredients</h1>
        <p className="text-sm md:text-base max-w-2xl text-center">
          No need to scroll endlessly for dinner ideas. Just tell us what you have, we’ll inspire you with recipes that turn ordinary ingredients into extraordinary meals.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center p-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Find Recipes by Ingredients</h2>
        <p className="text-gray-600 mb-6 text-center">Type in the ingredients you have and discover amazing recipes!</p>

        <div className="flex w-full max-w-xl mb-8">
          <div className="relative w-full">
            <input
              type="text"
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-700 placeholder-gray-400"
              placeholder="e.g., chicken, tomato, garlic"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button
              onClick={searchRecipes}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 mb-6 bg-red-50 px-4 py-2 rounded-lg">{error}</p>}

        {/* Popular Ingredients */}
        <div className="w-full max-w-4xl mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Ingredients</h3>
          <div className="flex flex-wrap gap-2">
            {popularIngredients.map((ingredient, index) => (
              <button
                key={index}
                onClick={() => handleIngredientClick(ingredient)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-100 capitalize"
              >
                {ingredient}
              </button>
            ))}
          </div>
        </div>

        {/* Recipes Grid */}
        {recipes.length === 0 && !error ? (
          <p className="text-gray-600 mb-6">Search for recipes using ingredients you have!</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
            {recipes.map((recipe) => {
              const nutrition = recipe.nutrition?.nutrients || [];
              const calories = nutrition.find(n => n.name === "Calories")?.amount || "N/A";
              const fat = nutrition.find(n => n.name === "Fat")?.amount || "N/A";
              const carbs = nutrition.find(n => n.name === "Carbohydrates")?.amount || "N/A";

              return (
                <li
                  key={recipe.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{recipe.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Approx. {calories} calories per serving, {fat}g fat, {carbs}g carbs.
                    </p>
                    <div className="flex justify-between items-center">
                      <Link
                        to={`/recipe/${recipe.id}`}
                        className="px-4 py-2 bg-yellow-400 text-gray-800 rounded-full text-sm font-semibold hover:bg-yellow-500"
                      >
                        See Recipe
                      </Link>
                      <button className="flex items-center gap-1 text-gray-600 hover:text-red-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                        <span className="text-sm">12</span>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchRecipes;