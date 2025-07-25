import jwt from 'jsonwebtoken';

 const JWT_SECRET = process.env.JWT_SECRET;

 
const verifyUser = async (req, res, next) => {
  
  const token = req.headers.authorization?.split(' ')[1];
 

  if (!token) {
    return res.status(401).json({ error: "Access refused: no token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    //console.log("Données du token décodé:", decoded);

    const { id, role } = decoded;

    if (!id || !role) {
      return res.status(401).json({ error: "Invalid token: missing user ID or role" });
    }

    // Inject id and role into req.user
    req.user = { id, role };
    console.log("Utilisateur injecté dans req.user:", req.user);

    next(); 

  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(403).json({ error: "Token expired" });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ error: "Invalid token" });
    }

    return res.status(500).json({ error: "Internal server error during token verification" });
  }
};

export default verifyUser;

