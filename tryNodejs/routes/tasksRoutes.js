const express = require("express");
const router = express.Router();
const {getTasks, postTasks, deleteTasks, putTasks, deleteAllTasks} = require("../controllers/tasksController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/tasks", authMiddleware, getTasks);

router.get("/", authMiddleware, getTasks);

router.post("/tasks", authMiddleware, postTasks);

router.delete("/tasks", authMiddleware, deleteAllTasks);

router.delete("/tasks/:id", authMiddleware, deleteTasks);

router.put("/tasks/:id", authMiddleware, putTasks);


module.exports = router;