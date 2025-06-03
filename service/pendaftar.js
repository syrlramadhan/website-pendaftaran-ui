const addPendaftar = async (formData) => {
  try {
    const data = new FormData();
    data.append('nama-lengkap', formData.name);
    data.append('email', formData.email);
    data.append('no-telp', formData.phone);
    data.append('bukti-transfer', formData.proofOfPayment);

    const response = await fetch(`${process.env.API_URL}/pendaftar/add`, {
      method: 'POST',
      body: data,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Gagal mengirim data pendaftaran');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Terjadi kesalahan saat mengirim data');
  }
};

const getPendaftar = async (token) => {
  try {
    const response = await fetch(`${process.env.API_URL}/pendaftar/get`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Gagal mengambil data pendaftar');
    }

    const responseData = await response.json();
    const pendaftarList = responseData.data || [];

    return pendaftarList.map((pendaftar) => ({
      ...pendaftar,
      'bukti-transfer': pendaftar['bukti-transfer']
        ? `${process.env.API_URL}/pendaftar/uploads/${pendaftar['bukti-transfer']}`
        : null,
    }));
  } catch (error) {
    throw new Error(error.message || 'Terjadi kesalahan saat mengambil data pendaftar');
  }
};

export { addPendaftar, getPendaftar };