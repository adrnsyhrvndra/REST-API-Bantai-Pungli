const path = require('path');
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');

// Define Schema
const KomentarPungliSchema = require('../models/komentarPungliSchema');

// Connect MongoDB
require('../utils/connection_db');

// Define middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const komentarPungliSeed = async () => {
      await KomentarPungliSchema.KomentarPungli.insertMany([
            {
                  userId: '6603a83efbde61e08c82508d',
                  pelaporanPungliId: '6603aa67d326ecc93969a75c',
                  komentar: 'Komentar Pungli 1',
                  upvote: 0,
                  tanggal_komentar: new Date(),
                  created_at: new Date(),
                  updated_at: new Date()
            },
      ]);
};

komentarPungliSeed();