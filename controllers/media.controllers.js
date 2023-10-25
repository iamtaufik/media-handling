const imagekit = require('../libs/imagekit');
const qr = require('qr-image');

module.exports = {
  imageUpload: async (req, res) => {
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

    return res.json({
      status: true,
      message: 'Ok',
      data: {
        image: imageUrl,
      },
    });
  },
  videoUpload: async (req, res) => {
    const videoUrl = `${req.protocol}://${req.get('host')}/videos/${req.file.filename}`;

    return res.json({
      status: true,
      message: 'Ok',
      data: {
        video: videoUrl,
      },
    });
  },
  documentUpload: async (req, res) => {
    const documentUrl = `${req.protocol}://${req.get('host')}/documents/${req.file.filename}`;

    return res.json({
      status: true,
      message: 'Ok',
      data: {
        document: documentUrl,
      },
    });
  },
  multiImageUpload: async (req, res) => {
    const images = req.files.map((file) => `${req.protocol}://${req.get('host')}/images/${file.filename}`);

    return res.json({
      status: true,
      message: 'Ok',
      data: {
        images,
      },
    });
  },

  imageKit: async (req, res, next) => {
    try {
      const file = req.file.buffer.toString('base64');

      const result = await imagekit.upload({
        file,
        fileName: req.file.originalname,
        folder: '/uploads',
      });

      res.status(201).json({
        status: true,
        message: 'Ok',
        data: {
          image: result.url,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  generateQRcode: async (req, res, next) => {
    try {
      const { qr_data } = req.body;
      if (!qr_data) {
        return res.status(400).json({
          status: false,
          message: 'QR data is required',
        });
      }
      const qr_png = qr.imageSync(qr_data, { type: 'png' });
      const qr_base64 = qr_png.toString('base64');

      const result = await imagekit.upload({
        file: qr_base64,
        fileName: Date.now() + '.png',
        folder: '/qrcodes',
      });

      res.status(201).json({
        status: true,
        message: 'Ok',
        data: {
          image: result.url,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
