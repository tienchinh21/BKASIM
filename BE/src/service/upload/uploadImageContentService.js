const { uploadFileToSSH } = require("./uploadService");

const uploadContentImageToSSH = async (buffer, originalName) => {
    const fileName = `${Date.now()}${originalName.slice(originalName.lastIndexOf('.'))}`;
    return await uploadFileToSSH(buffer, fileName, 'blog');
};

module.exports = uploadContentImageToSSH