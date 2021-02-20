"use strict";

var User = require('../models/user');

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var saltRounds = 10;
exports.user = {
  createUser: function createUser(req, res) {
    var _req$body, email, displayName, password, avatar, userExist;

    return regeneratorRuntime.async(function createUser$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, displayName = _req$body.displayName, password = _req$body.password, avatar = _req$body.avatar;

            if (email === '' | displayName === '' | password === '') {
              res.send('email or username or password are empty');
            }

            _context2.next = 4;
            return regeneratorRuntime.awrap(User.find({
              email: email
            }));

          case 4:
            userExist = _context2.sent;

            if (userExist.length === 0) {
              bcrypt.hash(password, saltRounds, function _callee(err, hash) {
                var url, newUser;
                return regeneratorRuntime.async(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!err) {
                          _context.next = 2;
                          break;
                        }

                        return _context.abrupt("return", req.send('Error in hash'));

                      case 2:
                        url = req.protocol + '://' + req.get('host');
                        newUser = new User();
                        newUser.avatar = url + /uploads/ + req.file.filename;
                        newUser.email = email;
                        newUser.displayName = displayName;
                        newUser.password = hash;
                        _context.next = 10;
                        return regeneratorRuntime.awrap(newUser.save());

                      case 10:
                        res.send(newUser);

                      case 11:
                      case "end":
                        return _context.stop();
                    }
                  }
                });
              });
            } else {
              res.send('User exist already');
            }

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  listUser: function listUser(req, res) {
    var list;
    return regeneratorRuntime.async(function listUser$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(User.find({}));

          case 2:
            list = _context3.sent;
            res.send(list);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  updateUser: function updateUser(req, res) {
    var _req$body2, email, displayName, password, status;

    return regeneratorRuntime.async(function updateUser$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, displayName = _req$body2.displayName, password = _req$body2.password, status = _req$body2.status;

            if (email === '' | displayName === '' | password === '') {
              res.send('email or username or password are empty');
            } else {
              bcrypt.hash(password, saltRounds, function _callee2(err, hash) {
                var newUser;
                return regeneratorRuntime.async(function _callee2$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return regeneratorRuntime.awrap(User.findOneAndUpdate({
                          _id: req.params.id
                        }, {
                          $set: {
                            email: email,
                            password: hash,
                            displayName: displayName,
                            status: status
                          }
                        }));

                      case 2:
                        newUser = _context4.sent;
                        res.json({
                          email: newUser.email,
                          displayName: newUser.displayName
                        });

                      case 4:
                      case "end":
                        return _context4.stop();
                    }
                  }
                });
              });
            }

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    });
  },
  deleteUser: function deleteUser(req, res) {
    var newUser;
    return regeneratorRuntime.async(function deleteUser$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return regeneratorRuntime.awrap(User.deleteOne({
              _id: req.params.id
            }));

          case 2:
            newUser = _context6.sent;
            res.send(newUser);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    });
  },
  loginUser: function loginUser(req, res) {
    var _req$body3, email, password, passwordHash;

    return regeneratorRuntime.async(function loginUser$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _req$body3 = req.body, email = _req$body3.email, password = _req$body3.password;
            _context8.next = 3;
            return regeneratorRuntime.awrap(User.findOne({
              email: email
            }));

          case 3:
            passwordHash = _context8.sent;
            bcrypt.compare(password, passwordHash.password, function _callee3(err, result) {
              var user, access_token;
              return regeneratorRuntime.async(function _callee3$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      if (result) {
                        user = {
                          displayName: passwordHash.displayName,
                          email: passwordHash.email
                        };
                        access_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                        res.json({
                          email: passwordHash.email,
                          displayName: passwordHash.displayName,
                          accessToken: access_token,
                          avatar: passwordHash.avatar,
                          id: passwordHash._id
                        });
                      } else {
                        res.json({
                          message: "Please check your email or password and try again"
                        });
                      }

                    case 1:
                    case "end":
                      return _context7.stop();
                  }
                }
              });
            });

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    });
  },
  findUser: function findUser(req, res) {
    var findUser;
    return regeneratorRuntime.async(function findUser$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return regeneratorRuntime.awrap(User.find({
              _id: req.params.id
            }, {
              avatar: 1,
              displayName: 1,
              email: 1
            }));

          case 2:
            findUser = _context9.sent;

            if (findUser) {
              res.send(findUser);
            } else {
              res.json({
                message: 'User does not exits'
              });
            }

          case 4:
          case "end":
            return _context9.stop();
        }
      }
    });
  }
};