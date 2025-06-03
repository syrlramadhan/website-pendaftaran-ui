"use client";

import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

const Footer = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`${isDarkMode ? "bg-gray-800" : "bg-blue-700"} text-white py-6 md:py-8`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid untuk kolom informasi */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Kolom 1: Tentang Kami */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base font-bold mb-4"
            >
              Tentang Kami
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xs leading-relaxed"
            >
              Kami adalah komunitas global yang berdedikasi untuk memajukan inovasi, kolaborasi, dan pertumbuhan, memberdayakan individu untuk menciptakan solusi berdampak.
            </motion.p>
          </div>

          {/* Kolom 2: Tautan Cepat */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base font-bold mb-4"
            >
              Tautan Cepat
            </motion.h3>
            <motion.ul
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-2"
            >
              <li><a href="/register" className={`text-xs hover:${
                isDarkMode ? "text-blue-400" : "text-blue-300"
              }`}>Daftar Sekarang</a></li>
              <li><a href="/learn-more" className={`text-xs hover:${
                isDarkMode ? "text-blue-400" : "text-blue-300"
              }`}>Pelajari Lebih Lanjut</a></li>
              <li><a href="/contact" className={`text-xs hover:${
                isDarkMode ? "text-blue-400" : "text-blue-300"
              }`}>Kontak</a></li>
              <li><a href="/terms" className={`text-xs hover:${
                isDarkMode ? "text-blue-400" : "text-blue-300"
              }`}>Syarat dan Ketentuan</a></li>
            </motion.ul>
          </div>

          {/* Kolom 3: Kontak */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base font-bold mb-4"
            >
              Kontak
            </motion.h3>
            <motion.ul
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-2"
            >
              <li className="flex items-center space-x-2">
                <FaEnvelope className="text-white" />
                <span className="text-xs">info@inovasi.org</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhoneAlt className="text-white" />
                <span className="text-xs">+62 123 4567 890</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-white" />
                <span className="text-xs">Jl. Inovasi No. 123, Jakarta</span>
              </li>
            </motion.ul>
          </div>

          {/* Kolom 4: Sosial Media */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base font-bold mb-4"
            >
              Sosial Media
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex space-x-4"
            >
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={`hover:${
                isDarkMode ? "text-blue-400" : "text-blue-300"
              }`}>
                <span className="sr-only">Twitter</span>
                <FaTwitter className="text-lg" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={`hover:${
                isDarkMode ? "text-blue-400" : "text-blue-300"
              }`}>
                <span className="sr-only">Facebook</span>
                <FaFacebook className="text-lg" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={`hover:${
                isDarkMode ? "text-blue-400" : "text-blue-300"
              }`}>
                <span className="sr-only">Instagram</span>
                <FaInstagram className="text-lg" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Garis Pembatas */}
        <div className={`border-t ${
          isDarkMode ? "border-gray-700" : "border-blue-600"
        } my-6`}></div>

        {/* Hak Cipta */}
        <div className={`text-center text-xs ${
          isDarkMode ? "text-gray-400" : "text-blue-200"
        }`}>
          © 2025 Komunitas Inovasi. Hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
};

export default Footer;