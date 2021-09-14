const router = require('express').Router();
const { ifError } = require('assert');
const fs = require('fs');
const db = require('../db/db.json');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

router.get('/notes', (req, res) => {
    res.json(db)
}
);

router.post('/notes', (req, res) => {
    console.info(`${req.method} request received to submit feedback`);

    const {title, text} = req.body;
    
    if (title && text){
        const newNote = {
            title,
            text,
        };

        readAndAppend(newNote, '/notes');

        const response = {
          status: 'success',
          body: newNote,
        };
    
        res.json(response);
      } else {
        res.json('Error in posting feedback');
      }
    
}
)

module.exports = router