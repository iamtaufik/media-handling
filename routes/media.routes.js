const router = require('express').Router();
const { imageStorage, documentStorage, videoStorage, imageFilter, videoFilter, documentFilter } = require('../libs/multer');
const { imageUpload, documentUpload, videoUpload, multiImageUpload, imageKit, generateQRcode } = require('../controllers/media.controllers');

router.post('/storage/documents', documentStorage.single('document'), documentUpload);
router.post('/storage/videos', videoStorage.single('video'), videoUpload);
router.post('/storage/images', imageStorage.single('image'), imageUpload);
router.post('/storage/multi/images', imageStorage.array('image'), multiImageUpload);

router.post('/imagekit/qrcodes', generateQRcode);
router.post('/imagekit/images', imageFilter.single('image'), imageKit);
router.post('/imagekit/videos', videoFilter.single('video'), imageKit);
router.post('/imagekit/documents', documentFilter.single('document'), imageKit);
module.exports = router;
