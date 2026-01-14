import jwt, {} from "jsonwebtoken";
export async function authMiddleware(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(400).json({
            "success": false,
            "error": "Invalid token"
        });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
        req.id = decoded.id;
        console.log("auth successful");
        next();
    }
    else {
        return res.status(400).json({
            "success": false,
            "error": "Auth failed"
        });
    }
}
//# sourceMappingURL=auth.js.map