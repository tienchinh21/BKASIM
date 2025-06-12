const statsService = require('../../service/adminService/adminStatsService');

module.exports = {
    getChartDataCtrl: async (req, res) => {
        try {
            const year = parseInt(req.query.year) || new Date().getFullYear();
            const result = await statsService.getChartDataByYear(year);
            res.status(200).json(result);
        } catch (err) {
            console.error('[getChartDataCtrl]', err);
            res.status(500).json({ message: 'Lỗi server', error: err.message });
        }
    },
    getUserGrowthCompareCtrl: async (req, res) => {
        try {
            const result = await statsService.getUserGrowthCompare();
            res.status(200).json(result);
        } catch (err) {
            console.error('[getUserGrowthCompareCtrl]', err);
            res.status(500).json({ message: 'Lỗi server', error: err.message });
        }
    },
    getBookingGrowthCompareCtrl: async (req, res) => {
        try {
            const result = await statsService.getBookingGrowthCompare();
            res.status(200).json(result);
        } catch (err) {
            console.error('[getBookingGrowthCompareCtrl]', err);
            res.status(500).json({ message: 'Lỗi server', error: err.message });
        }
    }
};
