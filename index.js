const path = require('path');
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');

// Define Schema
const UsersSchema = require('./models/userSchema');
const AdminSchema = require('./models/adminSchema');
const KategoriPungliSchema = require('./models/kategoriPungliSchema');
const PelaporanPungliSchema = require('./models/pelaporanPungliSchema');
const KomentarPungliSchema = require('./models/komentarPungliSchema');

// Connect MongoDB
require('./utils/connection_db');

// Define middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// ==============================================================
// ==============================================================

// define routes
app.use('/users', require('./routes/usersRoutes'));
app.use('/admin', require('./routes/adminRoutes'));
app.use('/kategoriPungli', require('./routes/kategoriPungliRoutes'));
app.use('/pelaporanPungli', require('./routes/pelaporanPungliRoutes'));
app.use('/komentarPungli', require('./routes/komentarPungliRoutes'));

// ==============================================================
// ==============================================================

app.listen(3000, () => {
      console.log(`Server is running on url ${dotenv.parsed.BASE_URL}`);
});