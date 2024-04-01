const express = require('express');
const router = express.Router();
const cloudinary = require('../utils/cloudinary');
const upload = require('../middleware/multer');
const bcrypt = require('bcrypt');

// Define Schema
const UsersSchema = require('../models/userSchema');
const AdminSchema = require('../models/adminSchema');


router.post('/login', async (req, res) => {
      const { username, password } = req.body;
      const user = await UsersSchema.Users.findOne({ username });
      const admin = await AdminSchema.Admin.findOne({ username});
      
      if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                  res.json({ status: 'success', message: 'Login Berhasil', data: user });

            } else {
                  res.json({ status: 'error', message: 'Password Salah' });
            }

      } else if (admin) {
            const isMatch = await bcrypt.compare(password, admin.password);
            if (isMatch) {
                  res.json({ status: 'success', message: 'Login Berhasil', data: admin });
            } else {
                  res.json({ status: 'error', message: 'Password Salah' });
            }

      } else {
            res.json({ status: 'error', message: 'Username Tidak Terdaftar' });
      }
});


router.post('/register', upload.single('fotos_profile'), async (req, res) => {
      
      const { username, password, email, nama_lengkap, tanggal_lahir, jenis_kelamin, alamat, no_telp, status_online, foto_profile } = req.body;

      const user = await UsersSchema.Users.find();

});