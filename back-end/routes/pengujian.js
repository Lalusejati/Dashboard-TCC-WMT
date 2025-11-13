const express = require("express");
const router = express.Router();
const Pengujian = require("../models/pengujian");

// @route   GET api/pengujian
// @desc    Get all pengujian data
// @access  Public
router.get("/", async (req, res) => {
  try {
    const allData = await Pengujian.findAll({
      order: [["waktu_uji", "DESC"]], // Sort by newest first
    });
    res.json(allData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/pengujian
// @desc    Add new pengujian data
// @access  Public (for now, should be protected later)
router.post("/", async (req, res) => {
  const {
    id_pelanggan,
    waktu_uji,
    lokasi_gps_lat,
    lokasi_gps_lng,
    hasil_tes_1,
    hasil_tes_2,
    hasil_tes_3,
    error_rata_rata,
    status,
  } = req.body;

  try {
    const newData = await Pengujian.create({
      id_pelanggan,
      waktu_uji,
      lokasi_gps_lat,
      lokasi_gps_lng,
      hasil_tes_1,
      hasil_tes_2,
      hasil_tes_3,
      error_rata_rata,
      status,
    });

    res.json(newData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
