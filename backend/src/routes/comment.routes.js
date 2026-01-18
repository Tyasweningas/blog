const express = require('express');
const {
    updateComment,
    deleteComment
} = require('../controllers/comment.controller');
const auth = require('../middleware/auth.middleware');
const { authorizeComment } = require('../middleware/authorize.middleware');

const router = express.Router();

router.put('/:id', auth, authorizeComment, updateComment);
router.delete('/:id', auth, authorizeComment, deleteComment);

module.exports = router;
