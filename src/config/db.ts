import { createPool } from 'mysql';

const pool = createPool({
    host: 'localhost',
    user: 'your-username',
    password: 'your-password',
    database: 'your-database',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;
