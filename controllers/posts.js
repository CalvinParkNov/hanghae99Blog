const Post = require("../models/post");

const getAllPost = async (req, res) => {
  const { user, title } = req.query;
  const queryObject = {};
  if (user) {
    queryObject.user = user === "true" ? true : false;
  }
  if (title) {
    queryObject.title = title === "true" ? true : false;
  }

  let result = Post.find(queryObject);
  const posts = await result;
  res.status(200).json({ posts, total: posts.length });
};

module.exports = { getAllPost };
