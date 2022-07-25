const express = require("express");
const router = express.Router();

const {
  getPostComment,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comments");

router.route("/:postId").get(getPostComment).post(createComment);
router.route("/:commentId").put(updateComment).delete(deleteComment);
module.exports = router;
