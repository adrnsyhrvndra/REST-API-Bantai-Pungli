const express = require('express');
const router = express.Router();

// Define Schema
const KategoriPungliSchema = require('../models/kategoriPungliSchema');
const PelaporanPungliSchema = require('../models/pelaporanPungliSchema');

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

router.delete('/:id', async (req, res) => {
      const deleteKategoriPungli = await KategoriPungliSchema.KategoriPungli.findByIdAndDelete(req.params.id);

      const deletePelaporanPungli = await PelaporanPungliSchema.PelaporanPungli.deleteOne({ kategoriPungliId: req.params.id });

      res.json({
            status: 'success', 
            message: 'Data Berhasil Dihapus', 
            dataKategoriPungli: deleteKategoriPungli, 
            dataPelaporanPungli: deletePelaporanPungli
      });
});

module.exports = router;