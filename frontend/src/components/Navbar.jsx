import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setNavDark(scrollTop > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchFestivals = async () => {
    if (notifications.length > 0) return;
    setLoading(true);
    try {
      const currentYear = new Date().getFullYear();
      const response = await fetch(
        `https://calendarific.com/api/v2/holidays?&api_key=${
          import.meta.env.VITE_CALENDARIFIC_API_KEY
        }&country=IN&year=${currentYear}&type=national,religious,observance`
      );
      if (!response.ok) throw new Error("Failed to fetch festivals");
      const data = await response.json();

      const today = new Date();
      const next30Days = new Date();
      next30Days.setDate(today.getDate() + 30);

      const upcomingFestivals = data.response.holidays
        .filter((holiday) => {
          const holidayDate = new Date(holiday.date.iso);
          return holidayDate >= today && holidayDate <= next30Days;
        })
        .sort((a, b) => new Date(a.date.iso) - new Date(b.date.iso))
        .slice(0, 10);

      setNotifications(upcomingFestivals);
      setHasNewNotifications(upcomingFestivals.length > 0);
    } catch (error) {
      console.error("Error fetching festivals:", error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) fetchFestivals();
    if (hasNewNotifications) setHasNewNotifications(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getDaysUntil = (dateString) => {
    const today = new Date();
    const festivalDate = new Date(dateString);
    const diffTime = festivalDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    return `${diffDays} days`;
  };

  const linkTextColor = navDark ? "text-white" : "text-black";

  return (
    <div
      className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-sm ${
        navDark ? "bg-black/90 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-12 py-3 sm:py-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <h1
              className={`text-xl sm:text-2xl lg:text-3xl font-semibold tracking-wide transition-colors duration-300 ${linkTextColor}`}
            >
              Bharat<span className="text-red-600">Darshan</span>
            </h1>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`${linkTextColor} lg:hidden`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Right Side (Desktop) */}
        <div className="hidden lg:flex items-center space-x-5">
          <button
            onClick={handleNotificationClick}
            className={`relative p-2 hover:bg-white/10 rounded-full transition-colors duration-200 ${linkTextColor}`}
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {hasNewNotifications && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </button>

          {/* Admin link always visible; secure the route itself */}
          <Link
            to="/admin"
            className={`hover:opacity-80 transition ${linkTextColor} font-medium`}
          >
            Admin
          </Link>

          <SignedOut>
            {/* Explicit Login page route */}
            <Link
              to="/login"
              className={`flex items-center space-x-1 hover:opacity-80 transition ${linkTextColor} font-medium`}
            >
              <User className="w-5 h-5" />
              <span>Login</span>
            </Link>
            {/* Optional quick modal sign-in */}
            <SignInButton mode="modal">
              <button
                className={`flex items-center space-x-1 hover:opacity-80 transition ${linkTextColor} font-medium`}
              >
                <User className="w-5 h-5" />
                <span>Sign In</span>
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link
              to="/dashboard"
              className={`flex items-center space-x-1 hover:opacity-80 transition ${linkTextColor} font-semibold`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black/90 backdrop-blur-sm px-4 py-4">
          <div className="flex flex-col space-y-4 text-white text-base font-light">
            <button
              onClick={handleNotificationClick}
              className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
              {hasNewNotifications && (
                <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </button>

            {/* Admin link */}
            <Link
              to="/admin"
              className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Admin</span>
            </Link>

            <SignedOut>
              {/* Login page */}
              <Link
                to="/login"
                className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>Login</span>
              </Link>
              {/* Modal sign-in */}
              <SignInButton mode="modal">
                <button className="flex items-center space-x-2 hover:text-gray-300 transition-colors">
                  <User className="w-5 h-5" />
                  <span>Sign In</span>
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <div className="pt-2">
                <UserButton />
              </div>
            </SignedIn>
          </div>
        </div>
      )}

      {/* Notification Dropdown */}
      {showNotifications && (
        <div className="absolute right-0 sm:right-4 mt-2 w-full sm:w-80 max-h-96 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800">
              Upcoming Festivals
            </h3>
            <button
              onClick={() => setShowNotifications(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close notifications"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
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
  );
};

export default Navbar;
