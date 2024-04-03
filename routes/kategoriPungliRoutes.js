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
      try {
            const kategoriPungli = await KategoriPungliSchema.KategoriPungli.find();
            res.json(kategoriPungli);

      } catch (error) {
            res.status(500).json({
                  success: false,
                  message: error.message
            });
      }
});

router.get('/:id', async (req, res) => {
      try {
            const kategoriPungli = await KategoriPungliSchema.KategoriPungli.findById(req.params.id);
            res.json(kategoriPungli);
            
      } catch (error) {
            res.status(500).json({
                  success: false,
                  message: error.message
            });
      }
});

router.post('/', async (req, res) => {
      try {
            const { nama_kategori_pungli } = req.body;

            const kategoriPungliData = await new KategoriPungliSchema.KategoriPungli({
                  nama_kategori_pungli,
                  created_at: new Date(),
                  updated_at: new Date()
            });
      
            const data_keberhasilan_kategori_pungli = await kategoriPungliData.save();
      
            res.json({status: 'success', message: 'Data Berhasil Ditambahkan', data: data_keberhasilan_kategori_pungli});
            
      } catch (error) {
            res.status(500).json({
                  success: false,
                  message: error.message
            });
      }
});

router.put('/:id', async (req,res) => {
      try {
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

      } catch (error) {
            res.status(500).json({
                  success: false,
                  message: error.message
            });
      }
});

router.delete('/:id', async (req, res) => {
      try {
            const deleteKategoriPungli = await KategoriPungliSchema.KategoriPungli.findByIdAndDelete(req.params.id);

            const deletePelaporanPungli = await PelaporanPungliSchema.PelaporanPungli.deleteOne({ kategoriPungliId: req.params.id });
      
            res.json({
                  status: 'success', 
                  message: 'Data Berhasil Dihapus', 
                  dataKategoriPungli: deleteKategoriPungli, 
                  dataPelaporanPungli: deletePelaporanPungli
            });

      } catch (error) {
            res.status(500).json({
                  success: false,
                  message: error.message
            });
      }
});

module.exports = router;