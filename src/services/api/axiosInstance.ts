import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
});

export const setupAxiosInterceptors = (getToken: () => string | null) => {
  axiosInstance.interceptors.request.use((config) => {
    const token = getToken();

    // adjuntamos el token aunque la API pública no lo use (requisito)
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
};
