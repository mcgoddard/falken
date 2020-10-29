const serverless = require('serverless-http');

const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;
const { getAllScores } = require('./data');

app.use(cors());

app.get('/scores', async (req, res) => {
  const scores = await getAllScores();
  res.json(scores);
});

app.use((req, res) => {
  res.send("Endpoint doesn't exist...");
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`falken-api listening at http://localhost:${port}`);
  });
}

module.exports.handle = serverless(app);
