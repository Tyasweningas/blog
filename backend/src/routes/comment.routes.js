const express = require('express');
const router = express.Router();

// TODO: Implement CRUD controllers
router.get('/', (req, res) => res.json({ message: 'Comments endpoint' }));

module.exports = router;
