const router = require("express").Router();
const Post = require("../models/Post.js");
const User = require("../models/User.js");


//Update Save Post Status

router.put("/:id", async (req, res) => {
    try {
        const userid = await req.body._id
        const postid = req.params.id
        const user = await User.findById(userid)
        if (!user) return res.status(404).json({ message: 'Not found' });
        const issaved = user.savedPosts.includes(postid);
        const saveStatusUpdated = await User.findByIdAndUpdate(userid,
            issaved ? {$pull: {savedPosts: postid}} : {$addToSet: {savedPosts: postid}},
        { new: true })
        res.status(200).json(saveStatusUpdated);
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/:id", async(req, res)=>{
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user.savedPosts);
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router