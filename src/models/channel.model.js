const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  backgroundImage: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
}, {
  timestamps: true,
});

const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;