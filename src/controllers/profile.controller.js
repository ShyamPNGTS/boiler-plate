const Profile = require('../models/profile.model');

const createProfile = async (userId, email) => {
  try {
    const newProfile = new Profile({
      userId,
      email,
      nickname: '', // Initialize with empty values
      aadhaarNumber: '',
      alternateNumber: ''
    });
    await newProfile.save();
    console.log(`Profile created for user: ${userId}`);
  } catch (error) {
    console.error(`Error creating profile for user ${userId}:`, error);
    // Handle the error appropriately, e.g., log it or throw an exception
  }
};

// Add other profile-related functions here (e.g., updateProfile, getProfile)

module.exports = {
  createProfile,
  // Export other functions
};