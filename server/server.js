require('dotenv').config({ path: require('path').resolve(__dirname, '.env'), override: true });
const app = require('./app');
const sequelize = require('./config/database');
const port = Number(process.env.PORT || 5000);

sequelize.authenticate()
  .then(() => {
    app.listen(port, () => console.log(`BKK API running on http://localhost:${port}`));
  })
  .catch((error) => {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  });
