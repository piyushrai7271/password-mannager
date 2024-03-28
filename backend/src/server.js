const express = require("express");
const { MongoClient } = require("mongodb");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = 3500;
const app = express();
dotenv.config();
const dbName = "passop";
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

app.use(bodyParser.json());
app.use(cors());
client.connect();

// get all password
app.get("/", async (req, resp) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  resp.json(findResult);
});

//save a password
app.post("/", async (req, resp) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.insertOne(password);
  resp.send({success:true,result:findResult})
});

//delete password by id
app.delete("/", async (req, resp) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.deleteOne(password);
  resp.send({success:true,result:findResult})
});

app.listen(port, () => {
  console.log(`App started at port : ${port}`);
});
