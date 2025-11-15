import axios from "axios";

// Buat instance axios dengan konfigurasi dasar
const ApiAxios = axios.create({
  // baseURL: "http://localhost:5100/api", // Alamat lokal untuk development
  baseURL: "https://dashboard-tcc-wmt.onrender.com/api", // Alamat backend di Render
  timeout: 10000, // Waktu tunggu permintaan (10 detik)
  headers: {
    "Content-Type": "application/json",
  },
});

export default ApiAxios;
