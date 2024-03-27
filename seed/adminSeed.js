const path = require('path');
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');

// Define Schema
const AdminSchema = require('../models/adminSchema');

// Connect MongoDB
require('../utils/connection_db');

// Define middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const adminSeed = async () => {
      const hashPassword = await bcrypt.hash('admin', 8);

      await AdminSchema.Admin.insertMany([
            {
                  username: 'admin1',
                  password: hashPassword,
                  email: 'admin1@gmail.com',
                  nama_lengkap: 'admin1',
                  tanggal_lahir: '2022-01-01',
                  jenis_kelamin: 'L',
                  alamat: 'Jl. Aeromodelling Raya No. 1, Kec. Cimahi Tengah, Kota Cimahi, Jawa Barat 40513',
                  no_telp: '082223344555',
                  foto_profile: null,
                  status_online: 'offline',
                  created_at: new Date(),
                  updated_at: new Date()
            },
            {
                  username: 'admin2',
                  password: hashPassword,
                  email: 'admin2@gmail.com',
                  nama_lengkap: 'admin2',
                  tanggal_lahir: '2022-01-02',
                  jenis_kelamin: 'L',
                  alamat: 'Jl. Aeromodelling Raya No. 2, Kec. Cimahi Tengah, Kota Cimahi, Jawa Barat 40513',
                  no_telp: '082223344552',
                  foto_profile: null,
                  status_online: 'offline',
                  created_at: new Date(),
                  updated_at: new Date()
            }
      ]);
};

adminSeed();