const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { Configuration, OpenAIApi } = require('openai');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.MONGODB_DBNAME
}).then(() => console.log('MongoDB connected')).catch(err => console.error(err));

// OpenAI Configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Website Summarizer API');
});

// POST endpoint to accept website URL
app.post('/summarize', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    // Fetch HTML content of the URL
    const response = await axios.get(url);
    const html = response.data;

    // Parse HTML to extract main text content
    const $ = cheerio.load(html);
    const textContent = $('body').text();

    // Send content to OpenAI API for summarization
    const openaiResponse = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Summarize the following text: ${textContent}`,
      max_tokens: 150,
    });

    const summary = openaiResponse.data.choices[0].text.trim();

    // Respond with the summary
    res.json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the request' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});