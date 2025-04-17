import React, {useState} from 'react'
import logo from "../assets/logo.jpeg"
import search from "../assets/search.png"
import bgImage from "../assets/bg-img.jpg"
import user from "../assets/user.jpg";

const Home = () => {

    const [dropdown, setDropdown] = useState(false);

  return (
    <div className="font-sans w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
      
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 bg-white bg-opacity-80 shadow-md">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-17 w-30 border-b " />
          <span className="text-xl font-bold text-red-600">Guide</span>
        </div>

        <div className = "flex justify-between space-x-10">
        <nav className="space-x-8 py-7 text-gray-700 font-medium">
          <a href="#" className="hover:text-red-500">Restaurants</a>
          <a href="#" className="hover:text-red-500">Magazine</a>
          <a href="#" className="hover:text-red-500 transition">Food</a>
          <a href="#" className="hover:text-red-500 transition">My Favourites</a>  
          </nav>
          <div className = "items-center py-4 space-x-4 relative" >
            <img src={user} 
                 className = "w-11 h-11 rounded-full bg-gray-200 object-cover"
                 onClick = {() => setDropdown(!dropdown)} />
                 
                 {dropdown && (
                    <div className = "absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10" >
                        <a href="#" className = "block px-4 py-2 text-gray-700 hover:bg-gray-100">Log in</a>
                        <a href="#" className = "block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</a>
                    </div>
                 )}
          </div>    
         
        </div>
         
      </header>

      {/* Hero section */}
      <main className="relative flex flex-col items-center justify-center text-center mt-32 px-5 py-5 z-10">
  {/* Overlay mờ đen */}
        <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Find Recipes by Ingredients</h1>
        <p className="text-lg text-white mt-4 mb-8 drop-shadow-md">Type in the ingredients you have and discover amazing recipes!</p>

        <div className="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="e.g. chicken, tomato, garlic"
            className="w-full py-3 px-5 rounded-full border-2 border-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <img src={search} alt="Search" className="w-6 h-6 opacity-70 hover:opacity-100" />
          </button>
        </div>
      </main>
    </div>
  )
}

export default Home
