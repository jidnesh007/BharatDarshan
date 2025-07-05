import React, { useState, useEffect } from "react";
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

const Navbar = () => {
  const [navDark, setNavDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // Change navbar style when scrolled more than 50px
      setNavDark(scrollTop > 50);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
