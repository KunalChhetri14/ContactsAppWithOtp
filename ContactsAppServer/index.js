const express = require('express');
const port = 3001;
const app = express();


//mongodb atlas url
const url =
  'mongodb+srv://Kunal:mongodb123@clustertutorialspoint-o34i7.mongodb.net/test?retryWrites=true&w=majority';


  const dbName="KissanAssignmentDatabase";


  //This get api is used to fetch all the contact details for every person
  app.get('getContactList',(req,res)=>{
        return [
            {"fName":"Kunal","lName":"Chhetri","phoneNumber":"9986792651"},
            {"fName":"Ajay","lName":"Bandra","phoneNumber":"9986792651"},
            {"fName":"Shruti","lName":"Choudhary","phoneNumber":"9986792651"},
            ]
  })

app.listen(port, function () {
    console.log("Server is running on "+ port +" port");
  });