const express = require('express');
const auth = require('../middlewares/auth')

const { getNotes, createNote, updateNote, deleteNote } = require('../controllers/notesController');

const notesRouter = express.Router();

notesRouter.get('/:id',auth,getNotes);
notesRouter.get('/',auth,getNotes);
notesRouter.post('/',auth, createNote);
notesRouter.delete('/:id',auth,deleteNote);
notesRouter.put('/:id',auth,updateNote);

module.exports = notesRouter;