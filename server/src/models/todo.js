const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
    description: {type: String, required: true},
    duedate: {type: String, required: true},
    done: {type: Boolean, required: true},
    hide: {type: Boolean, required: true}
})

module.exports = mongoose.model('ToDo', ToDoSchema);