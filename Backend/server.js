const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const contactRoutes = require("./routes/contact");
const projectRoutes = require("./routes/projects");
const app = express();
 const PORT = process.env.PORT;



// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api", contactRoutes);
app.use("/api", projectRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
