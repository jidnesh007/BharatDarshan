import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import TajMahal from "./heridetails/TajMahal";
import ShopLocal from "./pages/ShopLocal"; // Import the ShopLocal component
import { createClient } from "@supabase/supabase-js";
import Dashboard from "./pages/Dashboard";
import MultilingualAudioApp from "./components/MultilingualAudioApp"

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function App() {
  const [instruments, setInstruments] = useState([]);

  useEffect(() => {
    getInstruments();
  }, []);
  async function getInstruments() {
    const { data } = await supabase.from("instruments").select();
    setInstruments(data);
  }

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/heridetails/TajMahal" element={<TajMahal />} />
      <Route path="/shop-local" element={<ShopLocal />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/multilingualAudioApp" element={<MultilingualAudioApp />} />
      
      {/* <ul>
        {instruments.map((instrument) => (
          <li key={instrument.name}>{instrument.name}</li>
        ))}
      </ul> */}
    </Routes>
  );
}

export default App;
