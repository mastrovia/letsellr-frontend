import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4500/letseller",
  withCredentials: true,
});

// Add response interceptor to handle authentication errors
instance.interceptors.response.use(
  (response) => {
    // Return successful responses as-is
    return response;
  },
  (error) => {
    // Handle authentication errors
    if (error.response) {
      const { status, data } = error.response;

      // Check for unauthorized (401, 403, or 404 with auth error message) responses
      if (status === 401 || status === 403 || status === 404) {
        // Check if the error message indicates not being logged in
        const isAuthError =
          data?.message?.toLowerCase().includes('not logged in') ||
          data?.message?.toLowerCase().includes('unauthorized') ||
          data?.message?.toLowerCase().includes('not authenticated') ||
          data?.message?.toLowerCase().includes('login required') ||
          data?.message?.toLowerCase().includes('no token') ||
          data?.message?.toLowerCase().includes('invalid token') ||
          data?.message?.toLowerCase().includes('token expired') ||
          data?.message?.toLowerCase().includes('admin not logged in');

        if (isAuthError) {
          // Remove token from localStorage
          localStorage.removeItem("adminToken");

          // Only redirect if we're on an admin page
          if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
            // Redirect to login page
            window.location.href = '/admin/login';
          }
        }
      }
    }

    // Return the error for further handling
    return Promise.reject(error);
  }
);

export default instance;
