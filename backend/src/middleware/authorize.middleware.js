const Post = require('../models/post.model');
const Comment = require('../models/comment.model');

const authorizePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        if (post.author.toString() !== req.userId) {
            return res.status(403).json({ message: 'Unauthorized access: You are not the author' });
        }
        next();
    } catch (error) {
        next(error);
    }
};

const authorizeComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        if (comment.author.toString() !== req.userId) {
            return res.status(403).json({ message: 'Unauthorized access: You are not the author' });
        }
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { authorizePost, authorizeComment };
