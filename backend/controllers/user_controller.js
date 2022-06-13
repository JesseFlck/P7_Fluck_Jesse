const User = require('../models/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator');
const fs = require('fs');
//const AES = require('aes-encryption');

// Format imposé au mot de passe
const passwordSchema = new passwordValidator();
passwordSchema

exports.signup = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
            });
            user.save()
                .then(() =>
                    res.status(201).json({ message: 'Utilisateur créé !' })
                )
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(501).json({ error : 'its a fail' }));
};

/*// Création d'un utilisateur
exports.signup = (req, res, next) => {
    const User = new User({
    //const { firstName, lastName, email, password } = req.body;
    //const user = new userSchema({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password,
    })
    if (!User.firstName || !User.lastName || !User.email || !User.password) {
        return res.status(400).json({ error: 'Veuillez remplir tous les champs svp' });
    }
    else if (!passwordSchema.validate(password)) {
        return res.status(400).json({ error: 'Mot de passe incorrect' });
    }
    //const cryptedEmail = AES.encrypt(email); // Chiffrage de l'adresse mail
    user.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({ error: 'Cet email est déjà utilisé' });
            }
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt); // Hash du mot de passe
            user.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashPassword,
            })
                .then(() => { res.status(201).json({ message: 'Utilisateur créé avec succès !' });
                })
                .catch(error => { res.status(400).json({ error: 'Une erreur est survenue lors de la création de l\'utilisateur' });
                });
        })
        .catch(error => { res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'utilisateur', message: error.message });
        });
};*/


// Connexion d'un utilisateur

exports.login = (req, res, next) =>{
    const email = req.body.email;
    //const cryptedEmail = AES.encrypt(req.body.email);
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ error: 'Utilisateur non trouvé' });
            }
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(400).json({ error: 'Mot de passe incorrect' });
            }
            res.status(200).json({
                userId: user.id,
                isAdmin: user.isAdmin,
                token: jwt.sign({ userId: user.id, isAdmin: user.isAdmin}, 'process.env.TOKEN',{ expiresIn: '24h' }) // Generation du token d'authentification
            });
        })
        .catch(error => res.status(500).json({ error: 'Une erreur est survenue lors de la connexion', message: error.message }));
};

// Modification de l'utilisateur

exports.modifyUser = (req, res, next) => {
    if(req.file === undefined){ // Changement des données de l'utilisateur sans modification de l'image
        User.findOne({ where: { id : req.params.id } })
            .then(user =>{
                if (user.id === req.token.userId){
                    User.update({...user, firstName: req.body.firstName, lastName: req.body.lastName}, { where: { id: req.params.id }})
                    .then(() => res.status(201).json({ message: 'Utilisateur modifié !' }))
                    .catch(error => res.status(400).json({ error, message: error.message }));
                } else {
                    res.status(403).json({ message: 'Vous n\'êtes pas autorisé à modifier cet utilisateur !' });
                }
            })
            .catch(error => res.status(500).json({ error, message: error.message }));        
    } else { // Modification de toutes les données de l'utilisateur
        const userImage = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        User.findOne({ where: { id: req.params.id } })
            .then((user) => { 
                if (user.id === req.token.userId){
                    const filename = user.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                    User.update({...user, firstName: req.body.firstName, lastName: req.body.lastName, imageUrl: userImage}, {where: {id: req.params.id}})
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
                        

// Suppression d'un utilisateur par l'utilisateur ou l'administrateur
exports.deleteUser = (req, res, next) => {
    User.findOne({ where: { id: req.params.id } })
        .then((user) => {
            if (user.id === req.token.userId || req.token.isAdmin) {
                const filename = user.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    User.destroy({ where: { id: req.params.id } })
                        .then(() => res.status(201).json({ message: 'Utilisateur supprimé !' }))
                        .catch(error => res.status(400).json({ error, message: error.message }));
                });
            } else{
                res.status(403).json({message: '403: Unauthorized request'});
            }
        })
        .catch(error => res.status(500).json({ error, message : error.message }));
};

// Récuperation de tous les utilisateurs

exports.getAllUsers = (req, res, next) => {
    User.findAll({ order: [['createdAt', 'DESC']],})
        .then((user)=>{
            if (user.id === req.token.userId || req.token.isAdmin){
                res.status(200).json(user);
            } else {
                res.status(403).json({ message: '403: Unauthorized request'});
            }
        })
        .catch(error => res.status(500).json({ error, message: error.message }));
};

// Récupération d'un seul utilisateur

exports.getOneUser = (req, res, next) => {
    User.findOne({ where: { id: req.params.id}})
        .then((user) => {
            if (user.id === req.token.userId || req.token.isAdmin){
                res.status(200).json(user);
            } else {
                res.status(403).json({ message: '403: Unauthorized request'});
            }
        })
        .catch(error => res.status(500).json({ error, message: error.message }));
};
