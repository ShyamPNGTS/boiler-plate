const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  youtubeUrl: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  channelName: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  totalViews: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: String,
    }
  ],
}, { timestamps: true });

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;