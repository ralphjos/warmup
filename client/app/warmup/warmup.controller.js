'use strict';

angular.module('warmupApp')
  .controller('WarmupCtrl', function ($scope, warmupService, $location) {
  	$scope.warmupService = warmupService;
  	//warmupService.getAllUsers();

    $scope.credentials = { user: '' , password: ''};
    $scope.message = "";
    $scope.response = {};
    $scope.error = false;
    $scope.loggedIn = false;

    var updateMessage = function(){
    	var errCode = $scope.warmupService.response.errCode;
    	console.log("errCode: " + errCode);
    	if (errCode == 1) {
    		$scope.message = "User successfully added.  Please log in.";
    	}
    	else if (errCode == -1){
    		$scope.message = "Incorrect username/password.";
    	}
    	else if (errCode == -2){
    		$scope.message = "User already exists.";
    	}
    	else if (errCode == -3){
    		$scope.message = "Username too long or not specified.";
    	}
    	else if (errCode == -4){
    		$scope.message = "Password too long.";
    	}
    	else{
    		$scope.message = "omg wtf did you do oh noooo";
    	}
    }

    $scope.addUser = function() {
    	warmupService.createUser($scope.credentials, function() {
    	$scope.credentials = { user: '', password: ''};
    	updateMessage();
    	});
    }

    $scope.login = function() {
    	warmupService.login($scope.credentials, function(){
    	if ($scope.warmupService.response.errCode == 1){
    		$scope.loggedIn = true;
    		$scope.response = $scope.warmupService.response;
    	}
    	else{
    		$scope.loggedIn = false;
    	}
    	updateMessage();
    	console.log($scope.error);
        });
    }

    $scope.logout = function(){
    	$scope.loggedIn = false;
    	$scope.credentials = { user: '', password: ''};
    	$scope.message = "";
    }
  });
