const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const express = require('express');
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const app = express();
const port = 5500;

const MODEL_NAME = "gemini-pro";
const API_KEY = "AIzaSyCI5jzsYiE_Awt93Blvdfn_3Quhs5wViJI";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

const safetySettings = [
  
];

let history = [];

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: false}));

app.post('/clear', function(req, res) {
  history = [];
  res.json({ status: 'History cleared' });
});

app.post('/generate', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: history,
    });

    const result = await chat.sendMessage(userMessage);
    const response = result.response;
    res.send(response);

    history.push({
      role: "user",
      parts: [{ text: userMessage }],
    });
    history.push({
      role: "model",
      parts: [{ text: response.text() }],
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ error: 'An error occurred while generating content' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    return cb(null, 'file.pdf')
  }
})

const upload = multer({ storage: storage })

app.post('/upload', upload.single('pdf'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const fileName = req.file.filename;
  console.log('Uploaded file:', req.file);
  console.log('File path:', req.file.path);

  try {
    const dataBuffer = await pdf(req.file.path);
    let textContent = dataBuffer.text;
    const uploadDir = path.dirname(req.file.path);
    const fileName = 'extracted_text.txt';
    // const filePath = path.join(__dirname, fileName);
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, textContent);
    console.log(`Text extracted and saved to ${filePath}`);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error extracting text from PDF or generating content');
  }

  return res.redirect('/');
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
