
const Post = require('../models/post.model');

const createPost = async (req, res, next) => {
    try {
        const {tittle, content} = req.body;
        if (!tittle || !content) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const post = new Post ({
            tittle, 
            content, 
            author: req.userId
        })

        await post.save();
        return res.status(201).json(post)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}