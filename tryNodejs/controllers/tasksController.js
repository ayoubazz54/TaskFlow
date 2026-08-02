const {addTask, deleteTask, changeTask} = require("../services/tasksService");
const tasks = require("../data/tasks");


function getTasks(req, res) {
    res.json(tasks);
}

function postTasks(req, res) {
    let task = addTask(tasks, req.body.title);
    res.status(201).json(task);
}

function deleteTasks(req,res) {
    deleteTask(tasks, req.params.id);
    res.sendStatus(204);
}

function putTasks(req, res) {
    let task = changeTask(tasks, req.params.id, req.body.completed);
    res.json(task);

}


module.exports = {
    getTasks,
    postTasks,
    deleteTasks,
    putTasks
};

