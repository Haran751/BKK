const multer = require('multer');

function errorMiddleware(error, req, res, next) {
  console.error('GLOBAL ERROR:', error);

  if (error instanceof multer.MulterError) {
    console.error('MULTER ERROR:', error);
    console.error('MULTER FIELD:', error.field);
    return res.status(400).json({
      success: false,
      message: error.message,
      field: error.field
    });
  }

  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(422).json({ success: false, message: 'Ukuran file melebihi batas 5 MB.' });
  }

  if (error.name === 'SequelizeValidationError') {
    return res.status(422).json({
      success: false,
      message: 'Data tidak valid.',
      errors: error.errors.map((item) => ({ field: item.path, message: item.message }))
    });
  }

  if (error.name === 'SequelizeUniqueConstraintError' || error.parent?.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ success: false, message: 'Slug lowongan sudah digunakan.' });
  }

  if (error.name === 'SequelizeForeignKeyConstraintError' || error.parent?.code === 'ER_NO_REFERENCED_ROW_2') {
    return res.status(404).json({ success: false, message: 'Perusahaan tidak ditemukan.' });
  }

  if (error.parent?.code === 'ER_DATA_TOO_LONG') {
    return res.status(422).json({ success: false, message: `Data terlalu panjang untuk kolom ${error.parent.sqlMessage?.match(/column '([^']+)'/)?.[1] || 'tertentu'}.` });
  }

  if (error.parent?.code === 'ER_TRUNCATED_WRONG_VALUE' || error.parent?.code === 'WARN_DATA_TRUNCATED') {
    return res.status(422).json({ success: false, message: 'Format data tidak valid. Periksa tanggal dan pilihan status.' });
  }

  const message = process.env.NODE_ENV === 'development' ? error.message : 'Terjadi kesalahan pada server.';
  return res.status(error.status || 500).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && error?.stack ? { stack: error.stack } : {})
  });
}
module.exports = errorMiddleware;
