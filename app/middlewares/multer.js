const multer = require('multer');
const path = require('path'); // Import the path module


// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //__dirname is a global variable in Node.js that represents the directory of the currently executing JavaScript file
    const uploadPath = path.join(__dirname, '../../uploads/'); // Construct an absolute path
    cb(null, uploadPath); // Set the destination directory for uploaded files
  },
  filename: (req, file, cb) => {
    console.log(file);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

// Define a custom file filter to allow only JPG, PNG, and JPEG files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, and JPEG files are allowed.'), false);
  }
};

// Create Multer instance with the storage and fileFilter options
const upload = multer({ storage: storage, fileFilter: fileFilter });

console.log(upload);

module.exports = upload;
