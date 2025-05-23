const userDTO = (user) => {
    return {
        id: user.id,
        dateOfBirth: user.dateOfBirth,
        email: user.email,
        name: user.name,
        phone: user.phone,
        avatar: user.avatar,
        gender: user.gender,
        status: user.status,
        company: user.company,
        fieldOfStudy: user.fieldOfStudy,
        job: user.job,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        roles: user.roles.map(role => ({
            id: role.id,
            name: role.name
        }))
    };
}

const checkUserDTO = (user) => {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        avatar: user.avatar,
        gender: user.gender,
        company: user.company,
        fieldOfStudy: user.fieldOfStudy,
        job: user.job,
    };
}




module.exports = {
    userDTO,
    checkUserDTO
};
