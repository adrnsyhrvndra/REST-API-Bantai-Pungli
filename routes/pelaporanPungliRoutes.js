const express = require('express');
const router = express.Router();

// Define Schema
const PelaporanPungliSchema = require('../models/pelaporanPungliSchema');

router.get('/', async (req, res) => {
      const pelaporanPungli = await PelaporanPungliSchema.PelaporanPungli.find().populate('userId').populate('kategoriPungliId');
      res.json(pelaporanPungli);
});

router.get('/:id', async (req, res) => {
      const pelaporanPungli = await PelaporanPungliSchema.PelaporanPungli.findById(req.params.id).populate('userId').populate('kategoriPungliId');
      res.json(pelaporanPungli);
});

module.exports = router;