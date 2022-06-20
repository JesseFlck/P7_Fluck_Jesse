/*// Import des éléments nécessaires à l'authentification

const bcrypt = require("bcrypt");
const models = require('../models/index_model');
const jwt = require('jsonwebtoken');
const maxAge = 3 * 24 * 60 * 60 * 1000;
const { signInErrors, signUpErrors } = require('../utils/errors')
const apiLimiter = require('../middleware/rateLimit')

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY_TOKEN, {
    expiresIn: maxAge
  })
}

module.exports.signUp = async (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      models.users.create({
        name: req.body.name,
        firstname: req.body.firstname,
        email: req.body.email,
        admin: false,
        password: hash,
      })
        .then((user) => res.status(200).json({
          admin: user.admin,
          userId: user.id,

        }))
        .catch((err) => {
          const errors = signUpErrors(err);
          res.status(200).send({ errors })
        })


    })

    .catch((err) => {
      const errors = signInErrors(err);
      res.status(400).send({ errors });
      console.log(err)
    })

}

module.exports.signIn = async (req, res) => {

  models.users.findOne({ where: { email: req.body.email } })

    // Si l'email il n'existe pas dans la base de données
    .then((user) => {
      if (!user) {
        return res.status(200).json({ error: "Utilisateur inexistant" })
      }
      // Contrôle de la validité du password envoyé par le front
      bcrypt.compare(req.body.password, user.password)
        .then((controlPassword) => {

          // Si le mot de passe est faux

          if (!controlPassword) {
            apiLimiter
            return res.status(400).json({message: "le mot de passe est incorrect" })
          }

          // Si le mot de passe est correct, envoi dans la response du serveur de l'id de l'utilisateur et du token d'authentification
          const token = createToken(user.id);
          res.cookie('jwt', token, { httpOnly: true, maxAge });
          res.status(200).json({ user: user.id })
        })
        .catch((error) => res.status(500).json({ error }))
    })
    .catch((error) => res.status(500).json(error));
}

exports.logout = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}
*/