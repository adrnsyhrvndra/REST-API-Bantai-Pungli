const path = require('path');
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');

// Define Schema
const PelaporanPungliSchema = require('../models/pelaporanPungliSchema');

// Connect MongoDB
require('../utils/connection_db');

// Define middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const pelaporanPungliSeed = async () => {
      await PelaporanPungliSchema.PelaporanPungli.insertMany([
            {
                  userId: '6603a83efbde61e08c82508d',
                  kategoriPungliId: '6603a894c3d7109ccf0f6e8a',
                  judul_pelaporan: 'Pelaporan Pungli 1',
                  deskripsi_pelaporan: 'Deskripsi Pelaporan Pungli 1',
                  tanggal_pelaporan: new Date(),
                  status_pelaporan: 'Belum Selesai',
                  bukti_pendukung: 'bukti-pendukung-1.png',
                  created_at: new Date(),
                  updated_at: new Date()
            },
      ]);
};

pelaporanPungliSeed();