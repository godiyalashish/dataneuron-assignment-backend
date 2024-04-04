const express = require("express");
const Post = require("./models/post");
const app = express();
const { z } = require("zod");
var cors = require('cors')

app.use(express.json());

const corsOption = {
    origin: '*',
}

app.use(cors(corsOption))

const postSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
});

app.post("/posts", async (req, res) => {
    console.log("asdasd")
  try {
    const { title, content } = postSchema.parse(req.body);
    const post = new Post({
      title,
      content,
    });
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/posts/:id", async (req, res) => {
  try {
    const { title, content } = postSchema.parse(req.body);
    const postId = req.params.id;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/posts/latest", async (req, res) => {
  try {
    const latestPost = await Post.findOne().sort({ timestamp: -1 });

    if (!latestPost) {
      return res.status(404).json({ error: "No posts found" });
    }
    res.json(latestPost);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = app;