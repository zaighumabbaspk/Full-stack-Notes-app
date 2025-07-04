import express from "express";
import noteRoute from "./routes/noteRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import { Ratelimit } from "@upstash/ratelimit";
import cors from "cors";

const app = express();

dotenv.config();

const port = process.env.PORT;
// console.log(port);

app.get("/api/hello", (req, res) => {
  res.send("Hello World with ESM!");
});

console.log(process.env.MONGO_URI);
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://full-stack-notes-app-silk.vercel.app",
  ],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", noteRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server started on PORT:", port);
  });
});
