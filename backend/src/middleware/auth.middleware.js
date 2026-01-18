const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    //ambil headernya dulu, isinya token buat cek apakah udah login
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    //ambil token terus displit biar misahin dengan bearer
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    //try error dengan verifikasi token jwt, simpan user id ke request
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
}

module.exports = auth;