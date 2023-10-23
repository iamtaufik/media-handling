const router = require('express').Router();
const multer = require('multer');
const upload = multer();
const { imageStorage, documentStorage, videoStorage } = require('../libs/multer');
const { imageUpload, documentUpload, videoUpload, multiImageUpload } = require('../controllers/media.controllers');

router.post('/storage/documents', documentStorage.single('document'), documentUpload);
router.post('/storage/videos', videoStorage.single('video'), videoUpload);
router.post('/storage/images', imageStorage.single('image'), imageUpload);
router.post('/storage/multi/images', imageStorage.array('image'), multiImageUpload);

module.exports = router;
