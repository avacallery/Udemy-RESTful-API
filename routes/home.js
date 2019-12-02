const express = require('express');
const router = express.Router(); 

router.get('/', (req, res) => { //setting up a route to respond to
    res.render('index', { title: 'My Express App' , message: 'Hello'});
});

module.exports = router; 