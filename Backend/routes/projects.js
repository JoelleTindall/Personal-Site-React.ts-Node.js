const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Pool } = require("pg");
require("dotenv").config();
const path = require("path");

//db
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_KEY,
  port: process.env.DB_PORT,
});


//UPLOADING----------------------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/"); // Directory to store images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("image"), async (req, res) => {
  const { title, description, url } = req.body;
  const imageFile = req.file;

  if (!imageFile) {
    return res.status(400).send("Image file missing");
  }

  try {
    const imageName = imageFile.filename;

    await pool.query(
      `INSERT INTO projects (title, description, url, imagename)
       VALUES ($1, $2, $3, $4)`,
      [title, description, url, imageName]
    );

    res.status(201).json({ message: "Upload successful" });
  } catch (err) {
    console.error("Database insert error", err);
    res.status(500).send("Internal Server Error");
  }
});

//FETCHING----------------------------------------
  router.get('/fetchprojects', async (req, res) => {
    try {
      const query = 'select p.*, c.category FROM projects p, categories c where p.categoryid = c.id ORDER BY p.id DESC';
      
      
      // const query = 'SELECT * from projects'
      const { rows } = await pool.query(query);
      res.status(200).send(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('failed');
    }
  });

module.exports = router;
