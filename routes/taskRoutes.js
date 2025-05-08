// server/routes/taskRoutes.js
const express = require('express');
const validateTask = require('../middleware/validateTask');

const router = express.Router();
const auth = require('../middleware/auth');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');

router.get('/', auth, getTasks);
router.post('/', auth, validateTask, createTask);
router.put('/:id', auth, validateTask, updateTask);
router.delete('/:id', auth, deleteTask);

module.exports = router;
