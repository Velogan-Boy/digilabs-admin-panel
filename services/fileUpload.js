const multer = require('multer');

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, `${__dirname}/../public`);
   },
   filename: (req, file, cb) => {
      cb(null, 'logo.svg');
   },
});

const upload = multer({
   storage,
   limits: {
      fileSize: 1024 * 1024 * 5, // 5MB
   },
   fileFilter: (req, file, cb) => {
      if (file.mimetype === 'image/svg+xml') {
         cb(null, true);
      } else {
         cb(new Error('Only .svg format allowed!'));
      }
   }, 
});

exports.upload = upload.single('image');
