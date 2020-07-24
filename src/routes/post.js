const router = require("express").Router();
const injector = require("../services/request_injector");
const post = require("../controllers/makePost");
const deleteP = require("../controllers/deletePost");
const getAllP = require("../controllers/getAllpost");
const singlePost = require("../controllers/getAllpost");
const postComment = require("../controllers/postComment");
const getComment = require("../controllers/postComment");
const likePost = require("../controllers/likePost");
const unlikePost = require("../controllers/unlikePost");

router.post("/chat", injector(post.sendPost));
router.post("/delete-post", injector(deleteP.deletePost));
router.get("/get-post", injector(getAllP.getAllpost));
router.get("/get-post/:id", injector(singlePost.getPostById));
router.post("/post/:parent/comment", injector(postComment.PostWithComment));
router.get("/post/:parent/comments", injector(getComment.getPostWithComment));
router.post("/like-post", injector(likePost.likeUserpost));
router.post("/unlike-post", injector(unlikePost.unlikePost));

module.exports = router;
