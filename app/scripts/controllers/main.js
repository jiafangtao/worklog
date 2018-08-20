'use strict';

angular.module('worklogApp')
  .controller('MainController', ['$scope', function ($scope) {
  	
	  $scope.text = "bingo!";
	  $scope.newTaskText = "";

    $scope.tasks = {
    	
    	planned: [
	    	{
	    		id: 1,
	    		title: "task 1"
	    	},
	    	{
	    		id: 2,
	    		title: "task 2"
	    	},
	    	{
	    		id: 3,
	    		title: "task 3 has a long name"
	    	}
    	],
    	done: [
    		{
	    		id: 100,
	    		title: "I have done this."
	    	},
	    	{
	    		id: 101,
	    		title: "I have done that."
	    	},
	    	{
	    		id: 102,
	    		title: "I have done another one, with a long name"
	    	}
    	]
	};
	
	$scope.createNewTask = function () {
		console.info ("Creating a new task ...");
		if (this.newTaskText) {
			var id = this.tasks.planned[this.tasks.planned.length - 1].id + 1;
			//var timestamp = '';
			var title = this.newTaskText;

			this.tasks.planned.push({id: id, title: title});
		}
	};
  }]);
