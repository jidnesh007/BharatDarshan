import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ExquisiteCrafts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const crafts = [
    {
      id: 1,
      state: "Gujarat",
      craft: "Patola Prints",
      image: "/images/oo.jpg",
    },
    {
      id: 2,
      state: "Jammu and Kashmir",
      craft: "Walnut Wood",
      image: "/images/walnut.jpeg",
    },
    {
      id: 3,
      state: "Karnataka",
      craft: "Channapatna",
      image: "/images/chan.jpeg",
    },
    {
      id: 4,
      state: "Kerala",
      craft: "Aranmula",
      image: "/images/ker.jpg",
    },
   
  ];

  // Responsive items per view
  const getItemsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1; // Mobile
      if (window.innerWidth < 1024) return 2; // Tablet
      return 4; // Desktop
    }
    return 4;
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

  // Update items per view on window resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, crafts.length - itemsPerView);
  const cardWidth = 100 / itemsPerView;
  const gap = itemsPerView === 1 ? 0 : 1.5;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleDiscoverMore = () => {
    console.log("Navigate to shop-local");
  };

  return (
    <div className="relative min-h-screen bg-white font-bold">
      {/* Red Background Section */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-red-500 via-red-600 to-red-700"
        style={{ height: "60vh" }}
      >
        {/* Background Pattern - Hidden on mobile for cleaner look */}
        <div className="absolute inset-0 opacity-10 hidden md:block">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-40 right-32 w-24 h-24 border-2 border-white rounded-full"></div>
          <div className="absolute top-1/2 left-10 w-16 h-16 border-2 border-white transform rotate-45"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-white tracking-wider mb-2 sm:mb-4 leading-tight">
            EXQUISITE CRAFTS
          </h1>
          <div className="flex items-center justify-center gap-2 sm:gap-4 text-white text-sm sm:text-lg lg:text-xl">
            <div className="w-8 sm:w-12 lg:w-16 h-px bg-white"></div>
            <span className="font-light px-2">of timeless tradition</span>
            <div className="w-8 sm:w-12 lg:w-16 h-px bg-white"></div>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative mt-8 sm:mt-12 lg:mt-32">
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
                  <div className="bg-zinc-200 overflow-hidden hover:shadow-3xl transition-all duration-300 hover:scale-105 rounded-lg sm:rounded-none">
                    <div className="h-48 sm:h-56 lg:h-72 overflow-hidden">
                      <img
                        src={craft.image}
                        alt={craft.craft}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="px-4 sm:px-6 py-6 sm:py-8 lg:py-16">
                      <h3 className="text-red-600 font-semibold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2">
                        {craft.state}
                      </h3>
                      <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-3 leading-tight">
                        {craft.craft}
                      </h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {maxIndex > 0 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-0 top-1/2 transform -translate-y-1/2 sm:-translate-x-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 hover:scale-110 z-10"
              >
                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-red-600" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-2 sm:right-0 top-1/2 transform -translate-y-1/2 sm:translate-x-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 hover:scale-110 z-10"
              >
                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-red-600" />
              </button>
            </>
          )}
        </div>

        {/* Dot indicators for mobile */}
        <div className="flex justify-center mt-6 sm:hidden">
          <div className="flex space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-red-600"
                    : "bg-white bg-opacity-50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Discover More Button */}
        <div className="flex justify-center mt-8 sm:mt-12">
          <button
            onClick={() => {
              // Navigate to live map route
              window.location.href = "/shop-local";
            }}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full text-sm sm:text-base lg:text-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Discover more
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExquisiteCrafts;
