const express = require("express");
const router = express.Router();

const { getAllPost, createPost } = require("../controllers/posts");

router.route("/").get(getAllPost).post(createPost);

module.exports = router;
