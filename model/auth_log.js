const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserAuthSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    unique:true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  ip: {
    type: String,
    required: false
  }
});

    
const UserAuthModel = mongoose.model('user_auth', UserAuthSchema);

module.exports = UserAuthModel;