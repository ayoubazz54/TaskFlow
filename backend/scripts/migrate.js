const fs = require("fs");
const path = require("path");
const pool = require("../database/db");

async function migrate() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS migrations (
                id SERIAL PRIMARY KEY,
                filename TEXT UNIQUE NOT NULL,
                executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        const migrationsDir = path.join(__dirname, "../migrations");

        const files = fs
            .readdirSync(migrationsDir)
            .filter(file => file.endsWith(".sql"))
            .sort();

        for (const file of files) {
            const result = await pool.query(
                "SELECT 1 FROM migrations WHERE filename = $1",
                [file]
            );

            if (result.rows.length > 0) {
                console.log(`Déjà exécutée : ${file}`);
                continue;
            }

            console.log(`Exécution : ${file}`);

            const sql = fs.readFileSync(
                path.join(migrationsDir, file),
                "utf8"
            );

            await pool.query("BEGIN");

            try {
                await pool.query(sql);

                await pool.query(
                    "INSERT INTO migrations (filename) VALUES ($1)",
                    [file]
                );

                await pool.query("COMMIT");

                console.log(`✓ ${file}`);
            }
            catch (error) {
                await pool.query("ROLLBACK");
                throw error;
            }
        }

        console.log("Migrations terminées.");
    }
    catch (error) {
        console.error("Erreur migration :", error);
        process.exit(1);
    }
    finally {
        await pool.end();
    }
}

migrate();