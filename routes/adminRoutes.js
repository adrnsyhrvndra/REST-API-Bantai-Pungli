const express = require('express');
const router = express.Router();
const cloudinary = require('../utils/cloudinary');
const upload = require('../middleware/multer');

// Define Schema
const AdminSchema = require('../models/adminSchema');

router.get('/', async (req, res) => {
      const admin = await AdminSchema.Admin.find();
      res.json(admin);
});

router.get('/:id', async (req, res) => {
      const admin = await AdminSchema.Admin.findById(req.params.id);
      res.json(admin);
});

router.post('/', upload.single('foto_profile'), async (req, res) => {
      const { username, password, email, nama_lengkap, tanggal_lahir, jenis_kelamin, alamat, no_telp, status_online, foto_profile} = req.body;

      if (req.file) {
            
            cloudinary.uploader.upload(req.file.path, async (err, result) => {
                  const adminData = await new AdminSchema.Admin({
                        username,
                        password,
                        email,
                        nama_lengkap,
                        tanggal_lahir,
                        jenis_kelamin,
                        alamat,
                        no_telp,
                        foto_profile: result.url,
                        status_online,
                        created_at: new Date(),
                        updated_at: new Date()
                  });
            
                  adminData.save();

                  if(err) {
                        console.log(err);
                        return res.status(500).json({
                              success: false,
                              message: "Error"
                        })
                  }
      
                  res.status(200).json({
                        success: true,
                        message: "Success",
                        data_profile: result,
                        data: adminData
                  });

            });

      } else {

            const adminData = await new AdminSchema.Admin({
                  username,
                  password,
                  email,
                  nama_lengkap,
                  tanggal_lahir,
                  jenis_kelamin,
                  alamat,
                  no_telp,
                  foto_profile: null,
                  status_online,
                  created_at: new Date(),
                  updated_at: new Date()
            });

            adminData.save();

            res.status(200).json({
                  success: true,
                  message: "Success",
                  data: adminData
            });
      }
});

router.put('/:id', async (req,res) => {
      const { username, password, email, nama_lengkap, tanggal_lahir, jenis_kelamin, alamat, no_telp, foto_profile, status_online } = req.body;

      const adminUpdate = await AdminSchema.Admin.findOneAndUpdate(
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

      res.json({status: 'success', message: 'Data Berhasil Diupdate', data: adminUpdate});

});

router.delete('/:id', async (req, res) => {
      const admin = await AdminSchema.Admin.findByIdAndDelete(req.params.id);
      res.json(admin);
});

module.exports = router;