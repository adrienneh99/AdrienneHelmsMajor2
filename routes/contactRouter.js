/*
 * contact.js - Contact route module
 *
 * 1. Receives the HTTP request
 * 2. Forwards the request & URL encoded info to the appropriate controller function
 *
 */

// import express module & get a router object
var express = require('express');
var router = express.Router();


// require the controller
var contactController = require('../controllers/contactController');


// Contact form POST route
router.post('/', contactController.contact_post);


module.exports = router;
