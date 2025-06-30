import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Search,
  User,
  Heart,
  Menu,
} from "lucide-react";
import HeritageCarousel from "../components/HeritageCarousel";
import ExiquisiteCrafts from "../components/ExiquisitieCrafts";

const videos = [
  { name: "India 360", src: "/videos/India-360-v2.mp4" },
  { name: "Adventure", src: "/videos/Adventure.mp4" },
  { name: "Nature", src: "/videos/Nature.mp4" },
  { name: "Wildlife", src: "/videos/Wildlife.mp4" },
  { name: "Heritage", src: "/videos/Heritage.mp4" },
  { name: "Spiritual", src: "/videos/Spiritual.mp4" },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [navDark, setNavDark] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [direction, setDirection] = useState("right");

  const transitionDuration = 800;

  useEffect(() => {
    const handleScroll = () => {
      setNavDark(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const startTransition = (target, dir) => {
    if (transitioning || target === current) return;
    setDirection(dir);
    setNext(target);
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(target);
      setNext(null);
      setTransitioning(false);
    }, transitionDuration);
  };

  const nextVideo = () =>
    startTransition((current + 1) % videos.length, "right");
  const prevVideo = () =>
    startTransition((current - 1 + videos.length) % videos.length, "left");
  const selectVideo = (index) => {
    if (index > current) startTransition(index, "right");
    else if (index < current) startTransition(index, "left");
  };

  return (
    <>
    <div className="relative h-screen w-screen overflow-hidden">
      <style>
        {`
                    .video-slide {
                        position: absolute;
                        top: 0; left: 0; width: 100%; height: 100%;
                        object-fit: cover;
                        z-index: 0;
                        transition: transform ${transitionDuration}ms cubic-bezier(0.4,0,0.2,1), opacity ${transitionDuration}ms cubic-bezier(0.4,0,0.2,1);
                    }
                    @keyframes slide-in-right {
                        from { transform: translateX(100%); }
                        to { transform: translateX(0%); }
                    }
                    @keyframes slide-in-left {
                        from { transform: translateX(-100%); }
                        to { transform: translateX(0%); }
                    }
                `}
      </style>

      {/* Current video */}
      <video
        key={videos[current].src}
        src={videos[current].src}
        autoPlay
        muted={isMuted}
        loop
        className="video-slide"
        style={{
          zIndex: transitioning ? 0 : 1,
          transform: transitioning
            ? direction === "right"
              ? "translateX(-100%)"
              : "translateX(100%)"
            : "translateX(0%)",
          opacity: transitioning ? 0.7 : 1,
        }}
      />

      {/* Next video (for transition) */}
      {transitioning && next !== null && (
        <video
          key={videos[next].src}
          src={videos[next].src}
          autoPlay
          muted={isMuted}
          loop
          className="video-slide"
          style={{
            zIndex: 1,
            transform:
              direction === "right" ? "translateX(0%)" : "translateX(0%)",
            opacity: 1,
            left: 0,
            ...(direction === "right"
              ? { transform: "translateX(100%)" }
              : { transform: "translateX(-100%)" }),
            animation: `slide-in-${direction} ${transitionDuration}ms forwards`,
          }}
        />
      )}

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 z-0"></div>

      {/* Navbar */}
      <div className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        navDark 
          ? 'bg-black/90 backdrop-blur-sm text-black shadow-lg' 
          : 'bg-transparent text-white'
      }`}>
        <div className="flex items-center justify-between px-6 lg:px-12 py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className={`text-2xl lg:text-3xl font-light tracking-wide transition-colors duration-300 ${
              navDark ? 'text-white' : 'text-white'
            }`}>
              Bharat
              <span className="text-2xl text-red-500 lg:text-3xl font-light tracking-wide">
                Darshan
              </span>
            </h1>
          </div>

          {/* Center Navigation */}
          <div className={`hidden lg:flex items-center space-x-8 text-base font-light transition-colors duration-300 ${
            navDark ? 'text-white' : 'text-white'
          }`}>
            <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-300 transition-colors">
              <span>Destinations</span>
              <ChevronRight className="w-4 h-4 rotate-90" />
            </div>
            <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-300 transition-colors">
              <span>Experiences</span>
              <ChevronRight className="w-4 h-4 rotate-90" />
            </div>
            <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-300 transition-colors">
              <span>Plan your trip</span>
              <ChevronRight className="w-4 h-4 rotate-90" />
            </div>
          </div>

          {/* Right side icons */}
          <div className={`flex items-center space-x-4 transition-colors duration-300 ${
            navDark ? 'text-white' : 'text-white'
          }`}>
            <Search className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" />
            <User className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" />
            <Heart className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" />
            <Menu className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors lg:hidden" />
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-10">
        {/* Video category tabs */}
        <div className="flex justify-center items-center space-x-0 text-white text-sm lg:text-base mb-6">
          {videos.map((video, index) => (
            <React.Fragment key={video.name}>
              <span
                className={`cursor-pointer px-4 py-2 transition-all duration-300 ${
                  current === index
                    ? "text-yellow-400 font-medium"
                    : "text-white/80 hover:text-white font-light"
                }`}
                onClick={() => selectVideo(index)}
              >
                {video.name}
              </span>
              {index < videos.length - 1 && (
                <div className="w-px h-4 bg-white/40"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevVideo}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white text-4xl z-10 transition-all duration-300 hover:scale-110"
        disabled={transitioning}
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={nextVideo}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white text-4xl z-10 transition-all duration-300 hover:scale-110"
        disabled={transitioning}
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Mute/Unmute button */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-8 right-8 text-white/80 hover:text-white z-10 transition-all duration-300"
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6" />
        ) : (
          <Volume2 className="w-6 h-6" />
        )}
      </button>
      <style jsx>{`
        .writing-mode-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
      
    </div>

    <div className="w-screen h-full">
      <HeritageCarousel />
     <ExiquisiteCrafts />
      
    </div>
    </>
    
  );
}