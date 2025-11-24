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

const KhajurahoTemples = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeVideoCategory, setActiveVideoCategory] = useState("historical");
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [currentFact, setCurrentFact] = useState(0);
  const [visitorsCount, setVisitorsCount] = useState(9876);
  const [timeOfDay, setTimeOfDay] = useState("dawn");

  const carouselImages = [
    {
      url: "/images/k1.jpg",
      title: "Khajuraho Temples",
      description: "Erotic Sculptures",
    },
    {
      url: "/images/k2.jpg",
      title: "Khajuraho Temples",
      description: "Chandela Masterpiece",
    },
    {
      url: "/images/k3.jpg",
      title: "Khajuraho Temples",
      description: "UNESCO Heritage",
    },
  ];

  const amazingFacts = [
    {
      icon: Heart,
      title: "Erotic Sculptures",
      fact: "Khajuraho Temples are renowned for their intricate erotic carvings, which represent only 10% of the total sculptures but symbolize the celebration of love and life.",
      color: "text-red-600",
    },
    {
      icon: Crown,
      title: "Chandela Dynasty",
      fact: "Built by the Chandela rulers between 950-1050 CE, these temples showcase the peak of Central Indian temple architecture.",
      color: "text-purple-600",
    },
    {
      icon: Sparkles,
      title: "Astronomical Alignment",
      fact: "The temples are aligned to face the sunrise, with some carvings reflecting astronomical knowledge of the time.",
      color: "text-yellow-600",
    },
    {
      icon: Star,
      title: "Artistic Mastery",
      fact: "The temples feature over 90,000 detailed carvings, depicting deities, celestial beings, and daily life in medieval India.",
      color: "text-blue-600",
    },
    {
      icon: Award,
      title: "UNESCO Heritage",
      fact: "Designated as a UNESCO World Heritage Site in 1986 for their outstanding artistic and architectural value.",
      color: "text-green-600",
    },
  ];

  const videoContent = {
    historical: [
      {
        id: "7k1eBax84kQ",
        title: "The Chandela Legacy",
        description:
          "Explore the history of the Chandela dynasty and the creation of Khajuraho",
        duration: "16:00",
        views: "1.7M",
        rating: 4.8,
        category: "Documentary",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Secrets of Khajuraho's Architecture",
        description:
          "Discover the engineering and artistry behind the temple carvings",
        duration: "13:20",
        views: "1.4M",
        rating: 4.7,
        category: "Architecture",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Medieval India's Golden Age",
        description:
          "Learn about the cultural and political context of the Chandela era",
        duration: "17:50",
        views: "2.0M",
        rating: 4.9,
        category: "History",
      },
    ],
    cultural: [
      {
        id: "dQw4w9WgXcQ",
        title: "Life in Ancient Khajuraho",
        description: "Experience the vibrant culture of medieval Central India",
        duration: "14:00",
        views: "1.3M",
        rating: 4.6,
        category: "Culture",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Khajuraho's Dance Festival",
        description:
          "Celebrate the annual classical dance festival held at the temples",
        duration: "12:10",
        views: "900K",
        rating: 4.7,
        category: "Festivals",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Traditional Crafts of Madhya Pradesh",
        description:
          "Meet artisans continuing the region's artistic traditions",
        duration: "11:00",
        views: "850K",
        rating: 4.5,
        category: "Craftsmanship",
      },
    ],
    music: [
      {
        id: "dQw4w9WgXcQ",
        title: "Classical Music at Khajuraho",
        description:
          "Traditional ragas performed during the Khajuraho Dance Festival",
        duration: "24:00",
        views: "2.3M",
        rating: 4.9,
        category: "Classical Music",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Folk Songs of Bundelkhand",
        description:
          "Melodies celebrating the heritage of the Khajuraho region",
        duration: "20:15",
        views: "1.2M",
        rating: 4.7,
        category: "Folk Music",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Devotional Bhajans",
        description:
          "Spiritual songs dedicated to the deities of Khajuraho temples",
        duration: "18:30",
        views: "1.5M",
        rating: 4.8,
        category: "Devotional",
      },
    ],
    mythology: [
      {
        id: "dQw4w9WgXcQ",
        title: "Myths of Khajuraho",
        description:
          "Uncover the legends behind the temple's erotic and divine carvings",
        duration: "15:50",
        views: "2.1M",
        rating: 4.8,
        category: "Mystery",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Tales of the Chandela Gods",
        description:
          "Explore the mythological stories depicted in the temple sculptures",
        duration: "12:30",
        views: "1.6M",
        rating: 4.6,
        category: "Legends",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Spiritual Symbolism",
        description: "The temples' role in Hindu and Jain spiritual traditions",
        duration: "19:20",
        views: "1.8M",
        rating: 4.9,
        category: "Spirituality",
      },
    ],
    virtual: [
      {
        id: "dQw4w9WgXcQ",
        title: "360° Tour of Khajuraho Temples",
        description:
          "Immersive virtual reality exploration of the temple complex",
        duration: "27:00",
        views: "3.5M",
        rating: 4.9,
        category: "VR Experience",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Drone Flight Over Khajuraho",
        description:
          "Aerial views showcasing the grandeur of the temple complex",
        duration: "9:00",
        views: "2.8M",
        rating: 4.8,
        category: "Aerial View",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Time-lapse: Khajuraho Temples",
        description:
          "Witness the temples' beauty through a day-to-night transition",
        duration: "4:20",
        views: "4.5M",
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
          `https://api.openweathermap.org/data/2.5/weather?q=Khajuraho,IN&appid=${apiKey}&units=metric`
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
        <div className="aspect-video bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center relative">
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
        <h4 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2 group-hover:text-purple-600 transition-colors">
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
          <button className="text-purple-600 hover:text-purple-800 font-medium text-xs">
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
        <ArrowLeft className="w-5 h-5 text-gray-700 group-hover:text-purple-600 transition-colors md:w-6 md:h-6" />
      </button>
      <div className="fixed top-4 right-4 z-50 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-200 md:top-6 md:right-6 md:px-4 md:py-3">
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="relative">
            <MapPin className="w-4 h-4 text-red-500 md:w-5 md:h-5" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-ping md:w-3 md:h-3"></div>
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-800 block md:text-sm">
              Khajuraho, Madhya Pradesh
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
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-purple-300 transition-all duration-300 z-20 bg-black/30 backdrop-blur-sm rounded-full p-2 hover:bg-black/50 hover:scale-105 md:left-8 md:p-4"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-purple-300 transition-all duration-300 z-20 bg-black/30 backdrop-blur-sm rounded-full p-2 hover:bg-black/50 hover:scale-105 md:right-8 md:p-4"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <div className="absolute top-16 left-4 z-20 max-w-md sm:max-w-lg md:top-20 md:left-8 md:max-w-xl">
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-8 border border-white/20">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
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
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full bg-gradient-to-br from-white to-gray-50 py-6 sm:py-8">
        <div className="flex flex-col">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 sm:mb-6 md:mb-8 leading-tight text-center sm:text-left">
                A Celebration of Art and Spirituality
                <br className="sm:hidden" />
                <span className="text-xl sm:text-2xl md:text-3xl">
                  in Stone
                </span>
              </h2>
              <div className="prose prose-sm sm:prose-base md:prose-lg text-gray-700 space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                  Nestled in Khajuraho, Madhya Pradesh, the Khajuraho Temples
                  are a stunning ensemble of Hindu and Jain temples renowned for
                  their intricate carvings and architectural brilliance. Built
                  by the Chandela dynasty between 950-1050 CE, these temples are
                  a testament to India's rich cultural and spiritual heritage.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-600">
                  The temples are famous for their detailed sculptures,
                  including the iconic erotic carvings that symbolize the
                  celebration of life and love. With their astronomical
                  alignment and artistic mastery, the Khajuraho Temples are a
                  UNESCO World Heritage Site, attracting visitors from around
                  the globe.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 sm:p-4 border border-purple-100 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                    <h3 className="font-semibold text-sm sm:text-base text-gray-800">
                      Construction
                    </h3>
                  </div>
                  <p className="text-lg sm:text-xl font-bold text-purple-600 mb-1">
                    950-1050 CE
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Chandela Era
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-3 sm:p-4 border border-blue-100 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    <h3 className="font-semibold text-sm sm:text-base text-gray-800">
                      Craftsmen
                    </h3>
                  </div>
                  <p className="text-lg sm:text-xl font-bold text-blue-600 mb-1">
                    Thousands
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Skilled artisans
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 sm:p-4 border border-green-100 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    <h3 className="font-semibold text-sm sm:text-base text-gray-800">
                      Recognition
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-green-600 mb-1">
                    UNESCO Heritage
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">Since 1986</p>
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
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm"
                        }`}
                      >
                        <IconComponent
                          className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110 ${
                            activeVideoCategory === category
                              ? "text-white"
                              : "text-purple-500"
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
                  <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                  {[
                    {
                      year: "950",
                      event:
                        "Construction of first temples begins under Chandela rulers",
                      color: "red",
                    },
                    {
                      year: "1002",
                      event: "Major temples like Kandariya Mahadeva completed",
                      color: "blue",
                    },
                    {
                      year: "1050",
                      event: "Khajuraho becomes a major cultural center",
                      color: "green",
                    },
                    {
                      year: "13th Century",
                      event: "Temples abandoned after Chandela decline",
                      color: "purple",
                    },
                    {
                      year: "1838",
                      event: "Rediscovered by British surveyor T.S. Burt",
                      color: "yellow",
                    },
                    {
                      year: "1986",
                      event: "Declared UNESCO World Heritage Site",
                      color: "pink",
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
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-3 sm:p-4 border border-orange-100">
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
                      Khajuraho, Chhatarpur, Madhya Pradesh 471606
                    </p>
                  </div>
                  <div className="relative rounded-lg overflow-hidden border border-orange-200 shadow-sm">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.373297063097!2d79.9190735145483!3d24.84702548406637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39829e3e3b8f7c1f%3A0x7c5c3f3b86e6f7e8e!2sKhajuraho%20Temples!5e0!3m2!1sen!2sin!4v1625123456789!5m2!1sen!2sin"
                      width="100%"
                      height="120"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Khajuraho Temples Location"
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
                      <p className="font-semibold text-orange-600">
                        Bhopal: 378km
                      </p>
                    </div>
                    <div className="bg-white/50 rounded-lg p-2 sm:p-3">
                      <p className="text-gray-600">Khajuraho Airport</p>
                      <p className="font-semibold text-orange-600">5km away</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-2 sm:p-3 border border-blue-200">
                    <p className="text-xs sm:text-sm font-medium text-blue-800 flex items-center gap-2">
                      🚗 Getting There
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      Fly to Khajuraho Airport or take a train to Khajuraho
                      Railway Station
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-3 sm:p-4 border border-blue-100">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Cloud className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  Current Weather in Khajuraho
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
                    <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg p-2 sm:p-3 border border-orange-200">
                      <p className="text-xs sm:text-sm font-medium text-orange-800">
                        Best photography time
                      </p>
                      <p className="text-xs text-orange-600">
                        Golden hour: 6:00-7:00 AM & 5:30-6:30 PM
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
                      <div className="flex justify-between">
                        <span>SAARC/BIMSTEC</span>
                        <span className="font-medium">₹40</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-2 sm:p-3 border border-purple-200">
                    <p className="text-xs sm:text-sm font-medium text-purple-800">
                      💡 Pro Tip
                    </p>
                    <p className="text-xs text-purple-600 mt-1">
                      Visit during the Khajuraho Dance Festival in February for
                      a cultural extravaganza!
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 sm:p-4 border border-purple-100">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
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
                            ? "ring-1 ring-purple-200 shadow-sm"
                            : ""
                        }`}
                        onClick={() => setCurrentFact(index)}
                      >
                        <div className="flex items-start gap-2">
                          <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100">
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

export default KhajurahoTemples;
