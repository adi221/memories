import PostMessage from '../models/postMessage.js';

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
    console.log(newPost);
    res.status(201).json(newPost);
    res.json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
