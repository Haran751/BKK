require('dotenv').config({ path: require('path').resolve(__dirname, '.env'), override: true });
const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.MYSQL_HOST || '127.0.0.1',
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'job_portal',
  multipleStatements: true
};

const hasColumn = async (connection, table, column) => {
  const [rows] = await connection.execute(
    'SELECT COUNT(*) AS count FROM information_schema.columns WHERE table_schema = ? AND table_name = ? AND column_name = ?',
    [dbConfig.database, table, column]
  );
  return Number(rows[0].count) > 0;
};

const ensureColumn = async (connection, table, column, definition, after = null) => {
  if (await hasColumn(connection, table, column)) return;
  const alter = after
    ? `ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${definition} AFTER \`${after}\`;`
    : `ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${definition};`;
  await connection.execute(alter);
  console.log(`Added column ${table}.${column}`);
};

const normalizeJobStatusEnum = async (connection) => {
  const [columns] = await connection.execute("SHOW COLUMNS FROM `jobs` LIKE 'status';");
  const columnType = columns[0]?.Type || '';

  if (!columnType.toLowerCase().includes('enum')) {
    return;
  }

  await connection.execute("ALTER TABLE `jobs` MODIFY `status` VARCHAR(20) NOT NULL DEFAULT 'draft';");
  await connection.execute("UPDATE `jobs` SET `status` = CASE `status` WHEN 'active' THEN 'published' WHEN 'closed' THEN 'closed' WHEN 'draft' THEN 'draft' ELSE 'draft' END;");
  await connection.execute("ALTER TABLE `jobs` MODIFY `status` ENUM('draft','published','closed') NOT NULL DEFAULT 'draft';");
  console.log('Normalized jobs.status values to enum(draft,published,closed)');
};

const normalizeApplicationStatusEnum = async (connection) => {
  const [columns] = await connection.execute("SHOW COLUMNS FROM `applications` LIKE 'status';");
  const columnType = columns[0]?.Type || '';

  if (!columnType.toLowerCase().includes('enum')) {
    return;
  }

  await connection.execute("ALTER TABLE `applications` MODIFY `status` VARCHAR(30) NOT NULL DEFAULT 'baru';");
  await connection.execute("UPDATE `applications` SET `status` = CASE `status` WHEN 'pending' THEN 'baru' WHEN 'reviewed' THEN 'ditinjau' WHEN 'accepted' THEN 'diterima' WHEN 'rejected' THEN 'tidak_lolos' WHEN 'baru' THEN 'baru' WHEN 'ditinjau' THEN 'ditinjau' WHEN 'lolos' THEN 'lolos' WHEN 'tidak_lolos' THEN 'tidak_lolos' WHEN 'diterima' THEN 'diterima' ELSE 'baru' END;");
  await connection.execute("ALTER TABLE `applications` MODIFY `status` ENUM('baru','ditinjau','lolos','tidak_lolos','diterima') NOT NULL DEFAULT 'baru';");
  console.log('Normalized applications.status values to enum(baru,ditinjau,lolos,tidak_lolos,diterima)');
};

const ensureColumnsForJobs = async (connection) => {
  await ensureColumn(connection, 'jobs', 'job_type', "VARCHAR(80) NOT NULL DEFAULT 'Full Time'", 'location');
  await ensureColumn(connection, 'jobs', 'requirements', 'TEXT NULL', 'description');
  await ensureColumn(connection, 'jobs', 'skills', 'TEXT NULL', 'requirements');
  await ensureColumn(connection, 'jobs', 'education', 'VARCHAR(180) NULL', 'skills');
  await ensureColumn(connection, 'jobs', 'salary', 'VARCHAR(255) NULL', 'education');

  await normalizeJobStatusEnum(connection);

  if (await hasColumn(connection, 'jobs', 'employment_type')) {
    await connection.execute('ALTER TABLE `jobs` DROP COLUMN `employment_type`;');
  }
  if (await hasColumn(connection, 'jobs', 'salary_min')) {
    await connection.execute('ALTER TABLE `jobs` DROP COLUMN `salary_min`;');
  }
  if (await hasColumn(connection, 'jobs', 'salary_max')) {
    await connection.execute('ALTER TABLE `jobs` DROP COLUMN `salary_max`;');
  }
};

(async () => {
  const connection = await mysql.createConnection(dbConfig);

  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await connection.query(`USE \`${dbConfig.database}\`;`);

    await ensureColumn(connection, 'companies', 'industry', 'VARCHAR(120) NULL', 'address');
    await ensureColumn(connection, 'companies', 'status', "ENUM('active','inactive') NOT NULL DEFAULT 'active'", 'industry');
    await connection.execute("ALTER TABLE `companies` MODIFY `status` ENUM('active','inactive') NOT NULL DEFAULT 'active';");

    await ensureColumn(connection, 'galleries', 'category', 'VARCHAR(120) NULL', 'description');
    if (await hasColumn(connection, 'galleries', 'status')) {
      await connection.execute("ALTER TABLE `galleries` MODIFY `status` ENUM('draft','published') NOT NULL DEFAULT 'draft';");
    }

    await ensureColumn(connection, 'articles', 'status', "ENUM('draft','published') NOT NULL DEFAULT 'draft'", 'author');
    await ensureColumn(connection, 'articles', 'category', 'VARCHAR(120) NULL', 'content');
    await connection.execute("ALTER TABLE `articles` MODIFY `status` ENUM('draft','published') NOT NULL DEFAULT 'draft';");

    await ensureColumnsForJobs(connection);
    await normalizeApplicationStatusEnum(connection);

    console.log('Database migration completed successfully.');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await connection.end();
  }
})();
