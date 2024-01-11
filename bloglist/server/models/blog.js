const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: 'Missing blog title' },
  author: String,
  url: { type: String, required: 'Missing blog url' },
  likes: { type: Number, default: 0 },
  comments: [{ content: String }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

blogSchema.set('toJSON', {
  versionKey: false,
  flattenObjectIds: true,
  transform: (doc, ret) => {
    ret.comments.forEach((comment) => {
      comment.id = comment._id;
      delete comment._id;
    });
    ret.id = doc._id;
    delete ret._id;
  },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
