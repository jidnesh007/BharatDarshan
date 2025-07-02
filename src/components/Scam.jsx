import React, { useState } from "react";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";

const Scam = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const destinations = [
    {
      id: 1,
      name: "Travelling",
      subtitle: "Overcharging by Transport (Taxi/Auto/Local Rickshaw)",

      image:
        "/images/s1.jpg",
    },
    {
      id: 2,
      name: "Overcharging Tickets",
      subtitle: "Tickets are sold at Higer Price",

      image:
        "/images/s2.jpg",
    },
    {
      id: 3,
      name: "Fake Souvenirs Scam",
      subtitle: "Sovernier are sold at Higer Price",
      image:
        "/images/s4.jpg",
    },
    
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % destinations.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + destinations.length) % destinations.length
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getVisibleCards = () => {
    const cards = [];
    const totalCards = destinations.length;

    // Show 3 cards: previous, current, next
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
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-300 rounded-full"></div>
        <div className="absolute bottom-40 right-32 w-24 h-24 bg-indigo-300 rounded-full"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-purple-300 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-5">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-300 mb-8 tracking-tight">
            SCAM DETECTION
          </h1>
          
        </div>

        {/* Card Carousel Container */}
        <div className="relative max-w-full mx-auto overflow-hidden">
          <div className="flex items-center justify-center relative h-[500px] md:h-[600px] lg:h-[700px]">
            {getVisibleCards().map((card, idx) => {
              const isCenter = card.position === 0;
              const isLeft = card.position === -1;
              const isRight = card.position === 1;

              return (
                <div
                  key={`${card.id}-${card.position}`}
                  className={`absolute transition-all duration-1000 ease-out cursor-pointer ${
                    isCenter
                      ? "z-30 scale-100 w-[500px] h-[400px] md:w-[700px] md:h-[500px] lg:w-[900px] lg:h-[600px]"
                      : "z-10 scale-75 w-[400px] h-[320px] md:w-[500px] md:h-[400px] lg:w-[600px] lg:h-[480px] opacity-70 hover:opacity-90"
                  } ${
                    isLeft
                      ? "-translate-x-64 md:-translate-x-96 lg:-translate-x-[500px]"
                      : isRight
                      ? "translate-x-64 md:translate-x-96 lg:translate-x-[500px]"
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

                    {/* Content Overlay */}
                    <div className="absolute bottom-8 left-8 text-white z-10">
                      <h3
                        className={`font-bold mb-3 text-orange-400 ${
                          isCenter
                            ? "text-4xl md:text-5xl lg:text-6xl"
                            : "text-3xl md:text-4xl lg:text-5xl"
                        }`}
                      >
                        {card.name}
                      </h3>
                      <p
                        className={`mb-4 text-gray-200 ${
                          isCenter
                            ? "text-lg md:text-xl lg:text-2xl"
                            : "text-base md:text-lg lg:text-xl"
                        }`}
                      >
                        {card.subtitle}
                      </p>
                      <div className="flex items-center text-white">
                        
                        <span
                          className={`font-medium ${
                            isCenter
                              ? "text-lg md:text-xl lg:text-2xl"
                              : "text-base md:text-lg lg:text-xl"
                          }`}
                        >
                        
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-8 space-x-8">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="bg-white/90 hover:bg-white text-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-400 ease-out group z-40"
            >
              <ArrowLeft className="w-6 h-6 group-hover:scale-110 transition-transform duration-300 ease-out" />
            </button>

           

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="bg-white/90 hover:bg-white text-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-400 ease-out group z-40"
            >
              <ArrowRight className="w-6 h-6 group-hover:scale-110 transition-transform duration-300 ease-out" />
            </button>
          </div>
        </div>

        {/* Auto-play indicator */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-2 text-gray-500 text-sm">
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scam;
