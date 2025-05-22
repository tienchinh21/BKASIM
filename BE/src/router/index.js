const express = require('express');
const router = express.Router();
const roleRoutes = require('./roleRoutes');
const authRoutes = require('./authRoutes');


router.use('/', roleRoutes);
router.use('/', authRoutes);

module.exports = router;
