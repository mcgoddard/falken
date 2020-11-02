const { performance } = require('perf_hooks');
const AWS = require('aws-sdk');
const axios = require("axios");

const base_urls = process.env.BASE_URLS.split(',');
const team_names = process.env.TEAM_NAMES.split(',');

const team_mappings = {}
for (let i = 0; i < base_urls.length; i++) {
    team_mappings[base_urls[i]] = team_names[i];
}

const delay = (ms) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

const makeCall = async (url) => {
    await delay(Math.random() * 60000);
    const timeBefore = performance.now();
    let result;
    let time;
    try {
        result = await axios.get(url, { timeout: 10000 });
        time = performance.now() - timeBefore;
    } catch (error) {
        console.error("Error making request: " + error);
        result = { status: 0 };
        time = 10000;
    }
    return [result, time];
}

AWS.config.update({region: 'eu-west-2'});
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

exports.handle = async function(event, context) {
  await Promise.all(base_urls.map(async base_url => {
    const responses = [];

    for (let i = 0; i < 1000; i++) {
        responses.push(makeCall(base_url));
    }

    const results = await Promise.all(responses);
    const validResponses = results.reduce(
        (accumulator, response) => response[0].status >= 200 && response[0].status < 400 ? accumulator + 1 : accumulator, 0
    );
    const averageResponseTime = (results.reduce((accumulator, response) => accumulator + response[1], 0) / results.length) || 10000;
    console.info(base_url + " " + averageResponseTime + " " + results.length);

    const message_body = JSON.stringify({
        "team_name": team_mappings[base_url],
        "modifier": Math.ceil(validResponses / 100) + Math.ceil((1000 - averageResponseTime) / 100)
    });
    console.info("Message body: "+message_body)
    const params = {
        MessageBody: message_body,
        QueueUrl: process.env.QUEUE_URL
    };
    try {
        const send_result = await sqs.sendMessage(params).promise();
        console.info("Sent to SQS: " + send_result);
    } catch (error) {
        console.error("Error sending to SQS: " + error);
    }
  }));
  return {};
}
