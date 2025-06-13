const Channel = require('../models/channel.model');

const createChannel = async (userId) => {
  try {
    const newChannel = new Channel({
      userId: userId,
      // Add default values for backgroundImage and profilePicture if needed
    });
    await newChannel.save();
    console.log(`Channel created for user: ${userId}`);
  } catch (error) {
    console.error(`Error creating channel for user ${userId}:`, error);
    // Handle the error appropriately, e.g., log it or throw it
  }
};

module.exports = {
  createChannel,
};