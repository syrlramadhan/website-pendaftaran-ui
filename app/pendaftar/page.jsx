"use client";

import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { FaFileExcel } from "react-icons/fa";

// Load xlsx library dynamically via CDN
const loadXLSX = async () => {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";
  document.body.appendChild(script);
  return new Promise((resolve) => {
    script.onload = () => resolve(window.XLSX);
  });
};

const Pendaftar = () => {
  const { isDarkMode } = useTheme();

  // Simulated registrant data (mimics form submissions)
  const registrants = [
    {
      name: "Andi Saputra",
      email: "andi.saputra@example.com",
      phone: "+6281234567890",
      project: "Proyek inovasi teknologi ramah lingkungan",
      file: "cv_andi.pdf",
      timestamp: "03 Juni 2025, 09:37 PM WITA",
    },
    {
      name: "Budi Santoso",
      email: "budi.santoso@example.com",
      phone: "+6289876543210",
      project: "Pengembangan aplikasi edukasi",
      file: "proposal_budi.pdf",
      timestamp: "03 Juni 2025, 09:35 PM WITA",
    },
  ];

  // Function to export data to Excel
  const exportToExcel = async () => {
    const XLSX = await loadXLSX();

    // Map registrant data to match column headers
    const dataToExport = registrants.map((registrant) => ({
      "Nama Lengkap": registrant.name,
      Email: registrant.email,
      "Nomor Telepon": registrant.phone,
      "Deskripsi Proyek": registrant.project,
      Dokumen: registrant.file || "Tidak ada",
      "Waktu Pengajuan": registrant.timestamp,
    }));

    // Create a new worksheet
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pendaftar");

    // Generate and download the Excel file
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    XLSX.writeFile(workbook, `Pendaftar_Komunitas_Inovasi_${timestamp}.xlsx`);
  };

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Header Section */}
      <section className={`${isDarkMode ? "bg-gray-900" : "bg-blue-700"} py-16 md:py-20 px-8 md:px-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-2xl font-extrabold ${isDarkMode ? "text-white" : "text-white"} sm:text-3xl md:text-4xl`}
          >
            Daftar Pendaftar Komunitas Inovasi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 text-base md:text-lg text-white"
          >
            Berikut adalah daftar individu yang telah mendaftar untuk bergabung dengan komunitas kami.
          </motion.p>
        </div>
      </section>

      {/* Table Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-4 text-right"
          >
            <motion.button
              onClick={exportToExcel}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center px-4 py-2 rounded-lg font-semibold transition duration-300 text-sm md:text-base ${
                isDarkMode ? "bg-green-700 text-white hover:bg-green-600" : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              <FaFileExcel className="mr-2" />
              Export ke Excel
            </motion.button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`overflow-x-auto ${isDarkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-lg shadow-md`}
          >
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr className={`${isDarkMode ? "bg-gray-700" : "bg-blue-50"}`}>
                  <th className={`py-3 px-4 text-left ${isDarkMode ? "text-gray-200" : "text-blue-700"}`}>Nama Lengkap</th>
                  <th className={`py-3 px-4 text-left ${isDarkMode ? "text-gray-200" : "text-blue-700"}`}>Email</th>
                  <th className={`py-3 px-4 text-left ${isDarkMode ? "text-gray-200" : "text-blue-700"}`}>Nomor Telepon</th>
                  <th className={`py-3 px-4 text-left ${isDarkMode ? "text-gray-200" : "text-blue-700"}`}>Deskripsi Proyek</th>
                  <th className={`py-3 px-4 text-left ${isDarkMode ? "text-gray-200" : "text-blue-700"}`}>Dokumen</th>
                  <th className={`py-3 px-4 text-left ${isDarkMode ? "text-gray-200" : "text-blue-700"}`}>Waktu Pengajuan</th>
                </tr>
              </thead>
              <tbody>
                {registrants.map((registrant, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                    className={`${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-100"} border-t`}
                  >
                    <td className={`py-3 px-4 ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>{registrant.name}</td>
                    <td className={`py-3 px-4 ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>{registrant.email}</td>
                    <td className={`py-3 px-4 ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>{registrant.phone}</td>
                    <td className={`py-3 px-4 ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>{registrant.project}</td>
                    <td className={`py-3 px-4 ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>{registrant.file || "Tidak ada"}</td>
                    <td className={`py-3 px-4 ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>{registrant.timestamp}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Pendaftar;