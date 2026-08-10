const pool = require("../database/db");

async function getUserById(id) {
    const res = await pool.query(
        `
        SELECT id, email
        FROM users
        WHERE id = $1
        `,
        [id]
    );
    return res.rows[0];
}

module.exports = {
    getUserById
};