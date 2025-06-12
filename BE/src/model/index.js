// const sequelize = require('../config/database');

// const User = require('./User');
// const Role = require('./Role');
// const ArticleCategories = require('./ArticleCategories');
// const Articles = require('./Articles');
// const Follow = require('./Follow');
// const Booking = require('./Booking');
// const BookingParticipants = require('./BookingParticipants');
// const UserCMS = require('./userCMS');

// // Associations
// User.belongsToMany(Role, { through: 'userRoles', foreignKey: 'userId', as: 'roles' });
// Role.belongsToMany(User, { through: 'userRoles', foreignKey: 'roleId', as: 'users' });

// User.belongsToMany(User, {
//     through: Follow,
//     as: 'Following',
//     foreignKey: 'followerId',
//     otherKey: 'followingId'
// });

// User.belongsToMany(User, {
//     through: Follow,
//     as: 'Followers',
//     foreignKey: 'followingId',
//     otherKey: 'followerId'
// });

// Booking.belongsToMany(User, {
//     through: BookingParticipants,
//     as: 'participants',
//     foreignKey: 'bookingId',
//     otherKey: 'userId'
// });

// User.belongsToMany(Booking, {
//     through: BookingParticipants,
//     as: 'appointments',
//     foreignKey: 'userId',
//     otherKey: 'bookingId'
// });

// Role.hasMany(UserCMS, { foreignKey: 'roleId' });
// UserCMS.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });



// module.exports = { sequelize, User, Role, ArticleCategories, Articles, Follow, Booking, BookingParticipants, UserCMS };



const sequelize = require('../config/database');

const User = require('./User');
const Role = require('./Role');
const ArticleCategories = require('./ArticleCategories');
const Articles = require('./Articles');
const Follow = require('./Follow');
const Booking = require('./Booking');
const BookingParticipants = require('./BookingParticipants');
const UserCMS = require('./UserCMS');

// Role - User (nhiều-nhiều)
User.belongsToMany(Role, { through: 'userRoles', foreignKey: 'userId', as: 'roles' });
Role.belongsToMany(User, { through: 'userRoles', foreignKey: 'roleId', as: 'users' });

// User - Follow (nhiều-nhiều tự liên kết)
User.belongsToMany(User, {
    through: Follow,
    as: 'Following',
    foreignKey: 'followerId',
    otherKey: 'followingId'
});

User.belongsToMany(User, {
    through: Follow,
    as: 'Followers',
    foreignKey: 'followingId',
    otherKey: 'followerId'
});

Articles.belongsTo(UserCMS, { foreignKey: 'authorId', as: 'authorCMS' });
UserCMS.hasMany(Articles, { foreignKey: 'authorId', as: 'blogsByCMS' });


// Booking - User (nhiều-nhiều qua bảng trung gian BookingParticipants)
Booking.belongsToMany(User, {
    through: BookingParticipants,
    as: 'participants',
    foreignKey: 'bookingId',
    otherKey: 'userId'
});

BookingParticipants.belongsTo(User, { foreignKey: 'userId', as: 'user' });


User.belongsToMany(Booking, {
    through: BookingParticipants,
    as: 'appointments',
    foreignKey: 'userId',
    otherKey: 'bookingId'
});



//  Booking - BookingParticipants (1-nhiều) để dùng được alias "bookingParticipants"
Booking.hasMany(BookingParticipants, { foreignKey: 'bookingId', as: 'bookingParticipants' });
BookingParticipants.belongsTo(Booking, { foreignKey: 'bookingId' });

// Role - UserCMS (1-nhiều)
Role.hasMany(UserCMS, { foreignKey: 'roleId' });
UserCMS.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });


User.hasMany(Follow, { foreignKey: 'followingId', as: 'FollowerRelations' });

// Follow - User + Role liên kết vai trò 2 chiều rõ ràng
Follow.belongsTo(User, { as: 'Follower', foreignKey: 'followerId' }); // người gửi follow
Follow.belongsTo(User, { as: 'Following', foreignKey: 'followingId' }); // người được follow
Follow.belongsTo(Role, { as: 'TargetRole', foreignKey: 'targetRoleId' }); // vai trò của người được follow
Follow.belongsTo(Role, { as: 'FollowerRole', foreignKey: 'followerRoleId' }); // vai trò của người gửi follow

module.exports = {
    sequelize,
    User,
    Role,
    ArticleCategories,
    Articles,
    Follow,
    Booking,
    BookingParticipants,
    UserCMS
};

