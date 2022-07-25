const mongoose = require("mongoose");

const commentSchemas = new mongoose.Schema({
  user: {
    type: String,
    trim: true,
    required: [true, "작성자 이름은 필수 입니다."],
  },

  content: {
    type: String,
    required: [true, "내용을 입력해주세요."],
  },
  password: {
    type: Number,
    required: [true, "비밀번호를 입력해주세요."],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Comment", commentSchemas);
