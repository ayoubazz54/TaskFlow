const pool = require("../database/db");

async function getAllTasks(userId) {
    const result = await pool.query(
        `
        SELECT * FROM tasks
        WHERE user_id = $1
        ORDER BY id ASC
        `,
        [userId]
    );
    return result.rows;
}

async function addTask(title, userId) {
    const result = await pool.query(
        `
        INSERT INTO tasks (title, user_id)
        VALUES ($1, $2)
        RETURNING *
        `,
        [title, userId]
    );
    return result.rows[0];
}

async function deleteTask(ID, userId) {
    const result = await pool.query(
        `
        DELETE FROM tasks
        WHERE id = $1 AND user_id = $2
        RETURNING *
        `,
        [Number(ID), userId]
    );
    return result.rows.length > 0;

}

async function changeTask(ID, completed, userId) {
    const result = await pool.query(
        `
        UPDATE tasks
        SET completed = $1
        WHERE id = $2 AND user_id = $3
        RETURNING *
        `,
        [completed, Number(ID), userId]
    );
    return result.rows[0];
}

async function deleteAllTask(userId) {
    const result = await pool.query(
        `
        DELETE FROM tasks
        WHERE user_id = $1
        RETURNING *
        `,
        [userId]
    );
    return result.rows.length > 0;
}

module.exports = {
    getAllTasks,
    addTask,
    deleteTask,
    changeTask,
    deleteAllTask
};