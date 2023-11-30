// controllers/commentController.js
const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');

const addComment = async (req, res) => {
  const { content } = req.body;
  const author = req.user.id;
  const blogPostId = req.params.id;

  try {
      // Adding a comment requires authentication
      let blogPost = await BlogPost.findById(blogPostId);
      if (!blogPost) return res.status(404).json({ message: 'Blog post not found' });

      const newComment = new Comment({ content, author });
      await newComment.save();

      blogPost.comments.push(newComment);
      await blogPost.save();

      // Populate the comment's author field before sending the response
    

      // Return the full comment details in the response
      res.json({
          _id: newComment._id,
          content: newComment.content,
          author: {
              _id: newComment.author._id,
              username: newComment.author.username,
              // Include other author details if needed
          },
          createdAt: newComment.createdAt,
          // Include other comment details if needed
      });
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
  }
};


module.exports = { addComment };
