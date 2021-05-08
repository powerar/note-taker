const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const fs = require('fs');
const notes = [];

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
  const note = req.body;
  writeNote(note);
});

function writeNote(note) {  
  const content = fs.readFileSync('./db/db.json', 'utf-8');
  const existingNote = JSON.parse(content);
  note.id = existingNote.note.length + 1;
  existingNote.note.push(note);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(existingNote, null, 2)
  );
};

app.listen(PORT, () => {
  console.log(`API server running on ${PORT}`);
});
