const router = require("express").Router();
const Post = require("../models/Post.js");
const User = require("../models/User.js");


//Get all Save Posts

router.get("/:id", async(req, res)=>{
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Fetch all posts whose _id matches an ID in user.savedPosts
        const savedPostsData = await Post.find({
            _id: { $in: user.savedPosts }
        });

        res.status(200).json(savedPostsData);
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router