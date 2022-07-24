const Post = require("../models/post");
const bodyParser = require("body-parser");

const getAllPost = async (req, res) => {
  let result = Post.find();
  const posts = await result;
  res.status(200).json({ posts, total: posts.length });
};

const createPost = async (req, res) => {
  const { user, password, title, content } = new Post(req.body);
  try {
    const data = await Post.create({ user, password, title, content });
    res.status(200).json({ data });
  } catch (error) {
    if (!user) {
      res.status(400).json({ message: "이름을 입력해주세요." });
    } else if (!password) {
      res.status(400).json({ message: "비밀번호 입력해주세요." });
    } else if (!title) {
      res.status(400).json({ message: "제목 입력해주세요." });
    } else if (!content) {
      res.status(400).json({ message: "내용 입력해주세요." });
    }
  }
};

module.exports = { getAllPost, createPost };
