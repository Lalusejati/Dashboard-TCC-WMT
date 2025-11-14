import axios from "axios";

// Buat instance axios dengan konfigurasi dasar
const ApiAxios = axios.create({
  baseURL: "http://localhost:5100/api", // Alamat dasar back-end Anda
  timeout: 10000, // Waktu tunggu permintaan (10 detik)
  headers: {
    "Content-Type": "application/json",
  },
});

export default ApiAxios;
