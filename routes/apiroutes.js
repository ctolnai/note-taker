const router = require('express').Router();
const { ifError } = require('assert');
const { randomUUID } = require('crypto');
const fs = require('fs');
const db = require('../db/db.json');
const {readAndAppend, readFromFile } = require('../helpers/fsUtils');


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
        // console.log (newNote);

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



module.exports = router