// controllers/blogController.js

const BlogPost = require('../models/BlogPost');

const getAllBlogPosts = async (req, res) => {
  try {
      const blogPosts = await BlogPost.find().populate({
          path: 'author',
          select: 'username',
      }).populate({
          path: 'comments',
          populate: {
              path: 'author',
              select: 'username',
          },
      }).sort({ createdAt: -1 });

      res.json(blogPosts);
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
  }
};
  
  const createBlogPost = async (req, res) => {
    const { title, content } = req.body;
    const author = req.user.id;
  
    try {
      // Creating a new blog post requires authentication
      const newBlogPost = new BlogPost({ title, content, author });
      await newBlogPost.save();
  
      res.json(newBlogPost);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  };
  
  const updateBlogPost = async (req, res) => {
    const { title, content } = req.body;
  
    try {
      let blogPost = await BlogPost.findById(req.params.id);
      if (!blogPost) return res.status(404).json({ message: 'Blog post not found' });
  
      if (blogPost.author.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
      }
  
      blogPost.title = title;
      blogPost.content = content;
      await blogPost.save();
  
      res.json(blogPost);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  };
  
  const deleteBlogPost = async (req, res) => {
    try {
      let blogPost = await BlogPost.findById(req.params.id);
      if (!blogPost) return res.status(404).json({ message: 'Blog post not found' });
  
      if (blogPost.author.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
      }
  
      await blogPost.deleteOne(); // Use deleteOne() or deleteMany() for deletion
  
      res.json({ message: 'Blog post removed' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  };

  const getUserBlogs = async (req, res) => {
    try {
      // Retrieve only the blog posts created by the authenticated user
      const userBlogs = await BlogPost.find({ author: req.user.id })
        .populate({
          path: 'author',
          select: 'username',
        })
        .populate({
          path: 'comments',
          populate: {
            path: 'author',
            select: 'username',
          },
        })
        .sort({ createdAt: -1 });
  
      res.json(userBlogs);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  };
  
  
  module.exports = {getUserBlogs, getAllBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost };
  