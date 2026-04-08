const express = require('express');
const router = express.Router();
const {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo
} = require('../controllers/todoController');

router.route('/')
    .post(createTodo)
    .get(getTodos);

router.route('/:id')
    .get(getTodoById)
    .put(updateTodo)
    .delete(deleteTodo);

module.exports = router;