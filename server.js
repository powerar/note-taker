const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const fs = require('fs');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());


function writeNote(body) {
  const notesArray = db;
  const note = body;
  note.id = notesArray.length;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(notesArray, null, 2)
  );
  return db;
};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
  app.use(express.static('public'));
});

app.get('/api/notes', (req, res) => {
  res.json(db);
});

app.post('/api/notes', (req, res) => {
  const newNote = writeNote(req.body);
  res.json(newNote);
});

app.listen(PORT, () => {
  console.log(`API server running on ${PORT}`);
});
