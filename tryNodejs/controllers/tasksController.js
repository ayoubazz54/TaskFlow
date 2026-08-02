const {getAllTasks, addTask, deleteTask, changeTask, deleteAllTask} = require("../services/tasksService");


async function getTasks(req, res, next) {
    try {
        const tasks = await getAllTasks();
        res.json(tasks);
    }
    catch(error) {
        next(error);
    };
}

async function postTasks(req, res, next) {
    try {
        const { title } = req.body;
        if (typeof title !== "string" || title.trim() === "") {
            return res.status(400).json({message: "Le titre est obligatoire."});
        }
        const task = await addTask(title);
        res.status(201).json(task);
    }
    catch(error) {
        next(error)
    };
}

async function deleteTasks(req, res, next) {
    try {
        const deleted = await deleteTask(req.params.id);
        if (!deleted) {
            return res.status(404).json({message: "Tache introuvable."});
        }
        res.sendStatus(204);
    } 
    catch(error) {
        next(error)
    };
}

async function putTasks(req, res, next) {
    try{
        if (typeof req.body.completed !== "boolean") {
            return res.status(400).json({message: "completed doit être un booléen."});
        }
        const task = await changeTask(req.params.id, req.body.completed);
        if (!task) {
            return res.status(404).json({message: "Tache introuvable."});
        }
        res.json(task);
    }
    catch(error) {
        next(error);
    };
}

async function deleteAllTasks(req, res, next) {
    try{
        const deleted = await deleteAllTask();
        if (!deleted) {
            return res.status(204).json({message: "Pas de tâches."});
        }
        res.sendStatus(204);
    }
    catch(error) {
        next(error);
    };
}

module.exports = {
    getTasks,
    postTasks,
    deleteTasks,
    putTasks,
    deleteAllTasks
};

