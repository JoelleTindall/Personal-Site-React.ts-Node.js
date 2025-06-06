const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");
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

//this adds a user to the db but since I only need one user, it's commented out. leaving it here for posterity
// const saltRounds = 10;
// var username="user";
// var password = "password";
// bcrypt.hash(password, saltRounds, async function(err, hash) {
//       await pool.query(
//       `INSERT INTO users (username, passhash)
//        VALUES ($1, $2)`,
//       [username, hash]
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
      const checkPW = bcrypt.compare(password,hash);

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
        res.status(500).send("failed");
      }
    } else {
      res.status(500).send("failed");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("failed");
  }
});

// Verification of JWT
router.get("/validateToken", (req, res) => {
  // Tokens are generally passed in header of request
  // Due to security reasons.

  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.header(tokenHeaderKey);

    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      return res.send("Successfully Verified");
    } else {
      // Access Denied
      return res.status(401).send(error);
    }
  } catch (error) {
    // Access Denied
    return res.status(401).send(error);
  }
});

module.exports = router;
