const express = require('express');
const router = express.Router();

// Define Schema
const AdminSchema = require('../models/adminSchema');

router.get('/', async (req, res) => {
      const admin = await AdminSchema.Admin.find();
      res.json(admin);
});

router.get('/:id', async (req, res) => {
      const admin = await AdminSchema.Admin.findById(req.params.id);
      res.json(admin);
});

module.exports = router;