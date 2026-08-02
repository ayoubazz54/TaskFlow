const express = require("express");
const cors = require("cors");
const tasksRoutes = require("./routes/tasksRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(tasksRoutes);


app.listen(3000, () => {
    console.log("Serveur lancé.");
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
