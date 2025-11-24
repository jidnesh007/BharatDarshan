import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Scam = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const destinations = [
    {
      id: 1,
      name: "Travelling",
      subtitle: "Overcharging by Transport (Taxi/Auto/Local Rickshaw)",
      image: "/images/s1.jpg",
    },
    {
      id: 2,
      name: "Overcharging Tickets",
      subtitle: "Tickets are sold at Higher Price",
      image: "/images/s2.jpg",
    },
    {
      id: 3,
      name: "Fake Souvenirs Scam",
      subtitle: "Souvenirs are sold at Higher Price",
      image:"/images/s4.jpg",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % destinations.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + destinations.length) % destinations.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getVisibleCards = () => {
    const cards = [];
    const totalCards = destinations.length;

    for (let i = -1; i <= 1; i++) {
      const index = (currentSlide + i + totalCards) % totalCards;
      cards.push({
        ...destinations[index],
        position: i,
        index: index,
      });
    }
    return cards;
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-4 sm:left-20 w-24 sm:w-32 h-24 sm:h-32 bg-blue-300 rounded-full"></div>
        <div className="absolute bottom-40 right-4 sm:right-32 w-16 sm:w-24 h-16 sm:h-24 bg-indigo-300 rounded-full"></div>
        <div className="absolute top-1/2 left-2 sm:left-10 w-12 sm:w-16 h-12 sm:h-16 bg-purple-300 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 relative z-5">
        <div className="text-center mb-8 sm:mb-16">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-300 mb-4 sm:mb-8 tracking-tight">
            SCAM DETECTION
          </h1>
        </div>

        <div className="relative max-w-full mx-auto overflow-hidden">
          <div className="flex items-center justify-center relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
            {getVisibleCards().map((card, idx) => {
              const isCenter = card.position === 0;
              const isLeft = card.position === -1;
              const isRight = card.position === 1;

              return (
                <div
                  key={`${card.id}-${card.position}`}
                  className={`absolute transition-all duration-1000 ease-out cursor-pointer ${
                    isCenter
                      ? "z-30 scale-100 w-[250px] sm:w-[400px] md:w-[600px] lg:w-[800px] h-[200px] sm:h-[320px] md:h-[400px] lg:h-[500px]"
                      : "z-10 scale-75 w-[200px] sm:w-[320px] md:w-[400px] lg:w-[600px] h-[160px] sm:h-[256px] md:h-[320px] lg:h-[400px] opacity-70 hover:opacity-90"
                  } ${
                    isLeft
                      ? "-translate-x-32 sm:-translate-x-48 md:-translate-x-64 lg:-translate-x-96"
                      : isRight
                      ? "translate-x-32 sm:translate-x-48 md:translate-x-64 lg:translate-x-96"
                      : "translate-x-0"
                  }`}
                  onClick={() => goToSlide(card.index)}
                >
                  <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl relative group transform-gpu">
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                    <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 text-white z-10">
                      <h3
                        className={`font-bold mb-2 sm:mb-3 text-orange-400 ${
                          isCenter
                            ? "text-xl sm:text-3xl md:text-4xl lg:text-5xl"
                            : "text-lg sm:text-2xl md:text-3xl lg:text-4xl"
                        }`}
                      >
                        {card.name}
                      </h3>
                      <p
                        className={`text-gray-200 ${
                          isCenter
                            ? "text-sm sm:text-base md:text-lg lg:text-xl"
                            : "text-xs sm:text-sm md:text-base lg:text-lg"
                        }`}
                      >
                        {card.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center mt-4 sm:mt-8 space-x-4 sm:space-x-8">
            <button
              onClick={prevSlide}
              className="bg-white/90 hover:bg-white text-gray-700 p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-400 ease-out group z-40"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300 ease-out" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-white/90 hover:bg-white text-gray-700 p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-400 ease-out group z-40"
            >
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300 ease-out" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scam;