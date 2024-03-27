const mongoose = require('mongoose');

// Connect MongoDB
require('../utils/connection_db');

const pelaporanPungliSchema = new mongoose.Schema({
      userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
      },
      kategoriPungliId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'KategoriPungli',
      },
      judul_pelaporan: {
            type: String,
            required: [true, 'Judul Pelaporan is required'],
            max: [165, 'Judul Pelaporan must be less than 100 characters'],
      },
      deskripsi_pelaporan: {
            type: String,
            required: [true, 'Deskripsi Pelaporan is required'],
            max: [100, 'Deskripsi Pelaporan must be less than 100 characters'],
      },
      tanggal_pelaporan: {
            type: Date,
            required: [true, 'Tangal Lahir is required'],
      },
      status_pelaporan: {
            type: String,
            required: [true, 'Status Pelaporan is required'],
            enum: ['Belum Selesai', 'Selesai', 'Dalam Proses'],
      },
      bukti_pendukung: {
            type: String,
      },
      created_at: {
            type: Date,
            default: Date.now
      },
      updated_at: {
            type: Date,
            default: Date.now
      },
});

const PelaporanPungli = mongoose.model('PelaporanPungli', pelaporanPungliSchema);
module.exports = {
      PelaporanPungli
};