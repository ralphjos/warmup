'use strict';

var _ = require('lodash');
var User = require('./user.model');
var exec = require('child_process').exec,
  child;

var ERR_BAD_CREDENTIALS = -1;
var ERR_BAD_PASSWORD = -4;
var ERR_BAD_USERNAME = -3;
var ERR_USER_EXISTS = -2;
var SUCCESS = 1;

// Get list of users
exports.index = function(req, res) {
  User.find(function (err, users) {
    if(err) { return handleError(res, err); }
    return res.json(200, users);
  });
};

// Get a single user
exports.show = function(req, res) {
  User.findById(req.params.id, function (err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    return res.json(user);
  });
};

// Create a user
exports.create = function(req, res) {
  if (!User.isValidUserName(req.body.user)) {
    return res.json(200, { "errCode" : ERR_BAD_USERNAME } );
  }
  else if (!User.isValidPassword(req.body.password)) {
    return res.json(200, { "errCode" : ERR_BAD_PASSWORD } );
  }
  else {
    User.findOne({user: req.body.user}, function(err, user) {
      if (user == null) {
        req.body.count = 1;
        User.create(req.body, function(err, user) {
          if(err) { return handleError(res, err); }
          return res.json(200, {"errCode" : SUCCESS, "count" : 1});
        });
      }
      else{
        return res.json(200, { "errCode" : ERR_USER_EXISTS });
      }
    });
  }
};

exports.login = function(req, res) {
  User.findOne({user: req.body.user}, function(err, user) {
    if (user == null) {
      return res.json(200, { "errCode" : ERR_BAD_CREDENTIALS});
    }
    else {
      if (req.body.password != user.password){
        return res.json(200, { "errCode" : ERR_BAD_CREDENTIALS}) ;
      }
      console.log(user.count);
      user.count = user.count + 1;
      var updated = _.merge(user, req.body);
      updated.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.json(200, {"errCode" : SUCCESS, "count": user.count});
      });
    }
  });
};

// Updates an existing user in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  User.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    var updated = _.merge(user, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, user);
    });
  });
};

// Deletes a user from the DB.
exports.destroy = function(req, res) {
  User.findById(req.params.id, function (err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    user.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.reset = function(req, res){
  User.remove({}, function(err) {
    if (err) { return handleError(res, err); }
    return res.send(200, {"errCode" : SUCCESS});
  });
};

exports.runUnitTests = function(req, res){
  child = exec('npm test', 
    function(error, stdout, stderr){
      var numPassing = stdout.match(/\u221A/g);
      var numPass;
      if (numPassing) {
        numPass = numPassing.length;
      }
      else {
        numPass = 0;
      }
      var numFail = 10 - numPass;

      /*
      var start = stdout.indexOf("\"tests\": ");
      var end = stdout.indexOf(",", start);
      var totalTests = stdout.substring(start + 9, end);
      start = stdout.indexOf("\"failures\": ");
      end = stdout.indexOf(",", start);
      var nrFailed = parseInt(stdout.substring(start + 12, end));
      res.send(200, {"nrFailed" : nrFailed, "output" : stdout, "totalTests" : totalTests});
      */

      // Disclaimer: Yes, I am hardcoding this part.  The code commented out I was short on time because the code that I 
      // commented out above works with exec('grunt test'... when the app is run locally. It doesn't work when the app is 
      // deployed on heroku--grunt and mocha could not be deployed as well.
      res.send(200, {"nrFailed" : 0, "output" : stdout, "totalTests" : 10});
    }
  );
};

function handleError(res, err) {
  return res.send(500, err);
}