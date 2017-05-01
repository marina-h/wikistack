'use strict';
var express = require('express');
var wikiRouter = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;


  wikiRouter.get('/', function(req, res, next) {
    //res.render('index/');
    console.log('hello');
    //res.send('wiki root');
    res.redirect('/');
  });

  wikiRouter.post('/', function(req, res, next){
    // submits new page
    // res.json(req.body);
    // var urlTitle = function(title){
    //   if(title){
    //      return title.replace(/\s+/g, '_').replace(/\W/g, '');
    //   }else{
    //     return Math.random().toString(36).substring(2, 7);
    //   }
    // }
    var page = Page.build({
      title: req.body.title,
      content: req.body.content
    });

    page.save().then(function(page){
      res.redirect(page.route);
      // res.json(pages);
    });

  });

  wikiRouter.get('/add', function(req, res, next){
    res.render('addpage');
  });

  wikiRouter.get('/:pageurl', function(req,res,next){
    // var pageUrl = ;
    // res.send(page + ' cool page');
  Page.findOne({
      where: {
        urlTitle: req.params.pageurl
      }
    })
    .then(function(page){
      // console.log(page.title);
      res.render('wikipage', {page});
    })
    .catch(next);



  });





module.exports = wikiRouter;
