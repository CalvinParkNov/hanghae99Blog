const Comment = require("../models/comment");
const Post = require("../models/post");

const getPostComment = async (req, res) => {
  //게시글 댓글 불러와서 날별로 desc, 비밀번호는 보여주지 않음
  const { postId } = req.params;
  const result = await Comment.find({ postId }).select({ password: 0 }).sort({
    createdAt: -1,
  });
  //없으면
  if (!result.length) {
    return res.status(200).json({ msg: "댓글이 없습니다." });
  }
  return res.status(200).json({ result });
};

const createComment = async (req, res) => {
  //해당 게시글 댓글 생성
  const { postId } = req.params;

  const { user, password, content } = new Comment(req.body);
  //사용자 입력이 조건문
  if (!user) {
    return res.status(400).json({ msg: "이름을 입력해주세요." });
  } else if (!content) {
    return res.status(400).json({ msg: "내용 입력해주세요." });
  } else if (!password) {
    return res.status(400).json({ msg: "비밀번호를 입력해주세요." });
  }

  try {
    //게시글 찾기
    await Post.findOne({ _id: postId });
    //댓글 생성
    await Comment.create(
      { postId, user, content, password },
      (error, result) => {
        if (result) {
          return res.status(200).json({ msg: "댓글을 생성 했습니다." });
        } else {
          return res.status(400).json({ msg: error });
        }
      }
    );
  } catch (error) {
    return res.status(400).json({ msg: "게시글이 없습니다." });
  }
};

const updateComment = async (req, res) => {
  //댓글 업데이트
  const { commentId: id } = req.params;

  const { user, content, password } = req.body;
  //사용자 입력이 조건문
  if (!user) {
    return res.status(400).json({ msg: "이름을 입력해주세요." });
  } else if (!content) {
    return res.status(400).json({ msg: "내용 입력해주세요." });
  } else if (!password) {
    return res.status(400).json({ msg: "비밀번호를 입력해주세요." });
  }

  try {
    const commentPassword = await Comment.findOne({ _id: id });
    //댓글 비밀번호가 틀리면
    if (commentPassword.password !== password) {
      return res.status(400).json({ msg: "비밀번호가 틀립니다." });
    }
    //update문 validation check true
    await Comment.findOneAndUpdate({ _id: id }, req.body, {
      runValidators: true,
    });
    return res.status(200).json({ msg: "댓글이 수정되었습니다." });
  } catch {
    return res.status(400).json({ msg: "없는 댓글 입니다." });
  }
};
const deleteComment = async (req, res) => {
  const { commentId: id } = req.params;
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ msg: "비밀번호를 입력해주세요." });
  }
  try {
    const commentPassword = await Comment.findOne({ _id: id });
    //비밀번호가 틀리면
    if (password !== commentPassword.password) {
      return res.status(400).json({ msg: "비밀번호가 틀립니다." });
    }
    console.log(commentPassword);
    await Comment.findOneAndDelete({ _id: id });
    return res.status(200).json({ msg: "삭제되었습니다." });
  } catch (error) {
    //게시글이 없으면
    return res.status(400).json({ msg: "없는 댓글 입니다." });
  }
};

module.exports = {
  getPostComment,
  createComment,
  updateComment,
  deleteComment,
};
