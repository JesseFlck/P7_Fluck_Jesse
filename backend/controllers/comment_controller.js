const Comment = require('../models/comment_model');
const Post = require('../models/post_model');
const User = require('../models/user_model');

// Création d'un commmentaire
exports.newComment = (req, res, next) => {
    const reply= {
        content: req.body.content,
        PostId: req.body.postId,
        UserId: req.token.userId
    };
    Comment.create(reply)
    .then(() => res.status(201).json({ message: 'Réponse envoyée' }))
    .catch(error => res.status(400).json({ error, message: error.message }));
};

// Suppression d'un commentaire
exports.deleteComment = (req, res, next) => {
    Comment.findOne({ 
        where: { id: req.params.id },
        })
        .then((comment)=>{
            Comment.destroy({ where: { id: req.params.id } })
                .then(() => res.status(200).json({ message : "Commentaire supprimé"}))
                .catch(error => res.status(400).json({ error }));                    
        })
        .catch(error => res.status(500).json({ error }));
};

// Récupération de touts les commentaires, avec noms d'utilisateurs
exports.getAllComments = (req, res, next) => {
    Comment.findAll({
        order: [['createdAt', 'DESC']],
        include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }]
    })
        .then((comment) => res.status(200).json(comment))
        .catch(error => res.status(400).json({ error }));
};

// Récupération des commentaires d'un seul utilisateur
exports.getOneComment = (req, res, next) =>{
    Comment.findOne({
        where:{id: req.params.id}, 
        include: [{
            model: User, 
            attributes: ['id', 'firstName', 'lastName']
        }]
    })
        .then(comment => res.status(200).json(comment))
        .catch(error => res.status(400).json({ error, message: error.message }));
};

// Mise à jour d'un commentaire
exports.updateComment = (req, res, next) =>{
    Comment.findOne({where:{id: req.params.id} })
        .then(comment =>{
            if(comment.UserId === req.token.userId || comment.isAdmin === req.token.isAdmin){
                Comment.update({...comment, content: req.body.content}, { where: { id: req.params.id }})
                .then(() => res.status(200).json({ message: 'Commentaire modifié !' }))
                    .catch(error => res.status(400).json({ error, message: error.message }));
            } else {
                res.status(403).json({ message: 'Vous n\'êtes pas autorisé à modifier ce post !' });
            }
        })
    .catch(error => res.status(500).json({ error, message: error.message }));
}
