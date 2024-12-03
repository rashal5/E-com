const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads"); 
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); 
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`; 
    cb(null, uniqueName);
  },
});


const upload = multer({ storage });


async function imageUploadUtil(file) {
 
  return {
    path: file.path, 
    filename: file.filename,
  };
}

module.exports = { upload, imageUploadUtil };
