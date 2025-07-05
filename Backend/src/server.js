// server.js or src/server.js

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import noteRoute from "./routes/noteRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(rateLimiter);

// API routes
app.use("/api/notes", noteRoute);

// Serve frontend static files
const frontendPath = path.join(__dirname, "../../Frontend/my-app/dist");
app.use(express.static(frontendPath));

// Catch-all for SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

connectDB().then(() => {
  // Connect to DB and start server
  app.listen(port, "0.0.0.0", () => {
    console.log(`✅ Server running on port ${port}`);
  });
});
