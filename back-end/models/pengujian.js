const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Pengujian = sequelize.define(
  "Pengujian",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idPengguna: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idAlat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    noSeriWm: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    merekWm: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    standMeterAwal: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    standMeterAkhir: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    durasiPengujian: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    statusPengujian: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    waktuMulai: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    waktuSelesai: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "pengujian",
    // Sequelize will automatically manage createdAt and updatedAt columns
    // so `timestamps: true` is the default and does not need to be specified.
  }
);

module.exports = Pengujian;
