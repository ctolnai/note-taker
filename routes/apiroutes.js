const router = require('express').Router();
const { ifError } = require('assert');
const { randomUUID } = require('crypto');
const fs = require('fs');
const db = require('../db/db.json');
const {readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');


router.get('/notes', (req, res) => {
    console.info(`${req.method} request received for feedback`);

    readFromFile('./db/db.json').then ((data) => res.json(JSON.parse(data)));

});

router.post('/notes', (req, res) => {
    console.info(`${req.method} request received to submit feedback`);

    const {title, text, id} = req.body;
    
    if (title && text){
        const newNote = {
            title,
            text,
            id: randomUUID() 
        };
        

        readAndAppend(newNote, 'db/db.json');

        const response = {
          status: 'success',
          body: newNote,
        };
    
        res.json(response);
      } else {
        res.json('Error in posting feedback');
      }

}
);



router.delete('/notes/:id', (req, res) => {
    console.info(`${req.method}`)
    const noteId = req.params.id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const newNoteArray = json.filter(note => note.id !== noteId)
        writeToFile('./db/db.json', newNoteArray)
        res.status(200).json('Note Deleted');
        return;
    })


});

module.exports = router