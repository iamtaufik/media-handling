const router = require('express').Router();
const multer = require('multer')();

const { imageStorage, documentStorage, videoStorage } = require('../libs/multer');
const { imageUpload, documentUpload, videoUpload, multiImageUpload, imageKit } = require('../controllers/media.controllers');

router.post('/storage/documents', documentStorage.single('document'), documentUpload);
router.post('/storage/videos', videoStorage.single('video'), videoUpload);
router.post('/storage/images', imageStorage.single('image'), imageUpload);
router.post('/storage/multi/images', imageStorage.array('image'), multiImageUpload);

router.post('/storage/imagekit', multer.single('image'), imageKit);
module.exports = router;
