require("dotenv").config();
const express = require("express");
const app = express();
const post = require("./routes/post");
const comment = require("./routes/comment");
const connectDB = require("./db/connect");

app.use(express.json());
app.get("/", (req, res) => {
  res.send('<h1>스파르타 개시판</h1><a href="/posts">개시판 입장</a>');
});
app.use("/posts", post);
app.use("/comments", comment);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening port ${port}....`));
  } catch (error) {
    console.log(error);
  }
};

start();
