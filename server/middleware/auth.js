const jwt = require('jsonwebtoken');
const { Admin } = require('../models');

async function authMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ success: false, message: 'Token autentikasi diperlukan.' });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findByPk(payload.sub, { attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'] });
    if (!admin) return res.status(401).json({ success: false, message: 'Sesi admin tidak valid.' });
    req.admin = admin;
    next();
  } catch (error) { return res.status(401).json({ success: false, message: 'Token tidak valid atau sudah kedaluwarsa.' }); }
}
module.exports = authMiddleware;
