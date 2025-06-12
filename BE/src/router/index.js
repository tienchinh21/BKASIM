const express = require('express');
const router = express.Router();
const roleRoutes = require('./roleRoutes');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');
const blogRoutes = require('./blogRoutes');
const followRoutes = require('./followsRoutes');
const bookingRoutes = require('./bookingRoutes');
const adminSummaryRoutes = require('./adminRouter/adminSummaryRoutes');
const adminStatsRoutes = require('./adminRouter/adminStatsRoutes');
const authCMSRoutes = require('./authCMSRoutes');
const adminBookingRoutes = require('./adminRouter/adminBookingRoutes');
const adminUserCMSRoutes = require('./adminRouter/adminUserCMSRoutes');
const uploadRoutes = require('./uploadRouter');

router.use('/', roleRoutes);
router.use('/', authRoutes);
router.use('/', userRoutes);
router.use('/', categoryRoutes);
router.use('/', blogRoutes);
router.use('/', followRoutes);
router.use('/', bookingRoutes);
router.use('/', authCMSRoutes);

router.use('/admin', adminSummaryRoutes);
router.use('/admin', adminStatsRoutes);
router.use('/admin', adminBookingRoutes);
router.use('/admin', adminUserCMSRoutes);
router.use('/upload', uploadRoutes)

module.exports = router;
