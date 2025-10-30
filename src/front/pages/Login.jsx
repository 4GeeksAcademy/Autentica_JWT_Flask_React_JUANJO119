import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await fetch(
        "https://poisonous-cackle-69p5q66955gg35x9w-3001.app.github.dev/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (res.ok && data.token) {
        sessionStorage.setItem("token", data.token);
        navigate("/private");
      } else {
        setErr(data.msg || "Credenciales incorrectas");
      }
    } catch {
      setErr("Error de red");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Inicia sesión</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Inicia sesión</button>
      </form>
      {err && <div style={{ color: "red" }}>{err}</div>}
    </div>
  );
}