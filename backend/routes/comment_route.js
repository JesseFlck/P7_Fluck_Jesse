// Import des éléments nécessaires à la mise en place des routes

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth_middleware');
const commentController = require('../controllers/comment_controller');

// Mise en place des routes

router.get('/all', auth, commentController.getAllComments);
router.get('/:id', auth, commentController.getOneComment);
router.post('/reply',auth, commentController.newComment);
router.delete('/delete/:id',auth, commentController.deleteComment);
router.put('/update/:id', auth, commentController.updateComment);

module.exports = router;
