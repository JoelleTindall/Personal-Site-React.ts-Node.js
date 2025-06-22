import express from 'express';
const router = express.Router();
import "dotenv/config.js";
import multer from "multer";
import crypto from "crypto";
import fs from "fs";
import { Pool } from "pg";

import path from "path";

//db
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_KEY,
  port: process.env.DB_PORT,
  
});

//CREATE----------------------------------------
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
  const { title, description, url, categoryid } = req.body;
  const imageFile = req.file;

  if (!imageFile) {
    return res.status(400).send("Image file missing");
  }

  try {
    const imageName = imageFile.filename;

    await pool.query(
      `INSERT INTO projects (title, description, url, imagename, categoryid)
       VALUES ($1, $2, $3, $4, $5)`,
      [title, description, url, imageName, categoryid]
    );

    res.status(201).json({ message: "Upload successful" });
  } catch (err) {
    console.error("Database insert error", err);
    res.status(500).send("Internal Server Error");
  }
});

//RETRIEVE----------------------------------------

//gets projects for project page and admin side
router.get("/fetchprojects", async (req, res) => {
  try {
    const query =
      "select p.*, c.category FROM projects p, categories c where p.categoryid = c.id ORDER BY p.id DESC";

    const { rows } = await pool.query(query);
    res.status(200).send(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("failed");
  }
});

//gets categories for projects
router.get("/fetchcategories", async (req, res) => {
  try {
    const query =
      "select * FROM categories";

    const { rows } = await pool.query(query);
    res.status(200).send(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("failed");
  }
});

//UPDATE------------------------------------------
router.post("/update", upload.single("image"), async (req, res) => {
  const { id, title, description, url, categoryid } = req.body;

  try {
    // get old image name
    const query = "SELECT imagename FROM projects WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    const oldImageName = rows[0]?.imagename;

    if (!oldImageName) {
      return res.status(404).json({ message: "Project not found" });
    }

    const oldImagePath = `public\\images\\${oldImageName}`;
    const imageFile = req.file;

    let image;

    if (!imageFile) {
      image = oldImageName;
    } else {
      const isDuplicate = await checkDuplicateImage(
        imageFile.path,
        oldImagePath
      );

      if (isDuplicate) {
        // delete new duplicate upload
        await fs.promises.unlink(imageFile.path);
        image = oldImageName;
      } else {
        image = imageFile.filename;
      }
    }

    // perform update
    await pool.query(
      `UPDATE projects SET title=$2, description=$3, url=$4, imagename=$5, categoryid=$6 WHERE id = $1`,
      [id, title, description, url, image, categoryid]
    );

    res.status(201).json({ message: "Update successful" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// image comparison..
async function checkDuplicateImage(newImagePath, oldImagePath) {
  try {
    // Read new image
    const newBuffer = await fs.promises.readFile(newImagePath);

    // Check if old image exists
    await fs.promises.access(oldImagePath, fs.constants.F_OK);

    // Read old image if it exists
    const oldBuffer = await fs.promises.readFile(oldImagePath);

    // Compare MD5 hashes
    const newHash = crypto.createHash("md5").update(newBuffer).digest("hex");
    const oldHash = crypto.createHash("md5").update(oldBuffer).digest("hex");

    return newHash === oldHash;
  } catch (err) {
    // If file doesn't exist or error happens, assume it's not a duplicate
    console.warn(`Old image not found or unreadable: ${oldImagePath}`);
    return false;
  }
}

//DELETING----------------------------------------
router.post("/delete", async (req, res) => {
  try {
    await pool.query(`DELETE FROM projects WHERE id = $1`, [req.body.id]);

    fs.rm(`public/images/${req.body.img}`, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully");
      }
    });

    res.status(201).json({ message: "Delete successful" });
  } catch (err) {
    console.error("Database delete error", err);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
