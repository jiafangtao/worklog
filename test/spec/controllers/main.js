'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('worklogApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should have no text yet for new task', function () {
    expect(scope.newTaskText.length).toBe(0);
  });
});
