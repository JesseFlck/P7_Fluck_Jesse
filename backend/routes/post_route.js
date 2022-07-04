// Import des éléments nécessaires à la mise en place des routes

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth_middleware');
const multer = require('../middleware/multer-config');
const postController = require('../controllers/post_controller');

// Mise en place des routes

router.get('/', auth, postController.getAllPosts);
router.get('/:id', auth, postController.getOnePost);
router.post('/new', multer, auth, postController.newPost);
router.put('/:id',auth, multer, postController.updatePost);
router.delete('/:id',auth, postController.deletePost);
router.post("/:id/like", auth, postController.likePost);

module.exports = router;