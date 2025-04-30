import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import moreIcon from "../assets/more.png";
import closeIcon from "../assets/delete.png";
import arrowIcon from "../assets/arrow.png";
import SearchBackGround from "../assets/SearchBackGround.png";

const SearchRecipes = () => {
  const [searchValue, setSearchValue] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [error, setError] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const searchRef = useRef(null);

  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

  // Hàm tìm kiếm công thức dựa trên nguyên liệu
  const searchRecipes = async () => {
    if (!searchValue.trim()) {
      setError("Please enter at least one ingredient or dish name.");
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

  // Lấy danh sách công thức ngẫu nhiên từ API Spoonacular
  useEffect(() => {
    const fetchRecommendedRecipes = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/random?number=8&apiKey=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setRecommendedRecipes(data.recipes || []);
      } catch (err) {
        console.error("Failed to fetch recommended recipes:", err);
        setRecommendedRecipes([]);
      }
    };

    fetchRecommendedRecipes();
  }, [apiKey]);

  const popularIngredients = [
    "tomato", "pork", "onion", "carrot", "scallop", "potato", "vegetarian", "vegan"
  ];

  const handleIngredientClick = (ingredient) => {
    setSearchValue(ingredient);
    searchRecipes();
  };

  const handleTryNowClick = () => {
    searchRef.current.scrollIntoView({ behavior: "smooth" });
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
        className="w-full h-[500px] bg-cover bg-center flex items-center justify-start text-[#8c0e2c] px-16 relative"
        style={{
          backgroundImage: `url(${SearchBackGround})`,
        }}
      >
        <div className="flex flex-col items-start max-w-lg">
          <h1 className="text-5xl md:text-6xl font-bold font-serif mb-3 text-left leading-snug">
            Create Magic<br />from Simple Ingredients
          </h1>
          <p className="text-base text-left font-sans leading-relaxed text-[#1c0e0e] mb-4">
            No need to scroll endlessly for dinner ideas – just tell us what you have,
            and we’ll inspire you with recipes that turn ordinary ingredients into extraordinary meals.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleTryNowClick}
              className="px-8 py-3 bg-[#a81a10] text-white rounded-full font-semibold text-sm hover:bg-[#c46570] transition"
            >
              Try Now
            </button>
            <Link
              to="/about"
              className="px-8 py-3 border border-[#961108] text-[#9b0a00] rounded-full font-semibold text-sm hover:bg-[#ad6560] hover:text-white transition"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center p-8">
        {/* Search Section */}
        <div ref={searchRef}>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Find Your Recipe: By Ingredients or Dish Name</h2>
          <p className="text-lg text-gray-500 text-center mb-4">Search by ingredients or dish names to explore delicious recipes!</p>
          <div className="flex w-full max-w-2xl mb-8">
            <div className="relative w-full">
              <input
                type="text"
                className="w-full px-4 py-3 pr-12 border-2 border-pink-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900 placeholder-gray-400"
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
        </div>

        {error && <p className="text-red-500 mb-6 bg-red-50 px-4 py-2 rounded-lg">{error}</p>}

        {/* Popular Ingredients */}
        <div className="w-full max-w-4xl mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">POPULAR INGREDIENTS</h3>
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

        {/* Search Results (Moved up) */}
        {recipes.length > 0 && (
          <>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">SEARCH RESULTS</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl">
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
                      src={recipe.image || "https://via.placeholder.com/300"}
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
                          className="px-4 py-2 bg-[#F9B700] text-gray-800 rounded-full text-sm font-semibold hover:bg-yellow-500"
                        >
                          See Recipe
                        </Link>
                        <button className="flex items-center gap-1 text-gray-600 hover:text-red-500">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                          </svg>
                          <span className="text-sm">9</span>
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        {/* Recommended Recipes (Moved down) */}
        <div className="w-full max-w-6xl mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">RECOMMENDED RECIPES</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommendedRecipes.map((recipe) => {
              const nutrition = recipe.nutrition?.nutrients || [];
              const calories = nutrition?.find(n => n.name === "Calories")?.amount || "N/A";
              const fat = nutrition?.find(n => n.name === "Fat")?.amount || "N/A";
              const carbs = nutrition?.find(n => n.name === "Carbohydrates")?.amount || "N/A";

              return (
                <li
                  key={recipe.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={recipe.image || "https://via.placeholder.com/300"}
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
                        className="px-4 py-2 bg-[#F9B700] text-gray-800 rounded-full text-sm font-semibold hover:bg-yellow-500"
                      >
                        See Recipe
                      </Link>
                      <button className="flex items-center gap-1 text-gray-600 hover:text-red-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                        <span className="text-sm">9</span>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

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
              <Link to="/about" className="hover:underline">About Us | </Link>
              <Link to="/favorites" className="hover:underline">My Favorites | </Link>
              <Link to="/products" className="hover:underline">Products</Link>
            </div>
            <div className="">
              <p className="mb-2">Contact Us</p>
              <div className="flex gap-2 mt-3">
                <input
                  type="email"
                  placeholder="Email"
                  className="px-4 py-3 rounded-lg bg-gray-500 opacity-30"
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

export default SearchRecipes;
