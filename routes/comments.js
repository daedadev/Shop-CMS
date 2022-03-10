const router = require("express").Router();
const { User, Comment, Post } = require("../models/");

// Find all comments api/comment/
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.findAll({});
    const commentList = await comments.map((comment) =>
      comment.get({ plain: true })
    );
    res.send(commentList);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create Comment /api/comment/create
router.post("/create", async (req, res) => {
  console.log(req.body);
  const theComment = req.body;
  try {
    const newPost = Comment.create({
      content: theComment.content,
      post_id: theComment.post_id,
      user_id: theComment.user_id,
    });
    res.send(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update Comment /api/comment/put
router.put("/put", async (req, res) => {
  console.log(req.body);
  const theComment = req.body;
  try {
    Comment.update(
      {
        title: theComment.title,
        content: theComment.content,
      },
      {
        where: {
          id: theComment.post_id,
        },
      }
    );
    res.send(theComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete Comment /api/comment/delete/id
router.delete("/delete/:id", async (req, res) => {
  try {
    Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send(thePost);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
