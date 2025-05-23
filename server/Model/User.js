const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
},
  user_status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
});

module.exports = mongoose.model('User_sts', userSchema);
