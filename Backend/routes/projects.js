const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Pool } = require("pg");
require("dotenv").config();

//db
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_KEY,
  port: process.env.DB_PORT,
});


//multer  for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), async (req, res) => {
  const { title, description } = req.body;
  const imageFile = req.file;

  if (!imageFile) {
    return res.status(400).send('Image file missing');
  }

  try {
    const imageBuffer = imageFile.buffer;
    const imageType = imageFile.mimetype;

    await pool.query(
      `INSERT INTO projects (title, description, image_data, image_type)
       VALUES ($1, $2, $3, $4)`,
      [title, description, imageBuffer, imageType]
    );

    res.status(201).json({ message: 'Upload successful'});
  } catch (err) {
    console.error('Database insert error', err);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
