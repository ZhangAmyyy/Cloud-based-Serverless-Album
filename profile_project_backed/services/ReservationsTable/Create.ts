import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { MissingFieldError, validateAsReservationEntry } from '../Shared/InputValidator'
import { generateRandomId, getEventBody, addCorsHeader } from '../Shared/Utils'

const TABLE_NAME = process.env.TABLE_NAME
const dbClient = new DynamoDB.DocumentClient();

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    const result: APIGatewayProxyResult = {
        statusCode: 200,
        body: 'Hello from DYnamoDb'
    }
    addCorsHeader(result)
    try {
        const item = getEventBody(event);
        item.state = 'PENDING';
        item.reservationId = generateRandomId();
        validateAsReservationEntry(item);
        await dbClient.put({
            TableName: TABLE_NAME!,
            Item: item
        }).promise()
        result.body = JSON.stringify({
            id: item.reservationId
        })
    } catch (error) {
        if (error instanceof MissingFieldError) {
            result.statusCode = 400;
        } else {
            result.statusCode = 500;
        }
        if (error instanceof Error) 
        result.body = JSON.stringify(error.message);
    }
    return result
}

export { handler }