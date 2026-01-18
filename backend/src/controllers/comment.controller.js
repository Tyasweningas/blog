const Comment = require('../models/comment.model');
const Post = require('../models/post.model');

const addComment = async (req, res, next) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }

        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = await Comment.create({
            content,
            post: req.params.id,
            author: req.userId
        });

        post.comments.push(comment._id);
        await post.save();

        res.status(201).json(comment);
    } catch (error) {
        next(error);
    }
};

const getCommentsByPost = async (req, res, next) => {
    try {
        const comments = await Comment.find({ post: req.params.id })
            .populate('author', 'name')
            .sort({ createdAt: -1 });

        res.json(comments);
    } catch (error) {
        next(error);
    }
};

const updateComment = async (req, res, next) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }

        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            { content },
            { new: true }
        );

        res.json(comment);
    } catch (error) {
        next(error);
    }
};

const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Remove from post's comments array
        await Post.findByIdAndUpdate(comment.post, {
            $pull: { comments: comment._id }
        });

        await Comment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Comment removed' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addComment,
    getCommentsByPost,
    updateComment,
    deleteComment
};
