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

const RaniKiVav = () => {
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
      url: "/images/RaniKiVav1.jpg",
      title: "Rani Ki Vav",
      description: "Queen's Stepwell Marvel",
    },
    {
      url: "/images/ravi2.jpg",
      title: "Rani Ki Vav",
      description: "Intricate Carvings",
    },
    {
      url: "/images/Rani3.jpg",
      title: "Rani Ki Vav",
      description: "UNESCO Heritage Site",
    },
  ];

  const amazingFacts = [
    {
      icon: Heart,
      title: "Queen's Legacy",
      fact: "Rani Ki Vav was commissioned by Queen Udayamati in the 11th century in memory of her husband, King Bhimdev I.",
      color: "text-red-600",
    },
    {
      icon: Crown,
      title: "Architectural Marvel",
      fact: "This stepwell features seven levels of stairs and over 500 principal sculptures, showcasing intricate craftsmanship.",
      color: "text-purple-600",
    },
    {
      icon: Sparkles,
      title: "Water Conservation",
      fact: "Designed as an inverted temple, it highlights the sanctity of water and its role in sustaining life in arid Gujarat.",
      color: "text-blue-600",
    },
    {
      icon: Star,
      title: "Intricate Carvings",
      fact: "The stepwell's walls are adorned with detailed carvings of Hindu deities, celestial beings, and mythological scenes.",
      color: "text-yellow-600",
    },
    {
      icon: Award,
      title: "UNESCO Recognition",
      fact: "Declared a UNESCO World Heritage Site in 2014 for its exceptional artistic and architectural value.",
      color: "text-green-600",
    },
  ];

  const videoContent = {
    historical: [
      {
        id: "dQw4w9WgXcQ",
        title: "The Story of Rani Ki Vav",
        description:
          "Discover the history behind Queen Udayamati's magnificent stepwell",
        duration: "14:50",
        views: "1.7M",
        rating: 4.8,
        category: "Documentary",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Construction of Stepwells",
        description:
          "Learn about the engineering techniques used to build this architectural wonder",
        duration: "11:20",
        views: "1.4M",
        rating: 4.7,
        category: "Architecture",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Solanki Dynasty's Glory",
        description:
          "Explore the golden era of the Solanki dynasty and their contributions",
        duration: "17:10",
        views: "2.0M",
        rating: 4.9,
        category: "History",
      },
    ],
    cultural: [
      {
        id: "dQw4w9WgXcQ",
        title: "Life Around Stepwells",
        description:
          "Experience the social and cultural significance of stepwells in Gujarat",
        duration: "13:30",
        views: "1.3M",
        rating: 4.6,
        category: "Culture",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Gujarati Craftsmanship",
        description:
          "Meet artisans preserving the traditional stone-carving techniques",
        duration: "10:45",
        views: "850K",
        rating: 4.5,
        category: "Craftsmanship",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Festivals at Rani Ki Vav",
        description:
          "Celebrate the vibrant festivals and traditions around the stepwell",
        duration: "12:50",
        views: "1.1M",
        rating: 4.7,
        category: "Festivals",
      },
    ],
    music: [
      {
        id: "dQw4w9WgXcQ",
        title: "Gujarati Folk Melodies",
        description:
          "Soulful folk music inspired by the cultural heritage of Gujarat",
        duration: "23:15",
        views: "2.4M",
        rating: 4.9,
        category: "Folk Music",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Devotional Songs of Rani Ki Vav",
        description:
          "Traditional bhajans dedicated to the deities depicted in the stepwell",
        duration: "19:20",
        views: "1.6M",
        rating: 4.8,
        category: "Devotional",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Classical Music of Gujarat",
        description:
          "Authentic ragas from the Solanki era, evoking the stepwell's grandeur",
        duration: "21:40",
        views: "1.2M",
        rating: 4.7,
        category: "Classical",
      },
    ],
    mythology: [
      {
        id: "dQw4w9WgXcQ",
        title: "Myths of Rani Ki Vav",
        description:
          "Uncover the legends and stories behind the stepwell's divine carvings",
        duration: "15:40",
        views: "2.2M",
        rating: 4.8,
        category: "Mythology",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Vishnu's Avatars in Stone",
        description:
          "Explore the depictions of Vishnu's ten avatars carved into the stepwell",
        duration: "11:15",
        views: "1.5M",
        rating: 4.6,
        category: "Legends",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Spiritual Significance",
        description:
          "Understand the stepwell's role as a sacred space in Hindu tradition",
        duration: "18:30",
        views: "1.8M",
        rating: 4.9,
        category: "Spirituality",
      },
    ],
    virtual: [
      {
        id: "dQw4w9WgXcQ",
        title: "360° Tour of Rani Ki Vav",
        description:
          "Immerse yourself in a virtual reality tour of the stepwell's intricate details",
        duration: "25:20",
        views: "3.9M",
        rating: 4.9,
        category: "VR Experience",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Aerial Views of Rani Ki Vav",
        description:
          "Stunning drone footage showcasing the stepwell's grandeur from above",
        duration: "8:10",
        views: "2.8M",
        rating: 4.8,
        category: "Aerial View",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Time-lapse: Rani Ki Vav",
        description:
          "Watch the stepwell's transformation under changing light conditions",
        duration: "4:45",
        views: "4.7M",
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
          `https://api.openweathermap.org/data/2.5/weather?q=Patan,IN&appid=${apiKey}&units=metric`
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
          <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-full">
            {video.category}
          </span>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
          {video.duration}
        </div>
        <div
          className={`absolute top-2 right-2 flex gap-1 transition-all duration-300 ${
            hoveredVideo === index
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4"
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
        <h4 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
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
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping md:w-3 md:h-3"></div>
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-800 block md:text-sm">
              Patan, Gujarat
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Users className="w-3 h-3" />
              {visitorsCount.toLocaleString()} visitors today
            </span>
          </div>
        </div>
      </div>
      <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-screen overflow-hidden">
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
          <ChevronLeft className="w-6 h-6 md:w-10 md:h-10" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-300 transition-all duration-300 z-20 bg-black/30 backdrop-blur-sm rounded-full p-2 hover:bg-black/50 hover:scale-105 md:right-8 md:p-4"
        >
          <ChevronRight className="w-6 h-6 md:w-10 md:h-10" />
        </button>
        <div className="absolute top-16 left-4 z-20 max-w-md sm:max-w-lg md:top-32 md:left-12 md:max-w-2xl">
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-8 border border-white/20">
            <h1 className="text-2xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-md mb-2 sm:mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              {carouselImages[currentImageIndex].title}
            </h1>
            {/* <p className="text-sm sm:text-lg md:text-2xl text-white/90 drop-shadow-md">
              {carouselImages[currentImageIndex].description}
            </p> */}
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20 md:bottom-12 md:space-x-4">
          {carouselImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`group relative transition-all duration-500 ${
                index === currentImageIndex
                  ? "w-8 h-2 bg-white shadow-md md:w-12 md:h-4 md:shadow-2xl"
                  : "w-2 h-2 bg-white/50 hover:bg-white/75 md:w-4 md:h-4"
              } rounded-full overflow-hidden`}
            >
              {index === currentImageIndex && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full bg-gradient-to-br from-white to-gray-50 py-8 sm:py-12">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-4 sm:p-8 md:p-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6 sm:mb-8 md:mb-12 leading-tight text-center md:text-left">
                A Stepwell of Royal Splendor
                <br />
                <span className="text-xl sm:text-2xl md:text-4xl">
                  and Architectural Brilliance
                </span>
              </h2>
              <div className="prose prose-sm sm:prose-lg md:prose-xl text-gray-700 space-y-4 sm:space-y-6 md:space-y-8 mb-8 sm:mb-12">
                <p className="text-base sm:text-lg md:text-2xl leading-relaxed">
                  Rani Ki Vav, located in Patan, Gujarat, is an 11th-century
                  stepwell that stands as a testament to the ingenuity and
                  artistry of the Solanki dynasty. Commissioned by Queen
                  Udayamati in memory of her husband, King Bhimdev I, this
                  UNESCO World Heritage Site is renowned for its intricate
                  carvings and architectural grandeur.
                </p>
                <p className="text-sm sm:text-base md:text-xl leading-relaxed text-gray-600">
                  Descending seven levels underground, the stepwell is adorned
                  with over 500 sculptures of Hindu deities, celestial beings,
                  and mythological scenes. Its design as an inverted temple
                  reflects the cultural and spiritual significance of water in
                  Gujarat's arid landscape.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 md:p-6 border border-blue-100 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                    <Clock className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                    <h3 className="font-semibold text-lg md:text-xl text-gray-800">
                      Construction
                    </h3>
                  </div>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 mb-1">
                    11th Century
                  </p>
                  <p className="text-xs md:text-sm text-gray-600">
                    Solanki Dynasty
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 md:p-6 border border-green-100 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                    <Users className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
                    <h3 className="font-semibold text-lg md:text-xl text-gray-800">
                      Artisans
                    </h3>
                  </div>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mb-1">
                    Hundreds
                  </p>
                  <p className="text-xs md:text-sm text-gray-600">
                    Skilled craftsmen
                  </p>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-4 md:p-6 border border-red-100 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                    <Award className="w-6 h-6 md:w-8 md:h-8 text-red-600" />
                    <h3 className="font-semibold text-lg md:text-xl text-gray-800">
                      Recognition
                    </h3>
                  </div>
                  <p className="text-base sm:text-lg md:text-lg font-bold text-red-600 mb-1">
                    UNESCO Heritage
                  </p>
                  <p className="text-xs md:text-sm text-gray-600">Since 2014</p>
                </div>
              </div>
              <div className="mb-8 sm:mb-12">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                    Immersive Experiences
                  </h3>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 mt-2 sm:mt-0">
                    <Volume2 className="w-3 h-3 md:w-4 md:h-4" />
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
                        className={`group flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 whitespace-nowrap ${
                          activeVideoCategory === category
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md"
                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                        }`}
                      >
                        <IconComponent
                          className={`w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:scale-110 ${
                            activeVideoCategory === category
                              ? "text-white"
                              : "text-blue-500"
                          }`}
                        />
                        <span className="font-medium text-sm">
                          {categoryLabels[category]}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
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
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 sm:mb-8">
                  Historical Timeline
                </h3>
                <div className="relative">
                  <div className="absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                  {[
                    {
                      year: "1060",
                      event: "Queen Udayamati commissions Rani Ki Vav",
                      color: "red",
                    },
                    {
                      year: "1070",
                      event: "Construction of the stepwell completed",
                      color: "blue",
                    },
                    {
                      year: "1300s",
                      event: "Stepwell buried under silt due to flooding",
                      color: "green",
                    },
                    {
                      year: "1980s",
                      event: "Excavation and restoration by ASI begins",
                      color: "purple",
                    },
                    {
                      year: "2014",
                      event: "Designated UNESCO World Heritage Site",
                      color: "yellow",
                    },
                    {
                      year: "2016",
                      event: "Featured on Indian ₹100 note",
                      color: "cyan",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="relative flex items-center mb-6 sm:mb-8 group"
                    >
                      <div
                        className={`w-4 h-4 md:w-6 md:h-6 rounded-full border-2 md:border-4 border-white shadow-md bg-${item.color}-500 relative z-10 group-hover:scale-125 transition-transform duration-300`}
                      ></div>
                      <div className="ml-6 sm:ml-8 bg-white rounded-lg p-4 md:p-6 shadow-md border border-gray-100 flex-1 group-hover:shadow-lg transition-all duration-300">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-4">
                          <span
                            className={`text-lg sm:text-xl md:text-2xl font-bold text-${item.color}-600`}
                          >
                            {item.year}
                          </span>
                          <span className="text-sm sm:text-base md:text-lg text-gray-700">
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
          <div className="w-full md:w-96 bg-gradient-to-br from-gray-50 to-white border-t md:border-t-0 md:border-l border-gray-200 p-4 sm:p-6 md:p-8 md:sticky md:top-0 md:h-screen md:overflow-y-auto">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 sm:p-6 border border-blue-100 mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
                Location & Directions
              </h3>
              <div className="space-y-4">
                <div className="bg-white/50 rounded-lg p-3">
                  <p className="text-xs md:text-sm text-gray-600 mb-1">
                    Address
                  </p>
                  <p className="font-semibold text-sm md:text-sm text-gray-800">
                    Near Patan, Gujarat 384265
                  </p>
                </div>
                <div className="relative rounded-lg overflow-hidden border border-blue-200 shadow-sm">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.684551362536!2d72.09915131467225!3d23.858551484541207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2b9b4e4e4e4f%3A0x7e4b4f4b4e4e4e4e!2sRani%20ki%20Vav!5e0!3m2!1sen!2sin!4v1625123456789!5m2!1sen!2sin"
                    width="100%"
                    height="150"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Rani Ki Vav Location"
                    className="rounded-lg"
                  ></iframe>
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                    <span className="text-xs font-medium text-gray-700">
                      Interactive Map
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
                  <div className="bg-white/50 rounded-lg p-3">
                    <p className="text-gray-600">Distance from</p>
                    <p className="font-bold text-blue-600">Ahmedabad: 125km</p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3">
                    <p className="text-gray-600">Mehsana</p>
                    <p className="font-bold text-blue-600">35km away</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-3 border border-green-200">
                  <p className="text-xs md:text-sm font-medium text-green-800 flex items-center gap-2">
                    🚗 Getting There
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    Take NH68 from Ahmedabad for a 2.5-hour drive
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 sm:p-6 border border-blue-100 mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Cloud className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
                Current Weather in Patan
              </h3>
              {loading ? (
                <div className="flex items-center justify-center py-6">
                  <div className="animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : weather ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 md:space-x-3">
                      {getWeatherIcon(weather.weather?.[0]?.main)}
                      <span className="text-2xl md:text-3xl font-bold text-gray-800">
                        {Math.round(weather.main?.temp)}°C
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs md:text-sm text-gray-600 capitalize">
                        {weather.weather?.[0]?.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        Feels like {Math.round(weather.main?.feels_like)}°C
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
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
                  <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-3 border border-blue-200">
                    <p className="text-xs md:text-sm font-medium text-blue-800">
                      Best photography time
                    </p>
                    <p className="text-xs text-blue-600">
                      Morning: 7:00-9:00 AM for soft lighting
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-xs md:text-sm">
                  Weather data unavailable
                </p>
              )}
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 sm:p-6 border border-green-100 mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
                Visit Information
              </h3>
              <div className="space-y-4 text-xs md:text-sm">
                <div className="flex justify-between items-center py-2 border-b border-green-100">
                  <span className="text-gray-600">Today's Date</span>
                  <span className="font-semibold text-gray-800">
                    {formatDate()}
                  </span>
                </div>
                <div className="bg-white/50 rounded-lg p-3 space-y-2">
                  <h4 className="font-semibold text-green-800">
                    Opening Hours
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Daily</span>
                      <span className="font-medium">8:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/50 rounded-lg p-3 space-y-2">
                  <h4 className="font-semibold text-green-800">Entry Fees</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Indian Citizens</span>
                      <span className="font-medium">₹35</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Foreign Tourists</span>
                      <span className="font-medium">₹550</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-3 border border-blue-200">
                  <p className="text-xs md:text-sm font-medium text-blue-800">
                    💡 Pro Tip
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Visit early morning to avoid crowds and enjoy cooler
                    weather!
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 sm:p-6 border border-blue-100">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
                Did You Know?
              </h3>
              <div className="space-y-4">
                {amazingFacts.map((fact, index) => {
                  const IconComponent = fact.icon;
                  return (
                    <div
                      key={index}
                      className={`bg-white rounded-lg p-3 border border-gray-100 transition-all duration-300 cursor-pointer hover:shadow-md ${
                        index === currentFact
                          ? "ring-1 ring-blue-200 shadow-md"
                          : ""
                      }`}
                      onClick={() => setCurrentFact(index)}
                    >
                      <div className="flex items-start gap-2">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100">
                          <IconComponent className={`w-4 h-4 ${fact.color}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-gray-800 mb-1">
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
  );
};

export default RaniKiVav;
