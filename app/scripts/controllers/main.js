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
				sekected: false
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
		if (this.newTaskText) {
			var id = this.tasks.planned[this.tasks.planned.length - 1].id + 1;
			//var timestamp = '';
			var title = this.newTaskText;

			this.tasks.planned.push({id: id, title: title});
		}
	};

	//TODO: rewrite this ugly code with underscore or alike
	$scope.toggleSelect = function (tid) {
		var idx = 0;
		while (idx < this.tasks.planned.length) {
			if (tid === this.tasks.planned[idx].id) {
				this.tasks.planned[idx].selected = !this.tasks.planned[idx].selected;
				break;
			}

			idx++;
		}

		if (idx === this.tasks.planned.length) {
			idx = 0;
			while (idx < this.tasks.done.length) {
				if (tid === this.tasks.done[idx].id) {
					this.tasks.done[idx].selected = !this.tasks.done[idx].selected;
					break;
				}

				idx++;
			}
		}

		if (idx === this.tasks.done.length) {
			console.warn ('No task was found with id - ' + tid);
		}
	};

	$scope.handleKeys = function (event) {
		console.log ('event code: ' + event.keyCode);
	};
  }]);
