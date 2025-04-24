import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import moreIcon from "../assets/more.png";
import closeIcon from "../assets/delete.png";
import arrowIcon from "../assets/arrow.png";

const RecipeDetails = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const apiKey = "4d907507d3444003a838e03417bb13c4";

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&includeNutrition=true`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setRecipe(data);
        setError("");
      } catch (err) {
        setError("Failed to fetch recipe details. Please try again later.");
        console.error(err);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (!recipe && !error) {
    return <div className="text-center p-8">Loading...</div>;
  }

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

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center p-8">
        {error && <p className="text-red-500 mb-6 bg-red-50 px-4 py-2 rounded-lg">{error}</p>}

        {recipe && (
          <div className="w-full max-w-4xl">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{recipe.title}</h1>
            <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded-lg mb-6" />

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
              <ul className="list-disc list-inside text-gray-700">
                {recipe.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id} className="mb-2">
                    {ingredient.original}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
              {recipe.instructions ? (
                <div
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                />
              ) : (
                <p className="text-gray-600">No instructions available.</p>
              )}
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Nutrition</h2>
              {recipe.nutrition?.nutrients ? (
                <ul className="text-gray-700">
                  {recipe.nutrition.nutrients.map((nutrient) => (
                    <li key={nutrient.name} className="mb-2">
                      {nutrient.name}: {nutrient.amount} {nutrient.unit}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No nutrition information available.</p>
              )}
            </div>

            <Link
              to="/SearchRecipes"
              className="px-4 py-2 bg-gray-600 text-white rounded-full text-sm font-semibold hover:bg-gray-700"
            >
              Back to Search
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;