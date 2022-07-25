const Post = require("../models/post");
const Comment = require("../models/comment");

const getAllPost = async (req, res) => {
  //게시글을 createdAt desc한다
  const result = await Post.find({}).sort({
    createdAt: -1,
  });

  //게시글이 없으면
  if (!result.length) {
    return res.status(200).json({ msg: "게시글이 없습니다." });
  }
  return res.status(200).json({ result });
};

const createPost = async (req, res) => {
  const { user, password, title, content } = new Post(req.body);
  if (!user) {
    res.status(400).json({ msg: "이름을 입력해주세요." });
  } else if (!password) {
    res.status(400).json({ msg: "비밀번호 입력해주세요." });
  } else if (!title) {
    res.status(400).json({ msg: "제목 입력해주세요." });
  } else if (!content) {
    res.status(400).json({ msg: "내용 입력해주세요." });
  }
  try {
    //게시글 생성
    await Post.create({ user, password, title, content });
    return res.status(200).json({ msg: "게시글이 생성되었습니다." });
  } catch (error) {
    //오류시
    return res.status(400).json({ msg: "데이터처리 오류" });
  }
};

const getPost = async (req, res) => {
  const { id: postId } = req.params;
  try {
    //게시글 select문
    const post = await Post.findOne({ _id: postId }).select({
      postNumber: 1,
      user: 1,
      title: 1,
      content: 1,
      insDate: 1,
      _id: 1,
    });
    res.status(200).json({ post });
  } catch {
    //게시글이 없으면
    return res.status(400).json({ msg: `${postId}의 글은 없습니다.` });
  }
};

const updatePost = async (req, res) => {
  const { id: postId } = req.params;
  const { password } = req.body;
  //입력 비밀번호가 없으면
  if (!password) {
    return res.status(400).json({ msg: "비밀번호를 입력해주세요." });
  }

  try {
    //비밀번호 find
    const postPassword = await Post.findOne({ _id: postId });
    //비밀번호가 틀리면
    if (password !== postPassword.password) {
      return res.status(400).json({ msg: "비밀번호가 틀렸습니다." });
    }
    //맞으면 update validation check true
    const post = await Post.findOneAndUpdate({ _id: postId }, req.body, {
      runValidators: true,
    });
    res.status(200).json({ msg: "수정되었습니다." });
  } catch (error) {
    //게시글이 없으면
    return res.status(400).json({ msg: "없는 게시글 입니다." });
  }
};

const deletePost = async (req, res) => {
  const { id: postId } = req.params;
  const { password } = req.body;
  //입력받는 비밀번호가 없으면
  if (!password) {
    return res.status(400).json({ msg: "비밀번호를 입력해주세요." });
  }
  try {
    //비밀번호 찾기
    let post = await Post.findOne({ _id: postId });
    //비밀번호가 틀리면
    if (password !== post.password) {
      return res.status(400).json({ msg: "비밀번호가 틀립니다." });
    }
    //비밀번호가 있고 맞으면 delete
    await Post.findOneAndDelete({ _id: postId });
    return res.status(200).json({ msg: "삭제되었습니다." });
  } catch (error) {
    return res.status(400).json({ msg: "게시글이 없습니다." });
  }
};

module.exports = { getAllPost, createPost, deletePost, getPost, updatePost };
