"use strict";

var _Post = require('../models/post');

var User = require('../models/user');

exports.post = {
  createPost: function createPost(req, res) {
    var findPost, url, newPost;
    return regeneratorRuntime.async(function createPost$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(_Post.find({
              title: req.body.title
            }));

          case 3:
            findPost = _context.sent;

            if (!(findPost.title === req.body.title)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.send({
              message: 'Blog already exists'
            }));

          case 6:
            url = req.protocol + '://' + req.get('host');
            newPost = new _Post();
            newPost.title = req.body.title;
            newPost.content = req.body.content;
            newPost.author = req.body.author;
            newPost.image = url + /uploads/ + req.file.filename;
            _context.next = 14;
            return regeneratorRuntime.awrap(newPost.save());

          case 14:
            res.send(newPost);
            _context.next = 21;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.json({
              message: 'error in create blog',
              error: _context.t0
            });

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 17]]);
  },
  listPost: function listPost(req, res) {
    var post;
    return regeneratorRuntime.async(function listPost$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(_Post.find().populate("user", "_id displayName"));

          case 2:
            post = _context2.sent;

            if (post) {
              res.send(post);
            } else {
              res.json({
                message: 'here is not any post yet...'
              });
            }

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  Post: function Post(req, res) {
    var post;
    return regeneratorRuntime.async(function Post$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(_Post.find({
              _id: req.params.id
            }));

          case 2:
            post = _context3.sent;

            if (post) {
              res.send(post);
            } else {
              res.json({
                message: 'Not found'
              });
            }

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  updatePost: function updatePost(req, res) {
    var url, post, newPost;
    return regeneratorRuntime.async(function updatePost$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            url = req.protocol + '://' + req.get('host');
            _context4.next = 3;
            return regeneratorRuntime.awrap(_Post.find({
              _id: req.params.id
            }));

          case 3:
            post = _context4.sent;

            if (!post) {
              _context4.next = 11;
              break;
            }

            _context4.next = 7;
            return regeneratorRuntime.awrap(_Post.findOneAndUpdate({
              _id: req.params.id
            }, {
              $set: {
                title: req.body.title,
                content: req.body.content,
                image: url + /uploads/ + req.file.filename,
                author: req.body.id
              }
            }));

          case 7:
            newPost = _context4.sent;
            res.send(newPost);
            _context4.next = 12;
            break;

          case 11:
            res.json({
              message: 'Not found'
            });

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  deletePost: function deletePost(req, res) {
    var deletePost;
    return regeneratorRuntime.async(function deletePost$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap(_Post.findByIdAndDelete({
              _id: req.params.id
            }));

          case 2:
            deletePost = _context5.sent;

            if (deletePost) {
              res.json({
                message: 'Delete successfully...'
              });
            } else {
              res.json({
                message: 'Failed Try again...'
              });
            }

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    });
  }
};