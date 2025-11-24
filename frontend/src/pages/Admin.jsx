import React, { useState } from "react";

function App() {
  const [activeTab, setActiveTab] = useState("vandalisation");

  // Placeholder content for each tab
  const tabContent = {
    vandalisation: {
      title: "Vandalism Dashboard",
      description:
        "Monitor and manage reported cases of vandalism. Use AI to identify and log new incidents.",
      buttonText: "View Vandalism Reports",
    },
    litter: {
      title: "Litter Monitoring",
      description:
        "Track and manage littering issues at heritage sites for a cleaner environment.",
      buttonText: "View Litter Reports",
    },
    "lost-and-found": {
      title: "Lost and Found System",
      description:
        "Manage lost and found items. Utilize facial recognition to reunite visitors with their belongings.",
      buttonText: "View Lost and Found Items",
    },
  };

  const content = tabContent[activeTab];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        `}
      </style>

      {/* Admin Navbar */}
      <nav className="bg-white shadow-lg p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab("vandalisation")}
            className={`px-4 py-2 rounded-full font-semibold transition-colors duration-300
              ${
                activeTab === "vandalisation"
                  ? "bg-red-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
          >
            Vandalism
          </button>
          <button
            onClick={() => setActiveTab("litter")}
            className={`px-4 py-2 rounded-full font-semibold transition-colors duration-300
              ${
                activeTab === "litter"
                  ? "bg-yellow-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
          >
            Litter
          </button>
          <button
            onClick={() => setActiveTab("lost-and-found")}
            className={`px-4 py-2 rounded-full font-semibold transition-colors duration-300
              ${
                activeTab === "lost-and-found"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
          >
            Lost & Found
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl w-full text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {content.title}
          </h2>
          <p className="text-gray-600 text-lg mb-6">{content.description}</p>
          <button
            className={`px-6 py-3 rounded-full text-white font-bold transition-all duration-300 transform hover:scale-105 shadow-lg
            ${activeTab === "vandalisation" ? "bg-red-600" : ""}
            ${activeTab === "litter" ? "bg-yellow-600" : ""}
            ${activeTab === "lost-and-found" ? "bg-blue-600" : ""}
          `}
          >
            {content.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
