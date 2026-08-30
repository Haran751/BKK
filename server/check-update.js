const { Application } = require('./models');

(async () => {
  try {
    const item = await Application.findByPk(13);
    console.log('BEFORE', item.status);
    const result = await item.update({ status: 'ditinjau' });
    console.log('AFTER', result.status);
    process.exit(0);
  } catch (e) {
    console.error('MODEL ERROR', e.name, e.message);
    if (e.parent) {
      console.error('PARENT CODE', e.parent.code);
      console.error('SQL MESSAGE', e.parent.sqlMessage);
    }
    process.exit(1);
  }
})();
