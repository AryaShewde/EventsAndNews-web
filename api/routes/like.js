const router = require("express").Router();
const Post = require("../models/Post.js");
const User = require("../models/User.js");


//Update Like Status

router.put("/:id", async (req, res) => {
    try {
        const userid = await req.body._id
        const postid = req.params.id
        const post = await Post.findById(postid)
        if (!post) return res.status(404).json({ message: 'Not found' });
        const isliked = post.likes.includes(userid);
        const likeStatusUpdated = await Post.findByIdAndUpdate(req.params.id,
            isliked ? {$pull: {likes: userid}} : {$addToSet: {likes: userid}},
        { new: true })
        res.status(200).json(likeStatusUpdated);
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router