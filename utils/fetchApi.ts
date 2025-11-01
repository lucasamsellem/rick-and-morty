import { BASE_URL } from '@/constants/constants';

const fetchApi = async (endpoint: string) => {
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}`);

    if (!res.ok) throw new Error('Failed to fetch');

    const data = await res.json();
    return typeof data === 'string' ? JSON.parse(data) : data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchApi;
