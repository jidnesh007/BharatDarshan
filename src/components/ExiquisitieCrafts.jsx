import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ExquisiteCrafts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const crafts = [
    {
      id: 1,
      state: "Gujarat",
      craft: "Patola Prints",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      description:
        "Traditional silk textiles with intricate geometric patterns",
    },
    {
      id: 2,
      state: "Jammu and Kashmir",
      craft: "Walnut Wood",
      image:
        "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&h=300&fit=crop",
      description: "Hand-carved wooden artifacts with delicate motifs",
    },
    {
      id: 3,
      state: "Karnataka",
      craft: "Channapatna",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      description: "Colorful wooden toys and dolls",
    },
    {
      id: 4,
      state: "Kerala",
      craft: "Aranmula",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      description: "Metal mirror craftsmanship",
    },
    {
      id: 5,
      state: "Rajasthan",
      craft: "Blue Pottery",
      image:
        "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&h=300&fit=crop",
      description: "Traditional ceramic art with Persian influence",
    },
    {
      id: 6,
      state: "West Bengal",
      craft: "Kantha Work",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      description: "Embroidered quilts and textiles",
    },
  ];

  const itemsPerView = 4;
  const maxIndex = Math.max(0, crafts.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-red-600 to-red-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-40 right-32 w-24 h-24 border-2 border-white rounded-full"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 border-2 border-white transform rotate-45"></div>
      </div>

      {/* Book Your Travel Button */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 rotate-90 origin-right">
        <button className="bg-red-800 text-white px-6 py-2 text-sm font-medium hover:bg-red-900 transition-colors">
          Book Your Travel
        </button>
      </div>

      <div className="container mx-auto px-8 py-16">
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

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerView)
                }%)`,
              }}
            >
              {crafts.map((craft) => (
                <div key={craft.id} className="flex-shrink-0 w-1/4">
                  <div className="bg-white rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                    <div className="h-64 overflow-hidden">
                      <img
                        src={craft.image}
                        alt={craft.craft}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-red-600 font-semibold text-lg mb-2">
                        {craft.state}
                      </h3>
                      <h2 className="text-2xl font-bold text-gray-800 mb-3">
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

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-6 h-6 text-red-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
            disabled={currentIndex >= maxIndex}
          >
            <ChevronRight className="w-6 h-6 text-red-600" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                currentIndex === index ? "bg-white" : "bg-white bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExquisiteCrafts;
