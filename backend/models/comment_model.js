// Importation des modules

const mongoose = require('mongoose');


// Modèle des commentaires

const Comment = ('Comment', {
    content: {type: String, required: true},
});

module.exports = mongoose.model('comments', Comment);
