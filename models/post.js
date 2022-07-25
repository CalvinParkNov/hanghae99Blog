require("dotenv").config();
const mongoose = require("mongoose"),
  autoIncrement = require("mongoose-auto-increment");

const connection = mongoose.createConnection(process.env.MONGO_URI);

autoIncrement.initialize(connection);

const postSchema = new mongoose.Schema({
  postNumber: {
    type: Number,
    unique: true,
  },
  user: {
    type: String,
    required: [true, "작성자 이름은 필수 입니다."],
  },
  password: {
    type: Number,
    required: [true, "비밀번호를 입력해주세요."],
  },
  title: {
    type: String,
    required: [true, "제목을 입력해주세요."],
  },
  content: {
    type: String,
    required: [true, "내용을 입력해주세요."],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});
postSchema.plugin(autoIncrement.plugin, {
  model: "Post",
  field: "postNumber",
  startAt: 1,
  increment: 1,
});

module.exports = mongoose.model("Post", postSchema);
