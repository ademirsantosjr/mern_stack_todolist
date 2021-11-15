const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/todolist', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', () => {
    console.log("Connected to MongoDB with success!!");
});

app.get('/', (req, res) => {
    res.send("Teste...");
});

app.listen(3000, console.log("Listening on port 3000..."));