const imagekit = require('../libs/imagekit');

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
        folder: '/images',
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
