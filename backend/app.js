const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user_route');
const postRoutes = require('./routes/post_route');
const commentRoutes = require('./routes/comment_route');
const app = express();



// Connexion à la base de données

mongoose
.connect(
    'mongodb+srv://JesseFlck:azertytest@groupomania.tnort.mongodb.net/Groupomania?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
    

// CORS

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
    res.setHeader('Cross-Origin-Resource-Policy', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});




    app.use('/api/auth', userRoutes);

    app.use('/api/posts', postRoutes);

    app.use('/api/comment', commentRoutes);

    app.use('/images', express.static(path.join(__dirname, 'images')));
    

module.exports = app;