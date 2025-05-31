

// pages/api/auth/check.js
import { verifyToken } from "../../../utils/auth";


export default function handler(req, res) {
  try {
    const decoded = verifyToken(req);
    return res.status(200).json({ isAuthenticated: !!decoded });
  } catch (error) {
    console.error("Błąd w /api/auth/check:", error);
    return res.status(500).json({ message: "Wewnętrzny błąd serwera." });
  }
}
