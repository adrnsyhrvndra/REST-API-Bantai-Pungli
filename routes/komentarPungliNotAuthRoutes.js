const express = require('express');
const router = express.Router();

// Define Schema
const KomentarPungliSchema = require('../models/komentarPungliSchema');

router.get('/', async (req, res) => {
      try {
            const komentarPungli = await KomentarPungliSchema.KomentarPungli.find().populate('userId').populate('pelaporanPungliId');
            res.json(komentarPungli);
            
      } catch (error) {
            res.status(500).json({
                  success: false,
                  message: error.message
            });
      }
});

module.exports = router;