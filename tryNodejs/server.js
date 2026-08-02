const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let tasks = [
        {
            id: 1,
            title: "Apprendre C",
            completed: true
        },
        {
            id: 2,
            title: "Apprendre SQL",
            completed: false
        }
    ];

app.get("/", (req, res) => {
    res.send("Accueil")
});

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    const newTask = {
        id: Date.now(),
        title: req.body.title,
        completed: false
    };
    tasks.push(newTask);
    res.json(newTask);
});

app.delete("/tasks/:id", (req,res)=>{
    const id = Number(req.params.id);
    tasks = tasks.filter(task => task.id !== id);

    res.json({
        message:"Tâche supprimée"
    });
});

app.put("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(task => task.id === id);
    task.completed = req.body.completed;

    res.json(task);

});

/*
app.get("/about", (req, res) => {
    res.send("A propos")
});

app.get("/contact", (req, res) => {
    res.send("Contact")
});



app.get('/users', (req, res) => {
    res.json([{
        "id": 1,
        "name": "Ayoub"
    },
    {
        "id": 2,
        "name": "Alice"
    }]);
}) */

app.listen(3000, () => {
    console.log("Serveur lancé.");
});
