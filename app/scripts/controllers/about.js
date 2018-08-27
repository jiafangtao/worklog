'use strict';

/**
 * @ngdoc function
 * @name worklogApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the worklogApp
 */
angular.module('worklogApp')
  .controller('AboutController', ['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.contact = {
      developer: 'Bruce Jia',
      email: 'jiafangtao@gmail.com',
      twitter: '@jiafangtao'
    };
  }]);
