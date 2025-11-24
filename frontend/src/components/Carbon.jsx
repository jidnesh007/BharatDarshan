import React, { useRef, useEffect } from "react";
const Carbon = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.requestFullscreen?.();
    }
  }, []);

  return (
    <div className="relative w-screen h-screen  overflow-hidden">
      <video
        ref={videoRef}
        src="/videos/carbon.mp4"
        autoPlay
        muted
        loop
        controls={false}
        style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
      />

      {/* Elegant gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>

      {/* Text Overlay with Heritage-inspired styling */}
      <div className="absolute inset-0 flex items-center justify-center p-6 pointer-events-none">
        <div className="text-center max-w-5xl">
          {/* Main heading with elegant serif font and golden accent */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-4 leading-tight tracking-wide">
              <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent drop-shadow-2xl">
                Carbon
              </span>
              <br />
              <span className="text-white drop-shadow-2xl">Tracker</span>
            </h1>

            <div className="mt-12">
              <button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white px-8 py-4 rounded-lg font-semibold text-lg tracking-wide shadow-2xl transition-all duration-300 transform hover:scale-105 border border-amber-500/50 pointer-events-auto">
                Begin Your Journey
              </button>
            </div>
          </div>

          {/* Subtitle with refined typography */}
          <p className="text-xl md:text-2xl lg:text-3xl text-white leading-relaxed font-light tracking-wide max-w-4xl mx-auto">
            <span className="font-medium text-amber-100">Harness AI</span> to
            estimate the carbon footprint of tourism at heritage sites.
            <br className="hidden md:block" />
            <span className="text-gray-200">
              Discover eco-friendly practices, calculate environmental impact,
              and embrace sustainable carbon credits.
            </span>
          </p>

          {/* Call to action with heritage-inspired button */}
        </div>
      </div>
    </div>
  );
};

export default Carbon;
