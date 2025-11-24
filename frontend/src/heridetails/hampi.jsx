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

const Hampi = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeVideoCategory, setActiveVideoCategory] = useState("historical");
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [showFactModal, setShowFactModal] = useState(false);
  const [currentFact, setCurrentFact] = useState(0);
  const [visitorsCount, setVisitorsCount] = useState(12345);
  const [timeOfDay, setTimeOfDay] = useState("dawn");

  const carouselImages = [
    {
      url: "/images/h1.jpg",
      title: "Hampi",
      description: "The ancient ruins of Vijayanagara",
    },
    {
      url: "/images/h2.jpg",
      title: "Hampi",
      description: "Explore the sacred landscape",
    },
    {
      url: "/images/h3.jpg",
      title: "Hampi",
      description: "Discover architectural wonders",
    },
  ];

  const amazingFacts = [
    {
      icon: Crown,
      title: "Vijayanagara Empire",
      fact: "Hampi was the capital of the Vijayanagara Empire, one of the greatest Hindu empires in South India, flourishing in the 14th-16th centuries.",
      color: "text-red-500",
    },
    {
      icon: Heart,
      title: "Architectural Marvel",
      fact: "Hampi’s ruins, including the Virupaksha Temple and Vittala Temple, showcase Dravidian architecture with intricate stone carvings.",
      color: "text-purple-500",
    },
    {
      icon: Sparkles,
      title: "Sacred Landscape",
      fact: "Hampi is set along the Tungabhadra River, surrounded by boulder-strewn hills, believed to be part of the mythical Kishkindha from the Ramayana.",
      color: "text-yellow-500",
    },
    {
      icon: Star,
      title: "UNESCO Heritage",
      fact: "Hampi was designated a UNESCO World Heritage Site in 1986 for its outstanding historical and architectural significance.",
      color: "text-blue-500",
    },
    {
      icon: Award,
      title: "Bazaar Legacy",
      fact: "Hampi’s ancient bazaars, like the one near Virupaksha Temple, were once bustling markets trading in gold, gems, and horses.",
      color: "text-green-500",
    },
  ];

  const videoContent = {
    historical: [
      {
        id: "dQw4w9WgXcQ",
        title: "Rise and Fall of Vijayanagara",
        description:
          "Explore the glorious history of the Vijayanagara Empire and its capital, Hampi",
        duration: "16:00",
        views: "2.3M",
        rating: 4.9,
        category: "Documentary",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Secrets of Vittala Temple",
        description:
          "Discover the architectural brilliance of Hampi’s musical pillars and stone chariot",
        duration: "13:15",
        views: "1.9M",
        rating: 4.8,
        category: "Architecture",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Hampi’s Royal Legacy",
        description:
          "Journey through the reign of Krishnadevaraya and Hampi’s golden era",
        duration: "17:50",
        views: "3.0M",
        rating: 4.9,
        category: "History",
      },
    ],
    cultural: [
      {
        id: "dQw4w9WgXcQ",
        title: "Life in Ancient Hampi",
        description:
          "Experience the vibrant culture and daily life of the Vijayanagara Empire",
        duration: "14:00",
        views: "1.4M",
        rating: 4.7,
        category: "Culture",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Traditional Crafts of Hampi",
        description:
          "Meet artisans preserving ancient stone carving and weaving traditions",
        duration: "11:15",
        views: "850K",
        rating: 4.6,
        category: "Craftsmanship",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Festivals of Hampi",
        description:
          "Celebrate the vibrant festivals like Hampi Utsav that bring the ruins to life",
        duration: "13:30",
        views: "1.1M",
        rating: 4.8,
        category: "Festivals",
      },
    ],
    music: [
      {
        id: "dQw4w9WgXcQ",
        title: "Dravidian Melodies",
        description:
          "Soulful Carnatic music inspired by Hampi’s spiritual heritage",
        duration: "24:30",
        views: "2.6M",
        rating: 4.9,
        category: "Carnatic Music",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Songs of the Tungabhadra",
        description:
          "Traditional folk music celebrating Hampi’s river and mythology",
        duration: "31:00",
        views: "1.7M",
        rating: 4.8,
        category: "Folk Music",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Temple Chants of Hampi",
        description: "Sacred hymns performed in the ancient temples of Hampi",
        duration: "19:00",
        views: "1.0M",
        rating: 4.7,
        category: "Devotional Music",
      },
    ],
    mythology: [
      {
        id: "dQw4w9WgXcQ",
        title: "Hampi and the Ramayana",
        description:
          "Explore Hampi’s connection to Kishkindha, the monkey kingdom in the Ramayana",
        duration: "16:15",
        views: "2.4M",
        rating: 4.8,
        category: "Mythology",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Legends of Virupaksha",
        description:
          "Uncover the spiritual myths surrounding the Virupaksha Temple",
        duration: "12:00",
        views: "1.6M",
        rating: 4.6,
        category: "Legends",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Hampi’s Sacred Stories",
        description:
          "Dive into the spiritual significance of Hampi in Hindu mythology",
        duration: "20:30",
        views: "1.8M",
        rating: 4.9,
        category: "Spirituality",
      },
    ],
    virtual: [
      {
        id: "dQw4w9WgXcQ",
        title: "360° Virtual Tour of Hampi",
        description:
          "Immersive virtual reality experience of Hampi’s ancient ruins",
        duration: "27:45",
        views: "4.0M",
        rating: 4.9,
        category: "VR Experience",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Drone Flight Over Hampi",
        description:
          "Aerial views of Hampi’s boulder-strewn landscape and temples",
        duration: "9:00",
        views: "3.0M",
        rating: 4.8,
        category: "Aerial View",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Time-lapse: Hampi’s Ruins",
        description:
          "Witness the magical transformation of Hampi’s ruins through the day",
        duration: "4:45",
        views: "5.4M",
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
          `https://api.openweathermap.org/data/2.5/weather?q=Hampi,IN&appid=${apiKey}&units=metric`
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
        return <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />;
      case "clouds":
        return <Cloud className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />;
      case "rain":
        return <CloudRain className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />;
      default:
        return <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />;
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
      className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
      onMouseEnter={() => setHoveredVideo(index)}
      onMouseLeave={() => setHoveredVideo(null)}
    >
      <div className="relative overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center relative">
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
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 sm:p-4">
              <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </div>
        </div>
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex gap-1 sm:gap-2">
          <span className="bg-black/70 text-white text-xs sm:text-sm px-2 py-1 rounded-full">
            {video.category}
          </span>
        </div>
        <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-black/70 text-white text-xs sm:text-sm px-2 py-1 rounded-full">
          {video.duration}
        </div>
        <div
          className={`absolute top-2 sm:top-3 right-2 sm:right-3 flex gap-1 sm:gap-2 transition-all duration-300 sm:${
            hoveredVideo === index
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4"
          }`}
        >
          <button className="bg-white/20 backdrop-blur-sm text-white p-1.5 sm:p-2 rounded-full hover:bg-white/30 transition-colors">
            <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          <button className="bg-white/20 backdrop-blur-sm text-white p-1.5 sm:p-2 rounded-full hover:bg-white/30 transition-colors">
            <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
      <div className="p-4 sm:p-5">
        <h4 className="font-bold text-sm sm:text-base text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {video.title}
        </h4>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-3">
          {video.description}
        </p>
        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
              {video.views}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
              {video.rating}
            </span>
          </div>
          <button className="text-orange-600 hover:text-orange-800 font-medium">
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
        className="fixed top-4 sm:top-6 left-4 sm:left-6 z-50 bg-white/95 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-xl hover:shadow-2xl transition-all duration-300 group border border-gray-200 hover:scale-110"
      >
        <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-orange-600 transition-colors" />
      </button>
      <div className="fixed top-4 sm:top-6 right-4 sm:right-6 z-50 bg-white/95 backdrop-blur-sm rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-xl border border-gray-200">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="relative">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
            <div className="absolute -top-1 -right-1 w-2 sm:w-3 h-2 sm:h-3 bg-red-500 rounded-full animate-ping"></div>
          </div>
          <div>
            <span className="text-xs sm:text-sm font-bold text-gray-800 block">
              Hampi, Karnataka
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Users className="w-3 h-3" />
              {visitorsCount.toLocaleString()} visitors today
            </span>
          </div>
        </div>
      </div>
      <div className="relative w-full h-[50vh] sm:h-screen overflow-hidden">
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
          className="absolute left-4 sm:left-8 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-300 transition-all duration-300 z-20 bg-black/30 backdrop-blur-sm rounded-full p-2 sm:p-4 hover:bg-black/50 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6 sm:w-10 sm:h-10" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-300 transition-all duration-300 z-20 bg-black/30 backdrop-blur-sm rounded-full p-2 sm:p-4 hover:bg-black/50 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6 sm:w-10 sm:h-10" />
        </button>
        <div className="absolute top-8 sm:top-16 left-4 sm:left-12 z-20 max-w-[90%] sm:max-w-2xl">
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 sm:p-8 border border-white/20">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-2xl mb-2 sm:mb-4 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
              {carouselImages[currentImageIndex].title}
            </h1>
            <p className="text-sm sm:text-xl md:text-2xl text-white/90 drop-shadow-lg hidden sm:block">
              {carouselImages[currentImageIndex].description}
            </p>
          </div>
        </div>
        <div className="absolute bottom-6 sm:bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-4 z-20">
          {carouselImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`group relative transition-all duration-500 ${
                index === currentImageIndex
                  ? "w-8 sm:w-12 h-2 sm:h-4 bg-white shadow-2xl"
                  : "w-2 sm:w-4 h-2 sm:h-4 bg-white/50 hover:bg-white/75"
              } rounded-full overflow-hidden`}
            >
              {index === currentImageIndex && (
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full bg-gradient-to-br from-white to-gray-50">
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 p-4 sm:p-8 lg:p-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6 sm:mb-8 lg:mb-12 leading-tight text-center lg:text-left">
                A Glimpse into Vijayanagara’s Glory
                <br className="sm:hidden" />
                <span className="text-xl sm:text-2xl lg:text-3xl">
                  and Ancient Splendor
                </span>
              </h2>
              <div className="prose prose-sm sm:prose-lg text-gray-700 space-y-4 sm:space-y-6 mb-8 sm:mb-12">
                <p className="text-base sm:text-lg leading-relaxed">
                  Hampi, located in Karnataka, is a UNESCO World Heritage Site
                  and the former capital of the Vijayanagara Empire. Its
                  sprawling ruins, set amidst a surreal landscape of boulders
                  and the Tungabhadra River, offer a window into South India’s
                  rich history.
                </p>
                <p className="text-sm sm:text-base leading-relaxed text-gray-600">
                  From the majestic Virupaksha Temple to the iconic stone
                  chariot of Vittala Temple, Hampi’s architectural wonders and
                  mythological significance as Kishkindha from the Ramayana
                  captivate visitors. The ruins tell tales of a thriving empire
                  that once rivaled the greatest in the world.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-4 sm:p-6 border border-orange-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
                    <h3 className="font-bold text-base sm:text-xl text-gray-800">
                      Flourished
                    </h3>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-orange-600 mb-1">
                    14th-16th Century
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Vijayanagara Era
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 sm:p-6 border border-blue-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                    <h3 className="font-bold text-base sm:text-xl text-gray-800">
                      Artisans
                    </h3>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">
                    Thousands
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Skilled craftsmen
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 sm:p-6 border border-green-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Award className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                    <h3 className="font-bold text-base sm:text-xl text-gray-800">
                      Recognition
                    </h3>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-green-600 mb-1">
                    UNESCO Heritage
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Designated in 1986
                  </p>
                </div>
              </div>
              <div className="mb-8 sm:mb-12">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-3xl font-bold text-gray-800">
                    Immersive Experiences
                  </h3>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mt-2 sm:mt-0">
                    <Volume2 className="w-3 sm:w-4 h-3 sm:h-4" />
                    <span>Use headphones for best experience</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-2">
                  {Object.keys(videoContent).map((category) => {
                    const IconComponent = categoryIcons[category];
                    return (
                      <button
                        key={category}
                        onClick={() => setActiveVideoCategory(category)}
                        className={`group flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl transition-all duration-500 hover:scale-105 whitespace-nowrap ${
                          activeVideoCategory === category
                            ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-2xl"
                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-md"
                        }`}
                      >
                        <IconComponent
                          className={`w-4 sm:w-5 h-4 sm:h-5 transition-transform group-hover:scale-110 ${
                            activeVideoCategory === category
                              ? "text-white"
                              : "text-orange-500"
                          }`}
                        />
                        <span className="font-medium text-xs sm:text-base">
                          {categoryLabels[category]}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                  {videoContent[activeVideoCategory].map((video, index) => (
                    <EnhancedVideoCard
                      key={`${activeVideoCategory}-${index}`}
                      video={video}
                      index={index}
                    />
                  ))}
                </div>
              </div>
              <div className="mb-8 sm:mb-12">
                <h3 className="text-xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
                  Historical Timeline
                </h3>
                <div className="relative">
                  <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
                  {[
                    {
                      year: "1336",
                      event:
                        "Vijayanagara Empire founded by Harihara I and Bukka Raya I",
                      color: "red",
                    },
                    {
                      year: "1509",
                      event:
                        "Krishnadevaraya ascends the throne, marking Hampi’s golden age",
                      color: "blue",
                    },
                    {
                      year: "1565",
                      event: "Battle of Talikota leads to Hampi’s decline",
                      color: "green",
                    },
                    {
                      year: "1986",
                      event: "Hampi designated as a UNESCO World Heritage Site",
                      color: "yellow",
                    },
                    {
                      year: "2000",
                      event:
                        "Hampi Utsav festival begins, reviving cultural heritage",
                      color: "orange",
                    },
                    {
                      year: "2019",
                      event:
                        "Hampi’s conservation efforts gain global recognition",
                      color: "purple",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="relative flex items-center mb-6 sm:mb-8 group"
                    >
                      <div
                        className={`w-4 sm:w-6 h-4 sm:h-6 rounded-full border-2 sm:border-4 border-white shadow-lg bg-${item.color}-500 relative z-10 group-hover:scale-125 transition-transform duration-300`}
                      ></div>
                      <div className="ml-6 sm:ml-8 bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 flex-1 group-hover:shadow-2xl transition-all duration-300">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                          <span
                            className={`text-lg sm:text-xl font-bold text-${item.color}-600`}
                          >
                            {item.year}
                          </span>
                          <span className="text-sm sm:text-base text-gray-700">
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
          <div className="w-full lg:w-96 bg-gradient-to-br from-gray-50 to-white border-t lg:border-t-0 lg:border-l border-gray-200 p-4 sm:p-8 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-orange-100">
              <h3 className="text-base sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                Location & Directions
              </h3>
              <div className="space-y-4">
                <div className="bg-white/50 rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">
                    Address
                  </p>
                  <p className="font-semibold text-sm sm:text-base text-gray-800">
                    Hampi, Bellary District, Karnataka 583239, India
                  </p>
                </div>
                <div className="relative rounded-lg overflow-hidden border border-orange-200 shadow-sm">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.362543445123!2d76.46861861468943!3d15.335058989345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb9d9a9c6b6b6b7%3A0x7c7b7b7b7b7b7b7b!2sHampi!5e0!3m2!1sen!2sin!4v1625123456789!5m2!1sen!2sin"
                    width="100%"
                    height="150"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Hampi Location"
                    className="rounded-lg"
                  ></iframe>
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                    <span className="text-xs font-medium text-gray-700">
                      Interactive Map
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="bg-white/50 rounded-lg p-3">
                    <p className="text-gray-600">Distance from</p>
                    <p className="font-bold text-orange-600">
                      Bengaluru: 340km
                    </p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3">
                    <p className="text-gray-600">Hospet Railway</p>
                    <p className="font-bold text-orange-600">13km away</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-3 border border-blue-200">
                  <p className="text-xs sm:text-sm font-medium text-blue-800 flex items-center gap-2">
                    🚗 Getting There
                  </p>
                  <p className="text-xs sm:text-sm text-blue-600 mt-1">
                    NH50 from Bengaluru offers a scenic 6-hour drive to Hampi
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-blue-100">
              <h3 className="text-base sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                <Cloud className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                Current Weather in Hampi
              </h3>
              {loading ? (
                <div className="flex items-center justify-center py-6 sm:py-8">
                  <div className="animate-spin rounded-full h-6 sm:h-8 w-6 sm:w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : weather ? (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      {getWeatherIcon(weather.weather?.[0]?.main)}
                      <span className="text-lg sm:text-2xl font-bold text-gray-800">
                        {Math.round(weather.main?.temp)}°C
                      </span>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs sm:text-sm text-gray-600 capitalize">
                        {weather.weather?.[0]?.description}
                      </p>
                      <p classNameName="text-xs sm:text-sm text-gray-500">
                        Feels like {Math.round(weather.main?.feels_like)}°C
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                    <div className="bg-white/50 rounded-lg p-3">
                      <p className="text-gray-600">Humidity</p>
                      <p className="font-bold text-blue-600">
                        {weather.main?.humidity}%
                      </p>
                    </div>
                    <div className="bg-white/50 rounded-lg p-3">
                      <p className="text-gray-600">Visibility</p>
                      <p className="font-bold text-blue-600">
                        {weather.visibility
                          ? `${weather.visibility / 1000}km`
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg p-3 border border-orange-200">
                    <p className="text-xs sm:text-sm font-medium text-orange-800">
                      Best photography time
                    </p>
                    <p className="text-xs sm:text-sm text-orange-600">
                      Sunrise: 6:00-7:00 AM for dramatic boulder shadows
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-xs sm:text-sm">
                  Weather data unavailable
                </p>
              )}
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-green-100">
              <h3 className="text-base sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                Visit Information
              </h3>
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex justify-between items-center py-2 border-b border-green-100">
                  <span className="text-gray-600">Today's Date</span>
                  <span className="font-semibold text-gray-800">
                    {formatDate()}
                  </span>
                </div>
                <div className="bg-white/50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                  <h4 className="font-semibold text-green-800">
                    Opening Hours
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Daily (Most Sites)</span>
                      <span className="font-medium">6:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monday (Some Temples)</span>
                      <span className="font-medium text-red-600">Open</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                  <h4 className="font-semibold text-green-800">Entry Fees</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Indian Citizens (Vittala Temple)</span>
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
                <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-3 border border-orange-200">
                  <p className="text-xs sm:text-sm font-medium text-orange-800">
                    💡 Pro Tip
                  </p>
                  <p className="text-xs sm:text-sm text-orange-600 mt-1">
                    Hire a local guide to uncover hidden stories of the ruins!
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-4 sm:p-6 border border-orange-100">
              <h3 className="text-base sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                Did You Know?
              </h3>
              <div className="space-y-4">
                {amazingFacts.map((fact, index) => {
                  const IconComponent = fact.icon;
                  return (
                    <div
                      key={index}
                      className={`bg-white rounded-lg p-3 sm:p-4 border border-gray-100 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                        index === currentFact
                          ? "ring-1 sm:ring-2 ring-orange-200 shadow-md"
                          : ""
                      }`}
                      onClick={() => {
                        setCurrentFact(index);
                        setShowFactModal(true);
                      }}
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-orange-100 to-red-100">
                          <IconComponent
                            className={`w-4 sm:w-5 h-4 sm:h-5 ${fact.color}`}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm sm:text-base text-gray-800 mb-1">
                            {fact.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
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
      {showFactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 max-w-[90%] sm:max-w-lg w-full">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-orange-100 to-red-100">
                {React.createElement(amazingFacts[currentFact].icon, {
                  className: `w-5 sm:w-6 h-5 sm:h-6 ${amazingFacts[currentFact].color}`,
                })}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-base sm:text-lg text-gray-800 mb-2">
                  {amazingFacts[currentFact].title}
                </h4>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {amazingFacts[currentFact].fact}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowFactModal(false)}
              className="mt-4 w-full bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg py-2 sm:py-3 hover:shadow-lg transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hampi;
