const ToDo = require('../models/todo');

const getAll = async (req, res) => {
    const todos = await ToDo.find( 
        { hide: false }  
    );

    res.json(todos);
}

const getAllArchived = async (req, res) => {
    const todos = await ToDo.find( 
        { hide: true }  
    );

    res.json(todos);
}

const getByDescriptionInput = async (req, res) => {
    const todos = await ToDo.find( 
        { description: { $regex: `.*${req.params.description}.*`, $options: "i" }  
    } );

    res.json(todos);
}

const createOne = async (req, res) => {
    const newToDo = new ToDo(req.body);
    const savedToDo = await ToDo.create(newToDo);

    res.json(savedToDo);
}

const updateOne = async (req, res) => {
    const updatedToDo = await ToDo.updateOne(
        {_id: req.params.id},
        {$set: req.body}
    );

    res.json(updatedToDo);
}

const updateToDone = async (req, res) => {
    const todo = await ToDo.findById(req.params.id);
    
    todo.done = !todo.done;
    
    todo.save();

    res.json(todo);
}

const updateToArchived = async (req, res) => {
    const todo = await ToDo.findById(req.params.id);
    
    todo.hide = !todo.hide;
    
    todo.save();

    res.json(todo);
}

const deleteById = async (req, res) => {
    const deletedToDo = await ToDo.findByIdAndDelete(
        {_id: req.params.id}
    );

    res.json(deletedToDo);
}

module.exports = {
    getAll,
    getAllArchived,
    getByDescriptionInput,
    createOne,
    updateOne,
    updateToDone,
    updateToArchived,
    deleteById
}