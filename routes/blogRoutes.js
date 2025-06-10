const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.getAllPosts);
router.post('/', blogController.createPost); // You can protect this with JWT later

module.exports = router;
