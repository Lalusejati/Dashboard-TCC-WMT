const mqtt = require("mqtt");

// Konfigurasi MQTT Broker (harus sama dengan di subscriber/back-end)
const brokerUrl = "mqtt://localhost:1883";
const topic = "pengujian/data";

// Data contoh yang akan dikirim
/*
const testData = {
  idPengguna: 1,
  idAlat: "WMT-SIM-01",
  noSeriWm: "SN-SIM-98765",
  merekWm: "Simulasi-Test",
  standMeterAwal: 80.0,
  standMeterAkhir: 65.2,
  durasiPengujian: 130,
  statusPengujian: "Lolos",
  waktuMulai: new Date().toISOString(),
  waktuSelesai: new Date(Date.now() + 120 * 1000).toISOString(), // 120 detik setelah mulai
};

const testData = {
  idPengguna: 1,
  idAlat: "WMT-001",
  noSeriWm: `WM-A-${Math.floor(100000 + Math.random() * 900000)}`, // No seri acak
  merekWm: "Merek A",
  standMeterAwal: 125.5,
  standMeterAkhir: 126.5,
  durasiPengujian: 60, // 60 detik
  statusPengujian: "Lolos",
  waktuMulai: new Date().toISOString(),
  waktuSelesai: new Date(Date.now() + 60000).toISOString(), // 60 detik setelah mulai
};


const testData = {
  idPengguna: 2,
  idAlat: "WMT-002",
  noSeriWm: `WM-B-${Math.floor(100000 + Math.random() * 900000)}`, // No seri acak
  merekWm: "Merek B",
  standMeterAwal: 250.0,
  standMeterAkhir: 251.2, // Perbedaan lebih dari 1.0, diasumsikan gagal
  durasiPengujian: 75, // 75 detik
  statusPengujian: "Gagal",
  waktuMulai: new Date().toISOString(),
  waktuSelesai: new Date(Date.now() + 75000).toISOString(), // 75 detik setelah mulai
};

const testData = {
  idPengguna: 1,
  idAlat: "WMT-001",
  noSeriWm: `WM-C-${Math.floor(100000 + Math.random() * 900000)}`, // No seri acak
  merekWm: "Merek C",
  standMeterAwal: 50.75,
  standMeterAkhir: 51.74,
  durasiPengujian: 30, // 30 detik
  statusPengujian: "Lolos",
  waktuMulai: new Date().toISOString(),
  waktuSelesai: new Date(Date.now() + 30000).toISOString(), // 30 detik setelah mulai
};

const testData = {
  idPengguna: 3,
  idAlat: "WMT-003",
  noSeriWm: `WM-D-${Math.floor(100000 + Math.random() * 900000)}`,
  merekWm: "Merek D",
  standMeterAwal: 10.0,
  standMeterAkhir: null, // Nilai akhir hilang
  durasiPengujian: 120,
  statusPengujian: "Gagal",
  waktuMulai: new Date().toISOString(),
  waktuSelesai: null, // Waktu selesai hilang
};
*/

const testData = {
  idPengguna: 1,
  idAlat: "WMT-SIM-01",
  noSeriWm: "SN-SIM-98765",
  merekWm: "Simulasi-Test",
  standMeterAwal: 80.0,
  standMeterAkhir: 85.2,
  durasiPengujian: 137,
  statusPengujian: "Lolos",
  waktuMulai: new Date().toISOString(),
  waktuSelesai: new Date(Date.now() + 120 * 1000).toISOString(), // 120 detik setelah mulai
};

// Opsi koneksi
const options = {
  clientId: `test-publisher-${Math.random().toString(16).slice(2, 8)}`,
};

// Buat koneksi ke broker
const client = mqtt.connect(brokerUrl, options);

client.on("connect", () => {
  console.log("Test Publisher connected to MQTT Broker.");

  // Ubah data menjadi string JSON
  const message = JSON.stringify(testData);

  // Publish pesan
  client.publish(topic, message, (err) => {
    if (err) {
      console.error("Failed to publish message:", err);
    } else {
      console.log(`Message published to topic '${topic}':`);
      console.log(message);
    }

    // Tutup koneksi setelah selesai publish
    client.end();
  });
});

client.on("error", (err) => {
  console.error("MQTT Client Error:", err);
  client.end();
});
