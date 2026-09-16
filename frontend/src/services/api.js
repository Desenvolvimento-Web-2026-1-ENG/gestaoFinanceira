const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

export const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });
    
    // Se for 204 (No Content), não tem JSON para parsear
    if (response.status === 204) {
      return null;
    }

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, data };
    }

    return data;
  } catch (error) {
    if (error.status) throw error;
    throw { status: 500, message: 'Erro de conexão com o servidor' };
  }
};
