import { APIGatewayProxyEvent, APIGatewayProxyHandler, Callback, Context } from 'aws-lambda';
import 'source-map-support/register';
import { DocumentClient } from "aws-sdk/lib/dynamodb/document_client";

import ScanInput = DocumentClient.ScanInput;

const AWS = require('aws-sdk');

AWS.config.setPromisesDependency(Promise);

const tableName = process.env.DYNAMODB_TABLE;
const docClient = new AWS.DynamoDB.DocumentClient();

export const list: APIGatewayProxyHandler = (_event: APIGatewayProxyEvent, _context: Context, callback: Callback) => {
  const params: ScanInput = {
    TableName: tableName,
    ProjectionExpression: "id, title, content, createdAt, modifiedAt, completed, repeatDetail",
  };

  docClient.scan(params, (error, data) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: {'Content-Type': 'text/plain'},
        body: 'couldn\'t create the form item.',
      });
    }

    callback(null, {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": "*" // Required for CORS support to work
      },
      body: JSON.stringify(data),
    });
  });
};

