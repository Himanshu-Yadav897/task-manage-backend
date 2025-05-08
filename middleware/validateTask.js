// server/middleware/validateTask.js
const validator = require('validator');

const allowedPriorities = ['low', 'medium', 'high'];

module.exports = (req, res, next) => {
  const { title, description, dueDate, priority } = req.body;
  const errors = [];

  // Title: required, non-empty
  if (validator.isEmpty(title || '')) {
    errors.push('Title is required');
  }

  // Description: optional, but if present must be a string
  if (description !== undefined && typeof description !== 'string') {
    errors.push('Description must be a string');
  }

  // dueDate: required, must be ISO8601 (YYYY-MM-DD)
  if (validator.isEmpty(dueDate || '')) {
    errors.push('Due date is required');
  } else if (!validator.isISO8601(dueDate)) {
    errors.push('Due date must be in YYYY-MM-DD format');
  }

  // Priority: optional, but if present must be one of allowedPriorities
  if (priority !== undefined && !allowedPriorities.includes(priority)) {
    errors.push(`Priority must be one of ${allowedPriorities.join(', ')}`);
  }

  if (errors.length) {
    return res.status(400).json({ errors });
  }

  next();
};
