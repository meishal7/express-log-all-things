const express = require("express");
const fs = require("fs");

const app = express();

const PORT = process.env.posrt || 3000;

app.use("/", (req, res, next) => {
  let obj = {
    agent: req.get("User-Agent"),
    time: new Date().toISOString(),
    method: req.method,
    path: req.path,
    httpVersion: req.httpVersion,
    status: res.statusCode,
  };
  let data = "";
  for (let prop in obj) {
    data = data + obj[prop] + ", ";
  }

  fs.appendFile("log.csv", data, "utf8", (err) => {
    if (err) throw err;
    console.log("The request data was appended to file!");
  });

  res.send(obj);
});

app.listen(PORT, () => {
  console.log(`Server is runing on ${PORT}`);
});
