const { json } = require("express");
const AWS = require('aws-sdk');
    
const document_client = new AWS.DynamoDB.DocumentClient();

exports.handle = async function(event, context) {
  await Promise.all(event.Records.map(async record => {
    const { body } = record;
    console.log(body);

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

    await document_client.update(params, function(err, data) {
      if (err) console.log(err);
      else console.log(data);
    }).promise();
  }));
  return {};
}
