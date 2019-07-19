import { APIGatewayProxyEvent, APIGatewayProxyHandler, Callback, Context } from 'aws-lambda';
import 'source-map-support/register';

const shortid = require('shortid');
const AWS = require('aws-sdk');

import { TodoApp } from "../../application/todo.app";
import { TodoService } from "../../domain/todo.service";
import { TodoModel } from "../../../common/model/todo.model";
import { ErrorModel } from "../../../common/entity/todo.entity";

AWS.config.setPromisesDependency(Promise);

const tableName = process.env.DYNAMODB_TABLE;
const docClient = new AWS.DynamoDB.DocumentClient();

export const create: APIGatewayProxyHandler = (_event: APIGatewayProxyEvent, _context: Context, callback: Callback) => {
  let body;
  console.log(_event);
  try {
    body = JSON.parse(_event.body);
    console.log(body);
  } catch (error) {
    return callback(null, {statusCode: 400, body: JSON.stringify(error)});
  }

  let todoService = new TodoService();
  let todoApp = new TodoApp(todoService);
  let todo: TodoModel | ErrorModel = todoApp.createTodo(body);

  if (todo instanceof ErrorModel || todo ['type']) {
    callback(null, {
      statusCode: 404,
      headers: {'Content-Type': 'text/plain'},
      body: 'couldn\'t validate the form item.',
    });
    return;
  }

  const timestamp = new Date().getTime();

  todo.id = shortid.generate();
  todo.createdAt = timestamp;
  todo.modifiedAt = timestamp;

  const params = {
    TableName: tableName,
    Item: todo
  };

  docClient.put(params, (error, _data) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: {'Content-Type': 'text/plain'},
        body: 'couldn\'t validate the form item.',
      });
    }

    callback(null, {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": "*" // Required for CORS support to work
      },
      body: JSON.stringify(params.Item),
    });
  });
};
