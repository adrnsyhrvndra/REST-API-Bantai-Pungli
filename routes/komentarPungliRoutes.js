const express = require('express');
const router = express.Router();

// Define Schema
const KomentarPungliSchema = require('../models/komentarPungliSchema');

router.get('/', async (req, res) => {
      const komentarPungli = await KomentarPungliSchema.KomentarPungli.find().populate('userId').populate('pelaporanPungliId');
      res.json(komentarPungli);
});

router.get('/:id', async (req, res) => {
      const komentarPungli = await KomentarPungliSchema.KomentarPungli.findById(req.params.id).populate('userId').populate('pelaporanPungliId');
      res.json(komentarPungli);
});

module.exports = router;