import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [username, setUsername] = useState(""); // od razu puste
  const [password, setPassword] = useState(""); // od razu puste
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    // Wysyłamy to, co użytkownik wpisał,
    // NIE pobieramy wcześniej danych z API.
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // bez tego cookie się nie zapisze
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      // Po poprawnym zalogowaniu można przekierować gdzie chcesz:
      router.replace("/");
    
    } else {
      const data = await res.json();
      setMsg(data.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 400,
        margin: "2rem auto",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <input
        type="text"
        placeholder="Użytkownik"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="off"
        required
      />
      <input
        type="password"
        placeholder="Hasło"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="new-password"
        required
      />
      <button type="submit">Zaloguj</button>
      {msg && <p style={{ color: "red" }}>{msg}</p>}
    </form>
  );
}
