require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");

app.use(express.json());

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`서버가 포트:  ${port}에서 시작했습니다.`));
  } catch (error) {
    console.log(error);
  }
};

start();
