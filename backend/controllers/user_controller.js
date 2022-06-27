const User = require('../models/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator');
const fs = require('fs');
const { stringify } = require('querystring');
//const AES = require('aes-encryption');

//Format imposé du mot de passe
const passwordSchema = new passwordValidator();
passwordSchema
    .is().min(6)                                    // Minimum 6 caractères
    .is().max(30)                                   // Maximum 30 caractères
    .has().uppercase()                              // Doit contenir au moins une majuscule
    .has().lowercase()                              // Doit contenir au moins une minuscule
    .has().digits(2)                                // Doit avoir au moins 2 chiffres
    .has().not().spaces()                           // Ne doit pas avoir d'espaces
    .is().not().oneOf(['Passw0rd', 'Password123', 'azerty1234']); // Liste de mots de passes interdits

//Création d'un utilisateur
exports.signup = (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: 'Veuillez remplir tous les champs' });
    }
    if (!passwordSchema.validate(password)) {
        return res.status(400).json({ error: 'Mot de passe incorrect' });
    }
   User.findOne({
            email: email
    })
        .then(user => {
            if (user) {
                console.log(user);
                console.log(email);
                return res.status(400).json({ error: 'Cet email est déjà utilisé' });
            }
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt); //Chiffrage du mot de passe
            User.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashPassword,
                isAdmin: 'false',
                imageUrl: 'false'
            })
                .then(() => { res.status(201).json({ message: 'Utilisateur créé avec succès !' });
                })
                .catch((error) => { res.status(400).json({ error: 'Une erreur est survenue lors de la création de l\'utilisateur' });
                });
        })
        .catch((error) => { res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'utilisateur'});
        });
};

//Connexion d'un utilisateur

exports.login = (req, res, next) =>{
    const { firstName, lastName, email, password } = req.body;
    User.findOne({email: email})
        .then(user => {
            if (!user) {
                return res.status(400).json({ error: 'Utilisateur non trouvé' });
            }
            if (!bcrypt.compare(req.body.password, user.password)) {
                return res.status(400).json({ error: 'Mot de passe incorrect' });
            }
            res.status(200).json({
                userId: user._id,
                isAdmin: user.isAdmin,
                token: jwt.sign({ userId: user._id, isAdmin: user.isAdmin}, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }) //Generation du token d'authentification
            });
        })
        .catch(error => res.status(500).json({ error: 'Une erreur est survenue lors de la connexion', message: error.message }));
};

//Modification de l'utilisateur

exports.modifyUser = (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt); //Chiffrage du mot de passe
    if(req.file === undefined){ //Changement des données de l'utilisateur sans modification de l'image
        const ObjectId = require('mongodb').ObjectId;
        const id = ObjectId(req.params.id); // convert to ObjectId
        User.findOne({ _id: id })
            .then(user =>{
                if (toString(user._id) === toString(req.auth.userId)){
                    User.findOneAndUpdate({_id: id}, {firstName:req.body.firstName, lastName:req.body.lastName, email:req.body.email, password:hashPassword}) 
                    //User.updateOne({ _id: id })
                    .then(() => res.status(201).json({ message: 'Utilisateur modifié !' }))
                    .catch(error => res.status(400).json({ error, message: error.message }));
                } else {
                    res.status(403).json({ message: 'Vous n\'êtes pas autorisé à modifier cet utilisateur !' });
                }
            })
            .catch(error => res.status(500).json({ error, message: error.message }));        
    } else { // Modification de toutes les données de l'utilisateur
        const userImage = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        const ObjectId = require('mongodb').ObjectId;
        const id = ObjectId(req.params.id); // convert to ObjectId
        User.findOne({ _id: id })
            .then((user) => { 
                if (toString(user._id) === toString(req.auth.userId)){
                    const filename = user.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                    User.findOneAndUpdate({_id: id}, {firstName: req.body.firstName, lastName: req.body.lastName, imageUrl: userImage,email:req.body.email, password:hashPassword})
                        .then(() => res.status(201).json({ message: 'Utilisateur modifié !' }))
                        .catch(error => res.status(400).json({ error, message: error.message }));
                    });
                } else {
                    res.status(403).json({ message: 'Vous n\'êtes pas autorisé à modifier cet utilisateur.' });
                }
            })
        .catch(error => res.status(500).json({ error, message: error.message }));
    }
};
                        

//Suppression d'un utilisateur par l'utilisateur ou l'administrateur
exports.deleteUser = (req, res, next) => {
    const ObjectId = require('mongodb').ObjectId;
    const id = ObjectId(req.params.id); // convert to ObjectId
    User.findOne({ _id: id })
        .then((user) => {
            if (toString(user._id) == toString(id) || req.auth.isAdmin) {
                if(!user.imageUrl){
                    User.deleteOne({ _id: id })
                            .then(() => res.status(201).json({ message: 'Utilisateur supprimé !' }))
                            .catch(error => res.status(400).json({ error, message: error.message }));
                }else{
                    const filename = user.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                        User.deleteOne({ _id: id })
                            .then(() => res.status(201).json({ message: 'Utilisateur supprimé !' }))
                            .catch(error => res.status(400).json({ error, message: error.message }));
                    });
                }
            } else{
                res.status(403).json({message: '403: Unauthorized request'});
            }
        })
        .catch(error => res.status(500).json({ error, message : error.message }));
};

//Récuperation de tous les utilisateurs

exports.getAllUsers = (req, res, next) => {
    User.find({ order: [['createdAt', 'DESC']],})
        .then((user)=>{
            if (user._id === req.body.userId || req.body.isAdmin){
                res.status(200).json(user);
            } else {
                res.status(403).json({ message: '403: Unauthorized request'});
            }
        })
        .catch(error => res.status(500).json({ error, message: error.message }));
};

//Récupération d'un seul utilisateur

exports.getOneUser = (req, res, next) => {
    const ObjectId = require('mongodb').ObjectId;
    const id = ObjectId(req.params.id); // convert to ObjectId
    User.findOne({ _id: id })
        .then((user) => {
            if (toString(user._id) === toString(id) || req.auth.isAdmin){
                res.status(200).json(user);
            } else {
                res.status(403).json({ message: '403: Unauthorized request'});
            }
        })
        .catch(error => res.status(500).json({ error, message: error.message }));
};

// Modification de l'image d'un utilisateur par l'administrateur ou par l'utilisateur
exports.deleteUserImage = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then((user) => {
            if (user._id === req.body.userId || req.auth.isAdmin) {
                const filename = user.imageUrl('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    User.updateOne({...user, imageUrl: 'https://i.postimg.cc/MHrVKYGM/default-profil-pict.jpg'}, { id: req.params.id })
                        .then(() => res.status(201).json({ message: 'Image supprimée !' }))
                        .catch(error => res.status(400).json({ error, message: error.message }));
                });
            } else {
                res.status(403).json({ message: '403: Unauthorized request' });
            }
        })
        .catch(error => res.status(500).json({ error, message: error.message }));
};