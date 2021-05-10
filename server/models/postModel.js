import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
      required: true,
    },
    selectedFile: String,
    numLikes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const PostMessage = mongoose.model('PostMessage', postSchema);
export default PostMessage;
