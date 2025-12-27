// import express from "express";
// import cors from "cors";
// import fetch from "node-fetch";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json({ limit: '10mb' }));

// //const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyAt8Bm5XqucMUr7bGx2K7oozRBdCsIjdXk";
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY ;

// if (!GEMINI_API_KEY) {
//   console.error("❌ GEMINI_API_KEY not found!");
// } else {
//   console.log("✅ GEMINI_API_KEY loaded successfully");
// }

// app.post("/generate-quiz", async (req, res) => {
//   console.log("📝 Quiz generation request received");

//   try {
//     const { documentContent, quantity, quizType, difficulty } = req.body;

//     if (!documentContent) {
//       console.log("❌ No document content provided");
//       return res.status(400).json({ error: "Content required" });
//     }

//     if (!GEMINI_API_KEY) {
//       console.log("❌ API key missing");
//       return res.status(500).json({ error: "Server configuration error: API key missing" });
//     }

//     console.log(`📊 Generating ${quantity} ${quizType} questions with ${difficulty} difficulty`);
//     console.log(`📄 Content length: ${documentContent.length} characters`);

//     // Truncate content if too long (Gemini has token limits)
//     const maxContentLength = 30000;
//     const truncatedContent = documentContent.length > maxContentLength 
//       ? documentContent.substring(0, maxContentLength) + "..."
//       : documentContent;

//     let prompt = "";
//     if (quizType === "mcq") {
//       prompt = `You are a quiz generator. Based on the following content, generate exactly ${quantity} multiple-choice questions with ${difficulty} difficulty level.

// Content:
// ${truncatedContent}

// Generate a JSON array with this EXACT structure (no markdown, no explanation, ONLY the JSON array):
// [
//   {
//     "id": "1",
//     "prompt": "Question text here?",
//     "options": ["Option A", "Option B", "Option C", "Option D"],
//     "correctIndex": 0
//   }
// ]

// CRITICAL RULES:
// - Return ONLY the JSON array, no other text
// - Each question MUST have exactly 4 options
// - correctIndex must be 0, 1, 2, or 3 (representing the index of the correct option)
// - Generate exactly ${quantity} questions
// - Difficulty level: ${difficulty}`;
//     } else {
//       prompt = `You are a quiz generator. Based on the following content, generate exactly ${quantity} open-ended questions with ${difficulty} difficulty level.

// Content:
// ${truncatedContent}

// Generate a JSON array with this EXACT structure (no markdown, no explanation, ONLY the JSON array):
// [
//   {
//     "id": "1",
//     "prompt": "Question text here?",
//     "sampleAnswer": "A detailed sample answer here"
//   }
// ]

// CRITICAL RULES:
// - Return ONLY the JSON array, no other text
// - Each question must have a comprehensive sampleAnswer
// - Generate exactly ${quantity} questions
// - Difficulty level: ${difficulty}`;
//     }

//     // List of model names to try in order (Google keeps changing these)
//     const modelsToTry = [
//       'gemini-1.5-flash',
//       'gemini-1.5-flash-latest', 
//       'gemini-1.5-pro',
//       'gemini-1.5-pro-latest',
//       'gemini-pro',
//       'gemini-1.0-pro'
//     ];

//     let response = null;
//     let successfulModel = null;

//     // Try each model until one works
//     for (const modelName of modelsToTry) {
//       const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;
      
//       console.log(`🌐 Trying model: ${modelName}...`);

//       try {
//         response = await fetch(apiUrl, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             contents: [{
//               parts: [{
//                 text: prompt
//               }]
//             }],
//             generationConfig: {
//               temperature: 0.7,
//               maxOutputTokens: 4096,
//               topP: 0.95,
//               topK: 40,
//             }
//           }),
//         });

//         console.log(`📡 API Response Status for ${modelName}: ${response.status}`);

//         if (response.ok) {
//           successfulModel = modelName;
//           console.log(`✅ Successfully connected with model: ${modelName}`);
//           break;
//         } else {
//           const errorText = await response.text();
//           console.log(`⚠️ ${modelName} failed: ${errorText.substring(0, 150)}`);
//         }
//       } catch (error) {
//         console.log(`⚠️ ${modelName} threw error: ${error.message}`);
//       }
//     }

//     if (!response || !response.ok) {
//       console.error("❌ All model attempts failed");
//       return res.status(500).json({
//         error: "Could not connect to Gemini API with any available model",
//         details: "All model names failed. Your API key may be invalid or you may have exceeded quota.",
//         triedModels: modelsToTry
//       });
//     }

