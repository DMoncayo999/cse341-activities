const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {
    res.render('forms/inputData', { title: 'Assignment 01',  path: '/pr01'  } );
});

router.post('/',(req, res, next) => {
    res.render('forms/showData', { title: 'Assignment 01', 
        path: '/pr01', 
        fname: req.body.fn, 
        lname: req.body.ln,
        add: req.body.add } );
});

module.exports = router;