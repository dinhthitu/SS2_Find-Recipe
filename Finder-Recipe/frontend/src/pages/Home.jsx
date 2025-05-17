import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <div className="bg-purple-100 text-purple-700 px-6 py-2 rounded-full text-sm shadow-sm mb-6">
          Discover our new AI-powered recipe generator.{" "}
          <Link to="/learn-more" className="font-semibold hover:underline">
            Learn more →
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          Generate Delicious<br />
          Recipes with Your Ingredients
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mb-6">
          Simply input your available ingredients, select dietary preferences,
          and let our AI create unique and delicious recipes just for you.
        </p>
        <Link to="/login" className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-full text-sm shadow-md">
          Get started
        </Link>
      </div>
    </div>
  );
};

export default Home;