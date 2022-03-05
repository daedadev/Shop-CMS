const router = require("express").Router();
const { User, Comment, Post } = require("../models/");

// Create new post /post/create
router.post("/create", async (req, res) => {
  console.log(req.body);
  const thePost = req.body;
  try {
    const newPost = Post.create({
      title: thePost.title,
      content: thePost.content,
      user_id: req.session.user_id,
    });
    res.send(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Dashboard Update route
router.put("/put", async (req, res) => {
  console.log(req.body);
  const thePost = req.body;
  try {
    Post.update(
      {
        title: thePost.title,
        content: thePost.content,
      },
      {
        where: {
          id: thePost.post_id,
        },
      }
    );
    res.send(thePost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete Post /api/post/delete/id
router.delete("/delete/:id", async (req, res) => {
  try {
    Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send(thePost);
  } catch (err) {
    res.status(400).json(err);
  }
});
