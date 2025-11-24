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
      route: "/languages/hindi",
    },
    {
      name: "Marathi",
      image: "/images/shiv.jpg",
      route: "/languages/marathi",
    },
    {
      name: "Bengali",
      image: "/images/beng.jpg",
      route: "/languages/bengali",
    },
    {
      name: "Gujrati",
      image: "/images/guj.jpg",
      route: "/languages/gujrati",
    },
    {
      name: "Kannada",
      image: "/images/kan.jpg",
      route: "/languages/kannada",
    },
    {
      name: "Tamil",
      image: "/images/tam.jpg",
      route: "/languages/tamil",
    },
  ];

  const cardsPerView =
    window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 4;
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
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("/images/multi.jpg")`,
          }}
        />
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12 pt-4 sm:pt-8">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-4 tracking-wider">
            MultiLanguage
          </h1>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-lg sm:text-xl font-light tracking-wide">
            Every Language Tells a Tale
          </p>
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mt-4 sm:mt-8 rounded-full"></div>
        </div>

        <div className="relative max-w-full sm:max-w-7xl mx-auto">
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md rounded-full p-2 sm:p-3 hover:bg-white/30 transition-all duration-300 group"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-black group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md rounded-full p-2 sm:p-3 hover:bg-white/30 transition-all duration-300 group"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-black group-hover:scale-110 transition-transform" />
          </button>

          <div className="overflow-hidden py-4 rounded-3xl">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / cardsPerView)
                }%)`,
              }}
            >
              {heritageData.map((site, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 px-2 sm:px-3`}
                >
                  <Link to={site.route} className="block">
                    <div className="group relative bg-white/10 backdrop-blur-md rounded-full overflow-hidden hover:scale-105 hover:bg-white/20 transition-all duration-500 border border-white/20 cursor-pointer">
                      <div className="relative h-64 sm:h-80  lg:h-130">
                        <img
                          src={site.image}
                          alt={site.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 text-center w-full px-2">
                          <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-bold group-hover:text-cyan-300 transition-colors">
                            {site.name}
                          </h3>
                        </div>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/20 to-zinc-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-4 sm:mt-6">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-cyan-400 hover:text-cyan-100 text-sm sm:text-base font-bold transition-colors"
            >
              {isAutoPlaying ? "Pause Auto-play" : "Resume Auto-play"}
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-8 sm:mt-12">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-all duration-300 hover:scale-105 shadow-lg">
            Discover more
          </button>
        </div>
      </div>
    </div>
  );
};

export default Multi;
