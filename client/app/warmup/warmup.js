'use strict';

angular.module('warmupApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('warmup', {
        url: '/',
        templateUrl: 'app/warmup/templates/warmup.html',
        controller: 'WarmupCtrl'
      });
  });