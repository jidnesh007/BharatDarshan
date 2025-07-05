import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Search,
  User,
  Heart,
  LayoutDashboard,
  Bell,
  X,
  Calendar,
  MapPin,
} from "lucide-react";
import {
  SignedOut,
  SignedIn,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const [navDark, setNavDark] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setNavDark(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fetch festivals and events from Calendarific API
  const fetchFestivals = async () => {
    if (notifications.length > 0) return; // Don't fetch if already loaded

    setLoading(true);
    try {
      const currentYear = new Date().getFullYear();
      const response = await fetch(
        `https://calendarific.com/api/v2/holidays?&api_key=${
          import.meta.env.VITE_CALENDARIFIC_API_KEY
        }&country=IN&year=${currentYear}&type=national,religious,observance`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch festivals");
      }

      const data = await response.json();

      // Filter upcoming festivals (next 30 days)
      const today = new Date();
      const next30Days = new Date();
      next30Days.setDate(today.getDate() + 30);

      const upcomingFestivals = data.response.holidays
        .filter((holiday) => {
          const holidayDate = new Date(holiday.date.iso);
          return holidayDate >= today && holidayDate <= next30Days;
        })
        .sort((a, b) => new Date(a.date.iso) - new Date(b.date.iso))
        .slice(0, 10); // Limit to 10 notifications

      setNotifications(upcomingFestivals);
      setHasNewNotifications(upcomingFestivals.length > 0);
    } catch (error) {
      console.error("Error fetching festivals:", error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle notification button click
  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      fetchFestivals();
    }
    if (hasNewNotifications) {
      setHasNewNotifications(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Get days until festival
  const getDaysUntil = (dateString) => {
    const today = new Date();
    const festivalDate = new Date(dateString);
    const diffTime = festivalDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    return `${diffDays} days`;
  };

  return (
    <div
      className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-sm bg-white/5 ${
        navDark ? "bg-black/90 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 lg:px-12 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <h1
              className={`text-2xl lg:text-3xl font-semibold tracking-wide transition-colors duration-300  ${
                navDark ? "text-black" : "text-black"
              }`}
            >
              Bharat
              <span className="text-2xl text-red-600 lg:text-3xl font-semibold tracking-wide ">
                Darshan
              </span>
            </h1>
          </Link>
        </div>

        {/* Center Navigation */}
        <div
          className={`hidden lg:flex items-center space-x-8 text-base font-light transition-colors duration-300 ${
            navDark ? "text-white" : "text-white"
          }`}
        ></div>

        {/* Right side icons */}
        <div
          className={`flex items-center space-x-4 transition-colors duration-300 ${
            navDark ? "text-white" : "text-white"
          }`}
        >
          {/* Notification Button */}
          <div className="relative">
            <button
              onClick={handleNotificationClick}
              className="relative p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
            >
              <Bell className="w-5 h-5" />
              {hasNewNotifications && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Upcoming Festivals
                  </h3>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Notifications Content */}
                <div className="max-h-80 overflow-y-auto">
                  {loading ? (
                    <div className="flex items-center justify-center p-8">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div>
                      <span className="ml-2 text-gray-600">Loading...</span>
                    </div>
                  ) : notifications.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                      {notifications.map((festival, index) => (
                        <div
                          key={index}
                          className="p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-red-600" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {festival.name}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatDate(festival.date.iso)}
                              </p>
                              <p className="text-xs text-red-600 font-medium mt-1">
                                {getDaysUntil(festival.date.iso)}
                              </p>
                              {festival.description && (
                                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                  {festival.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-gray-500">
                      <Calendar className="w-12 h-12 mb-2 text-gray-300" />
                      <p className="text-sm">No upcoming festivals found</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Check back later for updates
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <SignedOut>
            <SignInButton />
          </SignedOut>

          <SignedIn>
            <Link to="/dashboard">
              <button className="flex items-center space-x-1 hover:text-gray-400 transition-colors text-black text-2xl lg:text-2xl font-semibold gap-2.5">
                <LayoutDashboard className="w-6 h-6" />
                <span>Dashboard</span>
              </button>
            </Link>
          </SignedIn>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
