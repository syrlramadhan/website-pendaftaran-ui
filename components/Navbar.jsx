"use client";

import { useTheme } from "@/context/ThemeContext";
import { FaBuilding, FaTwitter, FaFacebook, FaInstagram, FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 min-w-full ${
        isScrolled
          ? `backdrop-blur-sm ${
              isDarkMode ? "bg-gray-800/50" : "bg-white/50"
            } shadow-lg`
          : isDarkMode
          ? "bg-gray-900"
          : "bg-blue-700"
      } z-50 transition-all duration-300`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <FaBuilding
                className={`h-8 w-8 ${
                  isScrolled
                    ? isDarkMode
                      ? "text-gray-200"
                      : "text-gray-800"
                    : isDarkMode
                    ? "text-gray-200"
                    : "text-white"
                }`}
              />
              <span
                className={`ml-2 hidden text-xl font-bold ${
                  isScrolled
                    ? isDarkMode
                      ? "text-gray-200"
                      : "text-gray-800"
                    : isDarkMode
                    ? "text-gray-200"
                    : "text-white"
                } md:block`}
              >
                MakassarProperty
              </span>
            </Link>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className={`rounded-full p-2 ${
                isScrolled
                  ? isDarkMode
                    ? "text-gray-200 hover:bg-gray-700"
                    : "text-gray-800 hover:bg-gray-200"
                  : isDarkMode
                  ? "text-gray-200 hover:bg-gray-700"
                  : "text-white hover:bg-blue-600"
              } focus:outline-none focus:ring-2 focus:ring-white`}
              aria-label="Toggle mobile menu"
            >
              <FaBars className="h-6 w-6" />
            </button>
          </div>

          {/* Social Media Icons and Dark Mode Toggle (Hidden on Mobile, Popup on Click) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-full p-2 ${
                isScrolled
                  ? isDarkMode
                    ? "text-gray-200 hover:bg-gray-700"
                    : "text-gray-800 hover:bg-gray-200"
                  : isDarkMode
                  ? "text-gray-200 hover:bg-gray-700"
                  : "text-white hover:bg-blue-600"
              } focus:outline-none focus:ring-2 focus:ring-white`}
            >
              <span className="sr-only">Twitter</span>
              <FaTwitter className="h-6 w-6" />
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-full p-2 ${
                isScrolled
                  ? isDarkMode
                    ? "text-gray-200 hover:bg-gray-700"
                    : "text-gray-800 hover:bg-gray-200"
                  : isDarkMode
                  ? "text-gray-200 hover:bg-gray-700"
                  : "text-white hover:bg-blue-600"
              } focus:outline-none focus:ring-2 focus:ring-white`}
            >
              <span className="sr-only">Facebook</span>
              <FaFacebook className="h-6 w-6" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-full p-2 ${
                isScrolled
                  ? isDarkMode
                    ? "text-gray-200 hover:bg-gray-700"
                    : "text-gray-800 hover:bg-gray-200"
                  : isDarkMode
                  ? "text-gray-200 hover:bg-gray-700"
                  : "text-white hover:bg-blue-600"
              } focus:outline-none focus:ring-2 focus:ring-white`}
            >
              <span className="sr-only">Instagram</span>
              <FaInstagram className="h-6 w-6" />
            </Link>
            <button
              onClick={toggleTheme}
              className={`rounded-full p-2 ${
                isScrolled
                  ? isDarkMode
                    ? "text-gray-200 hover:bg-gray-700"
                    : "text-gray-800 hover:bg-gray-200"
                  : isDarkMode
                  ? "text-gray-200 hover:bg-gray-700"
                  : "text-white hover:bg-blue-600"
              } focus:outline-none focus:ring-2 focus:ring-white`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <FaSun className="h-6 w-6" /> : <FaMoon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Popup */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden fixed inset-0 bg-gray-900 bg-opacity-95 z-50 flex flex-col items-center justify-center space-y-6 p-4 transition-opacity duration-300 ${
              isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <button
              onClick={toggleMobileMenu}
              className="absolute top-4 right-4 text-white text-2xl focus:outline-none"
              aria-label="Close mobile menu"
            >
              <FaTimes />
            </button>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl hover:text-gray-300 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <FaTwitter className="inline mr-2" /> Twitter
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl hover:text-gray-300 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <FaFacebook className="inline mr-2" /> Facebook
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl hover:text-gray-300 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <FaInstagram className="inline mr-2" /> Instagram
            </Link>
            <button
              onClick={() => {
                toggleTheme();
                toggleMobileMenu();
              }}
              className="text-white text-2xl hover:text-gray-300 focus:outline-none flex items-center"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <FaSun className="inline mr-2" /> : <FaMoon className="inline mr-2" />}
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;