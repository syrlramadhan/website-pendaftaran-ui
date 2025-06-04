"use client";

import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Home() {
  const { isDarkMode } = useTheme();

  // State for Informasi Pendaftaran carousel
  const [infoCurrentIndex, setInfoCurrentIndex] = useState(0);
  const [infoTouchStart, setInfoTouchStart] = useState(null);
  const infoItems = [
    {
      title: "Kelayakan",
      description: "Terbuka untuk individu dan tim yang bersemangat tentang inovasi, berusia 18 tahun ke atas.",
    },
    {
      title: "Proses",
      description: "Pendaftaran online yang sederhana dengan konfirmasi instan dan detail tindak lanjut.",
    },
    {
      title: "Batas Waktu",
      description: "Daftar sebelum 30 Juni 2025 untuk mengamankan tempat Anda.",
    },
  ];

  // State for Apa yang Anda Dapatkan carousel
  const [benefitsCurrentIndex, setBenefitsCurrentIndex] = useState(0);
  const [benefitsTouchStart, setBenefitsTouchStart] = useState(null);
  const benefitsItems = [
    {
      title: "Jaringan",
      description: "Terhubung dengan inovator dan pemimpin industri yang memiliki visi serupa.",
    },
    {
      title: "Sumber Daya",
      description: "Akses alat eksklusif, lokakarya, dan program mentorship.",
    },
    {
      title: "Peluang",
      description: "Buka potensi untuk kolaborasi dan pendanaan proyek.",
    },
  ];

  const scrollToInformasiPendaftaran = () => {
    const section = document.getElementById("informasi-pendaftaran");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handlers for Informasi Pendaftaran carousel
  const handleInfoPrev = () => {
    setInfoCurrentIndex((prev) => (prev === 0 ? infoItems.length - 1 : prev - 1));
  };

  const handleInfoNext = () => {
    setInfoCurrentIndex((prev) => (prev === infoItems.length - 1 ? 0 : prev + 1));
  };

  const handleInfoTouchStart = (e) => {
    setInfoTouchStart(e.touches[0].clientX);
  };

  const handleInfoTouchEnd = (e) => {
    if (!infoTouchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = infoTouchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleInfoNext();
      else handleInfoPrev();
    }
    setInfoTouchStart(null);
  };

  // Handlers for Apa yang Anda Dapatkan carousel
  const handleBenefitsPrev = () => {
    setBenefitsCurrentIndex((prev) => (prev === 0 ? benefitsItems.length - 1 : prev - 1));
  };

  const handleBenefitsNext = () => {
    setBenefitsCurrentIndex((prev) => (prev === benefitsItems.length - 1 ? 0 : prev + 1));
  };

  const handleBenefitsTouchStart = (e) => {
    setBenefitsTouchStart(e.touches[0].clientX);
  };

  const handleBenefitsTouchEnd = (e) => {
    if (!benefitsTouchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = benefitsTouchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleBenefitsNext();
      else handleBenefitsPrev();
    }
    setBenefitsTouchStart(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className={`${isDarkMode ? "bg-gray-900" : "bg-blue-700"} py-16 md:py-20 px-8 md:px-12 flex-grow`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <motion.div 
            className="flex flex-col items-center w-full max-w-3xl"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 
              className={`text-2xl font-extrabold ${
                isDarkMode ? "text-white" : "text-white"
              } sm:text-3xl md:text-4xl lg:text-5xl`}
            >
              Bergabunglah dengan Komunitas Inovator Kami
            </h1>
            <p 
              className="my-4 text-base md:text-lg text-white"
            >
              Daftar sekarang untuk menjadi bagian dari organisasi transformatif kami.
            </p>
            <div 
              className="mt-6 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4"
            >
              <a
                href="/formulir"
                className={`inline-block ${
                  isDarkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-blue-700 hover:bg-blue-100"
                } px-6 py-3 rounded-lg font-semibold transition duration-300 text-base`}
              >
                Daftar Sekarang
              </a>
              <button
                onClick={scrollToInformasiPendaftaran}
                className={`inline-block ${
                  isDarkMode ? "bg-blue-800 text-white hover:bg-blue-700" : "bg-blue-500 text-white hover:bg-blue-600"
                } px-6 py-3 rounded-lg font-semibold transition duration-300 text-base`}
              >
                Pelajari Lebih Lanjut
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Organization Section */}
      <section className={`${isDarkMode ? "bg-gray-800" : "bg-white"} py-8 md:py-10`}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className={`text-xl font-bold ${
            isDarkMode ? "text-white" : "text-blue-700"
          } mb-4 md:mb-6`}>
            Tentang Organisasi Kami
          </h2>
          <p className={`${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          } text-sm md:text-base max-w-3xl mx-auto`}>
            Kami adalah komunitas global yang berdedikasi untuk memajukan inovasi, kolaborasi, dan pertumbuhan. Misi kami adalah memberdayakan individu dan organisasi untuk menciptakan solusi berdampak bagi masa depan yang lebih baik.
          </p>
          <div id="informasi-pendaftaran"></div>
        </motion.div>
      </section>

      {/* Registration Details Section */}
      <section className={`${isDarkMode ? "bg-gray-900" : "bg-gray-50"} py-8 md:py-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <h2 className={`text-xl font-bold ${
              isDarkMode ? "text-white" : "text-blue-700"
            } mb-4 md:mb-6`}>
              Informasi Pendaftaran
            </h2>
            <div className="relative">
              {/* Carousel for mobile */}
              <div
                className="md:hidden relative flex overflow-hidden"
                onTouchStart={handleInfoTouchStart}
                onTouchEnd={handleInfoTouchEnd}
              >
                <motion.div
                  className="flex transition-transform duration-300"
                  style={{ transform: `translateX(-${infoCurrentIndex * 100}%)` }}
                >
                  {infoItems.map((item, index) => (
                    <div
                      key={index}
                      className={`min-w-full p-4 rounded-lg shadow-md ${
                        isDarkMode ? "bg-gray-700" : "bg-blue-50"
                      }`}
                    >
                      <h3 className={`text-lg font-bold ${
                        isDarkMode ? "text-white" : "text-blue-700"
                      } mb-2`}>
                        {item.title}
                      </h3>
                      <p className={`${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      } text-sm md:text-base`}>
                        {item.description}
                      </p>
                    </div>
                  ))}
                </motion.div>
                {/* Navigation Icons for Mobile - Overlaid */}
                <button
                  onClick={handleInfoPrev}
                  className={`absolute left-2 top-1/2 transform -translate-y-1/2 text-2xl ${
                    isDarkMode ? "text-gray-300" : "text-blue-700"
                  } bg-black bg-opacity-25 rounded-full p-2 focus:outline-none hover:bg-opacity-70 transition-opacity duration-200`}
                  aria-label="Previous item"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={handleInfoNext}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-2xl ${
                    isDarkMode ? "text-gray-300" : "text-blue-700"
                  } bg-black bg-opacity-25 rounded-full p-2 focus:outline-none hover:bg-opacity-70 transition-opacity duration-200`}
                  aria-label="Next item"
                >
                  <FaChevronRight />
                </button>
              </div>
              {/* Grid for Desktop */}
              <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {infoItems.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className={`${
                      isDarkMode ? "bg-gray-700" : "bg-blue-50"
                    } p-4 md:p-6 rounded-lg shadow-md`}
                  >
                    <h3 className={`text-lg font-bold ${
                      isDarkMode ? "text-white" : "text-blue-700"
                    } mb-2`}>
                      {item.title}
                    </h3>
                    <p className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    } text-sm md:text-base`}>
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={`${isDarkMode ? "bg-gray-800" : "bg-white"} py-8 md:py-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <h2 className={`text-xl font-bold ${
              isDarkMode ? "text-white" : "text-blue-700"
            } mb-4 md:mb-6`}>
              Apa yang Anda Dapatkan
            </h2>
            <div className="relative">
              {/* Carousel for mobile */}
              <div
                className="md:hidden relative flex overflow-hidden"
                onTouchStart={handleBenefitsTouchStart}
                onTouchEnd={handleBenefitsTouchEnd}
              >
                <motion.div
                  className="flex transition-transform duration-300"
                  style={{ transform: `translateX(-${benefitsCurrentIndex * 100}%)` }}
                >
                  {benefitsItems.map((item, index) => (
                    <div
                      key={index}
                      className={`min-w-full p-4 rounded-lg shadow-md ${
                        isDarkMode ? "bg-gray-700" : "bg-blue-50"
                      }`}
                    >
                      <h3 className={`text-lg font-bold ${
                        isDarkMode ? "text-white" : "text-blue-700"
                      } mb-2`}>
                        {item.title}
                      </h3>
                      <p className={`${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      } text-sm md:text-base`}>
                        {item.description}
                      </p>
                    </div>
                  ))}
                </motion.div>
                {/* Navigation Icons for Mobile - Overlaid */}
                <button
                  onClick={handleBenefitsPrev}
                  className={`absolute left-2 top-1/2 transform -translate-y-1/2 text-2xl ${
                    isDarkMode ? "text-gray-300" : "text-blue-700"
                  } bg-black bg-opacity-25 rounded-full p-2 focus:outline-none hover:bg-opacity-70 transition-opacity duration-200`}
                  aria-label="Previous item"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={handleBenefitsNext}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-2xl ${
                    isDarkMode ? "text-gray-300" : "text-blue-700"
                  } bg-black bg-opacity-25 rounded-full p-2 focus:outline-none hover:bg-opacity-70 transition-opacity duration-200`}
                  aria-label="Next item"
                >
                  <FaChevronRight />
                </button>
              </div>
              {/* Grid for Desktop */}
              <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {benefitsItems.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className={`${
                      isDarkMode ? "bg-gray-700" : "bg-blue-50"
                    } p-4 md:p-6 rounded-lg shadow-md`}
                  >
                    <h3 className={`text-lg font-bold ${
                      isDarkMode ? "text-white" : "text-blue-700"
                    } mb-2`}>
                      {item.title}
                    </h3>
                    <p className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    } text-sm md:text-base`}>
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={`${isDarkMode ? "bg-gray-800" : "bg-blue-700"} py-6 md:py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center md:text-left mb-4 md:mb-0"
            >
              <h2 className={`text-xl font-bold ${
                isDarkMode ? "text-white" : "text-white"
              } mb-2`}>
                Siap Membuat Perubahan?
              </h2>
              <p className={`text-base ${
                isDarkMode ? "text-gray-200" : "text-white"
              }`}>
                Bergabunglah dengan komunitas kami dan mulai perjalanan Anda hari ini.
              </p>
            </motion.div>
            <motion.a
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`inline-block ${
                isDarkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-blue-700 hover:bg-blue-100"
              } px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold transition duration-300 text-sm md:text-base`}
              href="/formulir"
            >
              Mulai Sekarang
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
}