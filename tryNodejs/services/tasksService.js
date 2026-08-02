const tasks = require("../data/tasks");

function addTask(tasks, title) {
    const task = {
        id: Date.now(),
        title: title,
        completed: false
    };
    tasks.push(task);
    return task;
}

function deleteTask(tasks, ID) {
    const id = Number(ID);
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1){
        tasks.splice(index, -1);
    }
}

function changeTask(tasks, ID, bool) {
    const id = Number(ID);
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = bool;
    }
    return task;
}

module.exports = {
    addTask,
    deleteTask,
    changeTask
};