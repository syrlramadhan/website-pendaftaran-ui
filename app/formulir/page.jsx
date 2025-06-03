"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaFileUpload, FaTimes } from "react-icons/fa";
import { addPendaftar } from "@/service/pendaftar";

const Formulir = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("formulir");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    proofOfPayment: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "proofOfPayment") {
      const file = files[0] || null;
      setFormData({ ...formData, [name]: file });
      setErrors({ ...errors, [name]: "" });
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Remove selected file
  const handleRemoveFile = () => {
    setFormData({ ...formData, proofOfPayment: null });
    setErrors({ ...errors, proofOfPayment: "" });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nama wajib diisi";
    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email tidak valid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor telepon wajib diisi";
    } else if (!/^\+?\d{10,15}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Nomor telepon tidak valid";
    }
    if (!formData.proofOfPayment) {
      newErrors.proofOfPayment = "Bukti transfer biaya pendaftaran wajib diunggah";
    } else if (formData.proofOfPayment.size > 5 * 1024 * 1024) {
      newErrors.proofOfPayment = "Ukuran file tidak boleh melebihi 5MB";
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await addPendaftar(formData);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", phone: "", proofOfPayment: null });
    } catch (error) {
      setErrors({ ...errors, submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format file size for display
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    else return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Header Section */}
      <section className={`${isDarkMode ? "bg-gray-900" : "bg-blue-700"} py-16 md:py-20 px-8 md:px-12`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <motion.div 
            className="w-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 
              className={`text-2xl font-extrabold ${isDarkMode ? "text-white" : "text-white"} sm:text-3xl md:text-4xl`}
            >
              Formulir Pendaftaran
            </h1>
            <p 
              className="mt-4 text-base md:text-lg text-white"
            >
              Isi formulir di bawah ini untuk bergabung dengan Komunitas Inovasi kami dan mulai perjalanan Anda menuju inovasi dan kolaborasi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex justify-center space-x-4 border-b border-gray-300">
          <button
            onClick={() => setActiveTab("formulir")}
            className={`py-2 px-4 text-sm md:text-base font-semibold ${
              activeTab === "formulir"
                ? isDarkMode
                  ? "border-b-2 border-blue-500 text-blue-400"
                  : "border-b-2 border-blue-700 text-blue-700"
                : isDarkMode
                ? "text-gray-400 hover:text-blue-400"
                : "text-gray-600 hover:text-blue-700"
            }`}
          >
            Formulir
          </button>
          <button
            onClick={() => setActiveTab("benefit")}
            className={`py-2 px-4 text-sm md:text-base font-semibold ${
              activeTab === "benefit"
                ? isDarkMode
                  ? "border-b-2 border-blue-500 text-blue-400"
                  : "border-b-2 border-blue-700 text-blue-700"
                : isDarkMode
                ? "text-gray-400 hover:text-blue-400"
                : "text-gray-600 hover:text-blue-700"
            }`}
          >
            Benefit
          </button>
          <button
            onClick={() => setActiveTab("informasi")}
            className={`py-2 px-4 text-sm md:text-base font-semibold ${
              activeTab === "informasi"
                ? isDarkMode
                  ? "border-b-2 border-blue-500 text-blue-400"
                  : "border-b-2 border-blue-700 text-blue-700"
                : isDarkMode
                ? "text-gray-400 hover:text-blue-400"
                : "text-gray-600 hover:text-blue-700"
            }`}
          >
            Informasi Pendaftaran
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {activeTab === "formulir" && (
              <motion.div
                key="formulir"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className={`p-6 rounded-lg text-center ${isDarkMode ? "bg-gray-700 text-white" : "bg-blue-50 text-blue-700"}`}
                  >
                    <h2 className="text-xl font-bold mb-2">Pendaftaran Berhasil!</h2>
                    <p className="text-sm">Terima kasih telah mendaftar. Kami akan menghubungi Anda segera dengan detail lebih lanjut.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    onSubmit={handleSubmit}
                    className={`p-6 rounded-lg shadow-md ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
                  >
                    {/* Name Field */}
                    <div className="mb-6">
                      <label htmlFor="name" className={`block text-sm font-medium ${isDarkMode ? "text-gray-200" : "text-gray-700"} mb-2`}>
                        <FaUser className="inline mr-2" /> Nama Lengkap
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.name
                            ? "border-red-500"
                            : isDarkMode
                            ? "border-gray-600 bg-gray-700 text-white"
                            : "border-gray-300 bg-white text-gray-900"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Masukkan nama lengkap Anda"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Email Field */}
                    <div className="mb-6">
                      <label htmlFor="email" className={`block text-sm font-medium ${isDarkMode ? "text-gray-200" : "text-gray-700"} mb-2`}>
                        <FaEnvelope className="inline mr-2" /> Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.email
                            ? "border-red-500"
                            : isDarkMode
                            ? "border-gray-600 bg-gray-700 text-white"
                            : "border-gray-300 bg-white text-gray-900"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Masukkan email Anda"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Phone Field */}
                    <div className="mb-6">
                      <label htmlFor="phone" className={`block text-sm font-medium ${isDarkMode ? "text-gray-200" : "text-gray-700"} mb-2`}>
                        <FaPhone className="inline mr-2" /> Nomor Telepon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.phone
                            ? "border-red-500"
                            : isDarkMode
                            ? "border-gray-600 bg-gray-700 text-white"
                            : "border-gray-300 bg-white text-gray-900"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Masukkan nomor telepon Anda (contoh: +6281234567890)"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    {/* Proof of Payment Upload Field */}
                    <div className="mb-6">
                      <label htmlFor="proofOfPayment" className={`block text-sm font-medium ${isDarkMode ? "text-gray-200" : "text-gray-700"} mb-2`}>
                        <FaFileUpload className="inline mr-2" /> Upload Bukti Transfer Biaya Pendaftaran
                      </label>
                      <div className="flex items-center space-x-3">
                        <label
                          className={`inline-flex items-center px-4 py-2 rounded-lg cursor-pointer transition duration-300 ${
                            isDarkMode
                              ? "bg-blue-700 text-white hover:bg-blue-600 border-blue-700"
                              : "bg-blue-500 text-white hover:bg-blue-600 border-blue-500"
                          } ${errors.proofOfPayment ? "border-2 border-red-500" : "border-2 border-transparent"}`}
                        >
                          <FaFileUpload className="mr-2" />
                          Pilih File
                          <input
                            type="file"
                            id="proofOfPayment"
                            name="proofOfPayment"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleChange}
                            className="hidden"
                          />
                        </label>
                        <div className="flex-1 flex items-center space-x-2">
                          <span
                            className={`text-sm truncate ${
                              formData.proofOfPayment
                                ? isDarkMode
                                  ? "text-gray-300"
                                  : "text-gray-700"
                                : isDarkMode
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          >
                            {formData.proofOfPayment
                              ? `${formData.proofOfPayment.name} (${formatFileSize(formData.proofOfPayment.size)})`
                              : "Belum ada file yang dipilih"}
                          </span>
                          {formData.proofOfPayment && (
                            <button
                              type="button"
                              onClick={handleRemoveFile}
                              className={`text-red-500 hover:text-red-600 transition duration-300`}
                            >
                              <FaTimes />
                            </button>
                          )}
                        </div>
                      </div>
                      <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"} mt-1`}>
                        Unggah bukti transfer biaya pendaftaran dalam format PDF, JPG, atau PNG (maks. 5MB).
                      </p>
                      {errors.proofOfPayment && <p className="text-red-500 text-xs mt-1">{errors.proofOfPayment}</p>}
                    </div>

                    {/* Submit Error Message */}
                    {errors.submit && (
                      <div className="text-center mb-4">
                        <p className="text-red-500 text-sm">{errors.submit}</p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="text-center">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`inline-block px-6 py-3 rounded-lg font-semibold transition duration-300 text-base ${
                          isSubmitting
                            ? "bg-gray-500 text-white cursor-not-allowed"
                            : isDarkMode
                            ? "bg-blue-800 text-white hover:bg-blue-700"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                      >
                        {isSubmitting ? "Mengirim..." : "Daftar Sekarang"}
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </motion.div>
            )}

            {activeTab === "benefit" && (
              <motion.div
                key="benefit"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`p-6 rounded-lg shadow-md ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
              >
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`text-xl font-bold text-center ${isDarkMode ? "text-white" : "text-blue-700"} mb-4 md:mb-6`}
                >
                  Apa yang Anda Dapatkan
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className={`${isDarkMode ? "bg-gray-700" : "bg-blue-50"} p-4 md:p-6 rounded-lg shadow-md`}
                  >
                    <h3 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-blue-700"} mb-2`}>Jaringan</h3>
                    <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} text-sm md:text-base`}>
                      Terhubung dengan inovator dan pemimpin industri yang memiliki visi serupa.
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className={`${isDarkMode ? "bg-gray-700" : "bg-blue-50"} p-4 md:p-6 rounded-lg shadow-md`}
                  >
                    <h3 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-blue-700"} mb-2`}>Sumber Daya</h3>
                    <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} text-sm md:text-base`}>
                      Akses alat eksklusif, lokakarya, dan program mentorship.
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className={`${isDarkMode ? "bg-gray-700" : "bg-blue-50"} p-4 md:p-6 rounded-lg shadow-md`}
                  >
                    <h3 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-blue-700"} mb-2`}>Peluang</h3>
                    <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} text-sm md:text-base`}>
                      Buka potensi untuk kolaborasi dan pendanaan proyek.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeTab === "informasi" && (
              <motion.div
                key="informasi"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`p-6 rounded-lg shadow-md ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
              >
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`text-xl font-bold text-center ${isDarkMode ? "text-white" : "text-blue-700"} mb-4 md:mb-6`}
                >
                  Informasi Pendaftaran
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className={`${isDarkMode ? "bg-gray-700" : "bg-blue-50"} p-4 md:p-6 rounded-lg shadow-md`}
                  >
                    <h3 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-blue-700"} mb-2`}>Kelayakan</h3>
                    <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} text-sm md:text-base`}>
                      Terbuka untuk individu dan tim yang bersemangat tentang inovasi, berusia 18 tahun ke atas.
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className={`${isDarkMode ? "bg-gray-700" : "bg-blue-50"} p-4 md:p-6 rounded-lg shadow-md`}
                  >
                    <h3 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-blue-700"} mb-2`}>Proses</h3>
                    <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} text-sm md:text-base`}>
                      Pendaftaran online yang sederhana dengan konfirmasi instan dan detail tindak lanjut.
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className={`${isDarkMode ? "bg-gray-700" : "bg-blue-50"} p-4 md:p-6 rounded-lg shadow-md`}
                  >
                    <h3 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-blue-700"} mb-2`}>Batas Waktu</h3>
                    <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} text-sm md:text-base`}>
                      Daftar sebelum 30 Juni 2025 untuk mengamankan tempat Anda.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Formulir;