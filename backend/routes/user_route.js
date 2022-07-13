// Import des éléments nécessaires à la mise en place des routes

const express = require('express');
const router = express.Router();
const limiter = require('../middleware/rateLimit');
const auth = require('../middleware/auth_middleware');
const userController = require('../controllers/user_controller');
const multer = require('../middleware/multer-config');


// Mise en place des routes

router.post ('/signup', userController.signup);
router.post ('/login', userController.login, limiter.max);
router.get('/logout', userController.logout);
router.get('/allusers', /*auth,*/ userController.getAllUsers);
router.get('/user/:id', /*auth,*/ userController.getOneUser);
router.put('/update/:id', /*auth,*/ multer, userController.modifyUser);
router.put('/update/:id/:imageUrl', /*auth,*/ multer, userController.deleteUserImage);
router.delete('/delete/:id', /*auth,*/ multer, userController.deleteUser);

module.exports = router;
