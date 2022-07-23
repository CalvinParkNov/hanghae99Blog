const express = require("express");
const router = express.Router();

const { getAllPost } = require("../controllers/posts");

router.route("/").get(getAllPost);

module.exports = router;
