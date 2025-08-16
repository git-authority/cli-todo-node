const fs = require('fs')
const chalk = require('chalk')
const filePath = "./tasks.json"



const loadTasks = () => {
	try {
		const dataBuffer = fs.readFileSync(filePath)
		const dataJSON = dataBuffer.toString()
		return JSON.parse(dataJSON)
	} catch (error) {
		return []
	}
}



const saveTasks = (tasks) => {
	const dataJSON = JSON.stringify(tasks, null, 2)
	fs.writeFileSync(filePath, dataJSON)
}



const addTask = (task) => {
	const tasks = loadTasks()
	tasks.push({ task })
	saveTasks(tasks)
	console.log(chalk.green.bold('✔ Task Added:'), chalk.green(task));
}



const listTasks = () => {
	const tasks = loadTasks()

	if (tasks.length !== 0) {
		console.log(chalk.blue.bold('\n📋 Your Tasks:\n'))
		tasks.forEach((task, index) => {
			console.log(chalk.yellow(`${index + 1}`), '-', chalk.white(task.task));
		})
	} else {
		console.log(chalk.gray('No Tasks in Hand'));
	}

}



const removeTask = (index) => {
	const tasks = loadTasks();

	const taskToRemove = tasks[index - 1]?.task;

	if (!taskToRemove) {
		console.log(chalk.red('✖ No task found at that number'));
		return tasks;
	}

	tasks.splice(index - 1, 1);

	console.log(chalk.red.bold('✖ Task Removed:'), chalk.red(taskToRemove));

	saveTasks(tasks);

	return tasks;
}





const command = process.argv[2]
const argument = process.argv[3]


if (command === 'add') {
	if (!argument) {
		console.log(chalk.red("✖ Please provide a task description."));
	} else {
		addTask(argument.trim());
	}
}
else if (command === 'list') {
	listTasks()
}
else if (command === 'remove') {
	if (!argument) {
		console.log(chalk.red("✖ Please provide the task number to remove."));
	} else {
		removeTask(parseInt(argument));
	}
}
else {
	console.log(chalk.yellow('⚠ Command not found'));
}
