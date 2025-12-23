// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { handleVoice } from "./openai.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Test endpoint
app.get("/", (req, res) => {
  res.send("Voice AI Server is running ✅");
});

// Voice processing endpoint
app.post("/voice", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "No text provided" });

  try {
    const cmd = await handleVoice(text);
    res.json(cmd);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
