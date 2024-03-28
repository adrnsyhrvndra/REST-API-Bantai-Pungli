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

router.post('/', async (req, res) => {
      const { userId ,kategoriPungliId, judul_pelaporan, deskripsi_pelaporan, status_pelaporan, bukti_pendukung } = req.body;

      const pelaporanPungliData = await new PelaporanPungliSchema.PelaporanPungli({
            userId,
            kategoriPungliId,
            judul_pelaporan,
            deskripsi_pelaporan,
            tanggal_pelaporan: new Date(),
            status_pelaporan,
            bukti_pendukung,
            created_at: new Date(),
            updated_at: new Date()
      });

      pelaporanPungliData.save();

      res.json({status: 'success', message: 'Data Berhasil Ditambahkan', data: pelaporanPungliData});
});

router.put('/:id', async (req,res) => {
      const { userId ,kategoriPungliId, judul_pelaporan, deskripsi_pelaporan, tanggal_pelaporan, status_pelaporan, bukti_pendukung } = req.body;

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
                        bukti_pendukung,
                        updated_at: new Date()
                  }
            },
      );

      res.json({status: 'success', message: 'Data Berhasil Diubah', data: pelaporanPungliUpdate});

});

router.delete('/:id', async (req, res) => {
      const pelaporanPungli = await PelaporanPungliSchema.PelaporanPungli.findByIdAndDelete(req.params.id);
      res.json(pelaporanPungli);
});

module.exports = router;