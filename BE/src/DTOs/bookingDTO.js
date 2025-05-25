const detailBookingDTO = (booking) => {
    return {
        id: booking.id,
        bookingTitle: booking.bookingTitle,
        bookingDesc: booking.bookingDesc,
        schedulingTime: booking.schedulingTime,
        status: booking.status,
        createdByUser: booking.createdByUser,
        participants: booking.participants.map(participant => ({
            id: participant.id,
            name: participant.name,
            roles: participant.roles.map(role => ({
                id: role.id,
                name: role.name
            }))
        }))

    }
}

module.exports = { detailBookingDTO };
