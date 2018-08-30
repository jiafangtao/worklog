'use strict';

angular.module('worklogApp')
  .controller('GlobalController', ['$scope', '$rootScope', function ($scope, $rootScope) {
      $scope.keyUp = function (evt) {
          console.log ("[global] key up");
          $rootScope.$broadcast('keyUp', {event: evt});
      };

      $scope.keyDown = function (evt) {
          console.log('[global] key down');
          $rootScope.$broadcast('keyDown', {event: evt});
      };
  }]
);
