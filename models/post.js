const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("Post", postSchema);
