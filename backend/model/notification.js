const mongoose = require('mongoose');

const { Schema } = mongoose;

const NotificationSchema = new Schema({
  title: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

const Notification = mongoose.model('Notification', NotificationSchema);
module.exports = Notification;
