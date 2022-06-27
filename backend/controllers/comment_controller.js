const Comment = require('../models/comment_model');
const Post = require('../models/post_model');
const User = require('../models/user_model');
const fs = require('fs');
const { post } = require('../routes/post_route');

// Création d'un commmentaire
exports.newComment = (req, res, next) => {
    const reply= {
        content: req.body.content,
        PostId: req.body.postId,
        UserId: req.body.userId
    };
    Comment.create(reply)
    .then(() => res.status(201).json({ message: 'Réponse envoyée' }))
    .catch(error => res.status(400).json({ error, message: error.message }));
};

// Suppression d'un commentaire
exports.deleteComment = (req, res, next) => {
    Comment.findOne({ _id: req.params.id })
        .then((comment)=>{
            comment.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message : "Commentaire supprimé"}))
                .catch(error => res.status(400).json({ error }));                    
        })
        .catch(error => res.status(500).json({ error }));
};

// Récupération de tout les commentaires, avec noms d'utilisateurs
exports.getAllComments = (req, res, next) => {
    Comment.find({
        order: [['createdAt', 'DESC']],
        include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }]
    })
        .then((comment) => res.status(200).json(comment))
        .catch(error => res.status(400).json({ error }));
};

// Récupération des commentaires d'un seul post (à modif)
exports.getPostComments = (req, res, next) =>{
    const post = Post.findOne({_id: req.params.id});

            Comment.find({PostId: req.params.id}).exec({order: [['createdAt', 'DESC']],
            include: [{
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }]
        })
    .then((post) => {
        res.status(200).json(post);
    })
    .catch(error => res.status(400).json({ error }));
}


    /*const postId = Post.findOne({_id: req.params.id});
    Comment.find({
        
        order: [['createdAt', 'DESC']],
        include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }]
    })
    .then((comment) => res.status(200).json(comment))
    .catch(error => res.status(400).json({ error }));*/


    /*const comments = Comment.find({order: [['createdAt', 'DESC']],
    include: [{
        model: User,
        attributes: ['id', 'firstName', 'lastName']
    }]});
    Post.findOne({ _id: req.params.id,
        include: [{
            model: User,
            attributes: [comments,'id', 'firstName', 'lastName']
        },]
    })
        .then(comments => { res.status(200).json(comments)})
        .catch(error => res.status(500).json({ error, message: error.message }));*/


    
    /*Comment.findOne({ _id: req.params.id, 
        include: [{
            model: User, 
            attributes: ['id', 'firstName', 'lastName']
        }]
    })
        .then(comment => res.status(200).json(comment))
        .catch(error => res.status(400).json({ error, message: error.message }));*/
//};

// Mise à jour d'un commentaire
exports.updateComment = (req, res, next) =>{
    const ObjectId = require('mongodb').ObjectId;
    const id = ObjectId(req.params.id); // convert to ObjectId
    Comment.findOne({ _id: id })
        .then(comment =>{
            if(toString(comment.UserId) === toString(req.body.userId) || comment.isAdmin === req.auth.isAdmin){
                Comment.findOneAndUpdate({_id: id}, {content: req.body.content})
                .then(() => res.status(200).json({ message: 'Commentaire modifié !' }))
                    .catch(error => res.status(400).json({ error, message: error.message }));
            } else {
                res.status(403).json({ message: 'Vous n\'êtes pas autorisé à modifier ce post !' });
            }
        })
    .catch(error => res.status(500).json({ error, message: error.message }));
}
