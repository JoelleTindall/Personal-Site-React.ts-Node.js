import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import contactRoutes from "./routes/contact.js";
import projectRoutes from "./routes/projects.js";
import resumeRoutes from "./routes/resume.js";
import authRoutes from "./routes/auth.js";
//  const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const HOST = process.env.HOST; 
 const PORT = process.env.PORT;

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

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


