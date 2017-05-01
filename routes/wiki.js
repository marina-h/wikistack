'use strict';
var express = require('express');
var wikiRouter = express.Router();

module.exports = function() {
  wikiRouter.get('/', function(req, res, next) {
    //res.render('index/');
    res.send('wiki root')
  })

  wikiRouter.post('/', function(req, res, next){
    // submits new page
    res.send("wiki post");
  })

  wikiRouter.get('/add', function(req, res, next){
    res.send('wiki add');
  })




  return wikiRouter;
}
