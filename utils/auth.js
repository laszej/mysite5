// utils/auth.js
import jwt from "jsonwebtoken";

export function verifyToken(req) {
  try {
    // W API Routes Next.js `req.cookies` jest już sparsowane
    const token = req.cookies?.authToken;
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("Błąd weryfikacji tokena:", error.message);
    return null;
  }
}
