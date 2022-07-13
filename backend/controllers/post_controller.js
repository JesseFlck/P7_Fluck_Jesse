const Post = require('../models/post_model');
const User = require('../models/user_model');
const fs = require('fs');


// Création d'un nouveau post

exports.newPost = (req, res, next) => {
    if (req.file === undefined) { // Aucune image dans le post
        const post = {
            title: req.body.title,
            content: req.body.content,
            userId: req.body.userId
        };
        Post.create(post)
            .then(() => res.status(201).json({
                message: 'Post créé !'
            }))
            .catch(error => res.status(401).json({
                error,
                message: error.message
            }));
    } else if (req.body.title && req.body.content && req.file) { // Avec image dans le post
        const post = {
            title: req.body.title,
            content: req.body.content,
            imageUrl: `/images/${req.file.filename}`,
            userId: req.body.userId
        };
        Post.create(post)
            .then(() => res.status(201).json({
                message: 'Post créé !'
            }))
            .catch(error => res.status(402).json({
                error,
                message: error.message
            }));
    } else {
        console.log(req.file);
        return res.status(403).json({
            message: "Un champ ne peut être vide"
        });
    }
};


// Mise à jour du post par son auteur ou l'adminisrateur

exports.updatePost = (req, res, next) => {
    if (req.file === undefined) { // Sans image
        const ObjectId = require('mongodb').ObjectId;
        const id = ObjectId(req.params.id); // convert to ObjectId
        Post.findOne({
                _id: id
            })
            .then(post => {
                if (toString(post.UserId) === toString(req.body.userId) || post.isAdmin === req.auth.isAdmin) {
                    Post.findOneAndUpdate({
                            _id: id
                        }, {
                            title: req.body.title,
                            content: req.body.content
                        })
                        .then(() => res.status(201).json({
                            message: 'Post modifié !'
                        }))
                        .catch(error => res.status(400).json({
                            error,
                            message: error.message
                        }));
                } else {
                    res.status(403).json({
                        message: 'Vous n\'êtes pas autorisé à modifier ce post !'
                    });
                }
            })
            .catch(error => res.status(500).json({
                error,
                message: error.message
            }));
    } else { // Avec image
        const postImage = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        const ObjectId = require('mongodb').ObjectId;
        const id = ObjectId(req.params.id); // convert to ObjectId
        Post.findOne({
                _id: id
            })
            .then(post => {
                if (toString(post.UserId) === toString(req.body.userId) || post.isAdmin === req.body.isAdmin) {
                    Post.findOneAndUpdate({
                            _id: id
                        }, {
                            title: req.body.title,
                            content: req.body.content,
                            imageUrl: postImage
                        })
                        .then(() => res.status(200).json({
                            message: 'Post modifié !'
                        }))
                        .catch(error => res.status(400).json({
                            error,
                            message: error.message
                        }));
                } else {
                    res.status(403).json({
                        message: 'Vous n\'êtes pas autorisé à modifier ce post !'
                    });
                }
            })
            .catch(error => res.status(500).json({
                error,
                message: error.message
            }));
    }
};


// Suppression d'un post par son auteur ou l'adminisrateur

exports.deletePost = (req, res, next) => {
    Post.findOne({
            _id: req.params.id
        })
        .then(post => {
            if (post.UserId === req.body.userId || req.body.isAdmin) {
                if (post.imageUrl === undefined) { // Sans image
                    Post.deleteOne({
                            id: req.params.id
                        })
                        .then(() => res.status(201).json({
                            message: 'Post supprimé !'
                        }))
                        .catch(error => res.status(400).json({
                            error,
                            message: error.message
                        }));
                } else { // Avec image
                    const filename = post.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () =>
                        Post.deleteOne({
                            id: req.params.id
                        })
                        .then(() => res.status(200).json({
                            message: 'Post supprimé !'
                        }))
                        .catch(error => res.status(400).json({
                            error,
                            message: error.message
                        }))
                    );
                }
            } else {
                res.status(401).json({
                    message: 'Vous n\'êtes pas autorisé à supprimer ce post !'
                });
            }
        })
        .catch(error => res.status(500).json({
            error,
            message: error.message
        }));
};


// Recupération de tout les posts

exports.getAllPosts = (req, res, next) => {
    Post.find({
            order: [
                ['createdAt', 'DESC']
            ],
            include: [{
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }, ]
        })
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => res.status(500).json({
            error,
            message: error.message
        }));
};


// Récupération d'un seul post

exports.getOnePost = (req, res, next) => {
    Post.findOne({
            _id: req.params.id,
            include: [{
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }, ]
        })
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => res.status(500).json({
            error,
            message: error.message
        }));
};


// Gestion des likes

exports.likePost = (req, res) => {


    const ObjectId = require('mongodb').ObjectId;
    const postId = ObjectId(req.params.id); // convert to ObjectId
    Post.findOne({
        _id: postId
    })
    const id = req.params.id;

    // Gestion des likes
    Post.findOne({
            _id: id
        })
        .then((post) => {
            if (post.usersLiked.includes(req.body.userId)) {
                Post.updateOne({
                            _id: id
                        }, {
                            $pull: {
                                usersLiked: req.body.userId
                            },
                        },
                        console.log(post.usersLiked.length)
                    )

                    .then(() =>
                        res.status(200).json({
                            message: 'like -1'
                        })
                    )
                    .catch((error) => res.status(402).json({
                        error
                    }));
            } else {
                // MAJ des likes déjà effectifs
                Post.updateOne({
                            _id: id
                        }, {
                            $push: {
                                usersLiked: req.body.userId
                            },
                        },
                        console.log(post.usersLiked.length)
                    )

                    .then(() => res.status(200).json({
                        message: '+1 like'
                    }))
                    .catch((error) => res.status(400).json({
                        error
                    }));
            }
        })
        .catch((error) => res.status(405).json({
            error
        }));
}