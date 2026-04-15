require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, '../Frontend/public/uploads')));

// 1. Multer Setup for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../Frontend/public/uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

const contentFilePath = path.join(__dirname, '../Frontend/src/data/content.json');

// --- CONTENT ENDPOINTS ---

app.get('/api/content', (req, res) => {
  fs.readFile(contentFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read content' });
    res.json(JSON.parse(data));
  });
});

app.post('/api/content', (req, res) => {
  fs.writeFile(contentFilePath, JSON.stringify(req.body, null, 2), (err) => {
    if (err) return res.status(500).json({ error: 'Failed to update content' });
    res.json({ message: 'Content updated' });
  });
});

// --- UPLOAD ENDPOINT ---
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// --- GEMINI AI ENDPOINT ---
app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not configured in .env' });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 1. Read current content
    const currentData = fs.readFileSync(contentFilePath, 'utf8');

    // 2. Prepare AI System Prompt
    const systemPrompt = `
      You are an AI Portfolio Assistant for Rajesh Praharaj.
      Current Website Data: ${currentData}
      
      The user will give you a command to update their portfolio. 
      Your job is to return ONLY the updated JSON structure.
      Do not include any chat, explanations, or markdown code blocks. 
      Just return the raw valid JSON.
      
      User Command: "${prompt}"
    `;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const text = response.text().trim();
    
    // Clean up potential markdown formatting from AI
    const cleanedJson = text.replace(/^```json/, '').replace(/```$/, '').trim();
    
    // Validate and Save
    const updatedData = JSON.parse(cleanedJson);
    fs.writeFileSync(contentFilePath, JSON.stringify(updatedData, null, 2));

    res.json({ message: 'AI Override Successful', updatedContent: updatedData });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ error: 'AI failed to process request' });
  }
});

// --- VISITOR LOG ENDPOINTS ---

app.post('/api/visit', (req, res) => {
  const { name, email, ip } = req.body;
  const sql = `INSERT INTO visitors (name, email, ip) VALUES (?, ?, ?)`;
  db.run(sql, [name || 'Anonymous', email || '', ip || ''], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, message: 'Logged' });
  });
});

app.get('/api/visits', (req, res) => {
  const sqlCount = `SELECT COUNT(*) as total FROM visitors`;
  const sqlList = `SELECT * FROM visitors ORDER BY created_at DESC`;
  db.get(sqlCount, [], (err, countRow) => {
    if (err) return res.status(500).json({ error: err.message });
    db.all(sqlList, [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ totalVisits: countRow.total, visitors: rows });
    });
  });
});

app.listen(PORT, () => console.log(`System running on port ${PORT}`));
