/*
 * index.js - Index route module
 *
 */

// import express module & get a router object
var express = require('express');
var router = express.Router();

// GET home page
router.get('/', function(req, res, next) {
  res.render('index', {});
});

module.exports = router;
