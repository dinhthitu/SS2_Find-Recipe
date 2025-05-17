import React, { useState } from 'react';

const AdminDashboard = () => {
  const [view, setView] = useState('users');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const users = [
    { id: 'fmmfmfmmf', username: 'abc', email: 'abc123@gmail.com', savedRecipes: 23 },
    { id: 'user2', username: 'def', email: 'def456@gmail.com', savedRecipes: 12 },
    { id: 'user3', username: 'ghi', email: 'ghi789@gmail.com', savedRecipes: 8 },
    { id: 'user4', username: 'jkl', email: 'jkl111@gmail.com', savedRecipes: 15 },
    { id: 'user5', username: 'mno', email: 'mno222@gmail.com', savedRecipes: 3 },
    { id: 'user6', username: 'pqr', email: 'pqr333@gmail.com', savedRecipes: 10 },
  ];

  const totalPages = Math.ceil(users.length / usersPerPage);
  const currentUsers = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="min-h-screen flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 shadow-md">
        <div className="mb-10">
          <h2 className="text-sm font-semibold text-[#B8324F] uppercase tracking-wider mb-2">LISTS</h2>
          <button
            onClick={() => setView('users')}
            className={`w-full py-2 rounded-md font-medium shadow ${
              view === 'users'
                ? 'bg-[#B8324F] text-white'
                : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'
            }`}
          >
            Users
          </button>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[#B8324F] uppercase tracking-wider mb-2">ACTIONS</h2>
          <button
            onClick={() => setView('create')}
            className={`w-full py-2 rounded-md font-medium shadow ${
              view === 'create'
                ? 'bg-[#B8324F] text-white'
                : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'
            }`}
          >
            Create User
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 bg-gray-50">
        {/* Users View */}
        {view === 'users' && (
          <>
            {/* Search bar */}
            <div className="flex justify-between items-center mb-4 px-8">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Enter name or user id to find a user"
                  className="border border-gray-300 rounded-full px-4 py-2 w-full max-w-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                  <img
                    src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-search-strong-1024.png"
                    className="h-5 w-5"
                    alt="Search"
                  />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white shadow-sm rounded-lg overflow-x-auto mx-8">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-3 font-semibold">id</th>
                    <th className="p-3 font-semibold">User Name</th>
                    <th className="p-3 font-semibold">Email</th>
                    <th className="p-3 font-semibold">Total saved recipes</th>
                    <th className="p-3 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800 divide-y divide-gray-100">
                  {currentUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="p-3">{user.id}</td>
                      <td className="p-3">{user.username}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3 text-[#B8324F] font-medium">{user.savedRecipes}</td>
                      <td className="p-3 space-x-3">
                        <button className="text-[#B8324F] hover:underline">Manage Recipes</button>
                        <button className="text-[#B8324F] hover:underline">Edit</button>
                        <button className="text-[#B8324F] hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
              <nav className="inline-flex items-center space-x-1">
                <button
                  className="px-3 py-1 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
                  onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`px-3 py-1 rounded-full border ${
                      currentPage === page ? 'bg-[#B8324F] text-white' : 'bg-white text-gray-600'
                    } hover:bg-gray-100`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  className="px-3 py-1 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
                  onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
                >
                  &gt;
                </button>
              </nav>
            </div>
          </>
        )}

        {/* Create User View */}
        {view === 'create' && (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto mt-8">
            <h2 className="text-xl font-semibold mb-4 text-[#B8324F]">Create New User</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-[#B8324F]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-[#B8324F]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-[#B8324F]"
                />
              </div>
              <button
                type="submit"
                className="bg-[#B8324F] text-white px-4 py-2 rounded-md hover:bg-[#9A2A43]"
              >
                Create User
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;