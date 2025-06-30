import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  User,
  Heart,
  Menu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ExquisiteCrafts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const crafts = [
    {
      id: 1,
      state: "Gujarat",
      craft: "Patola Prints",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      state: "Jammu and Kashmir",
      craft: "Walnut Wood",
      image:
        "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      state: "Karnataka",
      craft: "Channapatna",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      state: "Kerala",
      craft: "Aranmula",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      state: "Rajasthan",
      craft: "Blue Pottery",
      image:
        "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&h=300&fit=crop",
    },
    {
      id: 6,
      state: "West Bengal",
      craft: "Kantha Work",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    },
  ];

  const itemsPerView = 4;
  // Fix: Only allow scrolling if there are actually more items than can be displayed
  const maxIndex = Math.max(0, crafts.length - itemsPerView);

  // Calculate the actual card width including gap
  const cardWidth = 100 / itemsPerView; // 25% for 4 items
  const gap = 1.5; // 1.5% gap between cards

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleDiscoverMore = () => {
    navigate("/shop-local");
  };

  return (
    <div className="relative min-h-screen bg-gray-100 font-bold">
      {/* Navigation Bar */}

      {/* Red Background Section */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-red-500 via-red-600 to-red-700"
        style={{ height: "70vh" }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-40 right-32 w-24 h-24 border-2 border-white rounded-full"></div>
          <div className="absolute top-1/2 left-10 w-16 h-16 border-2 border-white transform rotate-45"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-wider mb-4">
            EXQUISITE CRAFTS
          </h1>
          <div className="flex items-center justify-center gap-4 text-white text-xl">
            <div className="w-16 h-px bg-white"></div>
            <span className="font-light">of timeless tradition</span>
            <div className="w-16 h-px bg-white"></div>
          </div>
        </div>

        {/* Carousel - positioned to extend beyond red section */}
        <div className="relative" style={{ marginTop: "8rem" }}>
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                gap: `${gap}%`,
                transform: `translateX(-${currentIndex * cardWidth}%)`,
              }}
            >
              {crafts.map((craft) => (
                <div
                  key={craft.id}
                  className="flex-shrink-0"
                  style={{ width: `${cardWidth - gap}%` }}
                >
                  <div className="bg-zinc-200 overflow-hidden hover:shadow-3xl transition-all duration-300 hover:scale-105">
                    <div className="h-72 overflow-hidden">
                      <img
                        src={craft.image}
                        alt={craft.craft}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="px-6 py-16">
                      <h3 className="text-red-600 font-semibold text-lg mb-2">
                        {craft.state}
                      </h3>
                      <h2 className="text-4xl font-bold text-gray-800 mb-3">
                        {craft.craft}
                      </h2>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {craft.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Only show if there are items to scroll */}
          {maxIndex > 0 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 text-red-600" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 text-red-600" />
              </button>
            </>
          )}
        </div>

        {/* Discover More Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={handleDiscoverMore}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Discover more
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExquisiteCrafts;
