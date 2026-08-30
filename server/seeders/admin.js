require('dotenv').config();
const bcrypt = require('bcryptjs');
const { sequelize, Admin } = require('../models');

(async () => {
  await sequelize.authenticate();
  const email = process.env.ADMIN_SEED_EMAIL || 'admin@example.com';
  const name = process.env.ADMIN_SEED_NAME || 'Administrator';
  const password = process.env.ADMIN_SEED_PASSWORD || 'ChangeMe123!';
  const hash = await bcrypt.hash(password, 12);

  const existing = await Admin.findOne({ where: { email } });
  if (existing) {
    await existing.update({ name, password: hash });
    console.log(`Admin user updated: ${email}`);
  } else {
    await Admin.create({ name, email, password: hash });
    console.log(`Admin user created: ${email}`);
  }

  console.log('Admin seeded. Set ADMIN_SEED_PASSWORD in .env for a custom password.');
  await sequelize.close();
})().catch((error) => { console.error(error); process.exit(1); });
