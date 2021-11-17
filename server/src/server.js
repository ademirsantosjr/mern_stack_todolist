const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const ToDosRoutes = require('./routes/todos-routes')

const app = express();

mongoose.connect('mongodb://localhost:27017/todolist', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.once('open', () => {
    console.log("Connected to MongoDB with success!!");
});

app.use(express.json());
app.use(cors());
app.use('/api/v1/todos', ToDosRoutes);

app.listen(5000, console.log("Listening on port 5000..."));