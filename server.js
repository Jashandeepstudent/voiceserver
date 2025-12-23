import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { parseCommand } from "./openai.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/voice", async (req, res) => {
  try {
    const { text } = req.body;
    const cmd = await parseCommand(text);
    res.json(cmd);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "AI parse failed" });
  }
});

app.get("/", (_, res) => res.send("AI Voice Server Running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
