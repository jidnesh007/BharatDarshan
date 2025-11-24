import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeritageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const heritageData = [
    {
      id: "taj-mahal",
      name: "Taj Mahal",
      location: "Uttar Pradesh",
      image: "/images/taj1.jpg",
      description: "Symbol of eternal love",
      route: "/heridetails/TajMahal",
    },
    {
      id: "qutub-minar",
      name: "Qutub Minar",
      location: "Delhi",
      image: "/images/qutub.jpg",
      description: "Towering minaret of victory",
      route: "/heridetails/QutubMinar",
    },
    {
      id: "ajanta-ellora",
      name: "Ajanta & Ellora Caves",
      location: "Maharashtra",
      image: "/images/minar.jpg",
      description: "Ancient rock-cut masterpieces",
      route: "/heridetails/ajantaEllora",
    },
    {
      id: "hampi",
      name: "Hampi ",
      location: "Karnataka",
      image: "/images/hamp.jpg",
      description: "Ruins of Vijayanagara Empire",
      route: "/heridetails/hampi",
    },
    {
      id: "khajuraho",
      name: "Khajuraho Temples",
      location: "Madhya Pradesh",
      image: "/images/kan.jpg",
      description: "Exquisite sculptural art",
      route: "/heridetails/khajuraho",
    },
    {
      id: "mahabalipuram",
      name: "Mahabalipuram",
      location: "Tamil Nadu",
      image: "/images/maha.jpg",
      description: "Shore temples by the sea",
      route: "/heridetails/mahabalipuram",
    },
    {
      id: "sun-temple",
      name: "Sun Temple, Konark",
      location: "Odisha",
      image: "/images/sun1.jpg",
      description: "Chariot of the Sun God",
      route: "/heridetails/SunTemple",
    },
    {
      id: "red-fort",
      name: "Red Fort",
      location: "Delhi",
      image: "/images/red.jpg",
      description: "Mughal architectural marvel",
      route: "/heridetails/RedFort",
    },
    {
      id: "jaipur",
      name: "Jaipur City",
      location: "Rajasthan",
      image: "/images/jai.jpg",
      description: "The Pink City",
      route: "/heridetails/JaipurCity",
    },
    {
      id: "chola-temples",
      name: "Chola Temples",
      location: "Tamil Nadu",
      image: "/images/chola.jpg",
      description: "Dravidian architecture pinnacle",
      route: "/heridetails/cholaTemples",
    },
    {
      id: "fatehpur-sikri",
      name: "Fatehpur Sikri",
      location: "Uttar Pradesh",
      image: "/images/fateh.jpg",
      description: "Abandoned Mughal capital",
      route: "/heridetails/fatehpursikri",
    },
    {
      id: "rani-ki-vav",
      name: "Rani Ki Vav",
      location: "Gujarat",
      image: "/images/Ran1.jpg",
      description: "Stepwell architectural wonder",
      route: "/heridetails/RaniKiVav",
    },
    {
      id: "kaziranga",
      name: "Kaziranga National Park",
      location: "Assam",
      image: "/images/kazii.jpg",
      description: "One-horned rhino sanctuary",
      route: "/heridetails/kaziranga",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("/images/attraction-bg.jpg")`,
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-6xl sm:text-6xl md:text-10xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-4 tracking-wider">
            HERITAGE
          </h1>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-lg sm:text-xl font-light tracking-wide">
            worth a thousand stories
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

          <div className="overflow-hidden rounded-2xl">
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
                    <div className="group relative bg-white/10 backdrop-blur-md rounded-xl overflow-hidden hover:scale-105 hover:bg-white/20 transition-all duration-500 border border-white/20 cursor-pointer">
                      <div className="relative h-64 sm:h-80 lg:h-140 overflow-hidden">
                        <img
                          src={site.image}
                          alt={site.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6">
                          <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-bold group-hover:text-cyan-300 transition-colors">
                            {site.name}
                          </h3>
                          <p className="text-cyan-200 text-xs sm:text-sm mt-1">
                            {site.location}
                          </p>
                        </div>

                        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-cyan-500/80 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          Click to explore
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
      </div>
    </div>
  );
};

export default HeritageCarousel;
