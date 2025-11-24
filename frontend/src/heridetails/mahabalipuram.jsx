import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Cloud,
  Sun,
  CloudRain,
  ArrowLeft,
  MapPin,
  Play,
  Music,
  BookOpen,
  History,
  Star,
  Clock,
  Camera,
  Heart,
  Crown,
  Sparkles,
  Eye,
  Volume2,
  Share2,
  Calendar,
  Users,
  Award,
} from "lucide-react";

const Mahabalipuram = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeVideoCategory, setActiveVideoCategory] = useState("historical");
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [currentFact, setCurrentFact] = useState(0);
  const [visitorsCount, setVisitorsCount] = useState(12345);
  const [timeOfDay, setTimeOfDay] = useState("dawn");

  const carouselImages = [
    {
      url: "/images/m1.jpg",
      title: "Mahabalipuram",
      description: "Rock-Cut Marvels",
    },
    {
      url: "/images/m2.jpg",
      title: "Mahabalipuram",
      description: "Shore Temple Splendor",
    },
    {
      url: "/images/mahabalipuram3.jpg",
      title: "Mahabalipuram",
      description: "UNESCO Heritage Site",
    },
  ];

  const amazingFacts = [
    {
      icon: History,
      title: "Pallava Legacy",
      fact: "Mahabalipuram, also known as Mamallapuram, was a thriving port city of the Pallava dynasty in the 7th century.",
      color: "text-red-600",
    },
    {
      icon: Crown,
      title: "Rock-Cut Marvels",
      fact: "The site features intricately carved rock-cut temples, caves, and monolithic rathas, showcasing Pallava artistry.",
      color: "text-purple-600",
    },
    {
      icon: Sparkles,
      title: "Shore Temple",
      fact: "The Shore Temple, a UNESCO site, stands majestically by the Bay of Bengal, enduring centuries of sea erosion.",
      color: "text-blue-600",
    },
    {
      icon: Star,
      title: "Sculptural Excellence",
      fact: "The Arjuna’s Penance relief is one of the largest rock reliefs in the world, depicting vivid mythological scenes.",
      color: "text-yellow-600",
    },
    {
      icon: Award,
      title: "UNESCO Heritage",
      fact: "Designated as a UNESCO World Heritage Site in 1984 for its outstanding examples of Pallava architecture.",
      color: "text-green-600",
    },
  ];

  const videoContent = {
    historical: [
      {
        id: "dQw4w9WgXcQ",
        title: "The Pallava Dynasty’s Golden Era",
        description:
          "Explore the history of Mahabalipuram during the reign of the Pallava kings",
        duration: "16:00",
        views: "1.9M",
        rating: 4.8,
        category: "Documentary",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Rock-Cut Architecture of Mahabalipuram",
        description:
          "Discover the techniques used to carve temples from monolithic rock",
        duration: "13:15",
        views: "1.6M",
        rating: 4.7,
        category: "Architecture",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Mamallapuram: A Port City’s Legacy",
        description:
          "Journey through the maritime history of this ancient coastal town",
        duration: "17:50",
        views: "2.3M",
        rating: 4.9,
        category: "History",
      },
    ],
    cultural: [
      {
        id: "dQw4w9WgXcQ",
        title: "Life in Ancient Mahabalipuram",
        description:
          "Experience the vibrant culture and trade of the Pallava port city",
        duration: "14:30",
        views: "1.4M",
        rating: 4.7,
        category: "Culture",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Stone Carving Traditions",
        description:
          "Meet artisans continuing the ancient craft of rock sculpting",
        duration: "10:50",
        views: "920K",
        rating: 4.6,
        category: "Craftsmanship",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Festivals by the Shore",
        description:
          "Celebrate the vibrant festivals and traditions of Mahabalipuram",
        duration: "12:20",
        views: "1.3M",
        rating: 4.8,
        category: "Festivals",
      },
    ],
    music: [
      {
        id: "dQw4w9WgXcQ",
        title: "Carnatic Music of Tamil Nadu",
        description:
          "Soulful Carnatic melodies inspired by the heritage of Mahabalipuram",
        duration: "24:00",
        views: "2.5M",
        rating: 4.9,
        category: "Carnatic Music",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Devotional Songs of the Shore Temple",
        description:
          "Traditional bhajans dedicated to the deities of the Shore Temple",
        duration: "20:15",
        views: "1.7M",
        rating: 4.8,
        category: "Devotional",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Folk Music of Coastal Tamil Nadu",
        description:
          "Vibrant folk songs celebrating the coastal life and heritage",
        duration: "18:40",
        views: "1.2M",
        rating: 4.7,
        category: "Folk Music",
      },
    ],
    mythology: [
      {
        id: "dQw4w9WgXcQ",
        title: "Myths of Arjuna’s Penance",
        description:
          "Uncover the stories behind the massive rock relief of Arjuna’s Penance",
        duration: "15:10",
        views: "2.4M",
        rating: 4.8,
        category: "Mythology",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Legends of the Shore Temple",
        description:
          "Explore the mythological tales associated with the seaside temple",
        duration: "11:45",
        views: "1.6M",
        rating: 4.6,
        category: "Legends",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Spiritual Significance of Mahabalipuram",
        description:
          "Understand the spiritual importance of the site in Hindu tradition",
        duration: "19:30",
        views: "1.8M",
        rating: 4.9,
        category: "Spirituality",
      },
    ],
    virtual: [
      {
        id: "dQw4w9WgXcQ",
        title: "360° Tour of Mahabalipuram",
        description:
          "Immersive virtual reality tour of the rock-cut temples and rathas",
        duration: "26:20",
        views: "4.0M",
        rating: 4.9,
        category: "VR Experience",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Aerial Views of Mahabalipuram",
        description:
          "Stunning drone footage showcasing the coastal monuments from above",
        duration: "9:00",
        views: "3.0M",
        rating: 4.8,
        category: "Aerial View",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Time-lapse: Shore Temple",
        description:
          "Witness the Shore Temple’s beauty under changing light conditions",
        duration: "4:15",
        views: "5.2M",
        rating: 4.9,
        category: "Time-lapse",
      },
    ],
  };

  const categoryIcons = {
    historical: History,
    cultural: BookOpen,
    music: Music,
    mythology: Eye,
    virtual: Camera,
  };

  const categoryLabels = {
    historical: "Historical Tales",
    cultural: "Cultural Heritage",
    music: "Sacred Music",
    mythology: "Legends & Myths",
    virtual: "Virtual Experience",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorsCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % amazingFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) return "dawn";
      if (hour >= 12 && hour < 17) return "day";
      if (hour >= 17 && hour < 20) return "sunset";
      return "night";
    };

    setTimeOfDay(getTimeOfDay());
    const timeInterval = setInterval(() => {
      setTimeOfDay(getTimeOfDay());
    }, 60000);
    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        if (!apiKey) {
          console.error("OpenWeather API key not found");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Mamallapuram,IN&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        setWeather(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather:", error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain?.toLowerCase()) {
      case "clear":
        return <Sun className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />;
      case "clouds":
        return <Cloud className="w-5 h-5 md:w-6 md:h-6 text-gray-500" />;
      case "rain":
        return <CloudRain className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />;
      default:
        return <Sun className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />;
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleBackClick = () => {
    window.history.back();
  };

  const EnhancedVideoCard = ({ video, index }) => (
    <div
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onMouseEnter={() => setHoveredVideo(index)}
      onMouseLeave={() => setHoveredVideo(null)}
    >
      <div className="relative overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center relative">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.id}`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="transition-transform duration-300 group-hover:scale-105"
          ></iframe>
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
              <Play className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="absolute top-2 left-2 flex gap-1">
          <span className="bg-black/70 text-white text-xs px-1.5 py-0.5 rounded-full">
            {video.category}
          </span>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded-full">
          {video.duration}
        </div>
        <div
          className={`absolute top-2 right-2 flex gap-1 transition-all duration-300 ${
            hoveredVideo === index
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-3"
          }`}
        >
          <button className="bg-white/20 backdrop-blur-sm text-white p-1.5 rounded-full hover:bg-white/30 transition-colors">
            <Share2 className="w-3 h-3" />
          </button>
          <button className="bg-white/20 backdrop-blur-sm text-white p-1.5 rounded-full hover:bg-white/30 transition-colors">
            <Heart className="w-3 h-3" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {video.title}
        </h4>
        <p className="text-xs text-gray-600 line-clamp-2 mb-2">
          {video.description}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {video.views}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500" />
              {video.rating}
            </span>
          </div>
          <button className="text-blue-600 hover:text-blue-800 font-medium text-xs">
            Watch Now
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <button
        onClick={handleBackClick}
        className="fixed top-4 left-4 z-50 bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300 group border border-gray-200 hover:scale-105 md:top-6 md:left-6 md:p-3"
      >
        <ArrowLeft className="w-5 h-5 text-gray-700 group-hover:text-blue-600 transition-colors md:w-6 md:h-6" />
      </button>
      <div className="fixed top-4 right-4 z-50 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-200 md:top-6 md:right-6 md:px-4 md:py-3">
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="relative">
            <MapPin className="w-4 h-4 text-red-500 md:w-5 md:h-5" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-ping md:w-3 md:h-3"></div>
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-800 block md:text-sm">
              Mahabalipuram, Tamil Nadu
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Users className="w-3 h-3" />
              {visitorsCount.toLocaleString()} visitors
            </span>
          </div>
        </div>
      </div>
      <div className="relative w-full h-[40vh] sm:h-[60vh] md:h-[80vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url('${carouselImages[currentImageIndex].url}')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70"></div>
        </div>
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-300 transition-all duration-300 z-20 bg-black/30 backdrop-blur-sm rounded-full p-2 hover:bg-black/50 hover:scale-105 md:left-8 md:p-4"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-300 transition-all duration-300 z-20 bg-black/30 backdrop-blur-sm rounded-full p-2 hover:bg-black/50 hover:scale-105 md:right-8 md:p-4"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <div className="absolute top-16 left-4 z-20 max-w-md sm:max-w-lg md:top-20 md:left-8 md:max-w-xl">
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-8 border border-white/20">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              {carouselImages[currentImageIndex].title}
            </h1>
            {/* <p className="text-sm sm:text-base md:text-lg text-white/90 drop-shadow-md">
              {carouselImages[currentImageIndex].description}
            </p> */}
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20 md:bottom-8 md:space-x-3">
          {carouselImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`group relative transition-all duration-500 ${
                index === currentImageIndex
                  ? "w-8 h-2 bg-white shadow-md md:w-10 md:h-3"
                  : "w-2 h-2 bg-white/50 hover:bg-white/75 md:w-3 md:h-3"
              } rounded-full overflow-hidden`}
            >
              {index === currentImageIndex && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full bg-gradient-to-br from-white to-gray-50 py-6 sm:py-8">
        <div className="flex flex-col">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4 sm:mb-6 md:mb-8 leading-tight text-center sm:text-left">
                A Coastal Haven of Art and History
                <br className="sm:hidden" />
                <span className="text-xl sm:text-2xl md:text-3xl">
                  and Pallava Architectural Splendor
                </span>
              </h2>
              <div className="prose prose-sm sm:prose-base md:prose-lg text-gray-700 space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                  Mahabalipuram, located on the Coromandel Coast in Tamil Nadu,
                  is a testament to the artistic and architectural prowess of
                  the Pallava dynasty. Known for its rock-cut temples,
                  monolithic rathas, and the iconic Shore Temple, this UNESCO
                  World Heritage Site is a treasure trove of 7th-century art and
                  history.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-600">
                  The site’s intricate carvings, including the massive Arjuna’s
                  Penance relief, depict mythological narratives and daily life
                  with remarkable detail. The Shore Temple, standing resiliently
                  by the sea, is a masterpiece of Dravidian architecture and a
                  symbol of Mahabalipuram’s maritime legacy.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-3 sm:p-4 border border-blue-100 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    <h3 className="font-semibold text-sm sm:text-base text-gray-800">
                      Construction
                    </h3>
                  </div>
                  <p className="text-lg sm:text-xl font-bold text-blue-600 mb-1">
                    7th Century
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Pallava Dynasty
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 sm:p-4 border border-green-100 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    <h3 className="font-semibold text-sm sm:text-base text-gray-800">
                      Artisans
                    </h3>
                  </div>
                  <p className="text-lg sm:text-xl font-bold text-green-600 mb-1">
                    Hundreds
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Skilled sculptors
                  </p>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-3 sm:p-4 border border-red-100 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                    <h3 className="font-semibold text-sm sm:text-base text-gray-800">
                      Recognition
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-red-600 mb-1">
                    UNESCO Heritage
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">Since 1984</p>
                </div>
              </div>
              <div className="mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                    Immersive Experiences
                  </h3>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mt-2 sm:mt-0">
                    <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Use headphones for best experience</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 overflow-x-auto pb-2">
                  {Object.keys(videoContent).map((category) => {
                    const IconComponent = categoryIcons[category];
                    return (
                      <button
                        key={category}
                        onClick={() => setActiveVideoCategory(category)}
                        className={`group flex items-center space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-all duration-300 hover:scale-105 text-xs sm:text-sm whitespace-nowrap ${
                          activeVideoCategory === category
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md"
                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm"
                        }`}
                      >
                        <IconComponent
                          className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110 ${
                            activeVideoCategory === category
                              ? "text-white"
                              : "text-blue-500"
                          }`}
                        />
                        <span className="font-medium">
                          {categoryLabels[category]}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {videoContent[activeVideoCategory].map((video, index) => (
                    <EnhancedVideoCard
                      key={`${activeVideoCategory}-${index}`}
                      video={video}
                      index={index}
                    />
                  ))}
                </div>
              </div>
              <div className="mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                  Historical Timeline
                </h3>
                <div className="relative">
                  <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                  {[
                    {
                      year: "630",
                      event:
                        "Pallava king Narasimhavarman I begins construction",
                      color: "red",
                    },
                    {
                      year: "650",
                      event: "Shore Temple construction completed",
                      color: "blue",
                    },
                    {
                      year: "700",
                      event: "Monolithic rathas and caves carved",
                      color: "green",
                    },
                    {
                      year: "1984",
                      event: "Designated UNESCO World Heritage Site",
                      color: "purple",
                    },
                    {
                      year: "2004",
                      event: "Site survives Indian Ocean tsunami",
                      color: "yellow",
                    },
                    {
                      year: "2010",
                      event: "Annual Mamallapuram Dance Festival begins",
                      color: "cyan",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="relative flex items-center mb-4 sm:mb-6 group"
                    >
                      <div
                        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white shadow-md bg-${item.color}-500 relative z-10 group-hover:scale-125 transition-transform duration-300`}
                      ></div>
                      <div className="ml-5 sm:ml-6 bg-white rounded-lg p-3 sm:p-4 shadow-md border border-gray-100 flex-1 group-hover:shadow-lg transition-all duration-300">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                          <span
                            className={`text-base sm:text-lg font-semibold text-${item.color}-600`}
                          >
                            {item.year}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-700">
                            {item.event}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-white border-t border-gray-200">
            <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-3 sm:p-4 border border-blue-100">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                  Location & Directions
                </h3>
                <div className="space-y-4">
                  <div className="bg-white/50 rounded-lg p-2 sm:p-3">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">
                      Address
                    </p>
                    <p className="font-semibold text-xs sm:text-sm text-gray-800">
                      Mamallapuram, Chengalpattu District, Tamil Nadu 603104
                    </p>
                  </div>
                  <div className="relative rounded-lg overflow-hidden border border-blue-200 shadow-sm">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.184418259148!2d80.19013531462222!3d12.617344991108944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5259d1b7a4c4d1%3A0x1b3e0f9f9f9f9f9f!2sMahabalipuram!5e0!3m2!1sen!2sin!4v1625123456789!5m2!1sen!2sin"
                      width="100%"
                      height="120"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Mahabalipuram Location"
                      className="rounded-lg"
                    ></iframe>
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg px-1.5 py-0.5">
                      <span className="text-xs font-medium text-gray-700">
                        Interactive Map
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                    <div className="bg-white/50 rounded-lg p-2 sm:p-3">
                      <p className="text-gray-600">Distance from</p>
                      <p className="font-semibold text-blue-600">
                        Chennai: 55km
                      </p>
                    </div>
                    <div className="bg-white/50 rounded-lg p-2 sm:p-3">
                      <p className="text-gray-600">Pondicherry</p>
                      <p className="font-semibold text-blue-600">100km away</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-2 sm:p-3 border border-green-200">
                    <p className="text-xs sm:text-sm font-medium text-green-800 flex items-center gap-2">
                      🚗 Getting There
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      Take the East Coast Road (ECR) from Chennai for a scenic
                      1-hour drive
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-3 sm:p-4 border border-blue-100">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Cloud className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  Current Weather in Mahabalipuram
                </h3>
                {loading ? (
                  <div className="flex items-center justify-center py-4 sm:py-6">
                    <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-blue-500"></div>
                  </div>
                ) : weather ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getWeatherIcon(weather.weather?.[0]?.main)}
                        <span className="text-lg sm:text-xl font-semibold text-gray-800">
                          {Math.round(weather.main?.temp)}°C
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-xs sm:text-sm text-gray-600 capitalize">
                          {weather.weather?.[0]?.description}
                        </p>
                        <p className="text-xs text-gray-500">
                          Feels like {Math.round(weather.main?.feels_like)}°C
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div className="bg-white/50 rounded-lg p-2 sm:p-3">
                        <p className="text-gray-600">Humidity</p>
                        <p className="font-semibold text-blue-600">
                          {weather.main?.humidity}%
                        </p>
                      </div>
                      <div className="bg-white/50 rounded-lg p-2 sm:p-3">
                        <p className="text-gray-600">Visibility</p>
                        <p className="font-semibold text-blue-600">
                          {weather.visibility
                            ? `${weather.visibility / 1000}km`
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-2 sm:p-3 border border-blue-200">
                      <p className="text-xs sm:text-sm font-medium text-blue-800">
                        Best photography time
                      </p>
                      <p className="text-xs text-blue-600">
                        Sunset: 5:30-6:30 PM for dramatic coastal lighting
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Weather data unavailable
                  </p>
                )}
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 sm:p-4 border border-green-100">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  Visit Information
                </h3>
                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-1 sm:py-2 border-b border-green-100">
                    <span className="text-gray-600">Today's Date</span>
                    <span className="font-semibold text-gray-800">
                      {formatDate()}
                    </span>
                  </div>
                  <div className="bg-white/50 rounded-lg p-2 sm:p-3 space-y-2">
                    <h4 className="font-semibold text-green-800">
                      Opening Hours
                    </h4>
                    <div className="flex justify-between">
                      <span>Daily</span>
                      <span className="font-medium">6:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                  <div className="bg-white/50 rounded-lg p-2 sm:p-3 space-y-2">
                    <h4 className="font-semibold text-green-800">Entry Fees</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Indian Citizens</span>
                        <span className="font-medium">₹40</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Foreign Tourists</span>
                        <span className="font-medium">₹600</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-2 sm:p-3 border border-blue-200">
                    <p className="text-xs sm:text-sm font-medium text-blue-800">
                      💡 Pro Tip
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      Visit during the Mamallapuram Dance Festival (Dec-Jan) for
                      cultural performances!
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-3 sm:p-4 border border-blue-100">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  Did You Know?
                </h3>
                <div className="space-y-4">
                  {amazingFacts.map((fact, index) => {
                    const IconComponent = fact.icon;
                    return (
                      <div
                        key={index}
                        className={`bg-white rounded-lg p-2 sm:p-3 border border-gray-100 transition-all duration-300 cursor-pointer hover:shadow-md ${
                          index === currentFact
                            ? "ring-1 ring-blue-200 shadow-sm"
                            : ""
                        }`}
                        onClick={() => setCurrentFact(index)}
                      >
                        <div className="flex items-start gap-2">
                          <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100">
                            <IconComponent
                              className={`w-4 h-4 ${fact.color}`}
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-xs sm:text-sm text-gray-800 mb-1">
                              {fact.title}
                            </h4>
                            <p className="text-xs text-gray-600 leading-relaxed">
                              {fact.fact}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mahabalipuram;
