'use strict';

describe('Service: warmupService', function () {

  // load the service's module
  beforeEach(module('warmupApp'));

  // instantiate service
  var warmupService;
  beforeEach(inject(function (_warmupService_) {
    warmupService = _warmupService_;
  }));

  it('should do something', function () {
    expect(!!warmupService).toBe(true);
  });

});
