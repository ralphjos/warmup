'use strict';

angular.module('warmupApp')
  .factory('warmupService', function ($http) {
    // Service logic
    // ...
    var service = {};
    service.allUsers = [];
    service.currUser = {};
    service.response = {};
    // Public API here
    /*
    service.getAllUsers = function() {
      return $http.get('/users')
        .sucess(function (users) {
          service.allUsers = users;
          return users;
        })
    };*/

    service.createUser = function (userObj, callback) {
      return $http.post('/users/add', userObj)
        .success(function (data) {
          console.log(data);
          service.response = data;
          callback();
        });
    };

    service.login = function (userObj, callback) {
      return $http.post('/users/login', userObj)
        .success(function (data) {
          console.log(data);
          service.response = data;
          service.currUser = userObj.user;
          callback();
        });
    };

    /*
    service.login = function (userObj, callback) {
      return $http.post('/users/add', userObj)
        .success(function (data) {
        
    };*/
    return service;
  });


