import axios from "axios";

// Create Axios instance using your environment variable
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Should be set in your .env.local
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout (optional but recommended)
});

// Attach token from localStorage to every request (browser only)
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") { // Prevent SSR issues
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Token ${token}`; // Use "Bearer" if your backend expects it
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle global response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional: handle unauthorized globally
    // if (error.response?.status === 401) {
    //   window.location.href = "/login";
    // }
    return Promise.reject(error);
  }
);

export default apiClient;
