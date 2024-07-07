const express = require('express');
const router = express.Router();

// Define Schema
const UsersSchema = require('../models/userSchema');

router.get('/', async (req, res) => {
      try {
            const users = await UsersSchema.Users.find();
            res.json(users);

      } catch (error) {
            res.status(500).json({
                  success: false,
                  message: error.message
            });
      }

});

module.exports = router;