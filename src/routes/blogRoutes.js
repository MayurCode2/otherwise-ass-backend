// routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', blogController.getAllBlogPosts);
router.post('/', verifyToken, blogController.createBlogPost);
router.put('/:id', verifyToken, blogController.updateBlogPost);
router.delete('/:id', verifyToken, blogController.deleteBlogPost);
router.get('/user-blogs', verifyToken, blogController.getUserBlogs);

module.exports = router;
