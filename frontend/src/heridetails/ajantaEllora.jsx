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

const AjantaElloraCaves = () => {
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
      url: "/images/ae1.jpg",
      title: "Ajanta & Ellora Caves",
    },
    {
      url: "/images/ae2.webp",
      title: "Ajanta & Ellora Caves",
    },
    {
      url: "/images/ae3.jpg",
      title: "Ajanta & Ellora Caves",
    },
  ];

  const amazingFacts = [
    {
      icon: Heart,
      title: "Ancient Artistry",
      fact: "The Ajanta Caves are renowned for their exquisite Buddhist paintings and frescoes, dating back to the 2nd century BCE.",
      color: "text-red-500",
    },
    {
      icon: Crown,
      title: "Rock-Cut Mastery",
      fact: "The Ellora Caves, carved from a single basalt rock, feature Hindu, Buddhist, and Jain monuments from the 6th to 10th centuries.",
      color: "text-purple-500",
    },
    {
      icon: Sparkles,
      title: "Kailasa Temple",
      fact: "The Kailasa Temple in Ellora is one of the largest rock-cut temples in the world, carved out of a single monolith.",
      color: "text-yellow-500",
    },
    {
      icon: Star,
      title: "UNESCO Heritage",
      fact: "Both Ajanta and Ellora Caves were designated as UNESCO World Heritage Sites in 1983 for their cultural significance.",
      color: "text-blue-500",
    },
    {
      icon: Award,
      title: "Religious Diversity",
      fact: "The caves showcase a unique blend of Buddhist, Hindu, and Jain art, reflecting India’s religious harmony.",
      color: "text-green-500",
    },
  ];

  const videoContent = {
    historical: [
      {
        id: "dQw4w9WgXcQ",
        title: "History of Ajanta & Ellora",
        description:
          "Discover the ancient history behind the rock-cut caves of Ajanta and Ellora",
        duration: "16:00",
        views: "2.3M",
        rating: 4.9,
        category: "Documentary",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Secrets of Cave Construction",
        description:
          "Explore the techniques used to carve these magnificent caves from solid rock",
        duration: "13:00",
        views: "1.7M",
        rating: 4.8,
        category: "Architecture",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "The Gupta and Post-Gupta Era",
        description:
          "Journey through the golden age of Indian art during the Gupta dynasty",
        duration: "17:45",
        views: "3.0M",
        rating: 4.9,
        category: "History",
      },
    ],
    cultural: [
      {
        id: "dQw4w9WgXcQ",
        title: "Life in Ancient Deccan",
        description:
          "Experience the cultural and daily life during the time of the caves’ creation",
        duration: "14:30",
        views: "1.4M",
        rating: 4.7,
        category: "Culture",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Traditional Art of Ajanta",
        description:
          "Meet the modern artisans inspired by the ancient painting techniques of Ajanta",
        duration: "11:00",
        views: "850K",
        rating: 4.6,
        category: "Craftsmanship",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Festivals Around the Caves",
        description:
          "Celebrate the vibrant festivals and traditions of Aurangabad",
        duration: "13:15",
        views: "1.1M",
        rating: "4.8",
        category: "Festivals",
      },
    ],
    music: [
      {
        id: "dQw4w9WgXcQ",
        title: "Buddhist Chants of Ajanta",
        description:
          "Soulful chants that echo the spiritual essence of the Buddhist caves",
        duration: "24:30",
        views: "2.7M",
        rating: 4.9,
        category: "Buddhist Music",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Classical Music of the Deccan",
        description:
          "Authentic music from the era when the caves were active centers of worship",
        duration: "31:45",
        views: "1.8M",
        rating: 4.8,
        category: "Classical",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Folk Songs of Maharashtra",
        description:
          "Traditional melodies celebrating the heritage of the Ajanta and Ellora region",
        duration: "19:00",
        views: "1.0M",
        rating: 4.7,
        category: "Folk Music",
      },
    ],
    mythology: [
      {
        id: "dQw4w9WgXcQ",
        title: "Myths of the Caves",
        description:
          "Uncover the fascinating legends surrounding the Ajanta and Ellora Caves",
        duration: "16:15",
        views: "2.4M",
        rating: 4.8,
        category: "Mystery",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Legends of Kailasa Temple",
        description:
          "Explore the mythological stories behind the creation of the Kailasa Temple",
        duration: "12:00",
        views: "1.6M",
        rating: 4.6,
        category: "Legends",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Spiritual Significance of the Caves",
        description:
          "How the caves became symbols of spiritual unity in Indian culture",
        duration: "20:00",
        views: "1.8M",
        rating: 4.9,
        category: "Spirituality",
      },
    ],
    virtual: [
      {
        id: "dQw4w9WgXcQ",
        title: "360° Virtual Tour of Ajanta & Ellora",
        description:
          "Immersive virtual reality experience of the rock-cut caves",
        duration: "27:30",
        views: "4.0M",
        rating: 4.9,
        category: "VR Experience",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Drone Flight Over Ellora",
        description:
          "Breathtaking aerial views of the Ellora Caves and Kailasa Temple",
        duration: "8:30",
        views: "3.0M",
        rating: 4.8,
        category: "Aerial View",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Time-lapse: Caves Through the Day",
        description:
          "Witness the magical transformation of the caves from dawn to dusk",
        duration: "4:15",
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
    setVisitorsCount(9876);
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
          `https://api.openweathermap.org/data/2.5/weather?q=Aurangabad,IN&appid=${apiKey}&units=metric`
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
            src={`https://www.youtube.com/embed/${video.id}`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="transition-transform duration-300 group-hover:scale-105"
          ></iframe>
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <Play className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-full">
            {video.category}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
          {video.duration}
        </div>
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
      <button
        onClick={handleBackClick}
        className="fixed top-4 left-4 z-50 bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-xl hover:shadow-2xl transition-all duration-300 group border border-gray-200 hover:scale-110 md:top-6 md:left-6 md:p-3"
      >
        <ArrowLeft className="w-5 h-5 text-gray-700 group-hover:text-purple-600 transition-colors md:w-6 md:h-6" />
      </button>
      <div className="fixed top-4 right-4 z-50 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-xl border border-gray-200 md:top-6 md:right-6 md:px-4 md:py-3">
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="relative">
            <MapPin className="w-4 h-4 text-red-500 md:w-5 md:h-5" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping md:w-3 md:h-3"></div>
          </div>
          <div>
            <span className="text-xs font-bold text-gray-800 block md:text-sm">
              Aurangabad, Maharashtra
            </span>
            <span className="text-[10px] text-gray-500 flex items-center gap-1 md:text-xs">
              <Users className="w-2 h-2 md:w-3 md:h-3" />
              {visitorsCount.toLocaleString()} visitors today
            </span>
          </div>
        </div>
      </div>
      <div className="relative w-full h-[60vh] md:h-screen overflow-hidden">
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
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-purple-300 transition-all duration-300 z-20 bg-black/30 backdrop-blur-sm rounded-full p-2 hover:bg-black/50 hover:scale-110 md:left-8 md:p-4"
        >
          <ChevronLeft className="w-6 h-6 md:w-10 md:h-10" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-purple-300 transition-all duration-300 z-20 bg-black/30 backdrop-blur-sm rounded-full p-2 hover:bg-black/50 hover:scale-110 md:right-8 md:p-4"
        >
          <ChevronRight className="w-6 h-6 md:w-10 md:h-10" />
        </button>
        <div className="absolute top-16 left-4 z-20 max-w-[90%] md:top-32 md:left-12 md:max-w-3xl">
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-white/20">
            <h1 className="text-3xl font-bold text-white drop-shadow-2xl mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text md:text-6xl md:mb-4">
              {carouselImages[currentImageIndex].title}
            </h1>
            <p className="text-lg text-white/90 drop-shadow-lg md:text-2xl md:mb-6">
              {carouselImages[currentImageIndex].description}
            </p>
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 md:bottom-12 md:space-x-4 z-20">
          {carouselImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`group relative transition-all duration-500 ${
                index === currentImageIndex
                  ? "w-8 h-3 bg-white shadow-2xl md:w-12 md:h-4"
                  : "w-3 h-3 bg-white/50 hover:bg-white/75 md:w-4 md:h-4"
              } rounded-full overflow-hidden`}
            >
              {index === currentImageIndex && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full bg-gradient-to-br from-white to-gray-50 flex flex-col md:flex-row">
        <div className="flex-1 p-4 md:p-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 leading-tight md:text-6xl md:mb-12">
              A Testament to Ancient Art
              <br />
              <span className="text-2xl md:text-4xl">
                and Rock-Cut Architecture
              </span>
            </h2>
            <div className="prose prose-lg text-gray-700 space-y-6 mb-8 md:prose-xl md:space-y-8 md:mb-12">
              <p className="text-lg leading-relaxed md:text-2xl">
                The Ajanta and Ellora Caves in Aurangabad, Maharashtra, are
                masterpieces of ancient Indian rock-cut architecture. Dating
                from the 2nd century BCE to the 10th century CE, these caves
                represent a harmonious blend of Buddhist, Hindu, and Jain art.
              </p>
              <p className="text-base leading-relaxed text-gray-600 md:text-xl">
                The Ajanta Caves are famed for their vibrant frescoes and
                sculptures, while Ellora’s Kailasa Temple is an architectural
                marvel carved from a single rock. These UNESCO World Heritage
                Sites reflect India’s rich cultural and religious heritage.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-3 md:gap-6 md:mb-12">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100 hover:shadow-lg transition-all duration-300 md:p-6">
                <div className="flex items-center gap-2 mb-2 md:gap-3 md:mb-3">
                  <Clock className="w-6 h-6 text-purple-600 md:w-8 md:h-8" />
                  <h3 className="font-bold text-lg text-gray-800 md:text-xl">
                    Construction
                  </h3>
                </div>
                <p className="text-2xl font-bold text-purple-600 mb-1 md:text-3xl">
                  2nd BCE-10th CE
                </p>
                <p className="text-xs text-gray-600 md:text-sm">
                  Multiple dynasties
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100 hover:shadow-lg transition-all duration-300 md:p-6">
                <div className="flex items-center gap-2 mb-2 md:gap-3 md:mb-3">
                  <Users className="w-6 h-6 text-blue-600 md:w-8 md:h-8" />
                  <h3 className="font-bold text-lg text-gray-800 md:text-xl">
                    Artisans
                  </h3>
                </div>
                <p className="text-2xl font-bold text-blue-600 mb-1 md:text-3xl">
                  Thousands
                </p>
                <p className="text-xs text-gray-600 md:text-sm">
                  Skilled craftsmen
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100 hover:shadow-lg transition-all duration-300 md:p-6">
                <div className="flex items-center gap-2 mb-2 md:gap-3 md:mb-3">
                  <Award className="w-6 h-6 text-green-600 md:w-8 md:h-8" />
                  <h3 className="font-bold text-lg text-gray-800 md:text-xl">
                    Recognition
                  </h3>
                </div>
                <p className="text-base font-bold text-green-600 mb-1 md:text-lg">
                  UNESCO Heritage
                </p>
                <p className="text-xs text-gray-600 md:text-sm">
                  Designated in 1983
                </p>
              </div>
            </div>
            <div className="mb-8 md:mb-12">
              <div className="flex flex-col items-start justify-between mb-6 md:flex-row md:items-center md:mb-8">
                <h3 className="text-3xl font-bold text-gray-800 md:text-4xl">
                  Immersive Experiences
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-2 md:mt-0 md:text-sm">
                  <Volume2 className="w-3 h-3 md:w-4 md:h-4" />
                  <span>Use headphones for best experience</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6 md:gap-3 md:mb-8">
                {Object.keys(videoContent).map((category) => {
                  const IconComponent = categoryIcons[category];
                  return (
                    <button
                      key={category}
                      onClick={() => setActiveVideoCategory(category)}
                      className={`group flex items-center space-x-2 px-4 py-2 rounded-2xl transition-all duration-500 hover:scale-105 text-sm md:space-x-3 md:px-6 md:py-3 ${
                        activeVideoCategory === category
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-md"
                      }`}
                    >
                      <IconComponent
                        className={`w-4 h-4 transition-transform group-hover:scale-110 md:w-5 md:h-5 ${
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
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
                {videoContent[activeVideoCategory].map((video, index) => (
                  <EnhancedVideoCard
                    key={`${activeVideoCategory}-${index}`}
                    video={video}
                    index={index}
                  />
                ))}
              </div>
            </div>
            <div className="mb-8 md:mb-12">
              <h3 className="text-3xl font-bold text-gray-800 mb-6 md:text-4xl md:mb-8">
                Historical Timeline
              </h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full md:left-8"></div>
                {[
                  {
                    year: "200 BCE",
                    event: "Ajanta Caves begin to be carved",
                    color: "red",
                  },
                  {
                    year: "600 CE",
                    event: "Ellora Caves construction starts",
                    color: "blue",
                  },
                  {
                    year: "800 CE",
                    event: "Kailasa Temple completed in Ellora",
                    color: "green",
                  },
                  {
                    year: "1000 CE",
                    event: "Final phase of Ellora Caves completed",
                    color: "purple",
                  },
                  {
                    year: "1983",
                    event: "Designated UNESCO World Heritage Site",
                    color: "yellow",
                  },
                  {
                    year: "2019",
                    event: "Restoration efforts intensified",
                    color: "pink",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="relative flex items-center mb-6 group md:mb-8"
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-3 border-white shadow-lg bg-${item.color}-500 relative z-10 group-hover:scale-125 transition-transform duration-300 md:w-6 md:h-6 md:border-4`}
                    ></div>
                    <div className="ml-6 bg-white rounded-xl p-4 shadow-lg border border-gray-100 flex-1 group-hover:shadow-2xl transition-all duration-300 md:ml-8 md:p-6">
                      <div className="flex flex-col gap-2 md:items-center md:flex-row md:gap-4">
                        <span
                          className={`text-xl font-bold text-${item.color}-600 md:text-2xl`}
                        >
                          {item.year}
                        </span>
                        <span className="text-gray-700 text-base md:text-lg">
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
        <div className="w-full p-4 md:w-96 md:bg-gradient-to-br md:from-gray-50 md:to-white md:border-l md:border-gray-200 md:p-8 md:sticky md:top-0 md:h-screen md:overflow-y-auto">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-4 mb-6 border border-orange-100 md:p-6 md:mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2 md:text-xl md:mb-4">
              <MapPin className="w-5 h-5 text-red-500 md:w-6 md:h-6" />
              Location & Directions
            </h3>
            <div className="space-y-3 md:space-y-4">
              <div className="bg-white/50 rounded-lg p-2 md:p-3">
                <p className="text-xs text-gray-600 mb-1 md:text-sm">Address</p>
                <p className="font-semibold text-gray-800 text-xs md:text-sm">
                  Ajanta & Ellora Caves, Aurangabad, Maharashtra 431001
                </p>
              </div>
              <div className="relative rounded-lg overflow-hidden border border-orange-200 shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.147647431692!2d75.31011231458627!3d20.025048586508153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd90f4b8b7b7b7b%3A0x5b5b5b5b5b5b5b5b!2sEllora%20Caves!5e0!3m2!1sen!2sin!4v1625123456789!5m2!1sen!2sin"
                  width="100%"
                  height="150"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ajanta & Ellora Caves Location"
                  className="rounded-lg md:h-200"
                ></iframe>
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg px-1 py-0.5 md:top-3 md:right-3 md:px-2 md:py-1">
                  <span className="text-[10px] font-medium text-gray-700 md:text-xs">
                    Interactive Map
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs md:gap-3 md:text-sm">
                <div className="bg-white/50 rounded-lg p-2 md:p-3">
                  <p className="text-gray-600 text-[11px] md:text-xs">
                    Distance from
                  </p>
                  <p className="font-bold text-orange-600">Mumbai: 350km</p>
                </div>
                <div className="bg-white/50 rounded-lg p-2 md:p-3">
                  <p className="text-gray-600 text-[11px] md:text-xs">
                    Aurangabad Airport
                  </p>
                  <p className="font-bold text-orange-600">30km away</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-2 border border-blue-200 md:p-3">
                <p className="text-xs font-medium text-blue-800 flex items-center gap-1 md:text-sm md:gap-2">
                  🚗 Getting There
                </p>
                <p className="text-[11px] text-blue-600 mt-1 md:text-xs">
                  Take NH160 from Mumbai for a scenic 6-hour drive to Aurangabad
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 mb-6 border border-blue-100 md:p-6 md:mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2 md:text-xl md:mb-4">
              <Cloud className="w-5 h-5 text-blue-500 md:w-6 md:h-6" />
              Current Weather in Aurangabad
            </h3>
            {loading ? (
              <div className="flex items-center justify-center py-6 md:py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 md:h-8 md:w-8"></div>
              </div>
            ) : weather ? (
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-space-x-2 md:space-x-3">
                    {getWeatherIcon(weather.weather?.[0]?.main)}
                    <span className="text-2xl font-bold text-gray-800 md:text-3xl">
                      {Math.round(weather.main?.temp)}°C
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600 capitalize md:text-sm">
                      {weather.weather?.[0]?.description}
                    </p>
                    <p className="text-[11px] text-gray-500 md:text-xs">
                      Feels like {Math.round(weather.main?.feels_like)}°C
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs md:gap-4 md:text-sm">
                  <div className="bg-white/50 rounded-lg p-2 md:p-3">
                    <p className="text-gray-600 text-[11px] md:text-xs">
                      Humidity
                    </p>
                    <p className="font-bold text-blue-600">
                      {weather.main?.humidity}%
                    </p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-2 md:p-3">
                    <p className="text-gray-600 text-[11px] md:text-xs">
                      Visibility
                    </p>
                    <p className="font-bold text-blue-600">
                      {weather.visibility
                        ? `${weather.visibility / 1000}km`
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg p-2 border border-orange-200 md:p-3">
                  <p className="text-xs font-medium text-orange-800 md:text-sm">
                    Best photography time
                  </p>
                  <p className="text-[11px] text-orange-600 md:text-xs">
                    Morning: 7:00-9:00 AM for optimal lighting in the caves
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-xs md:text-sm">
                Weather data unavailable
              </p>
            )}
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 mb-6 border border-green-100 md:p-6 md:mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2 md:text-xl md:mb-4">
              <Calendar className="w-5 h-5 text-green-500 md:w-6 md:h-6" />
              Visit Information
            </h3>
            <div className="space-y-3 text-xs md:space-y-4 md:text-sm">
              <div className="flex justify-between items-center py-1 border-b border-green-100 md:py-2">
                <span className="text-gray-600">Today's Date</span>
                <span className="font-semibold text-gray-800">
                  {formatDate()}
                </span>
              </div>
              <div className="bg-white/50 rounded-lg p-3 space-y-2 md:p-4 md:space-y-3">
                <h4 className="font-semibold text-green-800">Opening Hours</h4>
                <div className="space-y-1 text-[11px] md:space-y-2 md:text-xs">
                  <div className="flex justify-between">
                    <span>Daily (except Monday)</span>
                    <span className="font-medium">9:00 AM - 5:30 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monday</span>
                    <span className="font-medium text-red-600">Closed</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/50 rounded-lg p-3 space-y-2 md:p-4 md:space-y-3">
                <h4 className="font-semibold text-green-800">Entry Fees</h4>
                <div className="space-y-1 text-[11px] md:space-y-2 md:text-xs">
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
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-2 border border-purple-200 md:p-3">
                <p className="text-xs font-medium text-purple-800 md:text-sm">
                  💡 Pro Tip
                </p>
                <p className="text-[11px] text-purple-600 mt-1 md:text-xs">
                  Hire a guide to fully appreciate the intricate details of the
                  cave art!
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100 md:p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2 md:text-xl md:mb-4">
              <Sparkles className="w-5 h-5 text-purple-500 md:w-6 md:h-6" />
              Did You Know?
            </h3>
            <div className="space-y-3 md:space-y-4">
              {amazingFacts.map((fact, index) => {
                const IconComponent = fact.icon;
                return (
                  <div
                    key={index}
                    className={`bg-white rounded-lg p-3 border border-gray-100 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                      index === currentFact
                        ? "ring-2 ring-purple-200 shadow-md"
                        : ""
                    } md:p-4`}
                    onClick={() => setCurrentFact(index)}
                  >
                    <div className="flex items-start gap-2 md:gap-3">
                      <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 md:p-2">
                        <IconComponent
                          className={`w-3 h-3 ${fact.color} md:w-4 md:h-4`}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-xs mb-1 md:text-sm">
                          {fact.title}
                        </h4>
                        <p className="text-[11px] text-gray-600 leading-relaxed md:text-xs">
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
  );
};

export default AjantaElloraCaves;
