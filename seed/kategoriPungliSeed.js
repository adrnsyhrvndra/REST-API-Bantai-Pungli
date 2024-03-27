const path = require('path');
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');

// Define Schema
const KategoriPungliSchema = require('../models/kategoriPungliSchema');

// Connect MongoDB
require('../utils/connection_db');

// Define middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const kategoriPungliSeed = async () => {
      await KategoriPungliSchema.KategoriPungli.insertMany([
            {
                  nama_kategori_pungli: "Uang pendaftaran masuk",
                  created_at: new Date(),
                  updated_at: new Date()
            },
            {
                  nama_kategori_pungli: "Uang komite",
                  created_at: new Date(),
                  updated_at: new Date()
            },
            {
                  nama_kategori_pungli: "Uang OSIS",
                  created_at: new Date(),
                  updated_at: new Date()
            },
            {
                  nama_kategori_pungli: "Uang ekstrakurikuler",
                  created_at: new Date(),
                  updated_at: new Date()
            },
            {
                  nama_kategori_pungli: "Uang ujian",
                  created_at: new Date(),
                  updated_at: new Date()
            },
            {
                  nama_kategori_pungli: "Uang daftar ulang",
                  created_at: new Date(),
                  updated_at: new Date()
            },
            {
                  nama_kategori_pungli: "Uang study tour",
                  created_at: new Date(),
                  updated_at: new Date()
            },
            {
                  nama_kategori_pungli: "Uang les",
                  created_at: new Date(),
                  updated_at: new Date()
            },
            {
                  nama_kategori_pungli: "Uang buku ajar",
                  created_at: new Date(),
                  updated_at: new Date()
            },
            {
                  nama_kategori_pungli: "Uang paguyuban",
                  created_at: new Date(),
                  updated_at: new Date()
            },
            {
                  nama_kategori_pungli: "Uang syukuran",
                  created_at: new Date(),
                  updated_at: new Date()
            },
            {
                  nama_kategori_pungli: "Uang infak",
                  created_at: new Date(),
                  updated_at: new Date()
            },
            {
                  nama_kategori_pungli: "Uang fotokopi",
                  created_at: new Date(),
                  updated_at: new Date()
            },
            {
                  nama_kategori_pungli: "Uang perpustakaan",
                  created_at: new Date(),
                  updated_at: new Date()
            },
            {
                  nama_kategori_pungli: "Uang bangunan",
                  created_at: new Date(),
                  updated_at: new Date()
            },
            {
                  nama_kategori_pungli: "Uang LKS",
                  created_at: new Date(),
                  updated_at: new Date()
            },
      ]);
};

kategoriPungliSeed();