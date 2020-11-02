const { json } = require("express");
const AWS = require('aws-sdk');

const document_client = new AWS.DynamoDB.DocumentClient();

exports.handle = async function(event, context) {
  await Promise.all(event.Records.map(async record => {
    const { body } = record;
    console.info("Body: " + body);

    const update = JSON.parse(body);
    const params = {
      TableName: "falkenScoresTable",
      Key: {
          "team_name": update.team_name
      },
      UpdateExpression: "SET score = score + :incr",
      ExpressionAttributeValues: {
          ":incr": update.modifier,
      }
    };

    try {
      const result = await document_client.update(params).promise();
      console.info(`Wrote to dynamodb: ${JSON.stringify(result)}`);
    } catch (error) {
      console.error(`Error writing to dynamodb: ${error}`);
    }
  }));
  return {};
}
