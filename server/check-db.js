const mysql = require('mysql2/promise');

(async () => {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'job_portal'
  });

  const [cols] = await conn.execute("SHOW COLUMNS FROM `applications` LIKE 'status';");
  console.log('STATUS TYPE:', cols[0]?.Type || 'NOT_FOUND');

  const [rows] = await conn.execute('SELECT id, name, nisn, email, status, job_id FROM applications ORDER BY id DESC LIMIT 10');
  console.log('ROWS:', JSON.stringify(rows, null, 2));

  await conn.end();
})();
