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
  Download,
  Calendar,
  Users,
  Award,
} from "lucide-react";

const TajMahal = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeVideoCategory, setActiveVideoCategory] = useState("historical");
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [showFactModal, setShowFactModal] = useState(false);
  const [currentFact, setCurrentFact] = useState(0);
  const [visitorsCount, setVisitorsCount] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState("dawn");

  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Taj Mahal",
    },
    {
      url: "https://images.unsplash.com/photo-1587135941948-670b381f08ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Taj Mahal",
    },
    {
      url: "/images/taj4.jpg",
      title: "Taj Mahal",
    },
  ];

  const amazingFacts = [
    {
      icon: Heart,
      title: "Symbol of Love",
      fact: "The Taj Mahal was built by Emperor Shah Jahan as a mausoleum for his beloved wife Mumtaz Mahal, who died during childbirth.",
      color: "text-red-500",
    },
    {
      icon: Crown,
      title: "Royal Craftsmanship",
      fact: "Over 1,000 elephants were used to transport building materials, and 20,000 artisans worked for 22 years to complete this masterpiece.",
      color: "text-purple-500",
    },
    {
      icon: Sparkles,
      title: "Changing Colors",
      fact: "The Taj Mahal appears to change colors throughout the day - pinkish hue at dawn, milky white during the day, and golden at sunset.",
      color: "text-yellow-500",
    },
    {
      icon: Star,
      title: "Perfect Symmetry",
      fact: "The monument is perfectly symmetrical in all directions, representing the Islamic concept of paradise and eternal beauty.",
      color: "text-blue-500",
    },
    {
      icon: Award,
      title: "UNESCO Wonder",
      fact: "Designated as a UNESCO World Heritage Site in 1983 and voted as one of the New Seven Wonders of the World in 2007.",
      color: "text-green-500",
    },
  ];

  // Enhanced video content with more categories
  const videoContent = {
    historical: [
      {
        id: "https://youtu.be/xZ3_u2w4fXA?si=aqv1uFJGUyXcwuZX",
        title: "The Epic Love Story of Shah Jahan & Mumtaz",
        description:
          "Journey through the romantic tale that inspired the world's most beautiful monument",
        duration: "15:30",
        views: "2.1M",
        rating: 4.9,
        category: "Documentary",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Secrets of Taj Mahal Construction",
        description:
          "Discover the revolutionary techniques used by Mughal architects and craftsmen",
        duration: "12:45",
        views: "1.8M",
        rating: 4.8,
        category: "Architecture",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Mughal Empire: Rise and Glory",
        description:
          "Explore the golden age of Mughal architecture and Shah Jahan's reign",
        duration: "18:20",
        views: "3.2M",
        rating: 4.9,
        category: "History",
      },
    ],
    cultural: [
      {
        id: "dQw4w9WgXcQ",
        title: "Life in the Mughal Court",
        description:
          "Experience the grandeur, customs, and daily life of the Mughal royal court",
        duration: "14:15",
        views: "1.5M",
        rating: 4.7,
        category: "Culture",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Traditional Crafts of Agra",
        description:
          "Meet the artisans keeping ancient marble inlay traditions alive today",
        duration: "11:30",
        views: "890K",
        rating: 4.6,
        category: "Craftsmanship",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Festivals Around the Taj",
        description:
          "Celebrate the vibrant festivals and traditions of Agra throughout the year",
        duration: "13:45",
        views: "1.2M",
        rating: 4.8,
        category: "Festivals",
      },
    ],
    music: [
      {
        id: "dQw4w9WgXcQ",
        title: "Sufi Melodies of the Taj",
        description:
          "Soul-stirring Sufi music that captures the spiritual essence of eternal love",
        duration: "25:10",
        views: "2.8M",
        rating: 4.9,
        category: "Sufi Music",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Classical Ragas of Shah Jahan's Era",
        description:
          "Authentic court music and ragas from the golden age of Mughal culture",
        duration: "32:20",
        views: "1.9M",
        rating: 4.8,
        category: "Classical",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Folk Songs of Uttar Pradesh",
        description:
          "Traditional melodies celebrating love, devotion, and the beauty of the Taj",
        duration: "19:45",
        views: "1.1M",
        rating: 4.7,
        category: "Folk Music",
      },
    ],
    mythology: [
      {
        id: "dQw4w9WgXcQ",
        title: "Legends and Mysteries of the Taj",
        description:
          "Uncover the fascinating myths and unexplained mysteries surrounding the monument",
        duration: "16:30",
        views: "2.5M",
        rating: 4.8,
        category: "Mystery",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "The Curse of the Black Taj",
        description:
          "Explore the legend of Shah Jahan's planned black marble mausoleum for himself",
        duration: "12:15",
        views: "1.7M",
        rating: 4.6,
        category: "Legends",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Spiritual Significance in Indian Culture",
        description:
          "How the Taj Mahal became a symbol of divine love in Indian philosophy",
        duration: "20:40",
        views: "1.9M",
        rating: 4.9,
        category: "Spirituality",
      },
    ],
    virtual: [
      {
        id: "dQw4w9WgXcQ",
        title: "360° Virtual Tour of Taj Mahal",
        description:
          "Immersive virtual reality experience - explore every corner in stunning detail",
        duration: "28:15",
        views: "4.2M",
        rating: 4.9,
        category: "VR Experience",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Drone Flight Over the Taj",
        description:
          "Breathtaking aerial views and cinematic perspectives of the monument",
        duration: "8:45",
        views: "3.1M",
        rating: 4.8,
        category: "Aerial View",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Time-lapse: Day to Night at Taj",
        description:
          "Witness the magical transformation of colors throughout 24 hours",
        duration: "4:30",
        views: "5.6M",
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

  // Simulated visitor counter
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorsCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 3000);

    // Initialize with a base count
    setVisitorsCount(15432);

    return () => clearInterval(interval);
  }, []);

  // Auto-cycling facts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % amazingFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Time-based image cycling
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
    }, 60000); // Check every minute

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
          `https://api.openweathermap.org/data/2.5/weather?q=Agra,IN&appid=${apiKey}&units=metric`
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
        return <Sun className="w-6 h-6 text-yellow-500" />;
      case "clouds":
        return <Cloud className="w-6 h-6 text-gray-500" />;
      case "rain":
        return <CloudRain className="w-6 h-6 text-blue-500" />;
      default:
        return <Sun className="w-6 h-6 text-yellow-500" />;
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
        <div className="aspect-video bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center relative">
          <iframe
            width="100%"
            height="100%"
            src={video.id} 
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="transition-transform duration-300 group-hover:scale-105"
          ></iframe>

          {/* Overlay with play button */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <Play className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Duration and category badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-full">
            {video.category}
          </span>
        </div>

        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
          {video.duration}
        </div>

        {/* Quick actions */}
        <div
          className={`absolute top-3 right-3 flex gap-2 transition-all duration-300 ${
            hoveredVideo === index
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4"
          }`}
        >
          <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-5">
        <h4 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
          {video.title}
        </h4>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {video.description}
        </p>

        {/* Video stats */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {video.views}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500" />
              {video.rating}
            </span>
          </div>
          <button className="text-purple-600 hover:text-purple-800 font-medium">
            Watch Now
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Enhanced Back Button */}
      <button
        onClick={handleBackClick}
        className="fixed top-6 left-6 z-50 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 group border border-gray-200 hover:scale-110"
      >
        <ArrowLeft className="w-6 h-6 text-gray-700 group-hover:text-purple-600 transition-colors" />
      </button>

      {/* Enhanced Location Badge */}
      <div className="fixed top-6 right-6 z-50 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-xl border border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <MapPin className="w-5 h-5 text-red-500" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
          </div>
          <div>
            <span className="text-sm font-bold text-gray-800 block">
              Agra, Uttar Pradesh
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Users className="w-3 h-3" />
              {visitorsCount.toLocaleString()} visitors today
            </span>
          </div>
        </div>
      </div>

      {/* Enhanced Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url('${carouselImages[currentImageIndex].url}')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70"></div>
        </div>

        {/* Enhanced Navigation */}
        <button
          onClick={prevImage}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white hover:text-purple-300 transition-all duration-300 z-20 bg-black/30 backdrop-blur-sm rounded-full p-4 hover:bg-black/50 hover:scale-110"
        >
          <ChevronLeft className="w-10 h-10" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 text-white hover:text-purple-300 transition-all duration-300 z-20 bg-black/30 backdrop-blur-sm rounded-full p-4 hover:bg-black/50 hover:scale-110"
        >
          <ChevronRight className="w-10 h-10" />
        </button>

        {/* Enhanced Title Section */}
        <div className="absolute top-32 left-12 z-20 max-w-2xl">
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h1 className="text-8xl font-bold text-white drop-shadow-2xl mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text">
              {carouselImages[currentImageIndex].title}
            </h1>
            <p className="text-2xl text-white/90 mb-6 drop-shadow-lg">
              {carouselImages[currentImageIndex].description}
            </p>
          </div>
        </div>

        {/* Enhanced Carousel Indicators */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
          {carouselImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`group relative transition-all duration-500 ${
                index === currentImageIndex
                  ? "w-12 h-4 bg-white shadow-2xl"
                  : "w-4 h-4 bg-white/50 hover:bg-white/75"
              } rounded-full overflow-hidden`}
            >
              {index === currentImageIndex && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Content Section */}
      <div className="w-full bg-gradient-to-br from-white to-gray-50">
        <div className="flex">
          {/* Enhanced Left Content */}
          <div className="flex-1 p-16">
            <div className="max-w-4xl">
              <h2 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-12 leading-tight">
                A Monument to Eternal Love
                <br />
                <span className="text-4xl">and Architectural Magnificence</span>
              </h2>

              <div className="prose prose-xl text-gray-700 space-y-8 mb-12">
                <p className="text-2xl leading-relaxed">
                  Standing majestically in Agra, Uttar Pradesh, the Taj Mahal is
                  a breathtaking testament to love and one of the world's most
                  recognizable monuments. Built by Mughal Emperor Shah Jahan as
                  a mausoleum for his beloved wife Mumtaz Mahal, this
                  ivory-white marble masterpiece represents the pinnacle of
                  Mughal architecture.
                </p>

                <p className="text-xl leading-relaxed text-gray-600">
                  As you approach the main gateway, you are greeted by the
                  iconic view of the perfectly symmetrical structure with its
                  central dome flanked by four minarets. The intricate inlay
                  work, calligraphy, and geometric patterns showcase the
                  incredible craftsmanship of thousands of artisans who brought
                  this UNESCO World Heritage Site to life.
                </p>
              </div>

              {/* Interactive Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-8 h-8 text-purple-600" />
                    <h3 className="font-bold text-xl text-gray-800">
                      Construction
                    </h3>
                  </div>
                  <p className="text-3xl font-bold text-purple-600 mb-1">
                    22 Years
                  </p>
                  <p className="text-sm text-gray-600">1632-1653 CE</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="w-8 h-8 text-blue-600" />
                    <h3 className="font-bold text-xl text-gray-800">
                      Craftsmen
                    </h3>
                  </div>
                  <p className="text-3xl font-bold text-blue-600 mb-1">
                    20,000
                  </p>
                  <p className="text-sm text-gray-600">Master artisans</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="w-8 h-8 text-green-600" />
                    <h3 className="font-bold text-xl text-gray-800">
                      Recognition
                    </h3>
                  </div>
                  <p className="text-lg font-bold text-green-600 mb-1">
                    Wonder of World
                  </p>
                  <p className="text-sm text-gray-600">UNESCO Heritage</p>
                </div>
              </div>

              {/* Enhanced Video Section */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-4xl font-bold text-gray-800">
                    Immersive Experiences
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Volume2 className="w-4 h-4" />
                    <span>Use headphones for best experience</span>
                  </div>
                </div>

                {/* Enhanced Category Tabs */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {Object.keys(videoContent).map((category) => {
                    const IconComponent = categoryIcons[category];
                    return (
                      <button
                        key={category}
                        onClick={() => setActiveVideoCategory(category)}
                        className={`group flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all duration-500 hover:scale-105 ${
                          activeVideoCategory === category
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl"
                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-md"
                        }`}
                      >
                        <IconComponent
                          className={`w-5 h-5 transition-transform group-hover:scale-110 ${
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

                {/* Enhanced Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {videoContent[activeVideoCategory].map((video, index) => (
                    <EnhancedVideoCard
                      key={`${activeVideoCategory}-${index}`}
                      video={video}
                      index={index}
                    />
                  ))}
                </div>
              </div>

              {/* Interactive Timeline */}
              <div className="mb-12">
                <h3 className="text-4xl font-bold text-gray-800 mb-8">
                  Historical Timeline
                </h3>
                <div className="relative">
                  <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>

                  {[
                    {
                      year: "1631",
                      event: "Mumtaz Mahal dies during childbirth",
                      color: "red",
                    },
                    {
                      year: "1632",
                      event: "Construction begins under Shah Jahan's orders",
                      color: "blue",
                    },
                    {
                      year: "1643",
                      event: "Main mausoleum completed",
                      color: "green",
                    },
                    {
                      year: "1653",
                      event: "Taj Mahal construction fully completed",
                      color: "purple",
                    },
                    {
                      year: "1983",
                      event: "Designated UNESCO World Heritage Site",
                      color: "yellow",
                    },
                    {
                      year: "2007",
                      event: "Named one of New Seven Wonders of the World",
                      color: "pink",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="relative flex items-center mb-8 group"
                    >
                      <div
                        className={`w-6 h-6 rounded-full border-4 border-white shadow-lg bg-${item.color}-500 relative z-10 group-hover:scale-125 transition-transform duration-300`}
                      ></div>
                      <div className="ml-8 bg-white rounded-xl p-6 shadow-lg border border-gray-100 flex-1 group-hover:shadow-2xl transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <span
                            className={`text-2xl font-bold text-${item.color}-600`}
                          >
                            {item.year}
                          </span>
                          <span className="text-gray-700 text-lg">
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

          {/* Enhanced Right Sidebar */}
          <div className="w-96 bg-gradient-to-br from-gray-50 to-white border-l border-gray-200 p-8 sticky top-0 h-screen overflow-y-auto">
             {/* Enhanced Map Widget */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 mb-8 border border-orange-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-red-500" />
                Location & Directions
              </h3>
              <div className="space-y-4">
                <div className="bg-white/50 rounded-lg p-3">
                  <p className="text-sm text-gray-600 mb-1">Address</p>
                  <p className="font-semibold text-gray-800 text-sm">
                    Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001
                  </p>
                </div>
                
                <div className="relative rounded-lg overflow-hidden border border-orange-200 shadow-sm">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3551.844891814037!2d78.03918731458598!3d27.17515048291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39747121a187d6a7%3A0xc5c5f3b86e6f7e8e!2sTaj%20Mahal!5e0!3m2!1sen!2sin!4v1625123456789!5m2!1sen!2sin"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Taj Mahal Location"
                    className="rounded-lg"
                  ></iframe>
                  
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                    <span className="text-xs font-medium text-gray-700">Interactive Map</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/50 rounded-lg p-3">
                    <p className="text-gray-600 text-xs">Distance from</p>
                    <p className="font-bold text-orange-600">Delhi: 230km</p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3">
                    <p className="text-gray-600 text-xs">Agra Airport</p>
                    <p className="font-bold text-orange-600">13km away</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-3 border border-blue-200">
                  <p className="text-sm font-medium text-blue-800 flex items-center gap-2">
                    🚗 Getting There
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Take the Yamuna Expressway from Delhi for fastest route (3.5 hours)
                  </p>
                </div>
              </div>
            </div>
            {/* Enhanced Weather Widget */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 mb-8 border border-blue-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Cloud className="w-6 h-6 text-blue-500" />
                Current Weather in Agra
              </h3>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : weather ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getWeatherIcon(weather.weather?.[0]?.main)}
                      <span className="text-3xl font-bold text-gray-800">
                        {Math.round(weather.main?.temp)}°C
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 capitalize">
                        {weather.weather?.[0]?.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        Feels like {Math.round(weather.main?.feels_like)}°C
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
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
                    <p className="text-sm font-medium text-orange-800">
                      Best photography time
                    </p>
                    <p className="text-xs text-orange-600">
                      Golden hour: 6:00-7:00 AM & 6:00-7:00 PM
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Weather data unavailable</p>
              )}
            </div>

            {/* Enhanced Visit Information */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-8 border border-green-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-green-500" />
                Visit Information
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-green-100">
                  <span className="text-gray-600">Today's Date</span>
                  <span className="font-semibold text-gray-800">
                    {formatDate()}
                  </span>
                </div>

                <div className="bg-white/50 rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold text-green-800">
                    Opening Hours
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Sunrise to Sunset</span>
                      <span className="font-medium">6:00 AM - 6:30 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Friday</span>
                      <span className="font-medium text-red-600">Closed</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/50 rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold text-green-800">Entry Fees</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Indian Citizens</span>
                      <span className="font-medium">₹50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Foreign Tourists</span>
                      <span className="font-medium">₹1,100</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SAARC/BIMSTEC</span>
                      <span className="font-medium">₹540</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-3 border border-purple-200">
                  <p className="text-xs font-medium text-purple-800">
                    💡 Pro Tip
                  </p>
                  <p className="text-xs text-purple-600 mt-1">
                    Book online to skip the queue and get a small discount!
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Quick Facts */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-500" />
                Did You Know?
              </h3>

              <div className="space-y-4">
                {amazingFacts.map((fact, index) => {
                  const IconComponent = fact.icon;
                  return (
                    <div
                      key={index}
                      className={`bg-white rounded-lg p-4 border border-gray-100 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                        index === currentFact
                          ? "ring-2 ring-purple-200 shadow-md"
                          : ""
                      }`}
                      onClick={() => setCurrentFact(index)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100">
                          <IconComponent className={`w-4 h-4 ${fact.color}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 text-sm mb-1">
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

export default TajMahal;
