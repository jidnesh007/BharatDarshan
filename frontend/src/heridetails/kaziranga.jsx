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

const KazirangaNationalPark = () => {
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
      url: "/images/kn1.jpg",
      title: "Kaziranga National Park",
    },
    {
      url: "/images/kn2.jpg",
      title: "Kaziranga National Park",
    },
    {
      url: "/images/kn3.jpg",
      title: "Kaziranga National Park",
    },
  ];

  const amazingFacts = [
    {
      icon: Heart,
      title: "Rhino Sanctuary",
      fact: "Kaziranga is home to the world's largest population of the one-horned rhinoceros, with over 2,400 individuals.",
      color: "text-red-500",
    },
    {
      icon: Crown,
      title: "Biodiversity Hotspot",
      fact: "The park hosts a diverse ecosystem with 35 mammal species, 500 bird species, and numerous reptiles and plants.",
      color: "text-purple-500",
    },
    {
      icon: Sparkles,
      title: "Wetland Ecosystem",
      fact: "Kaziranga's unique floodplain ecosystem is nourished by the Brahmaputra River, creating lush habitats for wildlife.",
      color: "text-yellow-500",
    },
    {
      icon: Star,
      title: "Tiger Reserve",
      fact: "Kaziranga is a designated Tiger Reserve, with one of the highest tiger density in India, boasting over 100 tigers.",
      color: "text-blue-500",
    },
    {
      icon: Award,
      title: "UNESCO Heritage",
      fact: "Declared a UNESCO World Heritage Site in 1985 for its unique natural environment and conservation success.",
      color: "text-green-500",
    },
  ];

  const videoContent = {
    historical: [
      {
        id: "https://youtu.be/9Z3X1Z1Z1Z1?si=example",
        title: "History of Kaziranga's Conservation",
        description:
          "Discover the efforts to protect the one-horned rhinoceros and other species",
        duration: "15:00",
        views: "1.9M",
        rating: 4.8,
        category: "Documentary",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Establishment of Kaziranga",
        description:
          "Learn about the park's founding and early conservation efforts",
        duration: "12:30",
        views: "1.5M",
        rating: 4.7,
        category: "History",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "British Era and Wildlife Protection",
        description:
          "Explore how colonial policies shaped Kaziranga's early years",
        duration: "17:00",
        views: "2.0M",
        rating: 4.9,
        category: "History",
      },
    ],
    cultural: [
      {
        id: "dQw4w9WgXcQ",
        title: "Tribal Communities of Assam",
        description:
          "Experience the traditions of indigenous tribes near Kaziranga",
        duration: "13:45",
        views: "1.3M",
        rating: 4.6,
        category: "Culture",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Bihu Festival Celebrations",
        description: "Celebrate Assam's vibrant Bihu festival near the park",
        duration: "11:15",
        views: "950K",
        rating: 4.7,
        category: "Festivals",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Traditional Crafts of Assam",
        description:
          "Meet artisans creating bamboo and cane crafts near Kaziranga",
        duration: "10:50",
        views: "800K",
        rating: 4.5,
        category: "Craftsmanship",
      },
    ],
    music: [
      {
        id: "dQw4w9WgXcQ",
        title: "Bihu Folk Songs",
        description:
          "Traditional Assamese melodies celebrating nature and culture",
        duration: "23:00",
        views: "2.5M",
        rating: 4.9,
        category: "Folk Music",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Nature-Inspired Bhajans",
        description:
          "Devotional songs reflecting the spiritual connection to nature",
        duration: "19:30",
        views: "1.4M",
        rating: 4.8,
        category: "Devotional",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Tribal Music of Assam",
        description:
          "Rhythms and songs of indigenous communities around Kaziranga",
        duration: "18:00",
        views: "1.0M",
        rating: 4.7,
        category: "Tribal Music",
      },
    ],
    mythology: [
      {
        id: "dQw4w9WgXcQ",
        title: "Legends of the Brahmaputra",
        description:
          "Uncover myths and folklore surrounding the Brahmaputra River",
        duration: "15:20",
        views: "2.2M",
        rating: 4.8,
        category: "Mystery",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Tales of the Rhino God",
        description:
          "Explore local legends about the revered one-horned rhinoceros",
        duration: "11:45",
        views: "1.6M",
        rating: 4.6,
        category: "Legends",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Spiritual Significance of Kaziranga",
        description:
          "The park's role in Assamese spiritual and cultural traditions",
        duration: "19:00",
        views: "1.8M",
        rating: 4.9,
        category: "Spirituality",
      },
    ],
    virtual: [
      {
        id: "dQw4w9WgXcQ",
        title: "360° Safari in Kaziranga",
        description:
          "Immersive virtual reality exploration of the park's wildlife",
        duration: "26:00",
        views: "3.8M",
        rating: 4.9,
        category: "VR Experience",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Drone Flight Over Kaziranga",
        description: "Aerial views showcasing the park's lush landscapes",
        duration: "8:30",
        views: "2.9M",
        rating: 4.8,
        category: "Aerial View",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Time-lapse: Kaziranga's Seasons",
        description: "Witness the park's transformation through seasons",
        duration: "4:10",
        views: "4.8M",
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
    setVisitorsCount(8765);
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
          `https://api.openweathermap.org/data/2.5/weather?q=Golaghat,IN&appid=${apiKey}&units=metric`
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
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
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
          className={`absolute top-2 right-2 flex gap-1 transition-all duration-300 md:${
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
        className="fixed top-4 left-4 z-50 bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300 group border border-gray-200 hover:scale-105"
      >
        <ArrowLeft className="w-5 h-5 text-gray-700 group-hover:text-purple-600 transition-colors" />
      </button>
      <div className="fixed top-4 right-4 z-50 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <MapPin className="w-4 h-4 text-red-500" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-800 block">
              Golaghat, Assam
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Users className="w-3 h-3" />
              {visitorsCount.toLocaleString()} visitors
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
          className="absolute left-2 sm:left-8 top-1/2 transform -translate-y-1/2 text-white hover:text-purple-300 transition-all duration-300 z-20 bg-black/30 backdrop-blur-sm rounded-full p-2 sm:p-4 hover:bg-black/50 hover:scale-105"
        >
          <ChevronLeft className="w-6 h-6 sm:w-10 sm:h-10" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 sm:right-8 top-1/2 transform -translate-y-1/2 text-white hover:text-purple-300 transition-all duration-300 z-20 bg-black/30 backdrop-blur-sm rounded-full p-2 sm:p-4 hover:bg-black/50 hover:scale-105"
        >
          <ChevronRight className="w-6 h-6 sm:w-10 sm:h-10" />
        </button>
        <div className="absolute top-8 sm:top-32 left-2 sm:left-12 z-20 max-w-[90%] sm:max-w-4xl">
          <div className="bg-black/20 backdrop-blur-sm rounded-lg sm:rounded-2xl p-4 sm:p-8 border border-white/20">
            <h1 className="text-2xl sm:text-5xl font-bold text-white drop-shadow-lg sm:drop-shadow-2xl mb-2 sm:mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text">
              {carouselImages[currentImageIndex].title}
            </h1>
            <p className="text-base sm:text-2xl text-white/90 mb-4 sm:mb-6 drop-shadow-lg hidden sm:block">
              {carouselImages[currentImageIndex].description}
            </p>
          </div>
        </div>
        <div className="absolute bottom-4 sm:bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-4 z-20">
          {carouselImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`group relative transition-all duration-500 ${
                index === currentImageIndex
                  ? "w-8 sm:w-12 h-2 sm:h-4 bg-white shadow-md sm:shadow-2xl"
                  : "w-2 sm:w-4 h-2 sm:h-4 bg-white/50 hover:bg-white/75"
              } rounded-full overflow-hidden`}
            >
              {index === currentImageIndex && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full bg-gradient-to-br from-white to-gray-50">
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 p-4 sm:p-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 sm:mb-12 leading-tight">
                A Haven of Biodiversity
                <br className="sm:hidden" />
                <span className="text-xl sm:text-4xl">
                  and Conservation Triumph
                </span>
              </h2>
              <div className="prose prose-sm sm:prose-xl text-gray-700 space-y-6 sm:space-y-8 mb-8 sm:mb-12">
                <p className="text-base sm:text-2xl leading-relaxed">
                  Located in Golaghat, Assam, Kaziranga National Park is a
                  global biodiversity hotspot and a UNESCO World Heritage Site.
                  Renowned for its thriving population of one-horned
                  rhinoceroses, the park is a testament to successful
                  conservation efforts in India.
                </p>
                <p className="text-sm sm:text-xl leading-relaxed text-gray-600">
                  Spanning the floodplains of the Brahmaputra River, Kaziranga
                  hosts a rich ecosystem with wetlands, grasslands, and forests.
                  Visitors can explore its wildlife through jeep safaris and
                  elephant rides, spotting tigers, elephants, and a variety of
                  bird species.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-purple-100 hover:shadow-md sm:hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Clock className="w-6 sm:w-8 h-6 sm:h-8 text-purple-600" />
                    <h3 className="font-bold text-base sm:text-xl text-gray-800">
                      Established
                    </h3>
                  </div>
                  <p className="text-xl sm:text-3xl font-bold text-purple-600 mb-1">
                    1905
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    National Park in 1974
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-blue-100 hover:shadow-md sm:hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Users className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600" />
                    <h3 className="font-bold text-base sm:text-xl text-gray-800">
                      Wildlife
                    </h3>
                  </div>
                  <p className="text-xl sm:text-3xl font-bold text-blue-600 mb-1">
                    2,400+ Rhinos
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Plus tigers, elephants
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-green-100 hover:shadow-md sm:hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Award className="w-6 sm:w-8 h-6 sm:h-8 text-green-600" />
                    <h3 className="font-bold text-base sm:text-xl text-gray-800">
                      Recognition
                    </h3>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-green-600 mb-1">
                    UNESCO Heritage
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">Since 1985</p>
                </div>
              </div>
              <div className="mb-8 sm:mb-12">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-4xl font-bold text-gray-800">
                    Immersive Experiences
                  </h3>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mt-2 sm:mt-0">
                    <Volume2 className="w-3 sm:w-4 h-3 sm:h-4" />
                    <span>Use headphones for best experience</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto">
                  {Object.keys(videoContent).map((category) => {
                    const IconComponent = categoryIcons[category];
                    return (
                      <button
                        key={category}
                        onClick={() => setActiveVideoCategory(category)}
                        className={`group flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-2xl transition-all duration-300 hover:scale-105 text-xs sm:text-base flex-shrink-0 ${
                          activeVideoCategory === category
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md sm:shadow-2xl"
                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm"
                        }`}
                      >
                        <IconComponent
                          className={`w-4 sm:w-5 h-4 sm:h-5 transition-transform group-hover:scale-110 ${
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                <h3 className="text-xl sm:text-4xl font-bold text-gray-800 mb-6 sm:mb-8">
                  Historical Timeline
                </h3>
                <div className="relative">
                  <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                  {[
                    {
                      year: "1905",
                      event: "Kaziranga declared a Reserved Forest",
                      color: "red",
                    },
                    {
                      year: "1916",
                      event: "Declared a Game Sanctuary",
                      color: "blue",
                    },
                    {
                      year: "1974",
                      event: "Officially established as a National Park",
                      color: "green",
                    },
                    {
                      year: "1985",
                      event: "Designated UNESCO World Heritage Site",
                      color: "yellow",
                    },
                    {
                      year: "2006",
                      event: "Declared a Tiger Reserve",
                      color: "purple",
                    },
                    {
                      year: "2020",
                      event: "Successful anti-poaching measures implemented",
                      color: "pink",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="relative flex items-center mb-6 sm:mb-8 group"
                    >
                      <div
                        className={`w-4 sm:w-6 h-4 sm:h-6 rounded-full border-2 sm:border-4 border-white shadow-md sm:shadow-lg bg-${item.color}-500 relative z-10 group-hover:scale-125 transition-transform duration-300`}
                      ></div>
                      <div className="ml-6 sm:ml-8 bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md sm:shadow-lg border border-gray-100 flex-1 group-hover:shadow-lg sm:group-hover:shadow-2xl transition-all duration-300">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                          <span
                            className={`text-lg sm:text-2xl font-semibold sm:font-bold text-${item.color}-600`}
                          >
                            {item.year}
                          </span>
                          <span className="text-sm sm:text-lg text-gray-700">
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
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-orange-100">
              <h3 className="text-base sm:text-xl font-semibold sm:font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                <MapPin className="w-5 sm:w-6 h-5 sm:h-6 text-red-500" />
                Location & Directions
              </h3>
              <div className="space-y-4">
                <div className="bg-white/50 rounded-lg p-3">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">
                    Address
                  </p>
                  <p className="font-semibold text-sm sm:text-base text-gray-800">
                    Kanchanjuri, Golaghat, Assam 785609
                  </p>
                </div>
                <div className="relative rounded-lg overflow-hidden border border-orange-200 shadow-sm">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3572.747378231716!2d93.40539831457194!3d26.57751898327781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3744e5c8b7a1e5b7%3A0x5f3b86e6f7e8e5c5!2sKaziranga%20National%20Park!5e0!3m2!1sen!2sin!4v1625123456789!5m2!1sen!2sin"
                    width="100%"
                    height="150"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Kaziranga National Park Location"
                    className="rounded-lg"
                  ></iframe>
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/90 backdrop-blur-sm rounded-lg px-1.5 sm:px-2 py-0.5 sm:py-1">
                    <span className="text-xs font-medium text-gray-700">
                      Interactive Map
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="bg-white/50 rounded-lg p-3">
                    <p className="text-gray-600">Distance from</p>
                    <p className="font-semibold sm:font-bold text-orange-600">
                      Guwahati: 200km
                    </p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3">
                    <p className="text-gray-600">Jorhat Airport</p>
                    <p className="font-semibold sm:font-bold text-orange-600">
                      90km away
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-3 border border-blue-200">
                  <p className="text-xs sm:text-sm font-medium text-blue-800 flex items-center gap-2">
                    🚗 Getting There
                  </p>
                  <p className="text-xs sm:text-sm text-blue-600 mt-1">
                    Drive from Guwahati via NH27 for a scenic 4-hour journey
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-blue-100">
              <h3 className="text-base sm:text-xl font-semibold sm:font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                <Cloud className="w-5 sm:w-6 h-5 sm:h-6 text-blue-500" />
                Current Weather in Golaghat
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
                      <span className="text-lg sm:text-3xl font-semibold sm:font-bold text-gray-800">
                        {Math.round(weather.main?.temp)}°C
                      </span>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs sm:text-sm text-gray-600 capitalize">
                        {weather.weather?.[0]?.description}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Feels like {Math.round(weather.main?.feels_like)}°C
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                    <div className="bg-white/50 rounded-lg p-3">
                      <p className="text-gray-600">Humidity</p>
                      <p className="font-semibold sm:font-bold text-blue-600">
                        {weather.main?.humidity}%
                      </p>
                    </div>
                    <div className="bg-white/50 rounded-lg p-3">
                      <p className="text-gray-600">Visibility</p>
                      <p className="font-semibold sm:font-bold text-blue-600">
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
                      Early morning: 5:30-6:30 AM for wildlife sightings
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-xs sm:text-sm">
                  Weather data unavailable
                </p>
              )}
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-green-100">
              <h3 className="text-base sm:text-xl font-semibold sm:font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                <Calendar className="w-5 sm:w-6 h-5 sm:h-6 text-green-500" />
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
                      <span>November to April</span>
                      <span className="font-medium">7:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>May to October</span>
                      <span className="font-medium text-red-600">Closed</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                  <h4 className="font-semibold text-green-800">Entry Fees</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Indian Citizens</span>
                      <span className="font-medium">₹100</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Foreign Tourists</span>
                      <span className="font-medium">₹650</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Jeep Safari (per vehicle)</span>
                      <span className="font-medium">₹2,500</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-3 border border-purple-200">
                  <p className="text-xs sm:text-sm font-medium text-purple-800">
                    💡 Pro Tip
                  </p>
                  <p className="text-xs sm:text-sm text-purple-600 mt-1">
                    Book safaris in advance, especially during peak season
                    (Jan-Mar)!
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-purple-100">
              <h3 className="text-base sm:text-xl font-semibold sm:font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                <Sparkles className="w-5 sm:w-6 h-5 sm:h-6 text-purple-500" />
                Did You Know?
              </h3>
              <div className="space-y-4">
                {amazingFacts.map((fact, index) => {
                  const IconComponent = fact.icon;
                  return (
                    <div
                      key={index}
                      className={`bg-white rounded-lg p-3 sm:p-4 border border-gray-100 transition-all duration-300 cursor-pointer hover:shadow-md ${
                        index === currentFact
                          ? "ring-1 sm:ring-2 ring-purple-200 shadow-sm"
                          : ""
                      }`}
                      onClick={() => {
                        setCurrentFact(index);
                        setShowFactModal(true);
                      }}
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100">
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
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100">
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
              className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg py-2 sm:py-3 hover:shadow-lg transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KazirangaNationalPark;
