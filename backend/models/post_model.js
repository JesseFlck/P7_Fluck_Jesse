// Importation des modules

const mongoose = require('mongoose');


// Modèle des posts

const Post = mongoose.Schema ({
    userId: { type: mongoose.Schema.ObjectId, required: true, ref: 'Users' },
    title: {type: String, required: true},
    content: {type: String, required: true},
    imageUrl: {type: String, required: false},
    usersLiked: [],
    createdAt: {type: Date, required: true, default: Date.now} // à vérifier !
});

Post.set('timestamps', true)


module.exports = mongoose.model('posts', Post);