const User = require('../models/userModel');

const UserController = {
  
  registerUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const newUser = new User({ username, email, password });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },


  loginUser: async (req, res) => {
    try {
  
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = UserController;

