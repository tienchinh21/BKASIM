const express = require('express');
const router = express.Router();
const roleRoutes = require('./roleRoutes');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');
const blogRoutes = require('./blogRoutes');
const followRoutes = require('./followsRoutes');


router.use('/', roleRoutes);
router.use('/', authRoutes);
router.use('/', userRoutes);
router.use('/', categoryRoutes);
router.use('/', blogRoutes);
router.use('/', followRoutes);

module.exports = router;