//     const data = await response.json();
//     console.log("✅ Received response from Gemini API");

//     // Check for safety blocks or other issues
//     if (data.promptFeedback?.blockReason) {
//       console.error("❌ Content was blocked:", data.promptFeedback.blockReason);
//       return res.status(400).json({ 
//         error: "Content was blocked by safety filters",
//         reason: data.promptFeedback.blockReason
//       });
//     }

//     if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
//       console.error("❌ Invalid API response structure:", JSON.stringify(data, null, 2));
//       return res.status(500).json({ 
//         error: "Invalid response from AI - no text content",
//         details: JSON.stringify(data).substring(0, 500)
//       });
//     }

//     let textContent = data.candidates[0].content.parts[0].text;
//     console.log("📝 Raw AI response length:", textContent.length);
//     console.log("📝 First 500 chars:", textContent.substring(0, 500));

//     // Aggressive cleaning of the response
//     textContent = textContent
//       .replace(/```json\s*/g, '')
//       .replace(/```javascript\s*/g, '')
//       .replace(/```\s*/g, '')
//       .replace(/^\s*[\r\n]/gm, '')
//       .trim();

//     // Try to find JSON array in the response
//     const jsonMatch = textContent.match(/\[\s*\{[\s\S]*\}\s*\]/);
//     if (jsonMatch) {
//       textContent = jsonMatch[0];
//       console.log("✅ Extracted JSON array from response");
//     }

//     console.log("📝 Cleaned response (first 500 chars):", textContent.substring(0, 500));

//     // Parse JSON
//     let questions;
//     try {
//       questions = JSON.parse(textContent);
//       console.log(`✅ Successfully parsed ${questions.length} questions`);
//     } catch (parseError) {
//       console.error("❌ JSON parse error:", parseError.message);
//       console.error("Failed to parse text:", textContent.substring(0, 1000));
      
//       // Try one more time with even more aggressive cleaning
//       try {
//         const startIdx = textContent.indexOf('[');
//         const endIdx = textContent.lastIndexOf(']');
//         if (startIdx !== -1 && endIdx !== -1) {
//           const extracted = textContent.substring(startIdx, endIdx + 1);
//           questions = JSON.parse(extracted);
//           console.log("✅ Parsed after aggressive extraction");
//         } else {
//           throw parseError;
//         }
//       } catch (secondError) {
//         return res.status(500).json({
//           error: "Failed to parse quiz data. AI returned invalid JSON.",
//           rawResponse: textContent.substring(0, 1000)
//         });
//       }
//     }

//     // Validate questions array
//     if (!Array.isArray(questions) || questions.length === 0) {
//       console.error("❌ Invalid questions format - not an array or empty");
//       return res.status(500).json({ 
//         error: "Invalid quiz format received",
//         receivedType: typeof questions,
//         receivedData: JSON.stringify(questions).substring(0, 500)
//       });
//     }

//     // Validate and fix question structure
//     const validatedQuestions = [];
//     for (let i = 0; i < questions.length; i++) {
//       const q = questions[i];
      
//       if (!q.prompt || typeof q.prompt !== 'string') {
//         console.error(`❌ Question ${i} missing or invalid prompt`);
//         continue; // Skip invalid questions
//       }

//       const validatedQ = {
//         id: q.id || (i + 1).toString(),
//         prompt: q.prompt
//       };

//       if (quizType === "mcq") {
//         if (!Array.isArray(q.options) || q.options.length !== 4) {
//           console.error(`❌ Question ${i} has invalid options:`, q.options);
//           continue; // Skip invalid questions
//         }
//         if (typeof q.correctIndex !== "number" || q.correctIndex < 0 || q.correctIndex > 3) {
//           console.error(`❌ Question ${i} has invalid correctIndex:`, q.correctIndex);
//           continue; // Skip invalid questions
//         }
//         validatedQ.options = q.options;
//         validatedQ.correctIndex = q.correctIndex;
//       } else {
//         if (!q.sampleAnswer || typeof q.sampleAnswer !== 'string') {
//           console.error(`❌ Question ${i} missing sampleAnswer`);
//           continue; // Skip invalid questions
//         }
//         validatedQ.sampleAnswer = q.sampleAnswer;
//       }

//       validatedQuestions.push(validatedQ);
//     }

//     if (validatedQuestions.length === 0) {
//       console.error("❌ No valid questions after validation");
//       return res.status(500).json({ 
//         error: "No valid questions could be generated",
//         attempted: questions.length
//       });
//     }

