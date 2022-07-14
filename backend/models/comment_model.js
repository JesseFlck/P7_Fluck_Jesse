// Importation des modules

const mongoose = require('mongoose');


// Modèle des commentaires

const Comment = mongoose.Schema ({
    content: {type: String, required: true},
    UserId: {type: mongoose.Schema.ObjectId, required: true, ref:'Users'},
    PostId: {type: mongoose.Schema.ObjectId, required: true, ref:'posts'}
});

module.exports = mongoose.model('comments', Comment);
