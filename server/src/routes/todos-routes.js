const express = require('express');
const router = express.Router();
const ToDo = require('../models/todo');

router.get('/', async (req, res) => {
    const todos = await ToDo.find();

    res.json(todos);
});

router.post('/new', async (req, res) => {
    const newToDo = new ToDo(req.body);

    const savedToDo = await ToDo.create(newToDo);

    res.json(savedToDo);
});

router.patch('/update/:id', async (req, res) => {
    const updatedToDo = await ToDo.updateOne({_id: req.params.id}, {$set: req.body});

    res.json(updatedToDo);
});

router.patch('/update/done/:id', async (req, res) => {
    const todo = await ToDo.findById(req.params.id);
    
    todo.done = !todo.done;
    
    todo.save();

    res.json(todo);
});

router.delete('/delete/:id', async (req, res) => {
    const deletedToDo = await ToDo.findByIdAndDelete({_id: req.params.id});

    res.json(deletedToDo);
});

module.exports = router;