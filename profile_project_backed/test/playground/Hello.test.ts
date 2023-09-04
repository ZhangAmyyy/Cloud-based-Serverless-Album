import { handler } from '../../services/SpacesTable/Create';
import { APIGatewayProxyEvent } from 'aws-lambda';

const event: APIGatewayProxyEvent = {
    body:{
        name: 'someName',
        location: 'some location'
    }
} as any;



const result = handler(event, {} as any).then((apiResult)=>{
    // console.log(123)
    //console.log(apiResult.body);
    const items = JSON.parse(apiResult.body);

});