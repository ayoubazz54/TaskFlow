require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const tasksRoutes = require("./routes/tasksRoutes");
const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/usersRoutes");


app.use(cors());
app.use(express.json());
app.use(tasksRoutes);
app.use(authRoutes);
app.use(usersRoutes);

const errorMiddleware = require("./middlewares/errorMiddleware");
app.use(errorMiddleware);


app.listen(3000, () => {
    console.log("Serveur lancé.");
});