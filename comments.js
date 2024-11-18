// Create web server
// npm install express
// npm install body-parser
// npm install mongoose
// npm install cors
// npm install nodemon

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Create Express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comments', {useNewUrlParser: true});

// Create Mongoose model
const Comment = mongoose.model('Comment', {
    username: String,
    text: String
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/comments', async (req, res) => {
    const comments = await Comment.find();
    res.send(comments);
});

app.post('/comments', async (req, res) => {
    const comment = new Comment(req.body);
    await comment.save();
    res.send(comment);
});

// Start server
app.listen(3001, () => {
    console.log('Server started on http://localhost:3001');
});

// Run server
// nodemon comments.js

// Test server
// curl -X POST -H "Content-Type: application/json" -d '{"username":"Alice","text":"Hello"}' http://localhost:3001/comments
// curl http://localhost:3001/comments