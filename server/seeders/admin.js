const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env'), override: true });
const bcrypt = require('bcryptjs');
const { sequelize, Admin } = require('../models');

async function seedAdmin() {
  try {
    await sequelize.authenticate();
    console.log('✔ Koneksi database berhasil.');

    // Ambil dari argumen CLI jika ada, atau dari .env, atau default
    const args = process.argv.slice(2);
    const email = args[0] || process.env.ADMIN_SEED_EMAIL || 'admin.bkk@smkn20jakarta.sch.id';
    const password = args[1] || process.env.ADMIN_SEED_PASSWORD || 'admin123';
    const name = args[2] || process.env.ADMIN_SEED_NAME || 'Administrator BKK';

    const saltRounds = 12;
    const hash = await bcrypt.hash(password, saltRounds);

    let admin = await Admin.findOne({ where: { email } });

    if (admin) {
      await admin.update({ name, password: hash });
      console.log('✔ Akun admin berhasil diperbarui!');
    } else {
      admin = await Admin.create({ name, email, password: hash });
      console.log('✔ Akun admin baru berhasil dibuat!');
    }

    console.log('\n=============================================');
    console.log('       KREDENSIAL LOGIN ADMIN BKK            ');
    console.log('=============================================');
    console.log(`  Nama      : ${name}`);
    console.log(`  Email     : ${email}`);
    console.log(`  Password  : ${password}`);
    console.log('=============================================\n');

    await sequelize.close();
  } catch (error) {
    console.error('✖ Terjadi kesalahan saat seeding admin:', error);
    process.exit(1);
  }
}

seedAdmin();
