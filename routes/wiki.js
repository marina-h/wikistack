'use strict';
var express = require('express');
var router = express.Router();

module.exports = function() {
  router.get('/', function(req, res) {
    //res.render('index/');
    res.send('hello world')


  })




  return router;
}
