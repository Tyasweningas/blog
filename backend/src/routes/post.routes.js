const express = require('express');
const {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
} = require('../controllers/post.controller');
const auth = require('../middleware/auth.middleware');
const { authorizePost } = require('../middleware/authorize.middleware');
const {
    addComment,
    getCommentsByPost
} = require('../controllers/comment.controller');

const router = express.Router();

// Post CRUD
router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', auth, createPost);
router.put('/:id', auth, authorizePost, updatePost);
router.delete('/:id', auth, authorizePost, deletePost);

// Comments nested under posts for creation and listing
router.post('/:id/comments', auth, addComment);
router.get('/:id/comments', getCommentsByPost);

module.exports = router;
