const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const contactRoutes = require("./routes/contact");
const projectRoutes = require("./routes/projects");
const resumeRoutes = require("./routes/resume");
const authRoutes = require("./routes/auth");
//  const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const HOST = process.env.HOST;
 const PORT = process.env.PORT;



// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));


// Routes
app.use("/api", contactRoutes);
app.use("/api", projectRoutes);
app.use("/api", resumeRoutes);
app.use("/api", authRoutes); 


// const API_URL = "https://jsonplaceholder.typicode.com";

// const proxyOptions = {
//   target: API_URL,
//   changeOrigin: true,
//   pathRewrite: {
//     [`^/api`]: '',
//   },
// }

// app.use(createProxyMiddleware(proxyOptions));

// Start server
app.listen(PORT, () => {
  console.log(`Server running at ${HOST}:${PORT}`);
});


