import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { v4 } from "uuid";

const dbClient = new DynamoDB.DocumentClient();

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    const result: APIGatewayProxyResult = {
        statusCode: 200,
        body: "hello from dynamodb!!!!"
    }
    // const item = {
    //     spaceId: v4();
    // }
    const item = typeof event.body == 'object' ? event.body : JSON.parse(event.body);
    item.spaceId = v4();
    try {
        await dbClient.put({
            TableName: 'SpacesTable',
            Item: item
        }).promise()
    } catch (error: any) {
        result.body = error.message
    }
    result.body = JSON.stringify("created with this id:::::", item.spaceId);
    return result;
}
export { handler }