const SftpClient = require('ssh2-sftp-client');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const sftpConfig = {
    host: process.env.SFTP_HOST,
    port: process.env.SFTP_PORT,
    username: process.env.SFTP_USERNAME,
    password: process.env.SFTP_PASSWORD,
};

const BASE_REMOTE_PATH = process.env.BASE_REMOTE_PATH
const BASE_PUBLIC_URL = process.env.BASE_PUBLIC_URL

const getRemoteDirByModel = (model) => {
    switch (model) {
        case 'user':
            return {
                remote: `${BASE_REMOTE_PATH}/avatar/user`,
                public: `${BASE_PUBLIC_URL}/avatar/user`
            };
        case 'userCMS':
            return {
                remote: `${BASE_REMOTE_PATH}/avatar/userCMS`,
                public: `${BASE_PUBLIC_URL}/avatar/userCMS`
            };
        case 'blog':
            return {
                remote: `${BASE_REMOTE_PATH}/blog`,
                public: `${BASE_PUBLIC_URL}/blog`
            };
        default:
            throw new Error('Invalid model for upload');
    }
};


const uploadFileToSSH = async (buffer, originalName, model) => {
    const sftp = new SftpClient();
    const fileName = `${Date.now()}${path.extname(originalName)}`;
    const { remote, public: publicDir } = getRemoteDirByModel(model);
    const remotePath = `${remote}/${fileName}`;
    const publicUrl = `${publicDir}/${fileName}`;

    console.log("remotePath", remotePath);
    console.log("publicUrl", publicUrl);
    await sftp.connect(sftpConfig);
    await sftp.put(buffer, remotePath);
    await sftp.end();


    return { path: publicUrl };
};


const deleteFileOnSSH = async (remotePath) => {
    const sftp = new SftpClient();
    try {
        await sftp.connect(sftpConfig);
        await sftp.delete(remotePath);
        await sftp.end();
        console.log(`Đã xóa file SSH: ${remotePath}`);
    } catch (err) {
        console.error('Lỗi xóa file SSH:', err.message);
    }
};
module.exports = { uploadFileToSSH, deleteFileOnSSH };


