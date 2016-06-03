var express = require('express');
var bp = require('body-parser');
var cors = require("cors");
var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var connection_string = '127.0.0.1:27017/YOUR_APP_NAME';
var database;
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}
mongoClient.connect('mongodb://'+connection_string, function(err, db) {
  if(err) throw err;
  database = db;
})


var app = express();

app.use(express.static(__dirname + "/public"));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());
app.post("/post", sendJson);
app.post("/db/insertdata", insertdata);
app.post("/db/qureydata", qureydata);
app.post("/db/qureydataid", qureydatabyID);
app.listen(server_port, server_ip_address);


function sendJson(req, res){
   res.type('application/json');
   res.send({
     "data": "嗨!" + req.body.who,
     "sum": parseInt(req.body.num1) + parseInt(req.body.num1)
   });
}

function insertdata(req, res){
  var collection = database.collection("data");
  var data = req.body;

  collection.insertOne(
    {
      "type": data.type,
      "title": data.title,
      "location": data.location,
      "who": data.who,
      "time": data.time,
      "describe": data.describe,
      "imageURL": data.imageURL,
      "deleteHash": data.deleteHash
    },
    function(err, result){
      if(err) throw err;
      res.send({
        "err": err,
        "result": result
      });
    }
  );
}

function qureydata(req, res){
  database.collection("data").find(req.body).toArray(function(err, data) {
    res.send({
      "data": data
    });
  });
}

function qureydatabyID(req, res){
  console.log(req.body.id);
  database.collection("data").findOne({"_id": ObjectId(req.body.id)}, function(err, data){
    res.send({
      "data": data
    });
  });
}
