// Importation des modules

const mongoose = require('mongoose');


// Modèle des posts

const Post = mongoose.Schema ({
    title: {type: String, required: true},
    content: {type: String, required: true},
    imageUrl: {type: String, required: false},
});


module.exports = mongoose.model('posts', Post);
