import express from 'express';
const router = express.Router();
import "dotenv/config.js";
import multer from "multer";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/files/"); // Directory to store the file..
  },
  filename: (req, file, cb) => {
    cb(null, "Resume.pdf"); // filename set to 'Resume.pdf'
  },
});

const upload = multer({ storage: storage });

router.post("/upresume", upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});



router.get('/downresume', (req, res) => res.download('public/files/Resume.pdf'))

export default router;