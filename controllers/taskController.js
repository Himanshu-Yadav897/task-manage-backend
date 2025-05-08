// server/controllers/taskController.js
const Task = require('../models/Tasks');
const User = require('../models/User');


// GET /tasks — only tasks for the logged‑in user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error('Fetch tasks error', err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// POST /tasks — create task for the logged‑in user
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, assigneeId } = req.body;

    // Create the task
    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      assigneeId: assigneeId || req.user.id  // fallback to self
    });

    await newTask.save();

    // 📨 Console log the assignment notification
    const assignee = await User.findById(newTask.assigneeId);
    if (assignee) {
      console.log(`📢 Task "${newTask.title}" assigned to ${assignee.email}`);
    }

    res.status(201).json(newTask);
  } catch (err) {
    console.error('Create task error', err);
    res.status(400).json({ error: 'Failed to create task' });
  }
};


// PUT /tasks/:id — only if the task belongs to this user
exports.updateTask = async (req, res) => {
  try {
    console.log(req.params.id);
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, assigneeId: req.user.id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ error: 'Task not found or not yours' });

    res.json({ message: 'Task updated successfully', task });
  } catch (err) {
    console.error('Update task error', err);
    res.status(400).json({ error: 'Failed to update task' });
  }
};


// DELETE /tasks/:id — only if the task belongs to this user
exports.deleteTask = async (req, res) => {
  try {
    const result = await Task.deleteOne({ _id: req.params.id, assigneeId: req.user.id });
    if (result.deletedCount === 0)
      return res.status(404).json({ error: 'Task not found or not yours' });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Delete task error', err);
    res.status(400).json({ error: 'Failed to delete task' });
  }
};
