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