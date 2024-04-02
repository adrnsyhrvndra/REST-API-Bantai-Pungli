const express = require('express');
const router = express.Router();

// Define Schema
const KategoriPungliSchema = require('../models/kategoriPungliSchema');
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

router.put('/:id', async (req,res) => {
      const { nama_kategori_pungli } = req.body;

      const kaetgoriPungliUpdate = await KategoriPungliSchema.KategoriPungli.findOneAndUpdate(
            {_id: req.params.id},
            {
                  $set : {
                        nama_kategori_pungli,
                        updated_at: new Date()
                  }
            },
      );

      res.json({status: 'success', message: 'Data Berhasil Diubah', data: kaetgoriPungliUpdate});

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