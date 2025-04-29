import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import moreIcon from "../assets/more.png";
import closeIcon from "../assets/delete.png";
import arrowIcon from "../assets/arrow.png";
import clock from "../assets/clock.png";
import people from "../assets/people.png";
import heartIcon from "../assets/heart-icon.png";
import share from "../assets/share.png";


const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [similarRecipes, setSimilarRecipes] = useState([]);
  const [error, setError] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  

  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

  useEffect(() => {
    console.log("RecipeDetails API Key:", import.meta.env.VITE_SPOONACULAR_API_KEY);

    const fetchRecipeDetails = async () => {
      if (!apiKey) {
        setError("API Key is missing. Please check your .env file.");
        return;
      }

      try {
        // Fetch recipe details
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&includeNutrition=true`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${await response.text()}`);
        }
        const data = await response.json();
        setRecipe(data);

        // Fetch similar recipes
        try {
          const similarResponse = await fetch(
            `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${apiKey}&number=4`
          );
          if (!similarResponse.ok) {
            console.warn(`Failed to fetch similar recipes: ${await similarResponse.text()}`);
            setSimilarRecipes([]);
          } else {
            const similarData = await similarResponse.json();
            setSimilarRecipes(similarData || []);
          }
        } catch (similarErr) {
          console.warn("Error fetching similar recipes:", similarErr);
          setSimilarRecipes([]);
        }

        setError("");
      } catch (err) {
        setError(`Failed to fetch recipe details: ${err.message}`);
        console.error(err);
      }
    };

    fetchRecipeDetails();
  }, [id, apiKey]);

  const handleShareClick = async () => {
    try {
      const url = window.location.href; 
      await navigator.clipboard.writeText(url); 
      alert("Link copied!"); 
    } catch (err) {
      console.error("Failed to copy the link:", err);
      alert("Failed to copy the link. Please copy it manually.");
    }
  };

  if (!recipe && !error) {
    return <div className="text-center p-8">Loading...</div>;
  }

  const nutrition = recipe?.nutrition?.nutrients || [];
  const calories = nutrition.find((n) => n.name === "Calories")?.amount || "N/A";
  const fat = nutrition.find((n) => n.name === "Fat")?.amount || "N/A";
  const carbs = nutrition.find((n) => n.name === "Carbohydrates")?.amount || "N/A";
  const protein = nutrition.find((n) => n.name === "Protein")?.amount || "N/A";
  const sugar = nutrition.find((n) => n.name === "Sugar")?.amount || "N/A";

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
      <div className="flex-1 flex flex-col items-center px-13 py-7 ">
        {error && <p className="text-red-500 mb-6 bg-red-50 px-4 py-2 rounded-lg">{error}</p>}
        {recipe && (
          <div className="w-full">
            {/* Header Section */}

            
            <div className="w-full mb-8">
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-[#000000] mb-4">
                  {recipe.title}
                </h1>
              <img
                src={recipe.image || "https://via.placeholder.com/1440x400"}
                alt={recipe.title}
                className="w-full h-[400px] object-cover rounded-lg"
              />
              <div className="mt-6">
                
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-5 text-sm text-gray-600">
                    <div className = "gap-1 flex flex-row">
                      <img src={clock} className = "w-5 h-5" />
                      <span >Total {recipe.readyInMinutes || 45} minutes</span>
                    </div>
                    <div className = "gap-1 flex flex-row">
                      <img src={people} className = "w-5 h-5" />
                      <span>Servings: {recipe.servings || 2} people</span>
                      </div>
                  </div>
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1 text-gray-600 hover:text-red-600">
                      <img src={heartIcon} className="w-5 h-5" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleShareClick}
                      className="flex items-center gap-1 text-gray-600 hover:text-red-600"
                    >
                      <img src={share} className="w-5 h-5 cursor-pointer" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Ingredients Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#B8324F] mb-4  p-3">Ingredients</h2>
              {/* <p className="text-sm text-gray-600 mb-4">
                If you want to add more taste, you can include optional ingredients like vanilla extract for a richer flavor.
              </p> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {recipe.extendedIngredients?.map((ingredient) => (
                  <div key={ingredient.id} className="flex items-center gap-3">
                    <img
                      src={
                        ingredient.image
                          ? `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`
                          : "https://via.placeholder.com/100"
                      }
                      alt={ingredient.name}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{ingredient.name}</p>
                      <p className="text-sm text-gray-600">
                        {ingredient.amount} {ingredient.unit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          

{/* Instructions Section */}
            <div className="mb-12 bg-[#F7F2EE] rounded-lg p-5 shadow-sm shadow-gray-400">
              <h2 className="text-3xl font-bold text-[#B8324F] mb-4">Instructions</h2>
              <ol className="space-y-4 text-gray-600">
                {recipe.analyzedInstructions?.[0]?.steps?.map((step) => (
                  <li
                    key={step.number}
                    className="flex items-start gap-3 py-2"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#621829] text-white font-bold text-sm">
                      {step.number}
                    </span>
                    <span className="text-sm flex-1 border-b border-[#D0CCC9] max-w-fit">{step.step}</span>
                  </li>
                )) || <p className="text-gray-600">No instructions available.</p>}
              </ol>
              {/* <p className="text-sm text-gray-600 mt-4 italic">About 1-2 minutes on each side.</p> */}
            </div>

            {/* Nutrition Section */}
            <div className="mb-12 p-6 shadow-sm/30 shadow-gray-600">
              <h2 className="text-3xl font-bold text-[#B8324F] mb-7">Nutrition</h2>
              <div className="grid grid-cols-5 xl:grid-cols-9 gap-4 ">
                <div className="text-center border-1 border-[#A6354E] rounded-lg p-2">
                  <p className="text-lg font-bold text-[#A6354E]">{calories} kcal</p>
                  <p className="text-sm text-gray-800">Calories</p>
                </div>
                <div className="text-center border-1 border-[#A6354E] rounded-lg p-2">
                  <p className="text-lg font-semibold text-[#A6354E]">{fat}g</p>
                  <p className="text-sm text-gray-800">Fat</p>
                </div>
                <div className="text-center border-1 border-[#A6354E] rounded-lg p-2">
                  <p className="text-lg font-semibold text-[#A6354E]">{carbs}g</p>
                  <p className="text-sm text-gray-800">Carbs</p>
                </div>
                <div className="text-center border-1 border-[#A6354E] rounded-lg p-2">
                  <p className="text-lg font-semibold text-[#A6354E]">{protein}g</p>
                  <p className="text-sm text-gray-800">Protein</p>
                </div>
                <div className="text-center border-1 border-[#A6354E] rounded-lg p-2">
                  <p className="text-lg font-semibold text-[#A6354E]">{sugar}g</p>
                  <p className="text-sm text-gray-800">Sugar</p>
                </div>
              </div>
            </div>
            

            {/* Similar Recipes Section */}
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-7 p-6">Similar Recipes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {similarRecipes.map((similarRecipe) => (
                  <div
                    key={similarRecipe.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <img
                      src={
                        similarRecipe.id
                          ? `https://spoonacular.com/recipeImages/${similarRecipe.id}-312x231.jpg`
                          : "https://via.placeholder.com/300"
                      }
                      alt={similarRecipe.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {similarRecipe.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Approx. {calories} calories per serving, {fat}g fat, {carbs}g carbs.
                      </p>
                      <div className="flex justify-between items-center ">
                        <Link
                          to={`/recipe/${similarRecipe.id}`}
                          className="px-4 py-2 bg-[#F39AA7] text-gray-800 rounded-full text-sm font-semibold hover:bg-[#f3a4b0]"
                        >
                          See Recipe
                        </Link>
                        <button className="flex items-center gap-1 text-gray-600 hover:text-red-500">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            ></path>
                          </svg>
                          <span className="text-sm">9</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Explore More Recipes Button */}
            <div className="text-center mb-12">
              <Link
                to="/SearchRecipes"
                className="px-6 py-3 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-800"
              >
                Explore More Recipes
              </Link>
            </div>
          </div>
        )}
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
              <Link to="/about" className="hover:underline">
                Home |
              </Link>
              <Link to="/about" className="hover:underline">
                About Us |
              </Link>
              <Link to="/favorites" className="hover:underline">
             My Favorites |
              </Link>
              <Link to="/products" className="hover:underline">
                Products
              </Link>
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

export default RecipeDetails;