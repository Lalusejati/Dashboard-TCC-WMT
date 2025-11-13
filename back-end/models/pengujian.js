const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // We will create this file next

const Pengujian = sequelize.define(
  "Pengujian",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_pelanggan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    waktu_uji: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    lokasi_gps_lat: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: false,
    },
    lokasi_gps_lng: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: false,
    },
    hasil_tes_1: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    hasil_tes_2: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    hasil_tes_3: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    error_rata_rata: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Akurat", "Ganti"),
      allowNull: false,
    },
  },
  {
    tableName: "pengujian",
    timestamps: false, // Assuming you don't want createdAt/updatedAt columns
  }
);

module.exports = Pengujian;
