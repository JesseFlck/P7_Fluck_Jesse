// Importation des modules

const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');

// Schema de l'utilisateur

const User = mongoose.Schema ({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {type: Boolean, required: false, defaultValue: false},
    imageUrl: {type: String, required: false, defaultValue: 'https://zupimages.net/up/22/22/e3uh.jpg'}
/*},{
    freezeTableName : true,*/
});

module.exports = mongoose.model('user', User);