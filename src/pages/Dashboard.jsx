import React, { useState } from "react";
import {
  Shield,
  Languages,
  Camera,
  Clock,
  Leaf,
  Menu,
  X,
  ChevronRight,
  MapPin,
  Users,
  TrendingUp,
  Award,
} from "lucide-react";
import Navbar from "../components/Navbar";
import MultiLanguage from "../components/MultilingualAudioApp";
// Import the MultiLanguage component

const Dashboard = () => {
  const [activeFeature, setActiveFeature] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const features = [
    {
      id: "scam-detection",
      name: "Scam Detection",
      icon: Shield,
      description: "Travel & ticket fraud protection",
      color: "bg-red-500",
      gradient: "from-red-500 to-red-600",
    },
    {
      id: "multilingual",
      name: "Multi-Language AI",
      icon: Languages,
      description: "Text ↔ Audio conversion",
      color: "bg-blue-500",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      id: "image-detection",
      name: "Heritage Scanner",
      icon: Camera,
      description: "AI-powered site recognition",
      color: "bg-purple-500",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      id: "time-travel",
      name: "Time-Travel Mode",
      icon: Clock,
      description: "Historical reconstruction",
      color: "bg-amber-500",
      gradient: "from-amber-500 to-amber-600",
    },
    {
      id: "carbon-tracker",
      name: "Carbon Tracker",
      icon: Leaf,
      description: "Eco-tourism insights",
      color: "bg-green-500",
      gradient: "from-green-500 to-green-600",
    },
  ];

  const stats = [
    {
      label: "Heritage Sites Scanned",
      value: "12,847",
      icon: MapPin,
      change: "+12%",
    },
    { label: "Active Users", value: "89,234", icon: Users, change: "+8%" },
    {
      label: "Carbon Saved (tons)",
      value: "2,156",
      icon: Leaf,
      change: "+15%",
    },
    {
      label: "Languages Supported",
      value: "47",
      icon: Languages,
      change: "+3%",
    },
  ];

  const recentActivity = [
    {
      site: "Taj Mahal",
      action: "Time-travel analysis",
      time: "2 min ago",
      image:
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=100&h=100&fit=crop",
    },
    {
      site: "Colosseum",
      action: "Carbon footprint calculated",
      time: "5 min ago",
      image:
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=100&h=100&fit=crop",
    },
    {
      site: "Machu Picchu",
      action: "Heritage scan completed",
      time: "8 min ago",
      image:
        "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=100&h=100&fit=crop",
    },
    {
      site: "Petra",
      action: "Audio guide generated",
      time: "12 min ago",
      image:
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=100&h=100&fit=crop",
    },
  ];

  const FeatureCard = ({ feature, isActive, onClick }) => {
    const IconComponent = feature.icon;
    return (
      <div
        onClick={onClick}
        className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
          isActive
            ? `bg-gradient-to-r ${feature.gradient} text-white shadow-lg shadow-${feature.color}/30`
            : "bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
        }`}
      >
        <div className="flex items-center space-x-3">
          <div
            className={`p-2 rounded-lg ${
              isActive ? "bg-white/20" : feature.color
            }`}
          >
            <IconComponent
              className={`w-5 h-5 ${isActive ? "text-white" : "text-white"}`}
            />
          </div>
          <div className="flex-1">
            <h3
              className={`font-semibold text-sm ${
                isActive ? "text-white" : "text-gray-800"
              }`}
            >
              {feature.name}
            </h3>
            <p
              className={`text-xs ${
                isActive ? "text-white/80" : "text-gray-600"
              }`}
            >
              {feature.description}
            </p>
          </div>
          <ChevronRight
            className={`w-4 h-4 transition-transform ${
              isActive
                ? "text-white rotate-90"
                : "text-gray-400 group-hover:translate-x-1"
            }`}
          />
        </div>
      </div>
    );
  };

  const StatCard = ({ stat }) => {
    const IconComponent = stat.icon;
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {stat.value}
            </p>
            <p className="text-green-600 text-xs font-medium mt-1">
              {stat.change} vs last month
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-lg">
            <IconComponent className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      {/* <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Heritage AI
                </h1>
                <p className="text-xs text-gray-600">Smart Tourism Platform</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-700">AI Systems Online</span>
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"></div>
          </div>
        </div>
      </header> */}
      <header className="bg-white/80 backdrop-blur-lg  sticky top-0 z-40 ">
        <div className="flex items-center justify-between px-6 py-4 bg-neutral-600 h-16">
          <Navbar />
        </div>
      </header>
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-80" : "w-0"
          } lg:w-80 transition-all duration-300 overflow-hidden`}
        >
          <div className="h-screen bg-white/50 backdrop-blur-lg border-r border-gray-200 p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-semibold text-gray-800">
                AI Features
              </h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <FeatureCard
                feature={{
                  id: "overview",
                  name: "Dashboard Overview",
                  icon: TrendingUp,
                  description: "Analytics & insights",
                  color: "bg-gray-500",
                  gradient: "from-gray-500 to-gray-600",
                }}
                isActive={activeFeature === "overview"}
                onClick={() => setActiveFeature("overview")}
              />
              {features.map((feature) => (
                <FeatureCard
                  key={feature.id}
                  feature={feature}
                  isActive={activeFeature === feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                />
              ))}
            </div>

            <div className="mt-8 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
              <h3 className="font-semibold text-sm mb-2">🚀 Pro Tip</h3>
              <p className="text-xs text-white/90">
                Use Heritage Scanner with Time-Travel Mode for the most
                immersive experience!
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeFeature === "overview" ? (
            <div className="space-y-6">
              {/* Hero Section */}
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl text-white p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-4">
                    Welcome to Heritage AI Dashboard
                  </h2>
                  <p className="text-white/90 mb-6 max-w-2xl">
                    Discover the future of cultural tourism with AI-powered
                    heritage exploration, fraud protection, and sustainable
                    travel insights.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="bg-white/20 backdrop-blur-lg px-6 py-3 rounded-lg hover:bg-white/30 transition-colors">
                      Start Exploring
                    </button>
                    <button className="border border-white/30 px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
                      Watch Demo
                    </button>
                  </div>
                </div>
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <StatCard key={index} stat={stat} />
                ))}
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Recent AI Activity
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Latest heritage site analyses and interactions
                  </p>
                </div>
                <div className="divide-y divide-gray-100">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={activity.image}
                          alt={activity.site}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">
                            {activity.site}
                          </p>
                          <p className="text-sm text-gray-600">
                            {activity.action}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {activity.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Advanced Fraud Detection
                  </h3>
                  <p className="text-gray-600 text-sm">
                    AI-powered protection against travel scams, fake tickets,
                    and fraudulent tourism services.
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-4">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Time-Travel Experience
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Witness historical sites as they appeared centuries ago
                    through AI reconstruction.
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                    <Leaf className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Sustainable Tourism
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Track carbon footprint and promote eco-friendly practices
                    for responsible heritage tourism.
                  </p>
                </div>
              </div>
            </div>
          ) : activeFeature === "multilingual" ? (
            <MultiLanguage /> // Render MultiLanguage component
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                {React.createElement(
                  features.find((f) => f.id === activeFeature)?.icon ||
                    TrendingUp,
                  {
                    className: "w-12 h-12 text-white",
                  }
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {features.find((f) => f.id === activeFeature)?.name ||
                  "Feature"}{" "}
                Component
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                This feature component will be implemented here. The main
                dashboard provides the navigation and layout structure for your
                specialized AI components.
              </p>
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12">
                <p className="text-gray-500 text-lg">
                  {activeFeature.charAt(0).toUpperCase() +
                    activeFeature.slice(1).replace("-", " ")}{" "}
                  Component Goes Here
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Create your separate component and integrate it here
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
