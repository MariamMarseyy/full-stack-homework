const insertClasses = `
    INSERT INTO classes (name)
    VALUES 
        ('Math'),
        ('Science'),
        ('History')
    ON CONFLICT (name) DO NOTHING;
`;

(async function seedClasses() {
  try {
    const dbSql = postgres({
      host: DB_CONFIG.PG_HOST,
      port: DB_CONFIG.PG_PORT,
      database: DB_CONFIG.PG_APP_DATABASE,
      user: DB_CONFIG.PG_USER,
      password: DB_CONFIG.PG_PASSWORD,
    });

    await dbSql.unsafe(insertClasses);

    await dbSql.end();
  } catch (error) {
    console.error("error:", error);
    console.error("Database seed fail failed");
    process.exit(1);
  }
})();

(async function setupDatabase() {
    try {
        const dbSql = postgres({
            host: DB_CONFIG.PG_HOST,
            port: DB_CONFIG.PG_PORT,
            database: DB_CONFIG.PG_APP_DATABASE,
            user: DB_CONFIG.PG_USER,
            password: DB_CONFIG.PG_PASSWORD,
        });

        await dbSql.unsafe(insertClasses);

        await dbSql.end();
    } catch (error) {
        console.error('error:', error);
        console.error('Database seed fail failed');
        process.exit(1);
    }
})();
