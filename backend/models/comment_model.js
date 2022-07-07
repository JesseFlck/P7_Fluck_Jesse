// Importation des modules

const mongoose = require('mongoose');


// Modèle des commentaires

const Comment = mongoose.Schema ({
    content: {type: String, required: true},
    UserId: {type: String, required: true},
    PostId: {type: String, required: true}
});

module.exports = mongoose.model('comments', Comment);
