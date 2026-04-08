const Todo = require('../models/todo');

// Create Todo
exports.createTodo = async (req, res, next) => {
    try {
        const todo = await Todo.create(req.body);
        res.status(201).json(todo);
    } catch (err) {
        next(err);
    }
};

// Get All Todos
exports.getTodos = async (req, res, next) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        next(err);
    }
};

// Get Single Todo
exports.getTodoById = async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json(todo);
    } catch (err) {
        next(err);
    }
};

// Update Todo
exports.updateTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json(todo);
    } catch (err) {
        next(err);
    }
};

// Delete Todo
exports.deleteTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json({ message: 'Todo deleted' });
    } catch (err) {
        next(err);
    }
};