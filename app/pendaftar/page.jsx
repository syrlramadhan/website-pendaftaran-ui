'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { FaFileExcel, FaDownload, FaFile, FaTimes } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { getPendaftar } from '@/service/pendaftar';

// Load xlsx library dynamically via CDN
const loadXLSX = async () => {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
  document.body.appendChild(script);
  return new Promise((resolve) => {
    script.onload = () => resolve(window.XLSX);
  });
};

// Load JSZip library dynamically via CDN
const loadJSZip = async () => {
  if (window.JSZip) return window.JSZip;
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js';
  document.body.appendChild(script);
  return new Promise((resolve, reject) => {
    script.onload = () => resolve(window.JSZip);
    script.onerror = () => reject(new Error('Gagal memuat JSZip library.'));
  });
};

// Check if the file is an image
const isImageFile = (url) => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
  const fileExtension = url.split('.').pop().toLowerCase();
  return imageExtensions.includes(`.${fileExtension}`);
};

const Pendaftar = () => {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const [registrants, setRegistrants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);

  // Check token and fetch registrants
  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('adminToken');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        // Decode token to check expiration
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          Cookies.remove('adminToken');
          throw new Error('Token kadaluarsa');
        }

        // Fetch registrants
        const data = await getPendaftar(token);
        setRegistrants(data);
      } catch (err) {
        setError(err.message || 'Sesi tidak valid. Harap login kembali.');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Function to calculate total registrants
  const getTotalRegistrants = () => {
    return registrants.length;
  };

  // Pagination calculations
  const totalPages = Math.ceil(registrants.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = registrants.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Handle first and last page navigation
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);

  // Function to export data to Excel
  const exportToExcel = async () => {
    const XLSX = await loadXLSX();

    const dataToExport = registrants.map((registrant) => ({
      ID: registrant.id,
      'Nama Lengkap': registrant['nama-lengkap'],
      Email: registrant.email,
      'Nomor Telepon': registrant['no-telp'],
      Dokumen: registrant['bukti-transfer'] ? registrant['bukti-transfer'].split('/').pop() : 'Tidak ada',
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pendaftar');

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    XLSX.writeFile(workbook, `Pendaftar_Komunitas_Inovasi_${timestamp}.xlsx`);
  };

  // Function to download documents as ZIP
  const downloadAsZip = async () => {
    try {
      const JSZip = await loadJSZip();
      const zip = new JSZip();
      const documentsFolder = zip.folder('Documents');
      const token = Cookies.get('adminToken');

      const fetchPromises = registrants.map(async (registrant, index) => {
        if (registrant['bukti-transfer']) {
          try {
            const response = await fetch(registrant['bukti-transfer'], {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (!response.ok) {
              throw new Error(`Gagal mengunduh dokumen untuk registrant ${index + 1}`);
            }
            const blob = await response.blob();
            const extension = registrant['bukti-transfer'].split('.').pop();
            documentsFolder.file(`document_${index + 1}.${extension}`, blob);
          } catch (err) {
            console.warn(`Error fetching document for registrant ${index + 1}: ${err.message}`);
          }
        }
      });

      await Promise.all(fetchPromises);

      const content = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = `Documents_${new Date().toISOString().replace(/[:.]/g, '-')}.zip`;
      link.click();
    } catch (err) {
      setError(err.message || 'Gagal membuat file ZIP.');
    }
  };

  // Close image popup
  const closeImagePopup = () => {
    setSelectedImage(null);
  };

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header Section */}
      <section className={`${isDarkMode ? 'bg-gray-900' : 'bg-blue-700'} py-16 md:py-20 px-8 md:px-12`}>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center'>
          <motion.div
            className='w-full max-w-3xl'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1
              className={`text-2xl font-extrabold ${isDarkMode ? 'text-white' : 'text-white'} sm:text-3xl md:text-4xl`}
            >
              Daftar Pendaftar Komunitas Inovasi
            </h1>
            <p className='mt-4 text-base md:text-lg text-white'>
              Berikut adalah daftar individu yang telah mendaftar untuk bergabung dengan komunitas kami.
            </p>
            <div className='mt-6 flex flex-col md:flex-row justify-center gap-4'>
              <button
                onClick={exportToExcel}
                disabled={loading || registrants.length === 0}
                className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition duration-300 text-white text-base ${
                  loading || registrants.length === 0
                    ? 'bg-gray-500 cursor-not-allowed'
                    : isDarkMode
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-blue-800 hover:bg-blue-900'
                }`}
                aria-label='Ekspor data ke Excel'
              >
                <FaFileExcel className='mr-2' />
                Export to Excel
              </button>
              <button
                onClick={downloadAsZip}
                disabled={loading || registrants.length === 0}
                className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition duration-300 text-white text-base ${
                  loading || registrants.length === 0
                    ? 'bg-gray-500 cursor-not-allowed'
                    : isDarkMode
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-blue-800 hover:bg-blue-900'
                }`}
                aria-label='Unduh dokumen sebagai ZIP'
              >
                <FaDownload className='mr-2' />
                Download Documents as ZIP
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Table Section */}
      <section className='py-12 md:py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Loading State */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-center text-lg'
            >
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Memuat data...</p>
            </motion.div>
          )}

          {/* Error State */}
          {error && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-center text-lg'
            >
              <p className='text-red-500'>{error}</p>
            </motion.div>
          )}

          {/* Data Table */}
          {!loading && !error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}
            >
              <p className={`text-base md:text-lg ${isDarkMode ? 'text-gray-200' : 'text-blue-700'}`}>
                Total Pendaftar: {getTotalRegistrants()}
              </p>
              {registrants.length === 0 ? (
                <p className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Belum ada data pendaftar.
                </p>
              ) : (
                <>
                  <div className="relative">
                    <table className='w-full text-sm md:text-base mt-4 table-auto md:table-fixed overflow-x-auto block md:table'>
                      <thead>
                        <tr className={`${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                          <th className={`py-3 px-4 text-left ${isDarkMode ? 'text-gray-200' : 'text-blue-700'} min-w-[50px]`}>No</th>
                          <th className={`py-3 px-4 text-left ${isDarkMode ? 'text-gray-200' : 'text-blue-700'} min-w-[150px]`}>
                            Nama Lengkap
                          </th>
                          <th className={`py-3 px-4 text-left ${isDarkMode ? 'text-gray-200' : 'text-blue-700'} min-w-[200px]`}>Email</th>
                          <th className={`py-3 px-4 text-left ${isDarkMode ? 'text-gray-200' : 'text-blue-700'} min-w-[150px]`}>
                            Nomor Telepon
                          </th>
                          <th className={`py-3 px-4 text-left ${isDarkMode ? 'text-gray-200' : 'text-blue-700'} min-w-[100px]`}>
                            Dokumen
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.map((registrant, index) => (
                          <motion.tr
                            key={registrant.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                            className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'} border-t`}
                          >
                            <td className={`py-3 px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                              {indexOfFirstItem + index + 1}
                            </td>
                            <td className={`py-3 px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                              {registrant['nama-lengkap']}
                            </td>
                            <td className={`py-3 px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                              {registrant.email}
                            </td>
                            <td className={`py-3 px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                              {registrant['no-telp']}
                            </td>
                            <td className={`py-3 px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                              {registrant['bukti-transfer'] ? (
                                <button
                                  onClick={() => setSelectedImage(registrant['bukti-transfer'])}
                                  className={`focus:outline-none ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                                  aria-label={`Lihat dokumen untuk ${registrant['nama-lengkap']}`}
                                >
                                  <FaFile className='text-xl' />
                                </button>
                              ) : (
                                'Tidak ada'
                              )}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination Controls */}
                  <div className='flex justify-between items-center mt-4'>
                    <div className={`text-xs md:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, registrants.length)}/{registrants.length}
                    </div>
                    <div className='flex gap-1'>
                      <button
                        onClick={goToFirstPage}
                        disabled={currentPage === 1}
                        className={`px-2 py-1 rounded-md text-sm transition duration-300 ${
                          currentPage === 1
                            ? 'bg-gray-500 cursor-not-allowed text-white'
                            : isDarkMode
                            ? 'bg-gray-700 hover:bg-gray-600 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                        aria-label='Halaman awal'
                      >
                        «
                      </button>
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-2 py-1 rounded-md text-sm transition duration-300 ${
                          currentPage === 1
                            ? 'bg-gray-500 cursor-not-allowed text-white'
                            : isDarkMode
                            ? 'bg-gray-700 hover:bg-gray-600 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                        aria-label='Halaman sebelumnya'
                      >
                        &lt;
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-2 py-1 rounded-md text-sm transition duration-300 ${
                            currentPage === page
                              ? isDarkMode
                                ? 'bg-blue-500 text-white'
                                : 'bg-blue-600 text-white'
                              : isDarkMode
                              ? 'bg-gray-700 hover:bg-gray-600 text-white'
                              : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                          }`}
                          aria-label={`Pindah ke halaman ${page}`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-2 py-1 rounded-md text-sm transition duration-300 ${
                          currentPage === totalPages
                            ? 'bg-gray-500 cursor-not-allowed text-white'
                            : isDarkMode
                            ? 'bg-gray-700 hover:bg-gray-600 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                        aria-label='Halaman berikutnya'
                      >
                        &gt;
                      </button>
                      <button
                        onClick={goToLastPage}
                        disabled={currentPage === totalPages}
                        className={`px-2 py-1 rounded-md text-sm transition duration-300 ${
                          currentPage === totalPages
                            ? 'bg-gray-500 cursor-not-allowed text-white'
                            : isDarkMode
                            ? 'bg-gray-700 hover:bg-gray-600 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                        aria-label='Halaman akhir'
                      >
                        »
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* Popup for Image Preview */}
          {selectedImage && (
            <div
              className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
              onClick={closeImagePopup}
            >
              <div
                className={`relative bg-white p-8 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} max-w-3xl max-h-[80vh] overflow-y-auto flex flex-col items-center`}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeImagePopup}
                  className={`absolute top-4 right-4 text-2xl ${isDarkMode ? 'text-gray-300 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} focus:outline-none`}
                  aria-label='Tutup pratinjau dokumen'
                >
                  <FaTimes />
                </button>
                {isImageFile(selectedImage) ? (
                  <div className='w-full flex justify-center'>
                    <img
                      src={selectedImage}
                      alt='Document Preview'
                      className='max-w-full max-h-80 object-contain'
                    />
                  </div>
                ) : (
                  <div className='text-center'>
                    <p>Dokumen ini tidak dapat dilihat sebagai gambar. Harap unduh untuk melihat.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Pendaftar;