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
      const komentarPungli = await KomentarPungliSchema.KomentarPungli.find().populate('userId').populate('pelaporanPungliId');
      res.json(komentarPungli);
});

router.get('/:id', async (req, res) => {
      const komentarPungli = await KomentarPungliSchema.KomentarPungli.findById(req.params.id).populate('userId').populate('pelaporanPungliId');
      res.json(komentarPungli);
});

router.post('/', async (req, res) => {
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

      komentarPungliData.save();

      res.json({status: 'success', message: 'Data Berhasil Ditambahkan', data: komentarPungliData});
});

router.delete('/:id', async (req, res) => {
      const komentarPungli = await KomentarPungliSchema.KomentarPungli.findByIdAndDelete(req.params.id);
      res.json(komentarPungli);
});

module.exports = router;