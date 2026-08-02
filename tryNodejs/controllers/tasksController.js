const {addTask, deleteTask, changeTask} = require("../services/tasksService");
const tasks = require("../data/tasks");


function getTasks(req, res) {
    res.json(tasks);
}

function postTasks(req, res, next) {
    try {
        const { title } = req.body;
        if (typeof title !== "string" || title.trim() === "") {
            return res.status(400).json({message: "Le titre est obligatoire."});
        }
        const task = addTask(tasks, title);
        res.status(201).json(task);
    }
    catch(error) {
        next(error)
    };
}

function deleteTasks(req,res) {
    const deleted = deleteTask(tasks, req.params.id);
    if (!deleted) {
        return res.status(404).json({message: "Tache introuvable."});
    }
    res.sendStatus(204);
}

function putTasks(req, res) {
    if (typeof req.body.completed !== "boolean") {
        return res.status(400).json({message: "completed doit être un booléen."});
    }
    const task = changeTask(tasks, req.params.id, req.body.completed);
    if (task === undefined) {
        return res.status(404).json({message: "Tache introuvable."});
    }
    res.json(task);

}


module.exports = {
    getTasks,
    postTasks,
    deleteTasks,
    putTasks
};

