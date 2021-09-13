const router = require('express').Router();
const { ifError } = require('assert');
const fs = require('fs');
const db = require('../db/db.json');

router.get('/notes', (req, res) => {
    // fs.readFile(db, 'utf-8', (err, data)=> {
    //     if (err) throw err
    // }) 
    res.json(db)
}
);

router.post('/notes', (req, res) => {
    // fs.readFile(db, 'utf-8', (err, data)=> {
    //     if (err) throw err
    // }) 

    console.log(req.body)

    res.json(db)
}
)

module.exports = router