import React, { useState, useEffect, useRef } from "react";
import {
  Shield,
  Languages,
  Camera,
  Clock,
  Leaf,
  Menu,
  MapPin,
  Calendar,
  Thermometer,
  Droplets,
  Wind,
  Cloud,
  CloudRain,
  CloudSnow,
  X,
  ChevronRight,
  Users,
  TrendingUp,
  Award,
  Globe,
  Compass,
  Star,
  Activity,
  Bell,
  Search,
  Filter,
  Heart,
  Share,
  Download,
  PlayCircle,
  Pause,
  Volume2,
  VolumeX,
  Zap,
  Eye,
  TreePine,
  Sparkles,
  Crown,
  Gem,
  Sun,
  Moon,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  EarOff,
} from "lucide-react";

// Import all feature components
import ScamDetection from "../components/ScammDetector";
import MultiLanguage from "../components/MultilingualAudioApp";
import HeritageScanner from "../components/HeriInfo";
import TimeTravel from "../components/TImeTravel";
import CarbonTracker from "../components/CarbonTracker";
import Deaf from "../components/Deaf";
import Navbar from "../components/Navbar";
import Map from "../components/Map"
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Dashboard = () => {
  const [activeFeature, setActiveFeature] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState(3);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      id: "scam-detection",
      name: "Scam Guardian",
      icon: Shield,
      description: "AI fraud protection",
      color: "from-red-500 to-orange-500",
      pattern: "🛡",
      heritage: "Protects like ancient guardians",
      component: ScamDetection,
    },
    {
      id: "multilingual",
      name: "Sage Translator",
      icon: Languages,
      description: "Multi-language wisdom",
      color: "from-blue-500 to-indigo-600",
      pattern: "🗣",
      heritage: "Speaks in ancient tongues",
      component: MultiLanguage,
    },
    {
      id: "heritage-scanner",
      name: "Vision Darshan",
      icon: Camera,
      description: "Sacred site recognition",
      color: "from-purple-500 to-pink-500",
      pattern: "👁",
      heritage: "Sees beyond the visible",
      component: HeritageScanner,
    },
    {
      id: "time-travel",
      name: "Kaal Yatra",
      icon: Clock,
      description: "Journey through time",
      color: "from-amber-500 to-yellow-500",
      pattern: "⏳",
      heritage: "Witness history unfold",
      component: TimeTravel,
    },
    {
      id: "carbon-tracker",
      name: "Prakriti Monitor",
      icon: Leaf,
      description: "Nature's balance keeper",
      color: "from-green-500 to-emerald-500",
      pattern: "🌿",
      heritage: "Harmony with Mother Earth",
      component: CarbonTracker,
    },
    
  ];

  const stats = [
    {
      label: "Heritage Sites Explored",
      value: "2,847",
      icon: MapPin,
      change: "+23%",
      color: "from-orange-400 to-red-500",
      description: "Sacred places discovered",
    },
    {
      label: "Cultural Travelers",
      value: "1,89,234",
      icon: Users,
      change: "+18%",
      color: "from-blue-400 to-indigo-500",
      description: "Seekers of wisdom",
    },
    {
      label: "Carbon Saved (tons)",
      value: "5,156",
      icon: TreePine,
      change: "+31%",
      color: "from-green-400 to-emerald-500",
      description: "Nature preserved",
    },
    {
      label: "Languages Mastered",
      value: "108",
      icon: Languages,
      change: "+12%",
      color: "from-purple-400 to-pink-500",
      description: "Voices of the world",
    },
  ];

  const recentActivity = [
    {
      site: "Taj Mahal",
      action: "Time-travel meditation completed",
      time: "2 min ago",
      image:
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=100&h=100&fit=crop",
      status: "success",
      heritage: "Eternal love witnessed",
    },
    {
      site: "Hampi Ruins",
      action: "Heritage scan analyzing ancient script",
      time: "8 min ago",
      image:
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=100&h=100&fit=crop",
      status: "processing",
      heritage: "Vijayanagara secrets revealed",
    },
    {
      site: "Khajuraho Temples",
      action: "Cultural guide activated",
      time: "15 min ago",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop",
      status: "success",
      heritage: "Divine artistry explained",
    },
    {
      site: "Ajanta Caves",
      action: "Scam alert - fake guide detected",
      time: "22 min ago",
      image:
        "https://images.unsplash.com/photo-1601115177090-bfbae27d9da8?w=100&h=100&fit=crop",
      status: "warning",
      heritage: "Buddha's teachings protected",
    },
  ];

  const FeatureCard = ({ feature, isActive, onClick }) => {
    const IconComponent = feature.icon;
    return (
      <div
        onClick={onClick}
        className={`group relative p-5 rounded-2xl cursor-pointer transition-all duration-500 transform hover:scale-105 ${
          isActive
            ? `bg-gradient-to-br ${feature.color} text-white shadow-2xl shadow-black/20`
            : "bg-white/70 backdrop-blur-md hover:bg-white/80 border border-white/50 hover:border-white/80"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4">
            <div
              className={`p-3 rounded-xl ${
                isActive ? "bg-white/20" : `bg-gradient-to-br ${feature.color}`
              } relative overflow-hidden`}
            >
              <IconComponent
                className={`w-6 h-6 ${isActive ? "text-white" : "text-white"}`}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
            </div>
            <div className="flex-1">
              <h3
                className={`font-bold text-sm ${
                  isActive ? "text-white" : "text-gray-800"
                }`}
              >
                {feature.name}
              </h3>
              <p
                className={`text-xs ${
                  isActive ? "text-white/90" : "text-gray-600"
                }`}
              >
                {feature.description}
              </p>
              <p
                className={`text-xs mt-1 font-medium ${
                  isActive ? "text-white/80" : "text-gray-500"
                }`}
              >
                {feature.heritage}
              </p>
            </div>
            <div className="text-2xl">{feature.pattern}</div>
          </div>
        </div>
      </div>
    );
  };

  const StatCard = ({ stat }) => {
    const IconComponent = stat.icon;
    return (
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">
                {stat.value}
              </p>
              <p className="text-green-600 text-xs font-bold mt-1">
                {stat.change} vs last month
              </p>
              <p className="text-gray-500 text-xs mt-1 italic">
                {stat.description}
              </p>
            </div>
            <div
              className={`bg-gradient-to-br ${stat.color} p-4 rounded-xl shadow-lg`}
            >
              <IconComponent className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  
  

  // Function to render the active feature component
  const renderActiveFeature = () => {
    if (activeFeature === "overview") {
      return (
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-orange-600 via-red-600 via-pink-600 to-purple-600 rounded-3xl text-white p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <Crown className="w-8 h-8" />
                <h2 className="text-4xl font-bold">नमस्ते Heritage Explorer</h2>
              </div>
              <p className="text-white/90 mb-8 max-w-3xl text-lg leading-relaxed">
                Embark on a divine journey through India's sacred heritage with
                AI-powered darshan, cultural wisdom, and protection from digital
                deception.
                <span className="font-semibold italic">
                  {" "}
                  "वसुधैव कुटुम्बकम्" - The world is one family.
                </span>
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white/20 backdrop-blur-lg px-8 py-4 rounded-2xl hover:bg-white/30 transition-all duration-300 font-bold flex items-center space-x-2">
                  <Compass className="w-5 h-5" />
                  <span>Begin Sacred Journey</span>
                </button>
                <button className="border border-white/30 px-8 py-4 rounded-2xl hover:bg-white/10 transition-all duration-300 font-bold flex items-center space-x-2">
                  <PlayCircle className="w-5 h-5" />
                  <span>Watch Divine Demo</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>

          {/* Multimedia & Activity Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <WeatherCard />

            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/50 overflow-hidden">
              <div className="h-150">
                <Map />
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                🛡 Scam Guardian Shield
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                AI-powered protection against travel frauds, fake tickets, and
                deceptive guides. Your digital{" "}
                <span className="font-semibold">Hanuman</span> protecting your
                sacred journey.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                ⏳ Kaal Yatra Time Portal
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Witness heritage sites in their golden age through AI
                reconstruction. Experience{" "}
                <span className="font-semibold">Dwapara Yuga</span> through
                divine vision.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <TreePine className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                🌿 Prakriti Seva Tracker
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Monitor your carbon footprint and embrace sustainable{" "}
                <span className="font-semibold">dharmic</span> tourism. Honor{" "}
                <span className="font-semibold">Prithvi Mata</span> with every
                step.
              </p>
            </div>
          </div>

          {/* Cultural Quotes Section */}
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 text-center">
              <Gem className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <blockquote className="text-2xl font-bold mb-4 italic">
                "यत्र नार्यस्तु पूज्यन्ते रमन्ते तत्र देवताः"
              </blockquote>
              <p className="text-white/90 text-lg mb-2">
                "Where women are honored, there the gods are pleased"
              </p>
              <p className="text-white/70 text-sm">
                - Manusmriti | Celebrating inclusive heritage tourism
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Find the active feature and render its component
    const activeFeatureData = features.find((f) => f.id === activeFeature);
    if (activeFeatureData && activeFeatureData.component) {
      const FeatureComponent = activeFeatureData.component;
      return <FeatureComponent />;
    }

    // Fallback for any features without components
    return (
      <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/50 p-12 text-center">
        <div className="w-32 h-32 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
          {React.createElement(activeFeatureData?.icon || TrendingUp, {
            className: "w-16 h-16 text-white",
          })}
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {activeFeatureData?.name || "Feature"}
          {activeFeatureData?.pattern}
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          {activeFeatureData?.heritage || "Coming soon..."}
        </p>
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="w-6 h-6 text-orange-500" />
              <h3 className="text-xl font-bold text-gray-800">
                Feature in Development
              </h3>
            </div>
            <p className="text-gray-600 text-center leading-relaxed">
              This sacred digital feature is being crafted with divine
              precision. Our AI gurus are infusing ancient wisdom with modern
              technology to create an enlightening experience for heritage
              explorers.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                <div
                  className="w-3 h-3 bg-red-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-3 h-3 bg-pink-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => setActiveFeature("overview")}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-bold flex items-center space-x-2"
          >
            <ChevronRight className="w-5 h-5" />
            <span>Return to Dashboard</span>
          </button>
          <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300 font-bold flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Notify When Ready</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 via-pink-50 to-purple-100 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-200/30 to-red-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl"></div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-white/50 top-0 sticky z-50">
        <div className="bg-black h-18 sticky z-999">
          <Navbar />
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-80" : "w-20"
          } bg-white/80 backdrop-blur-lg border-r border-white/50 min-h-screen transition-all duration-300 relative z-30`}
        >
          <div className="p-6 space-y-6">
            {/* Navigation */}
            <div className="space-y-3">
              <button
                onClick={() => setActiveFeature("overview")}
                className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 ${
                  activeFeature === "overview"
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                    : "hover:bg-white/50 text-gray-700"
                }`}
              >
                <Globe className="w-5 h-5" />
                {sidebarOpen && <span className="font-medium">Overview</span>}
              </button>

              {features.map((feature) => (
                <FeatureCard
                  key={feature.id}
                  feature={feature}
                  isActive={activeFeature === feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                />
              ))}
            </div>

            {/* Quick Actions */}
            {sidebarOpen && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-800">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-white/50 text-gray-700 transition-colors">
                    <Search className="w-4 h-4" />
                    <span className="text-sm">Search Heritage</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-white/50 text-gray-700 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">Saved Places</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-white/50 text-gray-700 transition-colors">
                    <Share className="w-4 h-4" />
                    <span className="text-sm">Share Journey</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">{renderActiveFeature()}</main>
      </div>
    </div>
  );
};

export default Dashboard;
