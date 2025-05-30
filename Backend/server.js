const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Client } = require("pg");
const contactRoutes = require("./routes/contact");

const app = express();
 const PORT = process.env.PORT;

//db
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_KEY,
  port: process.env.DB_PORT,
});

client
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database!");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api", contactRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
