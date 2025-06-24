const postgres = require('postgres');
const DB_CONFIG = {
    PG_HOST: 'localhost',
    PG_PORT: 5432,
    PG_DATABASE: 'postgres',
    PG_APP_DATABASE: 'app_db',
    PG_USER: 'postgres',
    PG_PASSWORD: 'postgres',
};
const createNumbersTable = `
    CREATE TABLE numbers (
        id    SERIAL PRIMARY KEY,
        value INTEGER NOT NULL
    );
`;
const createClassesTable = `
    CREATE TABLE classes (
        id         SERIAL PRIMARY KEY,
        name       VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
`;
const createGradesTable = `
    CREATE TABLE grades (
        id         SERIAL PRIMARY KEY,
        class_id   INTEGER NOT NULL REFERENCES classes (id) ON DELETE CASCADE,
        grade      INTEGER NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
`;
const createAppDB = `CREATE DATABASE ${DB_CONFIG.PG_APP_DATABASE}`;

(async function setupDatabase() {
    try {
        const sql = postgres({
            host: DB_CONFIG.PG_HOST,
            port: DB_CONFIG.PG_PORT,
            database: DB_CONFIG.PG_DATABASE,
            user: DB_CONFIG.PG_USER,
            password: DB_CONFIG.PG_PASSWORD,
        });

        await sql.unsafe(createAppDB);
        await sql.end();

        const dbSql = postgres({
            host: DB_CONFIG.PG_HOST,
            port: DB_CONFIG.PG_PORT,
            database: DB_CONFIG.PG_APP_DATABASE,
            user: DB_CONFIG.PG_USER,
            password: DB_CONFIG.PG_PASSWORD,
        });

        await dbSql.unsafe(createNumbersTable);
        await dbSql.unsafe(createClassesTable);
        await dbSql.unsafe(createGradesTable);

        await dbSql.end();
    } catch (error) {
        console.error('error:', error);
        console.error('Database setup failed');
        process.exit(1);
    }
})();
