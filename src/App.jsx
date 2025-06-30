import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import TajMahal from "./heridetails/TajMahal";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/heridetails/TajMahal" element={<TajMahal />} />


    </Routes>
  );
}

export default App;
