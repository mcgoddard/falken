const serverless = require('serverless-http');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const AWS = require('aws-sdk');

const app = express();
const port = 3000;
const { getAllScores } = require('./data');

AWS.config.update({region: 'eu-west-2'});
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

app.use(cors());
app.use(bodyParser.json());

app.get('/scores', async (req, res) => {
  const scores = await getAllScores();
  res.json(scores);
});

app.put('/scores', async (req, res) => {
  console.info(JSON.stringify(req.body));
  const params = {
    MessageBody: JSON.stringify(req.body),
    QueueUrl: process.env.QUEUE_URL
  };
  try {
    const send_result = await sqs.sendMessage(params).promise();
    console.info("Sent to SQS: " + send_result);
    res.send(200);
  } catch (error) {
    console.error("Error sending to SQS: " + error);
    res.send(500);
  }
});

app.use((req, res) => {
  res.send("Endpoint doesn't exist...");
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.info(`falken-api listening at http://localhost:${port}`);
  });
}

module.exports.handle = serverless(app);
