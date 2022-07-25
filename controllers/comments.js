const Comment = require("../models/comment");

const getPostComment = async (req, res) => {
  const postId = req.params;
  const result = await Comment.find({ postId });

  if (!result.length) {
    return res.status(200).json({ msg: "댓글이 없습니다." });
  }
  return res.status(200).json({ result });
};

const createComment = async (req, res) => {
  const postId = req.params;
  const { user, password, content } = new Comment(req.body);
  try {
    await Comment.create({ postId, user, content });
    res.status(200).json({ message: "댓글이 생성되 었습니다.." });
  } catch (error) {
    if (!user) {
      return res.status(400).json({ message: "이름을 입력해주세요." });
    } else if (!content) {
      return res.status(400).json({ message: "내용 입력해주세요." });
    } else if (!password) {
      return res.status(400).json({ message: "비밀번호를 입력해주세요." });
    }
  }
};

const updateComment = async (req, res) => {
  const commentId = req.params;
  const { user, content } = req.body;

  if (!user) {
    return res.status(400).json({ msg: "이름을 입력해주세요." });
  } else if (!content) {
    return res.status(400).json({ msg: "댓글 내용을 입력해주세요." });
  }
  try {
    const result = await Comment.findOneAndUpdate({ commentId }, req.body, {
      runValidators: true,
    });
    return res.status(200).json({ msg: "댓글이 수정되었습니다." });
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
};
const deleteComment = async (req, res) => {
  const commentId = req.params;
  const commentFind = await Comment.findOne({ commentId });
  if (!commentFind) {
    return res
      .status(400)
      .json({ msg: `${commentId.commentId}의 글은 없습니다.` });
  }
  try {
    const result = await Comment.findOneAndDelete({ commentId });

    return res.status(200).json({ msg: "댓글이 삭제되었습니다." });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = {
  getPostComment,
  createComment,
  updateComment,
  deleteComment,
};
