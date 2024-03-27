const express = require('express');
const router = express.Router();

// Define Schema
const UsersSchema = require('../models/userSchema');

router.get('/', async (req, res) => {
      const users = await UsersSchema.Users.find();
      res.json(users);
});

router.get('/:id', async (req, res) => {
      const users = await UsersSchema.Users.findById(req.params.id);
      res.json(users);
});

module.exports = router;