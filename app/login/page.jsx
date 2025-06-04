'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaSignInAlt, FaUpload } from 'react-icons/fa';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { adminLogin } from '@/service/admin';

const Login = () => {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    file: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors({ ...errors, [name]: '' });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Nama pengguna wajib diisi';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Kata sandi wajib diisi';
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
      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username);
      formDataToSend.append('password', formData.password);
      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }

      const response = await adminLogin(formDataToSend);
      Cookies.set('adminToken', response.token, {
        expires: new Date(response.exp * 1000),
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
      });
      setFormData({ username: '', password: '', file: null });
      router.push('/pendaftar');
    } catch (error) {
      setErrors({ ...errors, submit: error.message || 'Login gagal. Silakan coba lagi.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header Section */}
      <section className={`${isDarkMode ? 'bg-gray-900' : 'bg-blue-700'} py-8 md:py-16 px-6 md:px-12`}>
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1
              className={`text-xl md:text-3xl font-extrabold ${isDarkMode ? 'text-white' : 'text-white'} sm:text-2xl`}
            >
              Masuk ke Komunitas Admin
            </h1>
            <p className="mt-3 text-sm md:text-lg text-white">
              Masukkan nama pengguna dan kata sandi Anda untuk mengakses halaman admin.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Login Form Section */}
      <section className="py-8 md:py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onSubmit={handleSubmit}
            className={`p-4 md:p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            {/* Username Field */}
            <div className="mb-4 md:mb-6">
              <label
                htmlFor="username"
                className={`block text-xs md:text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-1 md:mb-2`}
              >
                <FaUser className="inline mr-1 md:mr-2" /> Nama Pengguna
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full px-3 py-1 md:px-4 md:py-2 rounded-lg border text-sm md:text-base ${
                  errors.username
                    ? 'border-red-500'
                    : isDarkMode
                    ? 'border-gray-600 bg-gray-700 text-white'
                    : 'border-gray-300 bg-white text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Masukkan nama pengguna Anda"
              />
              {errors.username && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.username}</p>}
            </div>

            {/* Password Field */}
            <div className="mb-4 md:mb-6">
              <label
                htmlFor="password"
                className={`block text-xs md:text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-1 md:mb-2`}
              >
                <FaLock className="inline mr-1 md:mr-2" /> Kata Sandi
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-1 md:px-4 md:py-2 rounded-lg border text-sm md:text-base ${
                  errors.password
                    ? 'border-red-500'
                    : isDarkMode
                    ? 'border-gray-600 bg-gray-700 text-white'
                    : 'border-gray-300 bg-white text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Masukkan kata sandi Anda"
              />
              {errors.password && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.password}</p>}
            </div>

            {/* File Upload Field */}
            <div className="mb-4 md:mb-6">
              <label
                htmlFor="file"
                className={`block text-xs md:text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-1 md:mb-2`}
              >
                <FaUpload className="inline mr-1 md:mr-2" /> Pilih File (Opsional)
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleChange}
                  className={`w-full px-3 py-1 md:px-4 md:py-2 rounded-lg border text-sm md:text-base ${
                    errors.file
                      ? 'border-red-500'
                      : isDarkMode
                      ? 'border-gray-600 bg-gray-700 text-white'
                      : 'border-gray-300 bg-white text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-2 md:file:mr-4 file:py-1 md:file:py-2 file:px-2 md:file:px-4 file:rounded-lg file:border-0 file:text-xs md:file:text-sm file:font-medium file:cursor-pointer ${
                    isDarkMode
                      ? 'file:bg-gray-600 file:text-white'
                      : 'file:bg-blue-500 file:text-white hover:file:bg-blue-600'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('file').click()}
                  className={`absolute right-1 md:right-2 top-1/2 -translate-y-1/2 px-2 md:px-3 py-1 md:py-2 rounded-lg font-semibold transition duration-300 text-white text-xs md:text-sm ${
                    isDarkMode
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-blue-500 hover:bg-blue-600'
                  } md:inline-flex items-center hidden`}
                >
                  <FaUpload className="mr-0 md:mr-2" /> Pilih File
                </button>
                <button
                  type="button"
                  onClick={() => document.getElementById('file').click()}
                  className={`absolute right-1 md:right-2 top-1/2 -translate-y-1/2 p-1 md:p-2 rounded-lg font-semibold transition duration-300 text-white text-xs md:text-sm ${
                    isDarkMode
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-blue-500 hover:bg-blue-600'
                  } md:hidden`}
                >
                  <FaUpload />
                </button>
              </div>
              {errors.file && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.file}</p>}
            </div>

            {/* Submit Error Message */}
            {errors.submit && (
              <div className="text-center mb-3 md:mb-4">
                <p className="text-red-500 text-xs md:text-sm">{errors.submit}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-block px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition duration-300 text-sm md:text-base w-full md:w-auto ${
                  isSubmitting
                    ? 'bg-gray-500 text-white cursor-not-allowed'
                    : isDarkMode
                    ? 'bg-blue-800 text-white hover:bg-blue-700'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                <FaSignInAlt className="inline mr-1 md:mr-2" />
                {isSubmitting ? 'Memproses...' : 'Masuk'}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default Login;