import { APIGatewayProxyEvent, APIGatewayProxyHandler, Callback, Context } from 'aws-lambda';
import 'source-map-support/register';

const shortid = require('shortid');
const AWS = require('aws-sdk');

import { TodoApp } from "../../application/todo.app";
import { TodoService } from "../../domain/todo.service";
import { TodoModel } from "../../../common/model/todo.model";
import { ErrorModel } from '../../../common/model/common.model';

AWS.config.setPromisesDependency(Promise);

const tableName = process.env.DYNAMODB_TABLE;
const docClient = new AWS.DynamoDB.DocumentClient();

export const create: APIGatewayProxyHandler = (_event: APIGatewayProxyEvent, _context: Context, callback: Callback) => {
  let token = _event.headers['Authorization'];
  if (!token) {
    return callback(null, {statusCode: 401, body: JSON.stringify({type: 'NOT Token'})});
  }
  let body;
  try {
    body = JSON.parse(_event.body);
  } catch (error) {
    return callback(null, {statusCode: 400, body: JSON.stringify(error)});
  }

  let todoService = new TodoService();
  let todoApp = new TodoApp(todoService);
  let todo: TodoModel | ErrorModel = todoApp.createTodo(body);

  if (todo instanceof ErrorModel || todo ['type']) {
    callback(null, {
      statusCode: 404,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(todo),
    });
    return;
  }

  const timestamp = new Date().getTime();

  todo.id = shortid.generate();
  todo.createdAt = timestamp;
  todo.modifiedAt = timestamp;

  const params = {
    TableName: tableName,
    Item: Object.assign({token: token}, todo)
  };

  docClient.put(params, (error, _data) => {
    if (error) {
      console.error(params, error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(error)
      });
    }

    callback(null, {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": "*" // Required for CORS support to work
      },
      body: JSON.stringify({id: params.Item.id}),
    });
  });
};

