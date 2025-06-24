import postgres from "postgres";

const DB_CONFIG = {
  PG_HOST: "localhost",
  PG_PORT: 5432,
  PG_DATABASE: "postgres",
  PG_APP_DATABASE: "app_db",
  PG_USER: "postgres",
  PG_PASSWORD: "postgres",
};

const dbConnection = postgres({
  host: DB_CONFIG.PG_HOST,
  port: DB_CONFIG.PG_PORT,
  database: DB_CONFIG.PG_APP_DATABASE,
  user: DB_CONFIG.PG_USER,
  password: DB_CONFIG.PG_PASSWORD,
});

export default dbConnection;
