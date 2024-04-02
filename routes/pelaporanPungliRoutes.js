const express = require('express');
const router = express.Router();
const cloudinary = require('../utils/cloudinary');
const upload = require('../middleware/multer');

// Define Schema
const PelaporanPungliSchema = require('../models/pelaporanPungliSchema');

// Middleware To Check Authentication
router.use((req, res, next) => {
      if (!req.session.user) {
            res.send('Please Login First You Are Not Authenticated');
      } else {
            next();
      }
});

router.get('/', async (req, res) => {
      const pelaporanPungli = await PelaporanPungliSchema.PelaporanPungli.find().populate('userId').populate('kategoriPungliId');
      res.json(pelaporanPungli);
});

router.get('/:id', async (req, res) => {
      const pelaporanPungli = await PelaporanPungliSchema.PelaporanPungli.findById(req.params.id).populate('userId').populate('kategoriPungliId');
      res.json(pelaporanPungli);
});

router.post('/', upload.single('bukti_pendukung'), async (req, res) => {
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
            
                  pelaporanPungliData.save();

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
                        data: pelaporanPungliData
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
                  bukti_pendukung: null,
                  created_at: new Date(),
                  updated_at: new Date()
            });

            pelaporanPungliData.save();

            res.status(200).json({
                  success: true,
                  message: "Success",
                  data: pelaporanPungliData
            });
      }
});

router.put('/:id', upload.single('bukti_pendukung'), async (req,res) => {
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

});

router.delete('/:id', async (req, res) => {
      const pelaporanPungli = await PelaporanPungliSchema.PelaporanPungli.findByIdAndDelete(req.params.id);
      res.json(pelaporanPungli);
});

module.exports = router;