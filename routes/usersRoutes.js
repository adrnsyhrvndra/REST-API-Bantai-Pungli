const express = require('express');
const router = express.Router();

// Define Schema
const UsersSchema = require('../models/userSchema');

router.get('/', async (req, res) => {
      const users = await UsersSchema.Users.find();
      res.json(users);
});

router.get('/:id', async (req, res) => {
      const users = await UsersSchema.Users.findById(req.params.id);
      res.json(users);
});

router.post('/', async (req, res) => {
      const { username, password, email, nama_lengkap, tanggal_lahir, jenis_kelamin, alamat, no_telp, foto_profile, status_online } = req.body;

      const usersData = await new UsersSchema.Users({
            username,
            password,
            email,
            nama_lengkap,
            tanggal_lahir,
            jenis_kelamin,
            alamat,
            no_telp,
            foto_profile,
            status_online,
            created_at: new Date(),
            updated_at: new Date()
      });

      usersData.save();

      res.json({status: 'success', message: 'Data Berhasil Ditambahkan', data: usersData});
});

module.exports = router;