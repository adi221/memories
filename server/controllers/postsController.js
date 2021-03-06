import mongoose from 'mongoose';
import PostMessage from '../models/postModel.js';

export const getPosts = async (req, res) => {
  try {
    const posts = await PostMessage.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const post = req.body;
    const newPost = new PostMessage(post);
    await newPost.save();

    res.status(201).json(newPost);
    res.json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await PostMessage.findById(req.params.id);

    if (post) {
      await post.remove();
      res.json({ message: 'Post removed' });
    } else {
      throw new Error('Product not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await PostMessage.findById(req.params.id);
    if (post) {
      const alreadyLikedIndex = post.likes.findIndex(
        like => like.user.toString() === req.user._id.toString()
      );
      console.log(alreadyLikedIndex);
      // Remove Like
      if (alreadyLikedIndex > -1) {
        post.likes.splice(alreadyLikedIndex, 1);
        post.numLikes = post.likes.length;
        await post.save();
      } else {
        // Add Like
        post.likes.push({ user: req.user._id });
        post.numLikes = post.likes.length;
        await post.save();
      }
    } else {
      throw new Error('Product not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const post = await PostMessage.findById(req.params.id);
    if (post) {
      res.json(post);
    } else {
      throw new Error('Post not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = req.body;
    if (mongoose.Types.ObjectId.isValid(id)) {
      const updatedPost = await PostMessage.findByIdAndUpdate(
        id,
        { ...post, id },
        {
          new: true,
        }
      );
      await updatedPost.save();
      res.json(updatedPost);
    } else {
      throw new Error('Post not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const posts = await PostMessage.find({ user: req.params.id });
    if (posts) {
      res.json(posts);
    } else {
      throw new Error('No posts to show');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
