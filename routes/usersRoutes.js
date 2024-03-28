const express = require('express');
const router = express.Router();

// Define Schema
const UsersSchema = require('../models/userSchema');
const PelaporanPungliSchema = require('../models/pelaporanPungliSchema');
const KomentarPungliSchema = require('../models/komentarPungliSchema');

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

router.put('/:id', async (req,res) => {
      const { username, password, email, nama_lengkap, tanggal_lahir, jenis_kelamin, alamat, no_telp, foto_profile, status_online } = req.body;

      const userUpdate = await UsersSchema.Users.findOneAndUpdate(
            {_id: req.params.id},
            {
                  $set : {
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
                        updated_at: new Date()
                  }
            },
      );

      res.json({status: 'success', message: 'Data Berhasil Diupdate', data: userUpdate});

});

router.delete('/:id', async (req, res) => {
      const deleteUser = await UsersSchema.Users.findByIdAndDelete(req.params.id);

      const deletePelaporanPungli = await PelaporanPungliSchema.PelaporanPungli.deleteOne({ userId: req.params.id });

      const deleteKomentarPungli = await KomentarPungliSchema.KomentarPungli.deleteOne({ userId: req.params.id });

      res.json({
            status: 'success', 
            message: 'Data Berhasil Dihapus', 
            dataUser: deleteUser, 
            dataPelaporanPungli: deletePelaporanPungli,
            dataKomentarPungli: deleteKomentarPungli
      });
});

module.exports = router;