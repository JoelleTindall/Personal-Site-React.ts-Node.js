const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const contactRoutes = require("./routes/contact");
const projectRoutes = require("./routes/projects");
const authRoutes = require("./routes/auth")
const app = express();
 const PORT = process.env.PORT;



// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
app.use("/api", contactRoutes);
app.use("/api", projectRoutes);
app.use("/api", authRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
