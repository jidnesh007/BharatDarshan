import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Cloud,
  Sun,
  CloudRain,
  ArrowLeft,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TajMahal = () => {
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Taj Mahal",
    },
    {
      url: "/images/taj2.jpg",
      title: "Taj Mahal at Sunset",
    },
    {
      url: "/images/taj4.jpg",
      title: "Taj Mahal Gardens",
    },
  ];

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        if (!apiKey) {
          console.error(
            "OpenWeather API key not found in environment variables"
          );
          setLoading(false);
          return;
        }

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Agra,IN&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        setWeather(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather:", error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain?.toLowerCase()) {
      case "clear":
        return <Sun className="w-6 h-6 text-yellow-500" />;
      case "clouds":
        return <Cloud className="w-6 h-6 text-gray-500" />;
      case "rain":
        return <CloudRain className="w-6 h-6 text-blue-500" />;
      default:
        return <Sun className="w-6 h-6 text-yellow-500" />;
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleBackClick = () => {
    navigate("/"); // Navigate back to heritage carousel page
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Back Button */}
      <button
        onClick={handleBackClick}
        className="fixed top-6 left-6 z-50 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 group border border-gray-200"
      >
        <ArrowLeft className="w-6 h-6 text-gray-700 group-hover:text-gray-900" />
      </button>

      {/* Location Badge */}
      <div className="fixed top-6 right-6 z-50 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-red-500" />
          <span className="text-sm font-medium text-gray-700">
            Agra, Uttar Pradesh
          </span>
        </div>
      </div>

      {/* Hero section with image */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Full screen background image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out"
          style={{
            backgroundImage: `url('${carouselImages[currentImageIndex].url}')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevImage}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/20 rounded-full p-2 hover:bg-black/40"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/20 rounded-full p-2 hover:bg-black/40"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Title */}
        <div className="absolute top-24 left-12 z-10">
          <h1 className="text-7xl font-bold text-white drop-shadow-2xl">
            {carouselImages[currentImageIndex].title}
          </h1>
          <p className="text-xl text-white/90 mt-4 drop-shadow-lg">
            Symbol of Eternal Love
          </p>
        </div>

        {/* Carousel indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-white shadow-lg"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content section below image */}
      <div className="w-full bg-white">
        <div className="flex">
          {/* Left content */}
          <div className="flex-1 p-12">
            <h2 className="text-5xl font-bold text-black mb-8 leading-tight">
              A monument to eternal love
              <br />
              and architectural magnificence
            </h2>

            <p className="text-xl text-gray-800 leading-relaxed mb-6">
              Standing majestically in Agra, Uttar Pradesh, the Taj Mahal is a
              breathtaking testament to love and one of the world's most
              recognizable monuments. Built by Mughal Emperor Shah Jahan as a
              mausoleum for his beloved wife Mumtaz Mahal, this ivory-white
              marble masterpiece took over 20 years to complete and represents
              the pinnacle of Mughal architecture.
            </p>

            <p className="text-xl text-gray-800 leading-relaxed mb-6">
              As you approach the main gateway, you are greeted by the iconic
              view of the perfectly symmetrical structure with its central dome
              flanked by four minarets. The intricate inlay work, calligraphy,
              and geometric patterns showcase the incredible craftsmanship of
              thousands of artisans who brought this UNESCO World Heritage Site
              to life.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Did You Know?
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • The Taj Mahal changes color throughout the day - pink at
                  dawn, white during the day, and golden under moonlight
                </li>
                <li>
                  • It took 22 years and 20,000 workers to complete this
                  masterpiece
                </li>
                <li>
                  • The main dome is 35 meters high and is surrounded by four
                  smaller domes
                </li>
                <li>
                  • The complex covers 17 hectares and includes a mosque, guest
                  house, and beautiful gardens
                </li>
              </ul>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="w-96 bg-gray-50 border-l border-gray-200">
            {/* Map section */}
            <div className="p-8 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Location
              </h3>
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3595.0748743940334!2d78.04019731501122!3d27.17510338289977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39747121a187d6a3%3A0xc5cfdd1fb49eb89d9!2sTaj%20Mahal!5e0!3m2!1sen!2sin!4v1635657562089!5m2!1sen!2sin"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Taj Mahal Location"
                ></iframe>
              </div>
            </div>

            {/* Weather section */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-red-500 font-semibold text-lg">
                  Today's Weather
                </span>
                <span className="text-gray-600 font-medium">Agra</span>
              </div>

              <div className="text-center mb-6">
                <div className="text-lg font-medium text-gray-600 mb-2">
                  {formatDate()}
                </div>

                {loading ? (
                  <div className="text-xl font-bold text-gray-800">
                    Loading weather...
                  </div>
                ) : weather ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-3">
                      {getWeatherIcon(weather.weather?.[0]?.main)}
                      <div className="text-3xl font-bold text-gray-800">
                        {Math.round(weather.main?.temp)}°C
                      </div>
                    </div>
                    <div className="text-base text-gray-600 capitalize">
                      {weather.weather?.[0]?.description}
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 bg-gray-100 rounded-lg p-3">
                      <span>
                        Feels like: {Math.round(weather.main?.feels_like)}°C
                      </span>
                      <span>Humidity: {weather.main?.humidity}%</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-xl font-bold text-gray-800">
                    Weather unavailable
                  </div>
                )}
              </div>

              {/* Visiting Info */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Visiting Hours
                </h4>
                <p className="text-sm text-gray-600 mb-1">Sunrise to Sunset</p>
                <p className="text-sm text-gray-600 mb-3">Closed on Fridays</p>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Best Time to Visit
                </h4>
                <p className="text-sm text-gray-600">October to March</p>
              </div>

              {/* Profile section */}
              <div className="flex items-center justify-end mt-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <User className="w-7 h-7 text-orange-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TajMahal;
