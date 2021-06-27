

const express = require('express');
const router = express.Router();

// Path to your JSON file, although it can be hardcoded in this file.
const data = require('../data/pr10-data.json')

router.get('/', (req, res, next) => {
    console.log("Data", data)
    res.render('pages/pr10', {
        title: 'Team Activity 10',
        dataItems: data.avengers,
        path: '/pr10',
    });
});

router.get('/fetchAll', (req, res, next) => {
    res.json(dummyData);
});

router.post('/insert', (req, res, next) => {
/************************************************
 * INSERT YOUR WEB ENDPOINT CODE HERE
 ************************************************/
    console.log("Data Received:: ", req.body)
    let newHero = {}
    newHero.name = req.body.name;
    if ( data.avengers.filter(a => a.name === newHero.name).length == 0 ) {
        data.avengers.push( newHero )
    }
    console.log(data)
    res.render('pages/pr10', {
        title: 'Team Activity 10',
        dataItems: data.avengers,
        path: '/pr10',
    });
});
    
module.exports = router;