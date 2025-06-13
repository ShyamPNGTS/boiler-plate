import Video from '../models/video.model.js';
import multer from 'multer';

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Videos will be stored in the 'uploads/' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

export const uploadVideo = [
  upload.single('thumbnail'), // Use Multer middleware to handle thumbnail upload
  async (req, res) => {
    try {
      const { title, description, youtubeUrl, channelName } = req.body;
      const userId = req.user._id; // Assuming user is attached to the request by auth middleware
      const thumbnail = req.file ? req.file.path : null; // Get the path of the uploaded thumbnail

      const newVideo = new Video({
        title,
        description,
        youtubeUrl,
        thumbnail,
        channelName,
        userId,
        totalViews: 0,
        likes: 0,
        dislikes: 0,
        comments: []
      });

      await newVideo.save();

      res.status(201).json({ message: 'Video uploaded successfully', video: newVideo });
    } catch (error) {
      console.error('Error uploading video:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
];