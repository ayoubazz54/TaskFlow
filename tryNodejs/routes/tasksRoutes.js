const express = require("express");
const router = express.Router();
const {getTasks, postTasks, deleteTasks, putTasks} = require("../controllers/tasksController");

router.get("/tasks", getTasks);

router.get("/", getTasks);

router.post("/tasks", postTasks);

router.delete("/tasks/:id", deleteTasks);

router.put("/tasks/:id", putTasks);




module.exports = router;