const express = require('express');
// const port = 3001;
const app = express();
var cors=require('cors');
var bodyParser=require('body-parser');

//MongoDriver
var MongoClient = require('mongodb').MongoClient;

//MongodbClient
const url =
  'mongodb+srv://Kunal:mongodb123@clustertutorialspoint-o34i7.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(url, { useNewUrlParser: true });

//Nexmo required for sending Message
const Nexmo = require('nexmo');

//app.set('port',(process.env.PORT||3001));

var PORT=process.env.PORT || 3001;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Database name
const dbName="KissanAssignmentDatabase";


//Nexmo apiKey and secret key required for sending messsage.
  const nexmo = new Nexmo({
    apiKey: '3c212bb0',
    apiSecret: 'w7hTkGIPJ3TnUVai',
  });





  app.get('/',(req,res)=>{
    res.send("welcome to server");
  })


  //This get api is used to fetch all the contact details for every person
  app.get('/getContactList',(req,res)=>{
    console.log("Checking whether api is called");
    MongoClient.connect(url, function(err, db) {
      if (err) {
        console.log('Mongodb client not connected');
        return res.status(502).send({
          message: 'there is database side error'
        });
      }
      else{
            console.log("No error ..successfully connected");
            //Database or collection from which data is to be fetched
            var dbo = db.db('KissanAssignmentDatabase');
            // dbo.collection('Users_Credentials').insert({"name":"mr kunal"});
            dbo.collection('ContactLists').find().toArray(function(err,data){
             //if toArray has no error and returns data
              if(data){
                  console.log("vaue is ",data);
                  res.send(data);
              }
              if(err){
                  console.log("Database error");
              }
            })
      }
      db.close();
    });
     
})

  app.get('/ping',(req,res)=>{
    console.log("pong pong pong");
    res.send('pong');
})



  
  app.post('/sendMessage',(req,res)=>{
    const from = '919986792651';
    console.log(req.body);
    const to = req.body['to'];
    const text = req.body['message'];
    nexmo.message.sendSms(from, to, text, (err, responseData) => {
      if (err) {
          console.log(err);
          return res.status(502).send({
            message: 'there is database side error'
          });
      } else {
          if(responseData.messages[0]['status'] === "0") {
              console.log("Message sent successfully.");
              console.log(responseData);
              //After message is sent successfully save the message in database
              MongoClient.connect(url, function(err, db) {
                if (err) {
                  console.log('Mongodb client not connected');
                  return res.status(502).send({
                    message: 'there is database side error'
                  });
                }
                else{
                      console.log("No error ..successfully connected");
                      //Database or collection from which data is to be fetched
                      var dbo = db.db('KissanAssignmentDatabase');
                      
                      //Fetch name , timeline and messages to store in database
                      name=req.body['Name'];
                      timeline=req.body['Timeline'];
                      message=req.body['message'];


                     //Promise to check whether records has been inserted in database.
                      let storeMessagePromise=dbo.collection('Messages').insert(
                        {
                          "Name":name,
                          "timeline":timeline,
                          "message":message
                        }
                      )
                      storeMessagePromise.then(data=>{
                        console.log(data);
                        if(data.insertedCount==1){
                          console.log("succesful saved in database")
                          db.close();
                          return res.status(200).send({
                            message:'Message sent successfully and saved to database'
                          })
                        }
                      })
                      .catch(err=>{
                        return res.status(502).send({
                          message:'Message sent to device but couldnot save to database side error'
                        })
                      })
                }
                
              });
          } else {
            console.log(responseData);
              console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
              return res.status(501).send({
                message:'Could not sent message'
              })
              
          }
      }
  })
  })




//this api is used for fetching all the messages sent to all users
app.get('/getMessages',(req,res)=>{
  console.log("Inside list messages");
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log('Mongodb client not connected');
      return res.status(502).send({
        message: 'there is database side error'
      });
    }
    else{
          console.log("No error ..successfully connected");
          //Database or collection from which data is to be fetched
          var dbo = db.db('KissanAssignmentDatabase');
          // dbo.collection('Users_Credentials').insert({"name":"mr kunal"});
          dbo.collection('Messages').find().sort({"timeline":-1}).toArray(function(err,data){
           //if toArray has no error and returns data
            if(data){
                console.log("vaue is ",data);
                db.close();
                return res.status(200).send(data);
            }
            if(err){
              db.close();
              return res.status(502).send({
                message: 'there is database side error'
              });
            }
          })
    }
  });


})


app.listen(PORT, (req,res)=> {
    console.log("Server is running with changes at heroku "+ PORT +" port");
  });