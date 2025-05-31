import { useState } from "react";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      onLogin();
    } else {
      alert("Błędny login lub hasło");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
      <input
        type="text"
        placeholder="Login"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="form-control my-2"
      />
      <input
        type="password"
        placeholder="Hasło"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form-control my-2"
      />
      <button className="btn btn-primary w-100">Zaloguj</button>
    </form>
  );
}