'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { adminLogin } from '@/service/admin';

const Login = () => {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      const response = await adminLogin({
        username: formData.username,
        password: formData.password,
      });
      // Simpan token ke cookie
      Cookies.set('adminToken', response.token, {
        expires: new Date(response.exp * 1000), // Konversi Unix timestamp ke Date
        secure: process.env.NODE_ENV === 'production', // Hanya secure di produksi
        sameSite: 'Strict', // Mencegah CSRF
      });
      setFormData({ username: '', password: '' });
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
      <section className={`${isDarkMode ? 'bg-gray-900' : 'bg-red-600'} py-10 md:py-20 px-8 md:px-12`}>
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1
              className={`text-2xl font-extrabold ${isDarkMode ? 'text-white' : 'text-white'} sm:text-3xl md:text-4xl`}
            >
              Masuk ke Komunitas Admin
            </h1>
            <p className="mt-4 text-base md:text-lg text-white">
              Masukkan nama pengguna dan kata sandi Anda untuk mengakses halaman admin.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Login Form Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onSubmit={handleSubmit}
            className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            {/* Username Field */}
            <div className="mb-6">
              <label
                htmlFor="username"
                className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}
              >
                <FaUser className="inline mr-2" /> Nama Pengguna
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.username
                    ? 'border-red-500'
                    : isDarkMode
                    ? 'border-gray-600 bg-gray-700 text-white'
                    : 'border-gray-300 bg-white text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-red-600`}
                placeholder="Masukkan nama pengguna Anda"
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}
              >
                <FaLock className="inline mr-2" /> Kata Sandi
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.password
                    ? 'border-red-500'
                    : isDarkMode
                    ? 'border-gray-600 bg-gray-700 text-white'
                    : 'border-gray-300 bg-white text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-red-600`}
                placeholder="Masukkan kata sandi Anda"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
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
                    ? 'bg-gray-500 text-white cursor-not-allowed'
                    : isDarkMode
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                <FaSignInAlt className="inline mr-2" />
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