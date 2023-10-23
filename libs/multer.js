const multer = require('multer');
const path = require('path');

const generateStorage = ({ destinnation, allowedMineTypes }) => {
  return multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, destinnation);
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null, uniqueSuffix);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (allowedMineTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('File type not supported'), false);
      }
    },
    onError: (err, next) => {
      console.log('error', err);
      next(err);
    },
  });
};

module.exports = {
  imageStorage: generateStorage({
    destinnation: './public/images',
    allowedMineTypes: ['image/png', 'image/jpg', 'image/jpeg'],
  }),
  videoStorage: generateStorage({
    destinnation: './public/videos',
    allowedMineTypes: ['video/mp4'],
  }),
  documentStorage: generateStorage({
    destinnation: './public/documents',
    allowedMineTypes: ['application/pdf'],

    onError: (err, next) => {
      console.log('error', err);
      next(err);
    },
  }),
};
