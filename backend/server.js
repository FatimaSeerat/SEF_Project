import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 

app.post("/generate-quiz", async (req, res) => {
  try {
    const { documentContent, quantity, quizType, difficulty } = req.body;

    if (!documentContent) {
      return res.status(400).json({ error: "Content required" });
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta2/models/gemini-1.5-flash:generateMessage",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GEMINI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: `Create ${quantity} ${quizType} questions of ${difficulty} difficulty from the following content:\n${documentContent}`,
          maxOutputTokens: 500,
        }),
      }
    );

    const data = await response.json();

    if (!data?.candidates?.[0]?.content) {
      return res.status(500).json({ error: "Failed to generate quiz" });
    }

    const generatedQuestions = data.candidates[0].content
      .split("\n")
      .filter((q) => q.trim() !== "")
      .map((q, idx) => ({ id: idx.toString(), prompt: q }));

    res.json({ questions: generatedQuestions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/", (req, res) => res.send("Server running"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
