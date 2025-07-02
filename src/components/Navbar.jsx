import React from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Search,
  User,
  Heart,
  LayoutDashboard,
} from "lucide-react";
import {
  SignedOut,
  SignedIn,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = ({ navDark = false }) => {
  return (
    <div
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        navDark
          ? "bg-black/90 backdrop-blur-sm text-black shadow-lg"
          : "bg-transparent text-white"
      }`}
    >
      <div className="flex items-center justify-between px-6 lg:px-12 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <h1
            className={`text-2xl lg:text-3xl font-light tracking-wide transition-colors duration-300 ${
              navDark ? "text-white" : "text-white"
            }`}
          >
            Bharat
            <span className="text-2xl text-red-500 lg:text-3xl font-light tracking-wide">
              Darshan
            </span>
          </h1>
        </div>

        {/* Center Navigation */}
        <div
          className={`hidden lg:flex items-center space-x-8 text-base font-light transition-colors duration-300 ${
            navDark ? "text-white" : "text-white"
          }`}
        >
          <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-300 transition-colors">
            <span>Destinations</span>
            <ChevronRight className="w-4 h-4 rotate-90" />
          </div>
          <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-300 transition-colors">
            <span>Experiences</span>
            <ChevronRight className="w-4 h-4 rotate-90" />
          </div>
          <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-300 transition-colors">
            <span>Plan your trip</span>
            <ChevronRight className="w-4 h-4 rotate-90" />
          </div>
        </div>

        {/* Right side icons */}
        <div
          className={`flex items-center space-x-4 transition-colors duration-300 ${
            navDark ? "text-white" : "text-white"
          }`}
        >
          <Search className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" />
          <User className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" />
          <Heart className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" />

          <SignedOut>
            <SignInButton />
          </SignedOut>

          <SignedIn>
            <Link to="/dashboard">
              <button className="flex items-center space-x-1 hover:text-gray-300 transition-colors">
                <LayoutDashboard className="w-5 h-5" />
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
