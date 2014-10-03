'use strict';

describe('Controller: WarmupCtrl', function () {

  // load the controller's module
  beforeEach(module('warmupApp'));

  var WarmupCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WarmupCtrl = $controller('WarmupCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
