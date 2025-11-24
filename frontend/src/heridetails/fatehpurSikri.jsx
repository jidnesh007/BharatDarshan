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

const FatehpurSikri = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeVideoCategory, setActiveVideoCategory] = useState("historical");
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [showFactModal, setShowFactModal] = useState(false);
  const [currentFact, setCurrentFact] = useState(0);
  const [visitorsCount, setVisitorsCount] = useState(9876);
  const [timeOfDay, setTimeOfDay] = useState("dawn");

  const carouselImages = [
    {
      url: "/images/fs1.jpg",
      title: "Fatehpur Sikri",
      description: "The majestic Mughal capital",
    },
    {
      url: "/images/fs2.jpg",
      title: "Fatehpur Sikri",
      description: "Explore architectural grandeur",
    },
    {
      url: "/images/fs3.jpg",
      title: "Fatehpur Sikri",
      description: "Discover Akbar’s legacy",
    },
  ];

  const amazingFacts = [
    {
      icon: Crown,
      title: "Akbar’s Capital",
      fact: "Fatehpur Sikri was founded by Emperor Akbar as the capital of the Mughal Empire from 1571 to 1585.",
      color: "text-red-500",
    },
    {
      icon: Heart,
      title: "Architectural Fusion",
      fact: "The city showcases a blend of Hindu, Persian, and Islamic architectural styles, reflecting Akbar’s vision of unity.",
      color: "text-purple-500",
    },
    {
      icon: Sparkles,
      title: "Buland Darwaza",
      fact: "The Buland Darwaza, standing 54 meters tall, is one of the largest gateways in the world, built to commemorate Akbar’s Gujarat victory.",
      color: "text-yellow-500",
    },
    {
      icon: Star,
      title: "UNESCO Heritage",
      fact: "Fatehpur Sikri was declared a UNESCO World Heritage Site in 1986 for its historical and architectural significance.",
      color: "text-blue-500",
    },
    {
      icon: Award,
      title: "Abandoned City",
      fact: "The city was abandoned within 14 years due to water scarcity, leaving behind well-preserved structures.",
      color: "text-green-500",
    },
  ];

  const videoContent = {
    historical: [
      {
        id: "dQw4w9WgXcQ",
        title: "Akbar’s Vision for Fatehpur Sikri",
        description:
          "Explore the grand vision of Emperor Akbar in building this Mughal capital",
        duration: "16:00",
        views: "2.0M",
        rating: 4.9,
        category: "Documentary",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Secrets of Mughal Architecture",
        description:
          "Discover the innovative designs of Fatehpur Sikri’s palaces and mosques",
        duration: "13:30",
        views: "1.7M",
        rating: 4.8,
        category: "Architecture",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Mughal Empire: Akbar’s Reign",
        description:
          "Journey through the golden era of Akbar’s rule and his legacy in Fatehpur Sikri",
        duration: "18:00",
        views: "3.1M",
        rating: 4.9,
        category: "History",
      },
    ],
    cultural: [
      {
        id: "dQw4w9WgXcQ",
        title: "Life in Akbar’s Court",
        description:
          "Experience the vibrant culture and daily life in the Mughal court of Fatehpur Sikri",
        duration: "14:00",
        views: "1.4M",
        rating: 4.7,
        category: "Culture",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Artisans of Fatehpur Sikri",
        description:
          "Meet the craftsmen who shaped the intricate designs of this historic city",
        duration: "11:00",
        views: "800K",
        rating: 4.6,
        category: "Craftsmanship",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Festivals of Uttar Pradesh",
        description:
          "Celebrate the vibrant traditions and festivals near Fatehpur Sikri",
        duration: "13:30",
        views: "1.1M",
        rating: 4.8,
        category: "Festivals",
      },
    ],
    music: [
      {
        id: "dQw4w9WgXcQ",
        title: "Sufi Songs of Fatehpur Sikri",
        description:
          "Soulful Sufi music inspired by the spiritual legacy of Salim Chishti",
        duration: "24:00",
        views: "2.7M",
        rating: 4.9,
        category: "Sufi Music",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Classical Ragas of Akbar’s Era",
        description:
          "Authentic court music from the golden age of Mughal culture",
        duration: "31:00",
        views: "1.8M",
        rating: 4.8,
        category: "Classical",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Folk Melodies of Uttar Pradesh",
        description:
          "Traditional songs celebrating the heritage of Fatehpur Sikri",
        duration: "19:00",
        views: "1.0M",
        rating: 4.7,
        category: "Folk Music",
      },
    ],
    mythology: [
      {
        id: "dQw4w9WgXcQ",
        title: "Legends of Salim Chishti",
        description:
          "Uncover the spiritual stories surrounding the revered Sufi saint of Fatehpur Sikri",
        duration: "16:15",
        views: "2.3M",
        rating: 4.8,
        category: "Mystery",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Myths of the Abandoned City",
        description:
          "Explore the tales and mysteries behind Fatehpur Sikri’s abandonment",
        duration: "12:00",
        views: "1.6M",
        rating: 4.6,
        category: "Legends",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Spiritual Legacy of Akbar",
        description:
          "Discover the spiritual significance of Fatehpur Sikri in Mughal history",
        duration: "20:30",
        views: "1.8M",
        rating: 4.9,
        category: "Spirituality",
      },
    ],
    virtual: [
      {
        id: "dQw4w9WgXcQ",
        title: "360° Virtual Tour of Fatehpur Sikri",
        description:
          "Immersive virtual reality experience of the historic city’s palaces and mosques",
        duration: "27:45",
        views: "4.0M",
        rating: 4.9,
        category: "VR Experience",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Drone Flight Over Fatehpur Sikri",
        description:
          "Aerial views showcasing the grandeur of Buland Darwaza and the city",
        duration: "9:00",
        views: "3.0M",
        rating: 4.8,
        category: "Aerial View",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Time-lapse: Fatehpur Sikri’s Beauty",
        description:
          "Witness the magical transformation of the city through the day",
        duration: "4:45",
        views: "5.5M",
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
          `https://api.openweathermap.org/data/2.5/weather?q=Fatehpur Sikri,IN&appid=${apiKey}&units=metric`
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
              Fatehpur Sikri, Uttar Pradesh
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
        <div className="absolute top-8 sm:top-16 left-4 sm:left-12 z-20 max-w-[90%] sm:max-w-3xl">
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
                A Testament to Akbar’s Vision
                <br className="sm:hidden" />
                <span className="text-xl sm:text-2xl lg:text-3xl">
                  and Mughal Grandeur
                </span>
              </h2>
              <div className="prose prose-sm sm:prose-lg text-gray-700 space-y-4 sm:space-y-6 mb-8 sm:mb-12">
                <p className="text-base sm:text-lg leading-relaxed">
                  Fatehpur Sikri, located near Agra in Uttar Pradesh, is a
                  magnificent fortified city built by Emperor Akbar as the
                  Mughal capital. Known for its architectural splendor, the city
                  blends Hindu, Persian, and Islamic styles, reflecting Akbar’s
                  inclusive vision.
                </p>
                <p className="text-sm sm:text-base leading-relaxed text-gray-600">
                  The grand Buland Darwaza, the serene Jama Masjid, and the
                  elegant palaces like Panch Mahal showcase the ingenuity of
                  Mughal craftsmanship. Despite its brief tenure as a capital,
                  Fatehpur Sikri remains a UNESCO World Heritage Site,
                  preserving its historical legacy.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-4 sm:p-6 border border-orange-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
                    <h3 className="font-bold text-base sm:text-xl text-gray-800">
                      Construction
                    </h3>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-orange-600 mb-1">
                    1571-1585
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">Mughal Era</p>
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
                      year: "1571",
                      event: "Akbar founds Fatehpur Sikri as Mughal capital",
                      color: "red",
                    },
                    {
                      year: "1575",
                      event: "Construction of Buland Darwaza completed",
                      color: "blue",
                    },
                    {
                      year: "1585",
                      event:
                        "Capital shifted to Lahore, Fatehpur Sikri abandoned",
                      color: "green",
                    },
                    {
                      year: "1986",
                      event: "Designated UNESCO World Heritage Site",
                      color: "yellow",
                    },
                    {
                      year: "2004",
                      event: "Restoration efforts begin to preserve structures",
                      color: "orange",
                    },
                    {
                      year: "2020",
                      event: "Fatehpur Sikri gains global tourism recognition",
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
                    Fatehpur Sikri, Agra, Uttar Pradesh 283110, India
                  </p>
                </div>
                <div className="relative rounded-lg overflow-hidden border border-orange-200 shadow-sm">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3553.364191814037!2d77.66518731458598!3d27.09415048291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397477a9c6b6b6b7%3A0x7c7b7b7b7b7b7b7b!2sFatehpur%20Sikri!5e0!3m2!1sen!2sin!4v1625123456789!5m2!1sen!2sin"
                    width="100%"
                    height="150"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Fatehpur Sikri Location"
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
                    <p className="font-bold text-orange-600">Agra: 40km</p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3">
                    <p className="text-gray-600">Agra Airport</p>
                    <p className="font-bold text-orange-600">45km away</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-3 border border-blue-200">
                  <p className="text-xs sm:text-sm font-medium text-blue-800 flex items-center gap-2">
                    🚗 Getting There
                  </p>
                  <p className="text-xs sm:text-sm text-blue-600 mt-1">
                    Take NH44 from Agra for a quick 1-hour drive to Fatehpur
                    Sikri
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-blue-100">
              <h3 className="text-base sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                <Cloud className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                Current Weather in Fatehpur Sikri
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
                      <p className="text-xs sm:text-sm text-gray-500">
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
                      Sunrise: 6:00-7:00 AM for stunning views of Buland Darwaza
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
                      <span>Sunrise to Sunset</span>
                      <span className="font-medium">6:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Friday</span>
                      <span className="font-medium text-red-600">Open</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                  <h4 className="font-semibold text-green-800">Entry Fees</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Indian Citizens</span>
                      <span className="font-medium">₹50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Foreign Tourists</span>
                      <span className="font-medium">₹610</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SAARC/BIMSTEC</span>
                      <span className="font-medium">₹50</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-3 border border-orange-200">
                  <p className="text-xs sm:text-sm font-medium text-orange-800">
                    💡 Pro Tip
                  </p>
                  <p className="text-xs sm:text-sm text-orange-600 mt-1">
                    Visit early morning to avoid crowds and enjoy cooler
                    weather!
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

export default FatehpurSikri;
