"use client";

import { useTheme } from "@/context/ThemeContext";
import { FaBuilding, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const { isDarkMode } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

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

          {/* Social Media Icons */}
          <div className="flex items-center space-x-4">
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;