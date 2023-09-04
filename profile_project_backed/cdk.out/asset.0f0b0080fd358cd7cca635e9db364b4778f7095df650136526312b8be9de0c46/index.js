"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// services/ReservationsTable/Update.ts
var Update_exports = {};
__export(Update_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(Update_exports);
var import_aws_sdk = require("aws-sdk");

// services/Shared/Utils.ts
function getEventBody(event) {
  return typeof event.body == "object" ? event.body : JSON.parse(event.body);
}
function addCorsHeader(result) {
  result.headers = {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*"
  };
}
function isIncludedInGroup(group, event) {
  var _a;
  const groups = (_a = event.requestContext.authorizer) == null ? void 0 : _a.claims["cognito:groups"];
  if (groups) {
    return groups.includes(group);
  } else {
    return false;
  }
}

// services/ReservationsTable/Update.ts
var TABLE_NAME = process.env.TABLE_NAME;
var PRIMARY_KEY = process.env.PRIMARY_KEY;
var dbClient = new import_aws_sdk.DynamoDB.DocumentClient();
async function handler(event, context) {
  var _a;
  const result = {
    statusCode: 200,
    body: "Hello from DYnamoDb"
  };
  addCorsHeader(result);
  try {
    if (isIncludedInGroup("admins", event)) {
      const requestBody = getEventBody(event);
      const newState = "state" in requestBody ? requestBody.state : "";
      const reservationId = (_a = event.queryStringParameters) == null ? void 0 : _a[PRIMARY_KEY];
      if (reservationId && isValidState(newState)) {
        const requestBodyKey = Object.keys(requestBody)[0];
        const requestBodyValue = requestBody[requestBodyKey];
        const updateResult = await dbClient.update({
          TableName: TABLE_NAME,
          Key: {
            [PRIMARY_KEY]: reservationId
          },
          UpdateExpression: "set #zzzNew = :new",
          ExpressionAttributeValues: {
            ":new": requestBodyValue
          },
          ExpressionAttributeNames: {
            "#zzzNew": requestBodyKey
          },
          ReturnValues: "UPDATED_NEW"
        }).promise();
        result.body = JSON.stringify(updateResult);
      } else {
        result.statusCode = 400;
        result.body = "Invalid request!";
      }
    } else {
      result.body = JSON.stringify("Not authorized!");
      result.statusCode = 403;
    }
  } catch (error) {
    result.statusCode = 500;
    if (error instanceof Error)
      result.body = error.message;
  }
  return result;
}
function isValidState(newState) {
  if (newState == "PENDING" || newState == "APPROVED" || newState == "CANCELED") {
    return true;
  } else {
    return false;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
