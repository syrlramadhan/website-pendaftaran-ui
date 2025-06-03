const adminLogin = async (credentials) => {
  try {
    const response = await fetch(`${process.env.API_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Gagal login sebagai admin');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Terjadi kesalahan saat login');
  }
};

export { adminLogin };