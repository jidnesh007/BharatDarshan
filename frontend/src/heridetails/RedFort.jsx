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

const RedFort = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeVideoCategory, setActiveVideoCategory] = useState("historical");
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [currentFact, setCurrentFact] = useState(0);
  const [visitorsCount, setVisitorsCount] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState("dawn");

  const carouselImages = [
    { url: "/images/redfort1.jpg", title: "Red Fort" },
    { url: "/images/redfort2.jpg", title: "Red Fort" },
    { url: "/images/redfort3.jpg", title: "Red Fort" },
  ];

  const amazingFacts = [
    {
      icon: Crown,
      title: "Mughal Grandeur",
      fact: "The Red Fort was commissioned by Emperor Shah Jahan as the main residence of the Mughal emperors in 1638.",
      color: "text-red-500",
    },
    {
      icon: Heart,
      title: "Architectural Marvel",
      fact: "Built with red sandstone, the fort’s walls stretch over 2.5 km, showcasing Mughal architectural splendor.",
      color: "text-purple-500",
    },
    {
      icon: Sparkles,
      title: "Historical Significance",
      fact: "The fort served as the political and ceremonial center of the Mughal Empire until 1857.",
      color: "text-yellow-500",
    },
    {
      icon: Star,
      title: "Independence Day",
      fact: "India’s Prime Minister hoists the national flag at the Red Fort every Independence Day (August 15).",
      color: "text-blue-500",
    },
    {
      icon: Award,
      title: "UNESCO Heritage",
      fact: "Designated as a UNESCO World Heritage Site in 2007 for its historical and architectural importance.",
      color: "text-green-500",
    },
  ];

  const videoContent = {
    historical: [
      {
        id: "dQw4w9WgXcQ",
        title: "The Rise of the Mughal Empire",
        description:
          "Explore the history of the Red Fort during the peak of Mughal rule",
        duration: "16:20",
        views: "2.3M",
        rating: 4.9,
        category: "Documentary",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Secrets of Red Fort’s Architecture",
        description:
          "Discover the intricate design and construction techniques of the fort",
        duration: "13:10",
        views: "1.9M",
        rating: 4.8,
        category: "Architecture",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "The Last Mughal Emperor",
        description:
          "Learn about Bahadur Shah Zafar and the fall of the Mughal Empire",
        duration: "18:00",
        views: "2.7M",
        rating: 4.9,
        category: "History",
      },
    ],
    cultural: [
      {
        id: "dQw4w9WgXcQ",
        title: "Life in the Mughal Court",
        description:
          "Experience the opulence and traditions of the Mughal royal court",
        duration: "14:00",
        views: "1.6M",
        rating: 4.7,
        category: "Culture",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Art and Craft of Delhi",
        description:
          "Meet artisans preserving Mughal-era crafts around the Red Fort",
        duration: "12:00",
        views: "950K",
        rating: 4.6,
        category: "Craftsmanship",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Festivals at the Red Fort",
        description:
          "Celebrate the vibrant festivals hosted at this historic monument",
        duration: "13:30",
        views: "1.3M",
        rating: 4.8,
        category: "Festivals",
      },
    ],
    music: [
      {
        id: "dQw4w9WgXcQ",
        title: "Sufi Music at the Red Fort",
        description:
          "Soulful Sufi melodies echoing the spiritual heritage of Delhi",
        duration: "24:30",
        views: "2.6M",
        rating: 4.9,
        category: "Sufi Music",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Mughal Court Music",
        description: "Classical ragas performed during the Mughal era",
        duration: "31:00",
        views: "1.8M",
        rating: 4.8,
        category: "Classical",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Folk Songs of Delhi",
        description:
          "Traditional melodies celebrating the city’s rich cultural history",
        duration: "19:00",
        views: "1.2M",
        rating: 4.7,
        category: "Folk Music",
      },
    ],
    mythology: [
      {
        id: "dQw4w9WgXcQ",
        title: "Myths of the Red Fort",
        description:
          "Uncover the legends and mysteries surrounding this iconic fortress",
        duration: "15:45",
        views: "2.4M",
        rating: 4.8,
        category: "Mystery",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Tales of the Peacock Throne",
        description:
          "Explore the legend of the opulent throne housed in the Red Fort",
        duration: "11:30",
        views: "1.6M",
        rating: 4.6,
        category: "Legends",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Spiritual Legacy of the Fort",
        description:
          "The fort’s role in shaping Delhi’s spiritual and cultural identity",
        duration: "20:00",
        views: "1.8M",
        rating: 4.9,
        category: "Spirituality",
      },
    ],
    virtual: [
      {
        id: "dQw4w9WgXcQ",
        title: "360° Virtual Tour of Red Fort",
        description:
          "Immersive virtual reality experience of the fort’s grand halls",
        duration: "27:00",
        views: "4.0M",
        rating: 4.9,
        category: "VR Experience",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Drone Flight Over Red Fort",
        description:
          "Aerial views showcasing the fort’s sprawling architecture",
        duration: "9:15",
        views: "3.2M",
        rating: 4.8,
        category: "Aerial View",
      },
      {
        id: "dQw4w9WgXcQ",
        title: "Time-lapse: Red Fort Through the Day",
        description: "Watch the fort’s red sandstone glow under changing light",
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
    setVisitorsCount(17890);
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
          `https://api.openweathermap.org/data/2.5/weather?q=Delhi,IN&appid=${apiKey}&units=metric`
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
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setHoveredVideo(index)}
      onMouseLeave={() => setHoveredVideo(null)}
    >
      <div className="relative overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-red-400 to-orange-400 flex items-center justify-center">
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
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
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
              : "opacity-0 -translate-y-2"
          }`}
        >
          <button className="bg-white/20 backdrop-blur-sm text-white p-1 rounded-full hover:bg-white/30 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="bg-white/20 backdrop-blur-sm text-white p-1 rounded-full hover:bg-white/30 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2 group-hover:text-red-600 transition-colors">
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
          <button className="text-red-600 hover:text-red-800 font-medium text-xs">
            Watch Now
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Back Button */}
      <button
        onClick={handleBackClick}
        className="fixed top-4 left-4 z-50 bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:scale-105"
      >
        <ArrowLeft className="w-5 h-5 text-gray-700 hover:text-red-600 transition-colors" />
      </button>

      {/* Location Info */}
      <div className="fixed top-4 right-4 z-50 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <MapPin className="w-4 h-4 text-red-500" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-800 block">
              Delhi, India
            </span>
            <span className="text-[10px] text-gray-500 flex items-center gap-1">
              <Users className="w-3 h-3" />
              {visitorsCount.toLocaleString()} visitors
            </span>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[80vh] overflow-hidden">
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
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-red-300 transition-all duration-300 z-20 bg-black/30 backdrop-blur-sm rounded-full p-2 hover:bg-black/50 hover:scale-105"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-red-300 transition-all duration-300 z-20 bg-black/30 backdrop-blur-sm rounded-full p-2 hover:bg-black/50 hover:scale-105"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
        <div className="absolute top-8 sm:top-16 left-4 z-20 max-w-[90%] sm:max-w-md ">
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/20 ">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg mb-2">
              {carouselImages[currentImageIndex].title}
            </h1>
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {carouselImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`group relative transition-all duration-500 ${
                index === currentImageIndex
                  ? "w-8 h-2 bg-white shadow-md"
                  : "w-2 h-2 bg-white/50 hover:bg-white/75"
              } rounded-full overflow-hidden`}
            >
              {index === currentImageIndex && (
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-400 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full bg-gradient-to-br from-white to-gray-50">
        <div className="flex flex-col md:flex-row">
          {/* Main Section */}
          <div className="flex-1 p-4 sm:p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-6 md:mb-8 leading-tight">
                A Fortress of Mughal Power
                <br />
                <span className="text-xl sm:text-2xl md:text-3xl">
                  and Architectural Grandeur
                </span>
              </h2>
              <div className="prose prose-sm sm:prose-base text-gray-700 space-y-4 mb-8">
                <p className="text-base sm:text-lg leading-relaxed">
                  The Red Fort in Delhi, India, stands as a majestic symbol of
                  Mughal power and architectural brilliance. Commissioned by
                  Emperor Shah Jahan in 1638, this red sandstone fortress served
                  as the main residence of Mughal emperors for nearly 200 years.
                </p>
                <p className="text-sm sm:text-base leading-relaxed text-gray-600">
                  Enclosed by towering walls, the fort houses stunning
                  structures like the Diwan-i-Aam, Diwan-i-Khas, and the Pearl
                  Mosque, each showcasing intricate Mughal design. Today, it
                  remains a focal point of India’s cultural and political
                  heritage, hosting the annual Independence Day celebrations.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-4 border border-red-100 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-6 h-6 text-red-600" />
                    <h3 className="font-semibold text-base text-gray-800">
                      Construction
                    </h3>
                  </div>
                  <p className="text-lg font-bold text-red-600 mb-1">
                    1638-1648
                  </p>
                  <p className="text-xs text-gray-600">Mughal Era</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-100 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-6 h-6 text-blue-600" />
                    <h3 className="font-semibold text-base text-gray-800">
                      Artisans
                    </h3>
                  </div>
                  <p className="text-lg font-bold text-blue-600 mb-1">
                    Thousands
                  </p>
                  <p className="text-xs text-gray-600">Skilled craftsmen</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-6 h-6 text-green-600" />
                    <h3 className="font-semibold text-base text-gray-800">
                      Recognition
                    </h3>
                  </div>
                  <p className="text-sm font-bold text-green-600 mb-1">
                    UNESCO Heritage
                  </p>
                  <p className="text-xs text-gray-600">Since 2007</p>
                </div>
              </div>

              {/* Video Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Immersive Experiences
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Volume2 className="w-3 h-3" />
                    <span>Headphones recommended</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto pb-2">
                  {Object.keys(videoContent).map((category) => {
                    const IconComponent = categoryIcons[category];
                    return (
                      <button
                        key={category}
                        onClick={() => setActiveVideoCategory(category)}
                        className={`group flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 shrink-0 ${
                          activeVideoCategory === category
                            ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md"
                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                        }`}
                      >
                        <IconComponent
                          className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                            activeVideoCategory === category
                              ? "text-white"
                              : "text-red-500"
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

              {/* Timeline */}
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                  Historical Timeline
                </h3>
                <div className="relative pl-8">
                  <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-orange-500 rounded-full"></div>
                  {[
                    {
                      year: "1638",
                      event: "Shah Jahan commissions the Red Fort",
                      color: "red",
                    },
                    {
                      year: "1648",
                      event: "Construction of the Red Fort completed",
                      color: "blue",
                    },
                    {
                      year: "1857",
                      event: "British capture the fort during the Sepoy Mutiny",
                      color: "green",
                    },
                    {
                      year: "1947",
                      event: "First Independence Day flag hoisting",
                      color: "purple",
                    },
                    {
                      year: "2003",
                      event: "Indian Army hands over control to ASI",
                      color: "yellow",
                    },
                    {
                      year: "2007",
                      event: "Designated UNESCO World Heritage Site",
                      color: "orange",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="relative flex items-center mb-6 group"
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 border-white shadow-md bg-${item.color}-500 z-10 group-hover:scale-125 transition-transform duration-300`}
                      ></div>
                      <div className="ml-4 bg-white rounded-lg p-3 shadow-sm border border-gray-100 flex-1 group-hover:shadow-md transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <span
                            className={`text-lg font-semibold text-${item.color}-600`}
                          >
                            {item.year}
                          </span>
                          <span className="text-sm text-gray-700">
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

          {/* Sidebar */}
          <div className="w-full md:w-80 bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 md:sticky md:top-0 md:h-screen md:overflow-y-auto">
            {/* Location & Directions */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-4 mb-4 border border-red-100">
              <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-500" />
                Location & Directions
              </h3>
              <div className="space-y-3">
                <div className="bg-white/50 rounded p-2">
                  <p className="text-xs text-gray-600 mb-1">Address</p>
                  <p className="font-semibold text-xs text-gray-800">
                    Netaji Subhash Marg, Chandni Chowk, New Delhi, Delhi 110006
                  </p>
                </div>
                <div className="relative rounded overflow-hidden border border-red-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.664219948354!2d77.2388263146237!3d28.656159982407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd1a1b7b4f4b%3A0x9c5b3f9f9f9f9f9f!2sRed%20Fort!5e0!3m2!1sen!2sin!4v1625123456789!5m2!1sen!2sin"
                    width="100%"
                    height="150"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Red Fort Location"
                    className="rounded"
                  ></iframe>
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded px-1 py-0.5">
                    <span className="text-[10px] font-medium text-gray-700">
                      Interactive Map
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white/50 rounded p-2">
                    <p className="text-gray-600 text-[10px]">Distance from</p>
                    <p className="font-semibold text-red-600">
                      Connaught Place: 3km
                    </p>
                  </div>
                  <div className="bg-white/50 rounded p-2">
                    <p className="text-gray-600 text-[10px]">Delhi Airport</p>
                    <p className="font-semibold text-red-600">20km away</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded p-2 border border-blue-200">
                  <p className="text-xs font-medium text-blue-800 flex items-center gap-1">
                    🚗 Getting There
                  </p>
                  <p className="text-[10px] text-blue-600 mt-1">
                    Easily accessible via Delhi Metro (Chandni Chowk station)
                  </p>
                </div>
              </div>
            </div>

            {/* Weather */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 mb-4 border border-blue-100">
              <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Cloud className="w-5 h-5 text-blue-500" />
                Current Weather
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
                      <p className="text-gray-600 text-[10px]">Humidity</p>
                      <p className="font-semibold text-blue-600">
                        {weather.main?.humidity}%
                      </p>
                    </div>
                    <div className="bg-white/50 rounded p-2">
                      <p className="text-gray-600 text-[10px]">Visibility</p>
                      <p className="font-semibold text-blue-600">
                        {weather.visibility
                          ? `${weather.visibility / 1000}km`
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded p-2 border border-orange-200">
                    <p className="text-xs font-medium text-orange-800">
                      Best photography time
                    </p>
                    <p className="text-[10px] text-orange-600">
                      Early morning: 6:30-7:30 AM for soft lighting
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-500">
                  Weather data unavailable
                </p>
              )}
            </div>

            {/* Visit Information */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 mb-4 border border-green-100">
              <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-500" />
                Visit Information
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-green-100">
                  <span className="text-gray-600">Today's Date</span>
                  <span className="font-semibold text-gray-800">
                    {formatDate()}
                  </span>
                </div>
                <div className="bg-white/50 rounded p-3 space-y-2">
                  <h4 className="font-semibold text-green-800 text-xs">
                    Opening Hours
                  </h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Sunrise to Sunset</span>
                      <span className="font-medium">6:00 AM - 5:30 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monday</span>
                      <span className="font-medium text-red-600">Closed</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/50 rounded p-3 space-y-2">
                  <h4 className="font-semibold text-green-800 text-xs">
                    Entry Fees
                  </h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Indian Citizens</span>
                      <span className="font-medium">₹35</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Foreign Tourists</span>
                      <span className="font-medium">₹550</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SAARC/BIMSTEC</span>
                      <span className="font-medium">₹35</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded p-2 border border-red-200">
                  <p className="text-xs font-medium text-red-800">💡 Pro Tip</p>
                  <p className="text-[10px] text-red-600 mt-1">
                    Visit in the evening for the Red Fort Sound and Light Show!
                  </p>
                </div>
              </div>
            </div>

            {/* Did You Know */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-4 border border-red-100">
              <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-red-500" />
                Did You Know?
              </h3>
              <div className="space-y-3">
                {amazingFacts.map((fact, index) => {
                  const IconComponent = fact.icon;
                  return (
                    <div
                      key={index}
                      className={`bg-white rounded p-3 border border-gray-100 transition-all duration-300 cursor-pointer hover:shadow-md ${
                        index === currentFact
                          ? "ring-1 ring-red-200 shadow-sm"
                          : ""
                      }`}
                      onClick={() => setCurrentFact(index)}
                    >
                      <div className="flex items-start gap-2">
                        <div className="p-1.5 rounded bg-gradient-to-br from-red-100 to-orange-100">
                          <IconComponent className={`w-4 h-4 ${fact.color}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-xs text-gray-800 mb-1">
                            {fact.title}
                          </h4>
                          <p className="text-[10px] text-gray-600 leading-relaxed">
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

export default RedFort;
