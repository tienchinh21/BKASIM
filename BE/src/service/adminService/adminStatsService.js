const { Op } = require('sequelize');
const { Booking, User } = require('../../model');
const { getMonthRange } = require('../../util/getDate');
function initMonthArray() {
    return Array.from({ length: 12 }, () => 0);
}

function groupByMonth(items, field) {
    const counts = initMonthArray();
    for (const item of items) {
        const month = new Date(item[field]).getMonth(); // 0-11
        counts[month]++;
    }
    return counts;
}

module.exports = {
    getChartDataByYear: async (year) => {
        const start = new Date(`${year}-01-01`);
        const end = new Date(`${year}-12-31T23:59:59`);

        const [bookings, users] = await Promise.all([
            Booking.findAll({ where: { createdAt: { [Op.between]: [start, end] } }, attributes: ['createdAt'] }),
            User.findAll({ where: { createdAt: { [Op.between]: [start, end] } }, attributes: ['createdAt'] })
        ]);

        return {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            data: {
                bookingsPerMonth: groupByMonth(bookings, 'createdAt'),
                usersPerMonth: groupByMonth(users, 'createdAt')
            }
        };
    },
    getUserGrowthCompare: async () => {
        const { startCurrent, endCurrent, startPrevious, endPrevious } = getMonthRange();

        const [currentCount, previousCount] = await Promise.all([
            User.count({
                where: { createdAt: { [Op.between]: [startCurrent, endCurrent] } }
            }),
            User.count({
                where: { createdAt: { [Op.between]: [startPrevious, endPrevious] } }
            })
        ]);

        let growthRate = {
            value: '0%',
            trend: 'balance'
        };
        if (previousCount > 0) {
            const change = ((currentCount - previousCount) / previousCount) * 100;
            growthRate.value = `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
            growthRate.trend = change >= 0 ? 'up' : 'down';
        }

        return {
            currentMonth: currentCount,
            previousMonth: previousCount,
            growthRate
        };
    },
    getBookingGrowthCompare: async () => {
        const { startCurrent, endCurrent, startPrevious, endPrevious } = getMonthRange();

        const [currentCount, previousCount] = await Promise.all([
            Booking.count({
                where: { createdAt: { [Op.between]: [startCurrent, endCurrent] } }
            }),
            Booking.count({
                where: { createdAt: { [Op.between]: [startPrevious, endPrevious] } }
            })
        ]);

        let growthRate = {
            value: '0%',
            trend: 'balance'
        };
        if (previousCount > 0) {
            const change = ((currentCount - previousCount) / previousCount) * 100;
            growthRate.value = `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
            growthRate.trend = change >= 0 ? 'up' : 'down';
        }

        return {
            currentMonth: currentCount,
            previousMonth: previousCount,
            growthRate
        };
    }
};
