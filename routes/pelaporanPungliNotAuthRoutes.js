const express = require('express');
const router = express.Router();

// Define Schema
const PelaporanPungliSchema = require('../models/pelaporanPungliSchema');

router.get('/', async (req, res) => {
      try {
            const pelaporanPungli = await PelaporanPungliSchema.PelaporanPungli.find().populate('userId').populate('kategoriPungliId');
            res.json(pelaporanPungli);

      } catch (error) {
            res.status(500).json({
                  success: false,
                  message: error.message
            });
      }
});