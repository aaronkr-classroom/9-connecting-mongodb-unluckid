"use strict";

const port = 3001,
  express = require("express"),
  layouts = require("express-ejs-layouts"),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  app = express(),
  MongoDB = require('mongodb').MongoClient,
  dbURL= "mongodb+srv://mymarket67:1234@cluster0.tagycdz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  dbName = "Cluster0";

// 로컬 MongoDB 데이터베이스 서버 연결 설정
MongoDB.connect(dbURL, (error, client) => {
  if (error) {
    console.log("DB connection FAILED!");
    console.error(error);
    process.exit(1);
  }
  
  console.log("DB connected !!!!!!");
  const db = client.db(dbName); 

  db.collection("contacts").find().toArray((error, data) => {
    if (error) {
      console.error("Error fetching data from 'contacts'");
      console.error(error);
      process.exit(1);
    }
    console.log(data);
  });

  db.collection("contacts").insertOne({
    name: "psy",
    form: "korea",
    job: "singer"
  }, (error, result) => {
    if (error) {
      console.error("Failed to insert data into 'contacts'");
      console.error(error);
      process.exit(1);
    }
    console.log("Data inserted into 'contacts' successfully!");
    console.log(result);
    
    // 연결 종료
    client.close();
  });
});

app.set("port", process.env.PORT || port);
app.set("view engine", "ejs");

app.use(layouts);
app.use(express.static("public"));

app.get("/", homeController.getHomePage);
app.get("/name/:myName", homeController.respondWithName2);

app.use(errorController.logErrors);
app.use(errorController.resNotFound);
app.use(errorController.resInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
