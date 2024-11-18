
// 1.Create an Organization
import { v4 as uuidv4 } from 'uuid';
import { DynamoDBClient, PutItemCommand, UpdateItemCommand, GetItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';

var client = new DynamoDBClient({ region: 'us-east-1' });

/* 
const orgId = uuidv4();

var params = {
  TableName: 'happy-projects',
  Item: {
    PK: { S: `ORG#${orgId}` },
    SK: { S: `#METADATA#${orgId}` },
    name: { S: 'ABC-inc' },
    tier: { S: 'professional' }
  
  }
};

var command = new PutItemCommand(params);

try {
  const response = await client.send(command);
  console.log(response);
} catch (err) {
  console.error(err);
}

const happyIncOrgId=orgId; 
*/

// 2. Create an agile project in ABC-inc
/* 
const happyIncOrgId = "de54a32f-c16d-4ddf-bf1a-f1725e511b61";
const projectid = uuidv4();

var params = {
  TableName: 'happy-projects',
  Item: {
    PK: { S: `ORG#${happyIncOrgId}` },
    SK: { S: `PRO#agile#${projectid}` },
    name: { S: 'project-B' },
    project_id: { S: `${projectid}` }
  
  }
};

var command = new PutItemCommand(params);

try {
  const response = await client.send(command);
  console.log(response);
} catch (err) {
  console.error(err);
}
 */

// 3. Edit an Organization

/* 
const happyIncOrgId="2b9cd595-63a3-4288-89da-44fa243fb3ee";
const params = {
  TableName: 'happy-projects',
  Key: {
    PK: { S: `ORG#${happyIncOrgId}` },
    SK: { S: `#METADATA#${happyIncOrgId}` }
  },
  UpdateExpression: "set #org_id = :org_id",
  ExpressionAttributeNames: {
    "#org_id": "org_id",
  },
  ExpressionAttributeValues: {
    ":org_id": { S: `${happyIncOrgId}` },
  },
};

const command = new UpdateItemCommand(params);

try {
  const response = await client.send(command);
  console.log(response);
} catch (err) {
  console.error(err);
} */

// 4. Find an organization
/* 
const OrgId="2b9cd595-63a3-4288-89da-44fa243fb3ee";

var params = {
  TableName : 'happy-projects',
  Key: {
    PK: { S: `ORG#${OrgId}` },
    SK: { S: `#METADATA#${OrgId}` }
  }
};

const command = new GetItemCommand(params);

try {
  const response = await client.send(command);
  console.log(response);
} catch (err) {
  console.error(err);
} 
  */

// 5. Find projects of happy-inc organization

/* const OrgId="2b9cd595-63a3-4288-89da-44fa243fb3ee";

const params = {
  "TableName": "happy-projects",
  "ExpressionAttributeValues": {
    ":PK": {"S": `ORG#${OrgId}`},
    ":SK": {"S": "PRO#"}
  },
  "KeyConditionExpression": "PK= :PK and begins_with(SK, :SK)",     //this line gives the same result as the two lines below
  //"KeyConditionExpression": "#PK= :PK and begins_with(#SK, :SK)",
  //"ExpressionAttributeNames": {"#PK" : "PK" , "#SK" : "SK"}       
};

const command = new QueryCommand(params);
try {
  const response = await client.send(command);
  //console.log(response);
  const formattedItems = response.Items.map(item => ({
    SK: item.SK.S,
    project_id: item.project_id.S,
    PK: item.PK.S,
    name: item.name.S,
  }));

  console.log(formattedItems);
} catch (err) {
  console.error(err);
} 
 */

// 6. Create Employees
/* 
const OrgId = "2b9cd595-63a3-4288-89da-44fa243fb3ee";
const empid = uuidv4();

var params = {
  TableName: 'happy-projects',
  Item: {
    PK: { S: `ORG#${OrgId}` },
    SK: { S: `EMP#${empid}` },
    name: { S: 'Ngwi jane' },
    email: { S: 'ngwij@rene.com' }
  
  }
};
 
var command = new PutItemCommand(params);

try {
  const response = await client.send(command);
  console.log(response);
} catch (err) {
  console.error(err);
}
  */

// 7. Assign an employee to a project

/* const OrgId = "2b9cd595-63a3-4288-89da-44fa243fb3ee";
//const projectx ="b3f5f34b-9d40-4557-966d-a1bc86d7d25d"; //id for projectx
const projecty ="3046813d-55c2-4853-b9fb-7324f204f8fc";
//const empid = "999feaa7-aca3-4f42-9673-9d039aa05fa7";   //id for neba rene
//const empid = "65fa6b3b-1e9f-4d18-822e-a3b61a8ca1a7";  // id of raymond fru
const empid = "dc69466a-bd0b-47e7-bc48-29aaa41d57fa"; //id of ngwi jane


var params = {
  TableName: 'happy-projects',
  Item: {
    PK: { S: `ORG#${OrgId}#PRO#${projecty}` },
    SK: { S: `ORG#${OrgId}#EMP#${empid}` },
    name: { S: 'Ngwi jane' },                  //this line and the one with email are not in the database schema 
    email: { S: 'nqwij@rene.com' },
    date_of_join: {S: `${new Date().toUTCString()}`}
  
  }
};

var command = new PutItemCommand(params);

try {
  const response = await client.send(command);
  console.log(response);
} catch (err) {
  console.error(err);
} 
*/

// 8. Find employees assigned to a particular project
/*
console.log("Find employees assigned to a particular project");

const OrgId="2b9cd595-63a3-4288-89da-44fa243fb3ee";
const projectid = "b3f5f34b-9d40-4557-966d-a1bc86d7d25d"; //projectx id

const params = {
  "TableName": "happy-projects",
  "ExpressionAttributeValues": {
    ":PK": {"S": `ORG#${OrgId}#PRO#${projectid}`}
  },
  "KeyConditionExpression": "PK= :PK",     //this line gives the same result as the two lines below
  //"KeyConditionExpression": "#PK= :PK and begins_with(#SK, :SK)",
  //"ExpressionAttributeNames": {"#PK" : "PK" , "#SK" : "SK"}       //when you see PK call it #PK and
};															    //when you see SK call it #SK

const command = new QueryCommand(params);
try {
  const response = await client.send(command);
  //console.log(response);
   const formattedItems = response.Items.map(item => ({
    SK: item.SK.S,
    PK: item.PK.S,
    email: item.email.S,
    name: item.name.S,
    date_of_join: item.date_of_join.S      //the result of this query ressembles
  }));                                  // is obtained from the project-employee data item

  console.log(formattedItems);
} catch (err) {
  console.error(err);
} 
 */

// 9. Find projects to which an employee is part of - inverted index (i.e. GSI global secondary index)

/* 
console.log("Find projects to which an employee is part of");

const OrgId="2b9cd595-63a3-4288-89da-44fa243fb3ee";
const empid = "999feaa7-aca3-4f42-9673-9d039aa05fa7"; 

const params = {
  "TableName": "happy-projects",
  "IndexName": "SK-PK-index",
  "ExpressionAttributeValues": {
    ":SK": {"S": `ORG#${OrgId}#EMP#${empid}`}
  },
 // "KeyConditionExpression": "SK= :SK",     //this line gives the same result as the two lines below
 "KeyConditionExpression": "#SK= :SK",
 "ExpressionAttributeNames": {"#SK" : "SK"}
      
};

const command = new QueryCommand(params);
try {
  const response = await client.send(command);
  //console.log(response);
  const formattedItems = response.Items.map(item => ({
    SK: item.SK.S,
    email: item.email.S,
    PK: item.PK.S,
    name: item.name.S,
    date_of_join: item.date_of_join.S 
  })); 

  console.log(formattedItems);
} catch (err) {
  console.error(err);
} 

 */

// Find items based on items names not Ids

console.log("Find an employee by using his name and a project by using its name");

const OrgId="2b9cd595-63a3-4288-89da-44fa243fb3ee";
const empname = "Ngwi"; 
const project = "project";

const params = {
  "TableName": "happy-projects",
  "IndexName": "PK-Data-index",
  "ExpressionAttributeValues": {
    ":PK": {"S": `ORG#${OrgId}`},
    ":SK": {"S": `PRO#${project}`}
  },  
"KeyConditionExpression": "#PK= :PK and begins_with(#SK,:SK)",
 "ExpressionAttributeNames": {"#PK": "PK", "#SK" : "Data"}      
      
};

const command = new QueryCommand(params);
try {
  const response = await client.send(command);
  //console.log(response);
  const formattedItems = response.Items.map(item => ({
    SK: item.SK.S,
    project_id: item.project_id.S,
    PK: item.PK.S,
    //email: item.email.S,
    name: item.name.S,
    Data: item.Data.S 
  }));  

  console.log(formattedItems);
} catch (err) {
  console.error(err);
} 