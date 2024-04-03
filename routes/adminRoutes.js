const express = require('express');
const router = express.Router();
const cloudinary = require('../utils/cloudinary');
const upload = require('../middleware/multer');

// Define Schema
const AdminSchema = require('../models/adminSchema');

// Middleware To Check Authentication
router.use((req, res, next) => {
      if (!req.session.user) {
            res.send('Please Login First You Are Not Authenticated');
      } else {
            next();
      }
});


router.get('/', async (req, res) => {
      try {
            const admin = await AdminSchema.Admin.find();
            res.json(admin);

      } catch (error) {
            res.status(500).json({
                  success: false,
                  message: error.message
            });
      }
});

router.get('/:id', async (req, res) => {
      try {
            const admin = await AdminSchema.Admin.findById(req.params.id);
            res.json(admin);
            
      } catch (error) {
            res.status(500).json({
                  success: false,
                  message: error.message
            });
      }
});

router.post('/', upload.single('foto_profile'), async (req, res) => {
      try {
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
                  
                        const data_keberhasilan_admin = await adminData.save();
      
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
                              data: data_keberhasilan_admin
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
      
                  const data_keberhasilan_admin = await adminData.save();
      
                  res.status(200).json({
                        success: true,
                        message: "Success",
                        data: data_keberhasilan_admin
                  });
            }

      } catch (error) {
            res.status(500).json({
                  success: false,
                  message: error.message
            });
      }
});

router.put('/:id', upload.single('foto_profile'), async (req,res) => {
      try {
            const { username, password, email, nama_lengkap, tanggal_lahir, jenis_kelamin, alamat, no_telp, foto_profile, status_online } = req.body;

            if (req.file) {
      
                  cloudinary.uploader.upload(req.file.path, async (err, result) => {
      
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
                                          foto_profile: result.url,
                                          status_online,
                                          updated_at: new Date()
                                    }
                              },
                        );
      
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
                              data: adminUpdate
                        });
      
                  });
      
            } else {
      
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
                                    foto_profile: null,
                                    status_online,
                                    updated_at: new Date()
                              }
                        },
                  );
      
                  res.status(200).json({
                        success: true,
                        message: "Success",
                        data: adminUpdate
                  });
      
            }

      } catch (error) {
            res.status(500).json({
                  success: false,
                  message: error.message
            });
      }

});

router.delete('/:id', async (req, res) => {
      try {
            const admin = await AdminSchema.Admin.findByIdAndDelete(req.params.id);
            res.json(admin);

      } catch (error) {
            res.status(500).json({
                  success: false,
                  message: error.message
            });
      }
});

module.exports = router;