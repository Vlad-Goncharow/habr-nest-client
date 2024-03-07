import axios from 'axios';

export const API_URL = process.env.REACT_APP_SERVER_URL;
const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});

instance.interceptors.request.use((config: { headers: { Authorization: string | null; }; }) => {
  console.log('token', window.localStorage.getItem('token'));
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

instance.interceptors.response.use(
  (response: any) => response,
  //arror
  async (error: { config: any; response: { status: number; }; }) => {
    const originalRequest = error.config;

    if (
      error.response && 
      error.response.status === 401 && 
      originalRequest && 
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(`${API_URL}/auth/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem('token', response.data.accessToken);
        return instance.request(originalRequest);
      } catch (e) {
        console.log('НЕ АВТОРИЗОВАН');
      }
    }
    throw error;
  },
);

export default instance;