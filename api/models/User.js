const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    profilePic: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    Instagram: {
        type: String,
        default: ""
    },
    Twitter: {
        type: String,
        default: ""
    },
    LinkedIn: {
        type: String,
        default: ""
    },
    Facebook: {
        type: String,
        default: ""
    },
    savedPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]

}, { timestamps: true })

module.exports = mongoose.model("User", UserSchema);