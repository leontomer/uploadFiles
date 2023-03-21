const express = require("express");
const app = express();
const mongoose = require("mongoose");

const filesAPI = require("./routes/api/filesAPI");
require("dotenv").config();

process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", error.message);
});

//to parse json content
app.use(express.json());
//to parse body from url
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use("/file", filesAPI);

app.listen(process.env.PORT || 5000, function () {
  console.log(`Application live on localhost:${process.env.PORT || 5000}`);
});
