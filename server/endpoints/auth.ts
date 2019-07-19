'use strict';

import { Callback, Context, CustomAuthorizerEvent } from "aws-lambda";

const generatePolicy = function (principalId, effect, resource) {
  const authResponse = {
    policyDocument: null,
    principalId: principalId
  };
  if (effect && resource) {
    const policyDocument = {
      Version: '2012-10-17',
      Statement: []
    };
    const statementOne = {
      Action: 'execute-api:Invoke',
      Effect: effect,
      Resource: resource
    };
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};

module.exports.authorize = (event: CustomAuthorizerEvent, _context: Context, callback: Callback) => {
  console.log(event);
  console.log("==================");
  console.log("Authorization: ", event.authorizationToken);
  console.log("==================");
  var token = event.authorizationToken;

  if (token) {
    callback(null, generatePolicy('user', 'Allow', '*'));
  } else {
    callback(null, generatePolicy('user', 'Deny', '*'));
  }
};
