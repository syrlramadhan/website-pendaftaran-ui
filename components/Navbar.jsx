"use client";

import { useTheme } from "@/context/ThemeContext";
import { FaTwitter, FaFacebook, FaInstagram, FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
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
      className={`fixed top-0 left-0 min-w-full ${isScrolled
          ? `backdrop-blur-sm ${isDarkMode ? "bg-gray-800/50" : "bg-red-600/50"} shadow-lg`
          : isDarkMode
            ? "bg-gray-900"
            : "bg-red-600"
        } z-50 transition-all duration-300`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src={isDarkMode ? "/images/Coca-Cola_logo_red.png" : "/images/Coca-Cola_logo_white.png"}
                alt="Coca-Cola Logo"
                width={120}
                height={32}
                className="h-8 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className={`rounded-full p-2 ${isScrolled
                ? isDarkMode
                  ? "text-gray-200 hover:bg-gray-700"
                  : "text-white hover:bg-red-700"
                : isDarkMode
                  ? "text-gray-200 hover:bg-gray-700"
                  : "text-white hover:bg-red-700"
                } focus:outline-none focus:ring-2 focus:ring-white`}
              aria-label="Toggle mobile menu"
            >
              <FaBars className="h-6 w-6" />
            </button>
          </div>

          {/* Social Media Icons and Dark Mode Toggle (Hidden on Mobile, Popup on Click) */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-full p-2 ${isScrolled
                ? isDarkMode
                  ? "text-gray-200 hover:bg-gray-700"
                  : "text-white hover:bg-red-700"
                : isDarkMode
                  ? "text-gray-200 hover:bg-gray-700"
                  : "text-white hover:bg-red-700"
                } focus:outline-none focus:ring-2 focus:ring-white`}
            >
              <span className="sr-only">Twitter</span>
              <FaTwitter className="h-5 w-5" />
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-full p-2 ${isScrolled
                ? isDarkMode
                  ? "text-gray-200 hover:bg-gray-700"
                  : "text-white hover:bg-red-700"
                : isDarkMode
                  ? "text-gray-200 hover:bg-gray-700"
                  : "text-white hover:bg-red-700"
                } focus:outline-none focus:ring-2 focus:ring-white`}
            >
              <span className="sr-only">Facebook</span>
              <FaFacebook className="h-5 w-5" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-full p-2 ${isScrolled
                ? isDarkMode
                  ? "text-gray-200 hover:bg-gray-700"
                  : "text-white hover:bg-red-700"
                : isDarkMode
                  ? "text-gray-200 hover:bg-gray-700"
                  : "text-white hover:bg-red-700"
                } focus:outline-none focus:ring-2 focus:ring-white`}
            >
              <span className="sr-only">Instagram</span>
              <FaInstagram className="h-5 w-5" />
            </Link>
            <button
              onClick={toggleTheme}
              className={`rounded-full p-2 ${isScrolled
                ? isDarkMode
                  ? "text-gray-200 hover:bg-gray-700"
                  : "text-white hover:bg-red-700"
                : isDarkMode
                  ? "text-gray-200 hover:bg-gray-700"
                  : "text-white hover:bg-red-700"
                } focus:outline-none focus:ring-2 focus:ring-white`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Popup */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden fixed inset-0 bg-gray-900 bg-opacity-95 z-50 flex flex-col items-center justify-center space-y-6 p-4 transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
          >
            <button
              onClick={toggleMobileMenu}
              className="absolute top-4 right-4 text-blue-200 text-2xl focus:outline-none"
              aria-label="Close mobile menu"
            >
              <FaTimes />
            </button>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-200 text-2xl hover:text-blue-400 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <FaTwitter className="inline mr-1" /> Twitter
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-200 text-2xl hover:text-blue-400 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <FaFacebook className="inline mr-1" /> Facebook
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-200 text-2xl hover:text-blue-400 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <FaInstagram className="inline mr-1" /> Instagram
            </Link>
            <button
              onClick={() => {
                toggleTheme();
                toggleMobileMenu();
              }}
              className="text-gray-200 text-2xl hover:text-gray-400 focus:outline-none flex items-center"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <FaSun className="inline mr-1" /> : <FaMoon className="inline mr-1" />}
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;