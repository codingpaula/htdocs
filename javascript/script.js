
	
	var taskCount = 0;
	var Task = function(name, due, stars, project){
		this.taskName = name;
		this.dueDate = due;
		this.importance = stars;
		this.project = project || "Sonstiges";
		this.finished = false;
		taskCount++;
	};

	Task.prototype = {
		completeTask: function(){
			this.finished = true;
		}
	};
	
