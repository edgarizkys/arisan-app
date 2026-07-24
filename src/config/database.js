// Turso Cloud SQLite Database Configuration
const { createClient } = require('@libsql/client');

const dbUrl = process.env.TURSO_DATABASE_URL || 'libsql://edgartech-db-edgarizkys.aws-ap-northeast-1.turso.io';
const dbAuthToken = process.env.TURSO_AUTH_TOKEN || '';

const tursoClient = createClient({
    url: dbUrl,
    authToken: dbAuthToken
});

async function initializeDatabase() {
    try {
        await tursoClient.execute(`
            CREATE TABLE IF NOT EXISTS enterprise_records (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                category TEXT NOT NULL,
                amount REAL NOT NULL,
                status TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✓ Database Migration Executed: enterprise_records schema ready for Arisan');
    } catch (err) {
        console.log('Database notice:', err.message);
    }
}

module.exports = { tursoClient, initializeDatabase };
