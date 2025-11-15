// File: back-end/mqtt-test.js
// Skrip pengujian MQTT minimal untuk mengisolasi masalah koneksi dan publikasi.

const mqtt = require("mqtt");
const path = require("path");

// Memuat variabel lingkungan dari file .env
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

// Opsi koneksi dari file .env
const options = {
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
  reconnectPeriod: 0, // Nonaktifkan reconnect otomatis untuk tes ini
};

const client = mqtt.connect(process.env.MQTT_BROKER_URL, options);

console.log("Mencoba terhubung ke broker MQTT...");

client.on("connect", () => {
  console.log("Berhasil terhubung ke MQTT Broker!");

  const topic = process.env.MQTT_TOPIC;
  const message = JSON.stringify({
    idPengguna: 101,
    idAlat: "WMT-MQTT-TEST-01",
    noSeriWm: "WM-MQTT-2411",
    merekWm: "Merek MQTT Test",
    standMeterAwal: 500,
    standMeterAkhir: 505,
    durasiPengujian: 180,
    statusPengujian: "Lolos",
    waktuMulai: new Date().toISOString(),
    waktuSelesai: new Date().toISOString(),
  });

  console.log(`Mencoba mempublikasikan pesan ke topik: ${topic}`);
  console.log(`Pesan: ${message}`);

  client.publish(topic, message, (error) => {
    if (error) {
      console.error("Gagal mempublikasikan pesan:", error);
    } else {
      console.log("Pesan berhasil dipublikasikan.");
    }
    // Menutup koneksi setelah mencoba publikasi
    console.log("Menutup koneksi.");
    client.end();
  });
});

client.on("error", (error) => {
  console.error("Terjadi error pada koneksi MQTT:", error);
  client.end(); // Pastikan koneksi ditutup jika ada error
});

client.on("close", () => {
  console.log("Koneksi MQTT ditutup.");
});
