const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const fs = require('fs');
const notesArray = [];

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
  app.use(express.static('public'));
});

app.post('/api/notes', (req, res) => {
  req.body.id = notes.length.toString();

  const note = writeNote(req.body, notes);
});

function writeNote(note, notesArray) {
  notes.push(note);
  console.log(notes);
};

app.listen(PORT, () => {
  console.log(`API server running on ${PORT}`);
});
