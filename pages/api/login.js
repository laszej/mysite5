import { connectToDatabase } from "../../utils/mongodb";
import jwt from "jsonwebtoken";
//import bcrypt from "bcrypt"; // jeżeli hasła są hashowane

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ message: "Uzupełnij login i hasło." });
  }

  try {
    // 1) Połącz z MongoDB
    const { db } = await connectToDatabase();

    // 2) Pobierz dokument użytkownika po podanym username
    const user = await db.collection("admin").findOne({ username });
    if (!user) {
      // brak takiego loginu
      return res.status(401).json({ message: "Nieprawidłowy login lub hasło." });
    }

    // 3) Jeżeli w bazie jest hash hasła (rekomendowane), porównaj za pomocą bcrypt
    //    W przeciwnym razie porównaj po prostu jako string:
    let isMatch;
    if (user.passwordHash) {
      isMatch = await bcrypt.compare(password, user.passwordHash);
    } else {
      isMatch = user.password === password;
    }

    if (!isMatch) {
      return res.status(401).json({ message: "Nieprawidłowy login lub hasło." });
    }

    // 4) Zgadza się login i hasło → generujemy JWT
    const token = jwt.sign(
      { role: "admin", username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // 5) Ustawiamy ciasteczko HttpOnly
    res.setHeader(
      "Set-Cookie",
      `authToken=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${2 * 60 * 60}` +
        (process.env.NODE_ENV === "production" ? "; Secure" : "")
    );
    return res.status(200).json({ message: "Zalogowano pomyślnie." });
  } catch (error) {
    console.error("Błąd w /api/login:", error);
    return res.status(500).json({ message: "Wewnętrzny błąd serwera." });
  }
}
