import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Multi = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const heritageData = [
    {
      name: "Hindi",

      image: "/images/hin.jpg",
    },
    {
      name: "Marathi",

      image: "/images/shiv.jpg",
    },
    {
      name: "Bengali",

      image: "/images/beng.jpg",
    },
    {
      name: "Gujrati",

      image: "/images/guj.jpg",
    },
    {
      name: "Kannada",

      image: "/images/kan.jpg",
    },
    {
      name: "Tamil",

      image: "/images/tam.jpg",
    },
  ];

  const cardsPerView = 4;
  const maxIndex = Math.max(0, heritageData.length - cardsPerView);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex) {
          return 0;
        }
        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) {
        return 0;
      }
      return prev + 1;
    });
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return maxIndex;
      }
      return prev - 1;
    });
  };

  return (
    <div className="min-h-screen  relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat "
          style={{
            backgroundImage: `url("/images/multi.jpg")`,
          }}
        />
        <div className="absolute top-0 left-0 w-full h-25 bg-gradient-to-b from-white to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16 pt-8 ">
          <h1 className="text-7xl py-8 md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-4 tracking-wider">
            MultiLanguage
          </h1>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-xl md:text-2xl font-light tracking-wide">
            Every Language Tells a Tale
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mt-8 rounded-full"></div>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md rounded-full p-3 hover:bg-white/30 transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 text-black group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md rounded-full p-3 hover:bg-white/30 transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 text-black group-hover:scale-110 transition-transform" />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden py-4 rounded-50xl">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 25}%)`,
              }}
            >
              {heritageData.map((site, index) => (
                <div key={index} className="flex-shrink-0 w-1/4 px-3">
                  <Link to={site.route} className="block">
                    <div className="group relative bg-white/10 backdrop-blur-md rounded-full overflow-hidden hover:scale-105 hover:bg-white/20 transition-all duration-500 border border-white/20 cursor-pointer">
                      {/* Image */}
                      <div className="relative h-130 ">
                        <img
                          src={site.image}
                          alt={site.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                        {/* Place Name Overlay */}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center w-full px-2">

                          <h3 className="text-white text-2xl text-center font-bold group-hover:text-cyan-300 transition-colors">
                            {site.name}
                          </h3>
                          <p className="text-cyan-200 text-sm mt-1">
                            {site.location}
                          </p>
                        </div>

                        
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/20 to-zinc-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-lg">
            Discover more
          </button>
        </div>
      </div>
    </div>
  );
};

export default Multi;
