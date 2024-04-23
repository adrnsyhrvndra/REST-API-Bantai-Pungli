const express = require('express');
const router = express.Router();
const cloudinary = require('../utils/cloudinary');
const upload = require('../middleware/multer');
const bcrypt = require('bcrypt');

// Define Schema
const UsersSchema = require('../models/userSchema');
const PelaporanPungliSchema = require('../models/pelaporanPungliSchema');
const KomentarPungliSchema = require('../models/komentarPungliSchema');

router.get('/', async (req, res) => {
      try {
            const users = await UsersSchema.Users.find();
            res.json(users);

      } catch (error) {
            res.status(500).json({
                  success: false,
                  message: error.message
            });
      }

});

router.get('/:id', async (req, res) => {
      try {
            const users = await UsersSchema.Users.findById(req.params.id);
            res.json(users);

      } catch (error) {
            res.status(500).json({
                  success: false,
                  message: error.message
            });
      }
});

router.post('/', upload.single('foto_profile'), async (req, res) => {
      try {
            const { username, password, email, nama_lengkap, tanggal_lahir, jenis_kelamin, alamat, no_telp, status_online, foto_profile } = req.body;

            if (req.file) {

                  cloudinary.uploader.upload(req.file.path, async (err, result) => {
            
                        const usersData = await new UsersSchema.Users({
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
            
                        const data_keberhasilan_user = await usersData.save();
            
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
                              data: data_keberhasilan_user
                        });
                        
                  });
                  
            } else {

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

                  const data_keberhasilan_user = await usersData.save();

                  res.status(200).json({
                        success: true,
                        message: "Success",
                        data: data_keberhasilan_user
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

            const hashPassword = await bcrypt.hash( password, 8);

            if (req.file) {

                  cloudinary.uploader.upload(req.file.path, async (err, result) => {
                        const userUpdate = await UsersSchema.Users.findOneAndUpdate(
                              {_id: req.params.id},
                              {
                                    $set : {
                                          username,
                                          password: hashPassword,
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
                              data: userUpdate
                        });
                  });

            } else {

                  const userUpdate = await UsersSchema.Users.findOneAndUpdate(
                        {_id: req.params.id},
                        {
                              $set : {
                                    username,
                                    password: hashPassword,
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

                  res.status(200).json({
                        success: true,
                        message: "Success",
                        data: userUpdate
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

      } catch (error) {
            res.status(500).json({
                  success: false,
                  message: error.message
            });
      }
});

module.exports = router;