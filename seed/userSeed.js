const path = require('path');
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');

// Define Schema
const UsersSchema = require('../models/userSchema');

// Connect MongoDB
require('../utils/connection_db');

// Define middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const usersSeed = async () => {
      const hashPassword = await bcrypt.hash('user', 8);

      await UsersSchema.Users.insertMany([
            {
                  username: 'user1',
                  password: hashPassword,
                  email: 'user1@gmail.com',
                  nama_lengkap: 'user1',
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
                  username: 'user2',
                  password: hashPassword,
                  email: 'user2@gmail.com',
                  nama_lengkap: 'user2',
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

usersSeed();