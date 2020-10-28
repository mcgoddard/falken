const AWS = require('aws-sdk');

AWS.config.update({
  region: "eu-west-2",
});
  
const docClient = new AWS.DynamoDB.DocumentClient();

var params = {
  TableName: "scoresTable",
};

const getAllScores = async () => {
  const result = await docClient.scan(params).promise();
  return result.Items;
}

module.exports = { getAllScores };
