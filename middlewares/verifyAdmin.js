import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const verifyAdmin = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(405).json('Access refused: invalid token');
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);  
        if (decoded.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied: admin only' });
        }
        req.user = decoded;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({ error: "Invalid token: incorrect signature" });
        }
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(403).json({ error: "Token expired, please login again" });
        }
        return res.status(500).json({ error: "Error while verifying the token" });
    }
};


export default verifyAdmin;