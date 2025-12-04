import express from "express";
import connectDB from "./db/connectDB.ts";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
