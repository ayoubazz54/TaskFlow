const express = require("express");
const cors = require("cors");
const tasksRoutes = require("./routes/tasksRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(tasksRoutes);
app.use(authRoutes);

const errorMiddleware = require("./middlewares/errorMiddleware");
app.use(errorMiddleware);


app.listen(3000, () => {
    console.log("Serveur lancé.");
});