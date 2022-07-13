// Importation des modules

const mongoose = require('mongoose');


// Modèle des commentaires

const Comment = mongoose.Schema ({
    content: {type: String, required: true},
    UserId: {type: mongoose.Schema.ObjectId, required: true},
    PostId: {type: mongoose.Schema.ObjectId, required: true}
});

module.exports = mongoose.model('comments', Comment);
