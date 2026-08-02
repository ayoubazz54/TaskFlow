const pool = require("../database/db");

async function getAllTasks() {
    const result = await pool.query(
        "SELECT * FROM tasks"
    );
    return result.rows;
}

async function addTask(title) {
    const result = await pool.query(
        `
        INSERT INTO tasks (title)
        VALUES ($1)
        RETURNING *
        `,
        [title]
    );
    return result.rows[0];
}

async function deleteTask(ID) {
    const result = await pool.query(
        `
        DELETE FROM tasks
        WHERE id = $1
        RETURNING *
        `,
        [Number(ID)]
    );
    return result.rows.length > 0;

}

async function changeTask(ID, completed) {
    const result = await pool.query(
        `
        UPDATE tasks
        SET completed = $1
        WHERE id = $2
        RETURNING *
        `,
        [completed, Number(ID)]
    );
    return result.rows[0];
}

module.exports = {
    getAllTasks,
    addTask,
    deleteTask,
    changeTask
};