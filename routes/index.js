'use strict';
var express = require('express');
var router = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');

module.exports = function() {
  router.get('/', function(req, res) {
    res.render('index');
    // res.send('hello world')
  })
  router.use('/wiki', wikiRouter);
  // or, in one line: router.use('/wiki', require('./wiki'));
  router.use('/user', userRouter);
  // or, in one line: router.use('/wiki', require('./wiki'));


  return router;
}
