import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import TajMahal from "./heridetails/TajMahal";
import ShopLocal from "./pages/Shoplocal"; // Import the ShopLocal components
import { createClient } from "@supabase/supabase-js";
import Dashboard from "./pages/Dashboard";
import MultilingualAudioApp from "./components/MultilingualAudioApp";
import Map from "./components/Map"; // Import the Map component
import LiveMap from "./components/LiveMap";
import SunTemple from "./heridetails/SunTemple";
import RaniKiVav from "./heridetails/RaniKiVav";
import QutubMinar from "./heridetails/QutubMinar";
import Mahabalipuram from "./heridetails/mahabalipuram";
import KhajurahoTemples from "./heridetails/khajuraho";
import RedFort from "./heridetails/RedFort";
import KazirangaNationalPark from "./heridetails/kaziranga";
import JaipurCity from "./heridetails/JaipurCity";
import Hampi from "./heridetails/hampi";
import FatehpurSikri from "./heridetails/fatehpurSikri";
import CholaTemples from "./heridetails/cholaTemples";
import AjantaElloraCaves from "./heridetails/ajantaEllora";
import Login from "./components/Login";
import Admin from "./pages/Admin";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function App() {
  // const [instruments, setInstruments] = useState([]);

  // useEffect(() => {
  //   getInstruments();
  // }, []);
  // async function getInstruments() {
  //   const { data } = await supabase.from("instruments").select();
  //   setInstruments(data);
  // }

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/heridetails/TajMahal" element={<TajMahal />} />
      <Route path="/heridetails/SunTemple" element={<SunTemple />} />
      <Route path="/heridetails/RaniKiVav" element={<RaniKiVav />} />
      <Route path="/heridetails/QutubMinar" element={<QutubMinar />} />
      <Route path="/heridetails/mahabalipuram" element={<Mahabalipuram />} />
      <Route path="/heridetails/khajuraho" element={<KhajurahoTemples />} />
      <Route path="/heridetails/RedFort" element={<RedFort />} />
      <Route
        path="/heridetails/kaziranga"
        element={<KazirangaNationalPark />}
      />
      <Route path="/heridetails/JaipurCity" element={<JaipurCity />} />
      <Route path="/heridetails/hampi" element={<Hampi />} />
      <Route path="/heridetails/fatehpurSikri" element={<FatehpurSikri />} />
      <Route path="/heridetails/cholaTemples" element={<CholaTemples />} />
      <Route path="/heridetails/ajantaEllora" element={<AjantaElloraCaves />} />
      <Route path="/shop-local" element={<ShopLocal />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />

      <Route path="/live-map" element={<LiveMap />} />


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
