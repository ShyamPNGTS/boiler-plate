const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Mock function to simulate sending OTP
const sendOtp = async (email, otp) => {
  console.log(`Sending OTP ${otp} to ${email}`);
  // In a real application, you would use a service like Nodemailer or Twilio
};

exports.signup = async (req, res) => {
  const { name, email, mobileNumber, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    let user = await User.findOne({ $or: [{ email }, { mobileNumber }] });

    if (user) {
      return res.status(400).json({ message: 'User already exists with this email or mobile number' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000); // OTP valid for 15 minutes

    user = new User({
      name,
      email,
      mobileNumber,
      password: hashedPassword,
      otp,
      otpExpires,
    });

    await user.save();

    // Send OTP (mocked)
    await sendOtp(user.email, user.otp);

    res.status(201).json({ message: 'User registered. Please verify your account with the OTP sent to your email.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or OTP' });
    }

    if (user.otp !== otp || user.otpExpires < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();

    // Auto-create wallet and profile after successful verification
    const Wallet = require('../models/wallet.model');
    const Profile = require('../models/profile.model');
    const Channel = require('../models/channel.model');

    await Wallet.create({ userId: user._id });
    await Profile.create({ userId: user._id, email: user.email }); // Initialize profile with email
    await Channel.create({ userId: user._id }); // Auto-create channel

    res.status(200).json({ message: 'Account verified successfully.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: 'Account not verified. Please verify your account using the OTP sent to your email.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};