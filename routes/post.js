const express = require("express");
const router = express.Router();

const {
  getAllPost,
  createPost,
  deletePost,
  getPost,
  updatePost,
} = require("../controllers/posts");

router.route("/").get(getAllPost).post(createPost);
router.route("/:id").get(getPost).delete(deletePost).put(updatePost);

module.exports = router;
