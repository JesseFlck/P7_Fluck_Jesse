// Importation des modules

const mongoose = require('mongoose');


// Modèle des posts

const Post = mongoose.Schema ({
    userId: { type: String, required: true },
    title: {type: String, required: true},
    content: {type: String, required: true},
    imageUrl: {type: String, required: false},
    likes: { type: Number, default: 0 },
    usersLiked: { type: [String]}
});


module.exports = mongoose.model('posts', Post);