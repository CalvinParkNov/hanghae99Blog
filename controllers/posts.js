const Post = require("../models/post");

const getAllPost = async (req, res) => {
  const result = await Post.find({}).sort({
    insDate: "desc",
  });

  if (!result.length) {
    return res.status(200).json({ msg: "게시글이 없습니다." });
  }
  return res.status(200).json({ result });
};

const createPost = async (req, res) => {
  const { user, password, title, content } = new Post(req.body);

  try {
    await Post.create({ user, password, title, content });
    return res.status(200).json({ message: "게시글이 생성되었습니다." });
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

const getPost = async (req, res) => {
  const { id: postId } = req.params;

  const post = await Post.findOne({ _id: postId }).select({
    postNumber: 1,
    user: 1,
    title: 1,
    content: 1,
    insDate: 1,
    _id: 1,
  });

  if (!post) {
    return res.status(400).json({ msg: `${postId}의 글은 없습니다.` });
  }
  res.status(200).json({ post });
};

const updatePost = async (req, res) => {
  const { id: postId } = req.params;
  const postPassword = await Post.findOne({ _id: postId });

  const { password } = req.body;
  if (!postPassword) {
    return res.status(400).json({ msg: "게시글이 없습니다." });
  } else if (!password) {
    return res.status(400).json({ msg: "비밀번호를 입력해주세요." });
  } else if (password !== postPassword.password) {
    return res.status(400).json({ msg: "비밀번호가 틀렸습니다." });
  }
  try {
    const post = await Post.findOneAndUpdate({ _id: postId }, req.body, {
      runValidators: true,
    });
    res.status(200).json({ msg: "수정되었습니다." });
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
};

const deletePost = async (req, res) => {
  const { id: postId } = req.params;
  const { password, title, content } = req.body;

  let post = await Post.findOne({ _id: postId });
  if (!post) {
    return res.status(400).json({ msg: "게시글이 없습니다." });
  } else if (!password) {
    return res.status(500).json({ msg: "비밀번호를 입력해주세요." });
  } else if (post && password !== post.password) {
    return res.status(400).json({ msg: "비밀번호가 틀립니다." });
  }
  try {
    await Post.findOneAndDelete({ _id: postId });
    return res.status(200).json({ msg: "삭제되었습니다." });
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
};

module.exports = { getAllPost, createPost, deletePost, getPost, updatePost };
