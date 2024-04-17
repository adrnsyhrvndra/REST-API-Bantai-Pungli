const express = require('express');
const router = express.Router();
const cloudinary = require('../utils/cloudinary');
const upload = require('../middleware/multer');

// Define Schema
const PelaporanPungliSchema = require('../models/pelaporanPungliSchema');

router.get('/', async (req, res) => {
      try {
            const pelaporanPungli = await PelaporanPungliSchema.PelaporanPungli.find().populate('userId').populate('kategoriPungliId');
            res.json(pelaporanPungli);

      } catch (error) {
            res.status(500).json({
                  success: false,
                  message: error.message
            });
      }
});

router.get('/:id', async (req, res) => {
      try {
            const pelaporanPungli = await PelaporanPungliSchema.PelaporanPungli.findById(req.params.id).populate('userId').populate('kategoriPungliId');
            res.json(pelaporanPungli);

      } catch (error) {
            res.status(500).json({
                  success: false,
                  message: error.message
            });
      }
});

router.post('/', upload.single('bukti_pendukung'), async (req, res) => {
      try {
            const { userId ,kategoriPungliId, judul_pelaporan, deskripsi_pelaporan, status_pelaporan, bukti_pendukung } = req.body;

            if (req.file) {
                  cloudinary.uploader.upload(req.file.path, async (err, result) => {
                        const pelaporanPungliData = await new PelaporanPungliSchema.PelaporanPungli({
                              userId,
                              kategoriPungliId,
                              judul_pelaporan,
                              deskripsi_pelaporan,
                              tanggal_pelaporan: new Date(),
                              status_pelaporan,
                              bukti_pendukung: result.url,
                              created_at: new Date(),
                              updated_at: new Date()
                        });
                  
                        const data_keberhasilan_pelaporan_pungli = await pelaporanPungliData.save();
      
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
                              data: data_keberhasilan_pelaporan_pungli
                        });
                  });

            } else {
                  const pelaporanPungliData = await new PelaporanPungliSchema.PelaporanPungli({
                        userId,
                        kategoriPungliId,
                        judul_pelaporan,
                        deskripsi_pelaporan,
                        tanggal_pelaporan: new Date(),
                        status_pelaporan,
                        bukti_pendukung,
                        created_at: new Date(),
                        updated_at: new Date()
                  });
      
                  const data_keberhasilan_pelaporan_pungli = await pelaporanPungliData.save();
      
                  res.status(200).json({
                        success: true,
                        message: "Success",
                        data: data_keberhasilan_pelaporan_pungli
                  });
            }

      } catch (error) {
            res.status(500).json({
                  success: false,
                  message: error.message
            });
      }
});

router.put('/:id', upload.single('bukti_pendukung'), async (req,res) => {
      try {
            const { userId ,kategoriPungliId, judul_pelaporan, deskripsi_pelaporan, tanggal_pelaporan, status_pelaporan, bukti_pendukung } = req.body;

            if (req.file) {
      
                  cloudinary.uploader.upload(req.file.path, async (err, result) => {
                        const pelaporanPungliUpdate = await PelaporanPungliSchema.PelaporanPungli.findOneAndUpdate(
                              {_id: req.params.id},
                              {
                                    $set : {
                                          userId,
                                          kategoriPungliId,
                                          judul_pelaporan,
                                          deskripsi_pelaporan,
                                          tanggal_pelaporan: tanggal_pelaporan,
                                          status_pelaporan,
                                          bukti_pendukung: result.url,
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
                              data: pelaporanPungliUpdate
                        });
      
                  });
      
            } else {
                  const pelaporanPungliUpdate = await PelaporanPungliSchema.PelaporanPungli.findOneAndUpdate(
                        {_id: req.params.id},
                        {
                              $set : {
                                    userId,
                                    kategoriPungliId,
                                    judul_pelaporan,
                                    deskripsi_pelaporan,
                                    tanggal_pelaporan: tanggal_pelaporan,
                                    status_pelaporan,
                                    bukti_pendukung: null,
                                    updated_at: new Date()
                              }
                        },
                  );
      
                  res.status(200).json({
                        success: true,
                        message: "Success",
                        data: pelaporanPungliUpdate
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
            const pelaporanPungli = await PelaporanPungliSchema.PelaporanPungli.findByIdAndDelete(req.params.id);
            res.json(pelaporanPungli);

      } catch (error) {
            res.status(500).json({
                  success: false,
                  message: error.message
            });
      }
});

module.exports = router;