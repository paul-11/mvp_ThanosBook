const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path')
const url = require('url')
const router = require('express').Router();
// const controllers = require("./controllers.js");
const { accesskey, secretkey } = require('../keys')
aws.config.update({
  accessKeyId: accesskey,
  secretAccessKey: secretkey,
  region: 'us-west-2'
})

const s3 = new aws.S3({accessKeyId: accesskey, secretAccessKey: secretkey});

console.log("S#", s3)
const profileImgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'nvmbucket',
    acl: 'public-read',
    key: function (req, file, cb) {
      // console.log("FILE", file, s3)
      cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
    }
  }),
  limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 10 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('profileImage');


/**
 * Check File Type
 * @param file
 * @param cb
 * @return {*}
 */

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype); if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
};

/**
* @route POST api/profile/business-img-upload
* @desc Upload post image
* @access public
*/
router.post('/profile-img-upload', (req, res) => {
  profileImgUpload(req, res, (error) => {
    console.log('requestOkokok', req.files);
    console.log('requestOkokokBODY', req.swagger);
    // console.log( 'error', error );
    if (error) {
      console.log('errors', error);
      res.json({ error: error });
    } else {
      // If File not found
      if (req.file === undefined) {
        console.log('Error: No File Selected!');
        res.json('Error: No File Selected');
      } else {
        // If Success
        const imageName = req.file.key;
        const imageLocation = req.file.location;// Save the file name into database into profile model
        res.status(200).json({
          image: imageName,
          location: imageLocation
        });
      }
    }
  })
});



module.exports = router;