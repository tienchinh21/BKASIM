const { User, Booking } = require('../../model');

module.exports = {
    getLatestUsersSrv: async (limit = 5) => {
        return await User.findAll({
            order: [['createdAt', 'DESC']],
            limit,
            attributes: ['id', 'name', 'email', 'createdAt', 'status', 'avatar']
        });
    },

    getLatestBookingsSrv: async (limit = 5) => {
        return await Booking.findAll({
            order: [['createdAt', 'DESC']],
            limit,
            attributes: ['id', 'bookingTitle', 'schedulingTime', 'status', 'createdAt'],
            include: [{ association: 'createdByUser', attributes: ['id', 'name'] }]
        });
    }
};
