const express = require('express');
const router = express.Router();
const Post = require('../models/Posts');

router.get("/", async (req, res) => {
    try {
        const getPost = await Post.find();
        console.log(getPost);
        res.json(getPost);
    } catch (err) {
        console.error({message: err});
    }
})

router.post("/", async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({message : err});
    }
})

router.get("/:title", async(req, res) => {
    try {
        const getPost = await Post.find({ title: req.params.title });
        console.log(getPost[0]);
        res.json(getPost[0]);
    } catch (err) {
        console.error({message: err});
    }
})

router.delete("/:postId", async(req, res) => {
    try {
        const removedPost = await Post.deleteOne({_id: req.params.postId});
        res.json(removedPost);
    } catch (err) {
        console.error(err);
    }
})

module.exports = router;