//     console.log(`✅ ${validatedQuestions.length} valid questions after validation`);
//     console.log(`✅ Used model: ${successfulModel}`);
//     console.log("✅ Sending response to client");
//     res.json({ questions: validatedQuestions });

//   } catch (err) {
//     console.error("❌ Server error:", err);
//     console.error("Error name:", err.name);
//     console.error("Error message:", err.message);
//     console.error("Stack trace:", err.stack);
    
//     res.status(500).json({ 
//       error: "Internal server error",
//       message: err.message,
//       type: err.name
//     });
//   }
// });

// // Health check endpoint
// app.get("/", (req, res) => {
//   res.json({ 
//     status: "running",
//     message: "Quiz Generator Server Running ✅",
//     hasApiKey: !!GEMINI_API_KEY,
//     timestamp: new Date().toISOString()
//   });
// });

// // Test endpoint to verify API key and find working model
// app.get("/test-api", async (req, res) => {
//   const modelsToTest = [
//     'gemini-1.5-flash',
//     'gemini-1.5-flash-latest', 
//     'gemini-1.5-pro',
//     'gemini-1.5-pro-latest',
//     'gemini-pro',
//     'gemini-1.0-pro'
//   ];

//   const results = [];

//   for (const modelName of modelsToTest) {
//     try {
//       const response = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             contents: [{ parts: [{ text: "Say hello" }] }]
//           })
//         }
//       );
      
//       const data = await response.json();
//       results.push({
//         model: modelName,
//         success: response.ok,
//         status: response.status,
//         response: response.ok ? "✅ Working" : data
//       });

//       if (response.ok) {
//         console.log(`✅ ${modelName} is working!`);
//       }
//     } catch (err) {
//       results.push({
//         model: modelName,
//         success: false,
//         error: err.message
//       });
//     }
//   }

//   res.json({ 
//     apiKeyPresent: !!GEMINI_API_KEY,
//     results: results,
//     workingModels: results.filter(r => r.success).map(r => r.model)
//   });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📡 API endpoint: http://localhost:${PORT}/generate-quiz`);
//   console.log(`🔍 Test endpoint: http://localhost:${PORT}/test-api`);
//   console.log(`🏥 Health check: http://localhost:${PORT}/`);
// });

// import express from "express";
// import cors from "cors";
// import fetch from "node-fetch";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json({ limit: "10mb" }));

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// if (!GEMINI_API_KEY) {
//   console.error("❌ GEMINI_API_KEY not found!");
// } else {
//   console.log("✅ GEMINI_API_KEY loaded successfully");
// }

// app.post("/generate-quiz", async (req, res) => {
//   try {
//     const { documentContent, quantity, quizType, difficulty } = req.body;

//     if (!documentContent) {
//       return res.status(400).json({ error: "Content required" });
//     }

//     const qCount = quantity || 10;
//     const type = quizType === "open" ? "Open Ended" : "Multiple Choice";
//     const diff = difficulty || "Medium";

//     let prompt = "";

//     if (type === "Multiple Choice") {
//       prompt = `
// You are a quiz generator. Based on the following content, generate exactly ${qCount} multiple-choice questions with ${diff} difficulty.

// Content:
// ${documentContent}

// Generate a JSON array with this EXACT structure (no markdown, no explanation, ONLY the JSON array):
// [
//   {
//     "id": "1",
//     "prompt": "Question text here?",
//     "options": ["Option A", "Option B", "Option C", "Option D"],
//     "correctIndex": 0
//   }
// ]

// CRITICAL RULES:
// - Return ONLY the JSON array, no other text
// - Each question MUST have exactly 4 options
// - correctIndex must be 0,1,2,3
// - Generate exactly ${qCount} questions
// - Difficulty level: ${diff}`;
//     } else {
//       prompt = `
// You are a quiz generator. Based on the following content, generate exactly ${qCount} open-ended questions with ${diff} difficulty.

// Content:
// ${documentContent}

// Generate a JSON array with this EXACT structure (no markdown, no explanation, ONLY the JSON array):
// [
//   {
//     "id": "1",
//     "prompt": "Question text here?",
//     "sampleAnswer": "A detailed sample answer here"
//   }
// ]

// CRITICAL RULES:
// - Return ONLY the JSON array, no other text
// - Each question must have a comprehensive sampleAnswer
// - Generate exactly ${qCount} questions
// - Difficulty level: ${diff}`;
//     }

//     const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         contents: [{ parts: [{ text: prompt }] }],
//         generationConfig: {
//           temperature: 0.7,
//           maxOutputTokens: 2048,
//         },
//       }),
//     });

//     const data = await response.json();
//     let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

