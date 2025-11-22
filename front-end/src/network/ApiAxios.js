import axios from "axios";

// Tentukan baseURL berdasarkan environment
// Saat 'npm start' (development), process.env.NODE_ENV adalah 'development'
// Saat 'npm run build' (production), process.env.NODE_ENV adalah 'production'
const baseURL =
  // process.env.NODE_ENV === "production"
  //   ? process.env.REACT_APP_API_BASE_URL // Ambil dari .env saat build
  //   : "http://localhost:5100/api"; // Gunakan alamat lokal saat development

  process.env.REACT_APP_API_BASE_URL || "http://localhost:5100/api";
// Buat instance axios dengan konfigurasi dasar
const ApiAxios = axios.create({
  baseURL: baseURL,
  timeout: 10000, // Waktu tunggu permintaan (10 detik)
  headers: {
    "Content-Type": "application/json",
  },
});

export default ApiAxios;
