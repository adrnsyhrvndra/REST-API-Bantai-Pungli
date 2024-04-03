const express = require('express');
const router = express.Router();

// Define Schema
const KomentarPungliSchema = require('../models/komentarPungliSchema');

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
            const komentarPungli = await KomentarPungliSchema.KomentarPungli.find().populate('userId').populate('pelaporanPungliId');
            res.json(komentarPungli);
            
      } catch (error) {
            res.status(500).json({
                  success: false,
                  message: error.message
            });
      }
});

router.get('/:id', async (req, res) => {
      try {
            const komentarPungli = await KomentarPungliSchema.KomentarPungli.findById(req.params.id).populate('userId').populate('pelaporanPungliId');
            res.json(komentarPungli);
            
      } catch (error) {
            res.status(500).json({
                  success: false,
                  message: error.message
            });
      }
});

router.post('/', async (req, res) => {
      try {
            const { userId, pelaporanPungliId, komentar } = req.body;

            const komentarPungliData = await new KomentarPungliSchema.KomentarPungli({
                  userId,
                  pelaporanPungliId,
                  komentar,
                  jumlah_upvote: 0,
                  tanggal_komentar: new Date(),
                  created_at: new Date(),
                  updated_at: new Date()
            });
      
            const data_keberhasilan_komentar_pungli = await komentarPungliData.save();
      
            res.json({status: 'success', message: 'Data Berhasil Ditambahkan', data: data_keberhasilan_komentar_pungli});

      } catch (error) {
            res.status(500).json({
                  success: false,
                  message: error.message
            });
      }
});

router.delete('/:id', async (req, res) => {
      try {
            const komentarPungli = await KomentarPungliSchema.KomentarPungli.findByIdAndDelete(req.params.id);
            res.json(komentarPungli);
            
      } catch (error) {
            res.status(500).json({
                  success: false,
                  message: error.message
            });
      }
});

module.exports = router;