//     // Extract JSON from AI response
//     const match = text.match(/\[[\s\S]*\]/);
//     let questions = [];

//     if (match) {
//       try {
//         questions = JSON.parse(match[0]);
//       } catch (e) {
//         questions = [{ error: "Failed to parse AI response" }];
//       }
//     } else {
//       questions = [{ error: "No valid JSON found in AI response" }];
//     }

//     res.json({ questions });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to generate quiz", details: err.message });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


// import express from "express";
// import cors from "cors";
// import fetch from "node-fetch";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json({ limit: "10mb" }));

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// if (!GEMINI_API_KEY) {
//   console.error("❌ GEMINI_API_KEY not found!");
// } else {
//   console.log("✅ GEMINI_API_KEY loaded successfully");
// }

// app.post("/generate-quiz", async (req, res) => {
//   try {
//     const { documentContent, quantity, quizType, difficulty } = req.body;

//     if (!documentContent) return res.status(400).json({ error: "Content required" });

//     const qCount = quantity || 10;
//     const type = quizType === "open" ? "Open Ended" : "Multiple Choice";
//     const diff = difficulty || "Medium";

//     let prompt = "";

//     if (type === "Multiple Choice") {
//       prompt = `
// You are a quiz generator. Based ONLY on the following content, generate exactly ${qCount} multiple-choice questions with ${diff} difficulty.

// Content:
// ${documentContent}

// Return ONLY a valid JSON array in this format:
// [
//   {
//     "id": "1",
//     "prompt": "Question text here?",
//     "options": ["Option A", "Option B", "Option C", "Option D"],
//     "correctIndex": 0
//   }
// ]
// `;
//     } else {
//       prompt = `
// You are a quiz generator. Based ONLY on the following content, generate exactly ${qCount} open-ended questions with ${diff} difficulty.

// Content:
// ${documentContent}

// Return ONLY a valid JSON array in this format:
// [
//   {
//     "id": "1",
//     "prompt": "Question text here?",
//     "sampleAnswer": "A detailed sample answer here"
//   }
// ]
// `;
//     }

//     const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         contents: [{ parts: [{ text: prompt }] }],
//         generationConfig: {
//           temperature: 0.7,
//           maxOutputTokens: 2048,
//         },
//       }),
//     });

//     const data = await response.json();
//     let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

//     // Extract JSON array from AI response
//     const match = text.match(/\[[\s\S]*\]/);
//     let questions = [];

//     if (match) {
//       try {
//         questions = JSON.parse(match[0]);
//       } catch (e) {
//         questions = [{ error: "Failed to parse AI response" }];
//       }
//     } else {
//       questions = [{ error: "No valid JSON found in AI response" }];
//     }

//     res.json({ questions });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to generate quiz", details: err.message });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY not found!");
} else {
  console.log("✅ GEMINI_API_KEY loaded successfully");
}

// Health check
app.get("/", (req, res) => {
  res.send("Quiz Generator Backend is running!");
});

app.post("/generate-quiz", async (req, res) => {
  try {
    const { documentContent, quantity, quizType, difficulty } = req.body;

    if (!documentContent) {
      return res.status(400).json({ error: "Content required" });
    }

    const qCount = quantity || 5;
    const type = quizType === "open-ended" ? "Open Ended" : "Multiple Choice";
    const diff = difficulty || "medium";

    // Build prompt for AI
    let prompt = "";
    if (type === "Multiple Choice") {
      prompt = `
You are a quiz generator. Based ONLY on the following content, generate exactly ${qCount} multiple-choice questions with ${diff} difficulty.

Content:
${documentContent}

Return ONLY a valid JSON array in this format:
[
  {
    "id": "1",
    "prompt": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0
  }
]
      `;
    } else {
      prompt = `
You are a quiz generator. Based ONLY on the following content, generate exactly ${qCount} open-ended questions with ${diff} difficulty.

Content:
${documentContent}

Return ONLY a valid JSON array in this format:
[
  {
    "id": "1",
    "prompt": "Question text here?",
    "sampleAnswer": "A detailed sample answer here"
  }
]
      `;
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      }),
    });

    const data = await response.json();
    let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Extract JSON from AI response
    const match = text.match(/\[[\s\S]*\]/);
    let questions = [];

    if (match) {
      try {
        questions = JSON.parse(match[0]);
      } catch (e) {
        questions = [{ error: "Failed to parse AI response" }];
      }
    } else {
      questions = [{ error: "No valid JSON found in AI response" }];
    }

    res.json({ questions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate quiz", details: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
