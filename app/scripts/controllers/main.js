'use strict';

angular.module('worklogApp')
  .controller('MainController', ['$scope', function ($scope) {
  	
	  $scope.newTaskText = '';

    $scope.tasks = {
    	
    	planned: [
	    	{
	    		id: 1,
				title: 'task 1',
				selected: false
	    	},
	    	{
	    		id: 2,
				title: 'task 2',
				selected: false
	    	},
	    	{
	    		id: 3,
				title: 'task 3 has a long name',
				selected: false
	    	}
    	],
    	done: [
    		{
	    		id: 100,
				title: 'I have done this.',
				selected: false
	    	},
	    	{
	    		id: 101,
				title: 'I have done that.',
				selected: false
	    	},
	    	{
	    		id: 102,
				title: '"I have done another one, with a long name',
				selected: false
	    	}
    	]
	};
	
	$scope.createNewTask = function () {
		console.info ('Creating a new task ...');
		if ($scope.newTaskText) {
			//TODO: fix the bug here - it doesn't work if there are no planned tasks
			var id = $scope.tasks.planned[$scope.tasks.planned.length - 1].id + 1;
			//var timestamp = '';
			var title = $scope.newTaskText;

			$scope.tasks.planned.push({id: id, title: title});
		}
	};

	$scope.toggleSelect = function (tid) {

		$scope.tasks.planned.forEach (function(task) {
			if (task.id === tid) {
				task.selected = !task.selected;
			}
		});

		$scope.tasks.done.forEach(function(task) {
			if (task.id === tid) {
				task.selected = !task.selected;
			}
		});
	};

	$scope.$on('keyUp', function (event, args) {
		console.log ('event args:' + args.event.keyCode);
		if (args.event.keyCode === 68) {
			// 'd' is pressed
			console.log('"d" is pressed');
			$scope.deleteSelectedTasks();
		}
	});

	$scope.deleteSelectedTasks = function () {

		var removeTask = function (tasks, match) {
			for (var i = tasks.length; i>=0; i--) {
				var task = tasks[i];
				if (task && match(task)) {
					console.log('Going to remove task - ' + task.title + '(' + task.id + ')');
					tasks.splice(i, 1);
				}
			}
		};

		[$scope.tasks.planned, $scope.tasks.done].forEach(function(tasks) {
			removeTask (tasks, function(task) { return task.selected === true; });
		});
	};
  }]);
