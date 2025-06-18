import express from 'express';
const router = express.Router();
import "dotenv/config.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Pool } from "pg";


//db
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_KEY,
  port: process.env.DB_PORT,
});

//this adds a user to the db but since I only need one user, it's commented out. leaving it here for posterity
//  const saltRounds = 10;
// var username="user";
// var password = "password";
// bcrypt.hash(password, saltRounds, async function(err, hash) {
//       await pool.query(
//       `INSERT INTO users (id, username, passhash)
//        VALUES ($1, $2, $3)`,
//       [2,username, hash]
//     );
// });

// Generating JWT
router.post("/generateToken", async (req, res) => {
  try {

    //queries db
    const query = `SELECT username, passhash FROM users WHERE username='${req.body.username}'`;
    const { rows } = await pool.query(query);

    //continues if username exists
    if (rows.length == 1) {
      //compares password passed from form to hash in db
      const password = req.body.password;
      const hash = rows[0].passhash;

      
      const checkPW = await bcrypt.compare(password,hash);
  
      //if it matches...
      if (checkPW) {
        // generate JWT Token
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
          userId: rows[0].username,
        };

        const token = jwt.sign({ userId: data.userId }, jwtSecretKey, {
          expiresIn: "1h",
        });
        // finally send it to the frontend
        res.status(200).json({ token });
      } else {
        res.status(500).send("Bad login");
      }
    } else {
      res.status(500).send("Bad user/password");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("couldn't connect to db");
  }
});

// Verification of JWT
router.get("/validateToken", (req, res) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;

  const authHeader = req.headers['authorization']; // header keys are lowercase
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log("No token found in Authorization header");
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const verified = jwt.verify(token, jwtSecretKey);
    return res.send("Successfully Verified");
  } catch (error) {
    console.log("JWT verification error:", error.message);
    return res.status(401).json({ message: error.message });
  }
});

export default router;
