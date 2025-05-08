// server/models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [1, 'Title cannot be empty']
  },
  description: {
    type: String,
    default: ''
  },
  dueDate: {
    type: String,
    required: [true, 'Due date is required'],
    validate: {
      validator: (v) => /^\d{4}-\d{2}-\d{2}$/.test(v),
      message: props => `${props.value} is not a valid due date (YYYY-MM-DD)`
    }
  },
  priority: {
    type: String,
    enum: {
      values: ['low', 'medium', 'high'],
      message: '{VALUE} is not a valid priority'
    },
    default: 'low'
  },
  assigneeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
