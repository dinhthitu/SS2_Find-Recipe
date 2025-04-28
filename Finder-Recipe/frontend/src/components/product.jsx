import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import moreIcon from "../assets/more.png";
import closeIcon from "../assets/delete.png"
import completeIcon from "../assets/complete.png"
import arrowIcon from "../assets/arrow.png";

const product = () => {
  const [showMenu, setShowMenu] = useState(false);

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

        {/* Mobile more icon */}
        <div className="md:hidden relative">
          <img
            src={showMenu ? closeIcon : moreIcon}
            alt="More"
            className="w-8 h-8 cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          />
          {showMenu && (
            <div className="fixed right-0 w-1/2 min-h-screen bg-indigo-50 shadow-lg z-50 p-6 flex flex-col gap-4 font-bold transition-all duration-300 ease-in-out">
              <Link to="/product" className="block py-1 hover:text-gray-900">Product</Link>
              <Link to="/features" className="block py-1 hover:text-gray-900">Features</Link>
              <Link to="/about" className="block py-1 hover:text-gray-900">About</Link>
              <Link to="/login" className="block py-1 hover:text-gray-900">Login via Google</Link>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
       <div className="bg-purple-100 text-gray-500 px-6 py-2 rounded-full text-sm shadow-sm mb-6">
            Discover our new AI-powered recipe generator.{" "}
            <Link to="/learn-more" className=" text-purple-700 font-semibold hover:underline">
             Learn more →
            </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          Our Product
        </h1>
        <h2 className="text-gray-600 text-xl max-w-2xl mb-6">
            Learn more about the amazing features of our product.
        </h2>
        <div className = " flex flex-col text-gray-500 text-base md:text-sm max-w-2xl mb-6 text-left py-2">
            <p className  = "flex flex-row py-2"> 
            <img src={completeIcon} className = "w-4 h-4 "/> 
            AI-powered recipe generation using your available ingredients.</p>
            <p className  = "flex flex-row py-2"> 
            <img src={completeIcon} className = "w-4 h-4"/> 
            Customized recipes based on dietary preferences and restrictions.</p>
            <p className  = "flex flex-row py-2"> 
            <img src={completeIcon} className = "w-4 h-4"/> 
            User-friendly interface to easily add ingredients and generate recipes.</p>
        </div>
        <Link to="/" className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-full text-sm shadow-md">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default product;
