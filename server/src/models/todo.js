const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
    description: {type: String, required: true},
    duedate: {type: Date, required: true},
    done: {type: Boolean, default: false},
    hide: {type: Boolean, default: false}
})

module.exports = mongoose.model('ToDo', ToDoSchema);