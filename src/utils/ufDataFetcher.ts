import axios from 'axios';

const API_KEY = import.meta.env.VITE_CMF_API_KEY;
const BASE_URL = 'https://api.cmfchile.cl/api-sbifv3/recursos_api/uf';

// Datos de respaldo más realistas (últimos 30 días de valores UF)
const fallbackData = [
  { date: '2024-03-17', value: 37895.28 },
  { date: '2024-03-16', value: 37892.52 },
  { date: '2024-03-15', value: 37889.76 },
  // ... (añade más datos de respaldo aquí)
  { date: '2024-02-17', value: 37815.24 }
];

export const fetchUFData = async (startDate?: string, endDate?: string) => {
  console.log('Fetching UF data', { API_KEY: API_KEY ? 'Set' : 'Not set', startDate, endDate });
  try {
    if (!API_KEY) {
      console.warn('API key is not set. Using fallback data.');
      return fallbackData;
    }

    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const formattedStartDate = startDate ? formatDate(new Date(startDate)) : formatDate(thirtyDaysAgo);
    const formattedEndDate = endDate ? formatDate(new Date(endDate)) : formatDate(today);
    
    const url = `${BASE_URL}/periodo/${formattedStartDate.replace(/-/g, '')}/${formattedEndDate.replace(/-/g, '')}?apikey=${API_KEY}&formato=json`;
    console.log('Request URL:', url);

    const response = await axios.get(url);
    
    if (!response.data || !response.data.UFs) {
      throw new Error('Invalid response format from the API');
    }

    const data = response.data.UFs;
    return data.map((item: any) => ({
      date: item.Fecha,
      value: parseFloat(item.Valor.replace('.', '').replace(',', '.')),
    })).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
  } catch (error) {
    console.error('Error fetching UF data:', error);
    console.warn('Using fallback data due to error.');
    return fallbackData;
  }
};

// Función para obtener el valor de la UF actual
export const getCurrentUFValue = async () => {
  try {
    const data = await fetchUFData();
    return data[data.length - 1]?.value || null;
  } catch (error) {
    console.error('Error fetching current UF value:', error);
    return null;
  }
};

// Helper function to format date as YYYY-MM-DD
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};