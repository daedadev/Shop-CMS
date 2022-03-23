const router = require("express").Router();
const { User, Order } = require("../models/");

// Create new post api/post/create
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({});
    const postList = await posts.map((post) => post.get({ plain: true }));
    res.send(postList);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create new post api/post/create
router.post("/", async (req, res) => {
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

// Update post route /api/post/put
router.put("/", async (req, res) => {
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
router.delete("/", async (req, res) => {
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

module.exports = router;
