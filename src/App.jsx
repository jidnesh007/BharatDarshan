import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import TajMahal from "./heridetails/TajMahal";
import ShopLocal from "./pages/ShopLocal"; // Import the ShopLocal component

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/heridetails/TajMahal" element={<TajMahal />} />
      <Route path="/shop-local" element={<ShopLocal />} />
    </Routes>
  );
}

export default App;