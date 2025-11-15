const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const Pengujian = require("../models/pengujian");

// @route   GET api/pengujian
// @desc    Get all pengujian data
// @access  Public
router.get("/", async (req, res) => {
  try {
    const allData = await Pengujian.findAll({
      order: [["createdAt", "DESC"]], // Sort by creation time, newest first
    });
    res.json(allData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/pengujian/stats
// @desc    Get dashboard statistics for TODAY
// @access  Public
router.get("/stats", async (req, res) => {
  try {
    // Define "today"
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0
    );
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999
    );

    const todayWhereClause = {
      createdAt: {
        [Op.between]: [startOfDay, endOfDay],
      },
    };

    // Run all queries in parallel for efficiency, filtered for today
    const [totalTests, passed, failed, recentTests] = await Promise.all([
      Pengujian.count({ where: todayWhereClause }),
      Pengujian.count({
        where: { ...todayWhereClause, statusPengujian: "Lolos" },
      }),
      Pengujian.count({
        where: { ...todayWhereClause, statusPengujian: { [Op.ne]: "Lolos" } },
      }),
      Pengujian.findAll({
        where: todayWhereClause, // Also filter recent tests for today
        limit: 24, // Get last 24 for a potential hourly chart
        order: [["createdAt", "DESC"]],
      }),
    ]);

    const passRate = totalTests > 0 ? (passed / totalTests) * 100 : 0;

    res.json({
      totalTests,
      passed,
      failed,
      passRate: parseFloat(passRate.toFixed(1)), // Send as a number with one decimal place
      recentTests,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/pengujian
// @desc    Add new pengujian data (e.g., for manual entry or testing)
// @access  Public
router.post("/", async (req, res) => {
  const {
    idPengguna,
    idAlat,
    noSeriWm,
    merekWm,
    standMeterAwal,
    standMeterAkhir,
    durasiPengujian,
    statusPengujian,
    waktuMulai,
    waktuSelesai,
  } = req.body;

  try {
    const newData = await Pengujian.create({
      idPengguna,
      idAlat,
      noSeriWm,
      merekWm,
      standMeterAwal,
      standMeterAkhir,
      durasiPengujian,
      statusPengujian,
      waktuMulai,
      waktuSelesai,
    });

    res.json(newData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Endpoint untuk pengujian memasukkan data dummy
// router.get("/test-insert", async (req, res) => {
//   try {
//     const dummyData = {
//       idPengguna: 99,
//       idAlat: `WMT-FINAL-TEST-01`,
//       noSeriWm: `WM-FINAL-2408`,
//       merekWm: "Merek Final Test",
//       standMeterAwal: 300,
//       standMeterAkhir: 303,
//       durasiPengujian: 150,
//       statusPengujian: "Lolos",
//       waktuMulai: new Date(),
//       waktuSelesai: new Date(),
//     };
//
//     const created = await Pengujian.create(dummyData);
//
//     console.log("Data creation successful:", created.toJSON());
//     res.status(201).json({
//       message: "Test data created successfully. Please check your TiDB UI.",
//       data: created,
//     });
//   } catch (error) {
//     console.error("Error creating test data:", error);
//     res
//       .status(500)
//       .json({ message: "Error creating test data", error: error.message });
//   }
// });

module.exports = router;
