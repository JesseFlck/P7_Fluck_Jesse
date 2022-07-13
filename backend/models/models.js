const mongoose = require('mongoose');

const postSchema = mongoose.Schema ({
    userId: { type: mongoose.Schema.ObjectId, required: true },
    title: {type: String, required: true},
    content: {type: String, required: true},
    imageUrl: {type: String, required: false},
    usersLiked: [],
});

const userSchema = mongoose.Schema ({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {type: Boolean, required: false, defaultValue: false},
    imageUrl: {type: String, required: false, defaultValue: 'https://zupimages.net/up/22/22/e3uh.jpg'}
});

const commentSchema = mongoose.Schema ({
    content: {type: String, required: true},
    UserId: {type: mongoose.Schema.ObjectId, required: true},
    PostId: {type: mongoose.Schema.ObjectId, required: true}
});

const Post = mongoose.model('posts', postSchema);
const User = mongoose.model('Users', userSchema);
const Comment = mongoose.model('comments', commentSchema);


module.exports = { Post, User, Comment };