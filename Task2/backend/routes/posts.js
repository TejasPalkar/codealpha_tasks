const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

router.post('/', async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.status(201).send('Post created');
});

module.exports = router;
