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

const TajMahal = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeVideoCategory, setActiveVideoCategory] = useState("historical");
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [currentFact, setCurrentFact] = useState(0);
  const [visitorsCount, setVisitorsCount] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState("dawn");

  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
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
      fact: "Built by Emperor Shah Jahan for his beloved wife Mumtaz Mahal.",
      color: "text-red-500",
    },
    {
      icon: Crown,
      title: "Royal Craftsmanship",
      fact: "Over 20,000 artisans worked for 22 years to complete it.",
      color: "text-purple-500",
    },
    {
      icon: Sparkles,
      title: "Changing Colors",
      fact: "Appears pink at dawn, white during the day, and golden at sunset.",
      color: "text-yellow-500",
    },
    {
      icon: Star,
      title: "Perfect Symmetry",
      fact: "Represents the Islamic concept of paradise with perfect symmetry.",
      color: "text-blue-500",
    },
    {
      icon: Award,
      title: "UNESCO Wonder",
      fact: "A UNESCO World Heritage Site and one of the New Seven Wonders.",
      color: "text-green-500",
    },
  ];

  const videoContent = {
    historical: [
      {
        id: "https://www.youtube.com/embed/xZ3_u2w4fXA",
        title: "Love Story of Shah Jahan & Mumtaz",
        description: "The romantic tale behind the Taj Mahal.",
        duration: "15:30",
        views: "2.1M",
        rating: 4.9,
        category: "Documentary",
      },
      {
        id: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Secrets of Taj Mahal Construction",
        description: "Techniques used by Mughal architects.",
        duration: "12:45",
        views: "1.8M",
        rating: 4.8,
        category: "Architecture",
      },
      {
        id: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Mughal Empire: Rise and Glory",
        description: "Shah Jahan's reign and Mughal architecture.",
        duration: "18:20",
        views: "3.2M",
        rating: 4.9,
        category: "History",
      },
    ],
    cultural: [
      {
        id: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Life in the Mughal Court",
        description: "Customs of the Mughal royal court.",
        duration: "14:15",
        views: "1.5M",
        rating: 4.7,
        category: "Culture",
      },
      {
        id: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Traditional Crafts of Agra",
        description: "Marble inlay traditions in Agra.",
        duration: "11:30",
        views: "890K",
        rating: 4.6,
        category: "Craftsmanship",
      },
      {
        id: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Festivals Around the Taj",
        description: "Vibrant festivals in Agra.",
        duration: "13:45",
        views: "1.2M",
        rating: 4.8,
        category: "Festivals",
      },
    ],
    music: [
      {
        id: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Sufi Melodies of the Taj",
        description: "Sufi music capturing eternal love.",
        duration: "25:10",
        views: "2.8M",
        rating: 4.9,
        category: "Sufi Music",
      },
      {
        id: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Classical Ragas",
        description: "Court music from Mughal era.",
        duration: "32:20",
        views: "1.9M",
        rating: 4.8,
        category: "Classical",
      },
      {
        id: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Folk Songs of Uttar Pradesh",
        description: "Melodies celebrating the Taj.",
        duration: "19:45",
        views: "1.1M",
        rating: 4.7,
        category: "Folk Music",
      },
    ],
    mythology: [
      {
        id: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Legends of the Taj",
        description: "Myths surrounding the monument.",
        duration: "16:30",
        views: "2.5M",
        rating: 4.8,
        category: "Mystery",
      },
      {
        id: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "The Black Taj",
        description: "Legend of Shah Jahan's black mausoleum.",
        duration: "12:15",
        views: "1.7M",
        rating: 4.6,
        category: "Legends",
      },
      {
        id: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Spiritual Significance",
        description: "Taj Mahal in Indian philosophy.",
        duration: "20:40",
        views: "1.9M",
        rating: 4.9,
        category: "Spirituality",
      },
    ],
    virtual: [
      {
        id: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "360° Virtual Tour",
        description: "Explore the Taj in VR.",
        duration: "28:15",
        views: "4.2M",
        rating: 4.9,
        category: "VR Experience",
      },
      {
        id: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Drone Flight Over Taj",
        description: "Aerial views of the monument.",
        duration: "8:45",
        views: "3.1M",
        rating: 4.8,
        category: "Aerial View",
      },
      {
        id: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Time-lapse: Day to Night",
        description: "Color transformation of the Taj.",
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

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorsCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 3000);
    setVisitorsCount(15432);
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
        return <Sun className="w-5 h-5 text-yellow-500" />;
      case "clouds":
        return <Cloud className="w-5 h-5 text-gray-500" />;
      case "rain":
        return <CloudRain className="w-5 h-5 text-blue-500" />;
      default:
        return <Sun className="w-5 h-5 text-yellow-500" />;
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
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 touch-manipulation"
      onTouchStart={() => setHoveredVideo(index)}
      onTouchEnd={() => setHoveredVideo(null)}
    >
      <div className="relative overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
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
              : "opacity-0 -translate-y-2"
          }`}
        >
          <button className="bg-white/20 backdrop-blur-sm text-white p-1.5 rounded-full hover:bg-white/30">
            <Share2 className="w-3 h-3" />
          </button>
          <button className="bg-white/20 backdrop-blur-sm text-white p-1.5 rounded-full hover:bg-white/30">
            <Heart className="w-3 h-3" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2 group-hover:text-purple-600">
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
        className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:scale-105 touch-manipulation"
      >
        <ArrowLeft className="w-5 h-5 text-gray-700 group-hover:text-purple-600" />
      </button>
      <div className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <MapPin className="w-4 h-4 text-red-500" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-800 block">
              Agra, UP
            </span>
            <span className="text-[10px] text-gray-500 flex items-center gap-1">
              <Users className="w-2.5 h-2.5" />
              {visitorsCount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      <div className="relative w-full h-[60vh] sm:h-[70vh] overflow-hidden">
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
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-purple-300 bg-black/30 backdrop-blur-sm rounded-full p-2 hover:bg-black/50 hover:scale-110 transition-all duration-300 z-20 touch-manipulation"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-purple-300 bg-black/30 backdrop-blur-sm rounded-full p-2 hover:bg-black/50 hover:scale-110 transition-all duration-300 z-20 touch-manipulation"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <div className="absolute top-16 left-4 z-20 max-w-[90%] sm:max-w-lg">
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/20">
            <h1 className="text-4xl sm:text-6xl font-bold text-white drop-shadow-lg">
              {carouselImages[currentImageIndex].title}
            </h1>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            ></button>
          ))}
        </div>
      </div>
      <div className="w-full bg-gradient-to-br from-white to-gray-50 flex flex-col lg:flex-row">
        <div className="flex-1 p-4 sm:p-8 lg:p-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 sm:mb-8">
              Eternal Love
              <br />
              <span className="text-xl sm:text-3xl">Architectural Marvel</span>
            </h2>
            <div className="prose text-gray-700 space-y-4 mb-8 text-sm sm:text-base">
              <p>
                The Taj Mahal in Agra, Uttar Pradesh, is a stunning monument of
                love, built by Emperor Shah Jahan for his wife Mumtaz Mahal.
                This ivory-white marble masterpiece is a pinnacle of Mughal
                architecture.
              </p>
              <p>
                Its symmetrical design, intricate inlay work, and calligraphy
                showcase the craftsmanship of thousands of artisans, making it a
                UNESCO World Heritage Site.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-6 h-6 text-purple-600" />
                  <h3 className="font-semibold text-base">Construction</h3>
                </div>
                <p className="text-xl font-bold text-purple-600">22 Years</p>
                <p className="text-xs text-gray-600">1632-1653 CE</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-100 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-6 h-6 text-blue-600" />
                  <h3 className="font-semibold text-base">Craftsmen</h3>
                </div>
                <p className="text-xl font-bold text-blue-600">20,000</p>
                <p className="text-xs text-gray-600">Master artisans</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-6 h-6 text-green-600" />
                  <h3 className="font-semibold text-base">Recognition</h3>
                </div>
                <p className="text-sm font-bold text-green-600">World Wonder</p>
                <p className="text-xs text-gray-600">UNESCO Heritage</p>
              </div>
            </div>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  Immersive Experiences
                </h3>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Volume2 className="w-3 h-3" />
                  <span>Headphones recommended</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
                {Object.keys(videoContent).map((category) => {
                  const IconComponent = categoryIcons[category];
                  return (
                    <button
                      key={category}
                      onClick={() => setActiveVideoCategory(category)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 touch-manipulation whitespace-nowrap ${
                        activeVideoCategory === category
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                      }`}
                    >
                      <IconComponent
                        className={`w-4 h-4 ${
                          activeVideoCategory === category
                            ? "text-white"
                            : "text-purple-500"
                        }`}
                      />
                      <span className="text-xs font-medium">
                        {categoryLabels[category]}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {videoContent[activeVideoCategory].map((video, index) => (
                  <EnhancedVideoCard
                    key={`${activeVideoCategory}-${index}`}
                    video={video}
                    index={index}
                  />
                ))}
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                Historical Timeline
              </h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                {[
                  { year: "1631", event: "Mumtaz Mahal dies", color: "red" },
                  { year: "1632", event: "Construction begins", color: "blue" },
                  {
                    year: "1643",
                    event: "Main mausoleum completed",
                    color: "green",
                  },
                  {
                    year: "1653",
                    event: "Construction completed",
                    color: "purple",
                  },
                  {
                    year: "1983",
                    event: "UNESCO World Heritage Site",
                    color: "yellow",
                  },
                  { year: "2007", event: "New Seven Wonders", color: "pink" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="relative flex items-center mb-6 group"
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 border-white shadow-md bg-${item.color}-500 z-10 group-hover:scale-125 transition-transform duration-300`}
                    ></div>
                    <div className="ml-6 bg-white rounded-lg p-3 shadow-md border border-gray-100 group-hover:shadow-lg transition-all">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-base font-semibold text-${item.color}-600`}
                        >
                          {item.year}
                        </span>
                        <span className="text-gray-700 text-xs">
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
        <div className="w-full lg:w-80 bg-gradient-to-br from-gray-50 to-white border-t lg:border-t-0 lg:border-l border-gray-200 p-4 sm:p-6 lg:p-8 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 mb-6 border border-orange-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-500" />
              Location & Directions
            </h3>
            <div className="space-y-3">
              <div className="bg-white/50 rounded p-2">
                <p className="text-xs text-gray-600">Address</p>
                <p className="text-xs font-semibold text-gray-800">
                  Tajganj, Agra, Uttar Pradesh 282001
                </p>
              </div>
              <div className="relative rounded overflow-hidden border border-orange-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3551.844891814037!2d78.03918731458598!3d27.17515048291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39747121a187d6a7%3A0xc5c5f3b86e6f7e8e!2sTaj%20Mahal!5e0!3m2!1sen!2sin!4v1625123456789!5m2!1sen!2sin"
                  width="100%"
                  height="150"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Taj Mahal Location"
                  className="rounded"
                ></iframe>
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded px-1 py-0.5">
                  <span className="text-[10px] font-medium text-gray-700">
                    Map
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/50 rounded p-2">
                  <p className="text-gray-600 text-[10px]">From Delhi</p>
                  <p className="font-semibold text-orange-600">230km</p>
                </div>
                <div className="bg-white/50 rounded p-2">
                  <p className="text-gray-600 text-[10px]">Agra Airport</p>
                  <p className="font-semibold text-orange-600">13km</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded p-2 border border-blue-200">
                <p className="text-xs font-medium text-blue-800">
                  🚗 Getting There
                </p>
                <p className="text-[10px] text-blue-600">
                  Yamuna Expressway (3.5 hrs)
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 mb-6 border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Cloud className="w-5 h-5 text-blue-500" />
              Weather in Agra
            </h3>
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              </div>
            ) : weather ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getWeatherIcon(weather.weather?.[0]?.main)}
                    <span className="text-xl font-semibold text-gray-800">
                      {Math.round(weather.main?.temp)}°C
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600 capitalize">
                      {weather.weather?.[0]?.description}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      Feels like {Math.round(weather.main?.feels_like)}°C
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white/50 rounded p-2">
                    <p className="text-gray-600">Humidity</p>
                    <p className="font-semibold text-blue-600">
                      {weather.main?.humidity}%
                    </p>
                  </div>
                  <div className="bg-white/50 rounded p-2">
                    <p className="text-gray-600">Visibility</p>
                    <p className="font-semibold text-blue-600">
                      {weather.visibility
                        ? `${weather.visibility / 1000}km`
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded p-2 border border-orange-200">
                  <p className="text-xs font-medium text-orange-800">
                    Best Photo Time
                  </p>
                  <p className="text-[10px] text-orange-600">
                    6:00-7:00 AM & PM
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-xs">Weather unavailable</p>
            )}
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 mb-6 border border-green-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-500" />
              Visit Information
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-green-100">
                <span className="text-gray-600">Today</span>
                <span className="font-semibold text-gray-800">
                  {formatDate()}
                </span>
              </div>
              <div className="bg-white/50 rounded p-2">
                <h4 className="font-semibold text-green-800 text-xs mb-1">
                  Opening Hours
                </h4>
                <div className="space-y-1 text-[10px]">
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
              <div className="bg-white/50 rounded p-2">
                <h4 className="font-semibold text-green-800 text-xs mb-1">
                  Entry Fees
                </h4>
                <div className="space-y-1 text-[10px]">
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
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded p-2 border border-purple-200">
                <p className="text-[10px] font-medium text-purple-800">
                  💡 Pro Tip
                </p>
                <p className="text-[10px] text-purple-600">
                  Book online to skip queues!
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              Did You Know?
            </h3>
            <div className="space-y-3">
              {amazingFacts.map((fact, index) => {
                const IconComponent = fact.icon;
                return (
                  <div
                    key={index}
                    className={`bg-white rounded p-3 border border-gray-100 transition-all duration-300 cursor-pointer hover:shadow-md touch-manipulation ${
                      index === currentFact
                        ? "ring-1 ring-purple-200 shadow-sm"
                        : ""
                    }`}
                    onClick={() => setCurrentFact(index)}
                  >
                    <div className="flex items-start gap-2">
                      <div className="p-1.5 rounded bg-gradient-to-br from-purple-100 to-pink-100">
                        <IconComponent className={`w-3 h-3 ${fact.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-xs text-gray-800 mb-1">
                          {fact.title}
                        </h4>
                        <p className="text-[10px] text-gray-600">{fact.fact}</p>
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
  );
};

export default TajMahal;
