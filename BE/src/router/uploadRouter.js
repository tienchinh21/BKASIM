const express = require('express');
const { checkAdmin } = require('../middleware/checkAdmin');
const { uploadContentImageCtrl } = require('../controller/upload/contentImageController');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post('/blog-image', checkAdmin, upload.single('image'), uploadContentImageCtrl);

module.exports = router;