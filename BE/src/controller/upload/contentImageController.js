const uploadContentImageToSSH = require("../../service/upload/uploadImageContentService");

const uploadContentImageCtrl = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'Thiếu ảnh' });

        const { buffer, originalname } = req.file;
        const result = await uploadContentImageToSSH(buffer, originalname);

        return res.status(200).json({ path: result.path });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

module.exports = {
    uploadContentImageCtrl
};
