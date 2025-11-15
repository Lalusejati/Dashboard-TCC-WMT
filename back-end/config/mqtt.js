const mqtt = require("mqtt");
const Pengujian = require("../models/pengujian");

// --- Konfigurasi MQTT Broker ---
// Ganti dengan alamat, port, username, dan password MQTT broker Anda.
// Jika broker Anda tidak menggunakan autentikasi, hapus opsi username dan password.
const brokerUrl = "mqtt://localhost:1883"; // Menggunakan broker lokal
const options = {
  clientId: `backend-subscriber-${Math.random().toString(16).slice(2, 8)}`,
  // username: 'your-username',
  // password: 'your-password',
};
// --------------------------------

const topic = "pengujian/data";

const connectAndSubscribe = () => {
  const client = mqtt.connect(brokerUrl, options);

  client.on("connect", () => {
    console.log("Connected to MQTT Broker successfully.");
    client.subscribe(topic, (err) => {
      if (!err) {
        console.log(`Subscribed to topic: ${topic}`);
      } else {
        console.error(`Subscription to topic ${topic} failed:`, err);
      }
    });
  });

  client.on("message", async (topic, message) => {
    console.log(`Received message from topic ${topic}: ${message.toString()}`);
    try {
      const data = JSON.parse(message.toString());

      // Validasi sederhana untuk memastikan data yang diterima sesuai
      if (!data.idAlat || !data.noSeriWm) {
        console.warn("Received incomplete data, skipping database entry.");
        return;
      }

      // Simpan data ke database
      const newPengujian = await Pengujian.create({
        idPengguna: data.idPengguna,
        idAlat: data.idAlat,
        noSeriWm: data.noSeriWm,
        merekWm: data.merekWm,
        standMeterAwal: data.standMeterAwal,
        standMeterAkhir: data.standMeterAkhir,
        durasiPengujian: data.durasiPengujian,
        statusPengujian: data.statusPengujian,
        waktuMulai: data.waktuMulai,
        waktuSelesai: data.waktuSelesai,
      });

      console.log(
        "New testing data has been saved to the database:",
        newPengujian.toJSON()
      );
    } catch (error) {
      console.error("Failed to process or save MQTT message:", error);
    }
  });

  client.on("error", (err) => {
    console.error("MQTT Client Error:", err);
  });

  client.on("close", () => {
    console.log("MQTT connection closed. Reconnecting...");
    // Anda bisa menambahkan logika untuk reconnect di sini jika diperlukan
  });
};

module.exports = {
  connectAndSubscribe,
};
