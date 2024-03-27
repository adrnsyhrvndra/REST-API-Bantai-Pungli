const express = require('express');
const router = express.Router();

// Define Schema
const KategoriPungliSchema = require('../models/kategoriPungliSchema');

router.get('/', async (req, res) => {
      const kategoriPungli = await KategoriPungliSchema.KategoriPungli.find();
      res.json(kategoriPungli);
});

router.get('/:id', async (req, res) => {
      const kategoriPungli = await KategoriPungliSchema.KategoriPungli.findById(req.params.id);
      res.json(kategoriPungli);
});

module.exports = router;