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

router.post('/', async (req, res) => {
      const { nama_kategori_pungli } = req.body;

      const kategoriPungliData = await new KategoriPungliSchema.KategoriPungli({
            nama_kategori_pungli,
            created_at: new Date(),
            updated_at: new Date()
      });

      kategoriPungliData.save();

      res.json({status: 'success', message: 'Data Berhasil Ditambahkan', data: kategoriPungliData});
});

module.exports = router;