import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://qr-code-02fo.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;