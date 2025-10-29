import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await fetch("https://poisonous-cackle-69p5q66955gg35x9w-3001.app.github.dev/", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({email, password})
      });
      if (res.status === 201) {
        navigate("/login");
      } else {
        const data = await res.json();
        setErr(data.message || "Error");
      }
    } catch (error) {
      setErr("Network error");
    }
  };

  return (
    <div style={{padding:20}}>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label><br/>
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        </div>
        <div>
          <label>Password</label><br/>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
        </div>
        <button type="submit">Registrarse</button>
      </form>
      {err && <div style={{color:"red"}}>{err}</div>}
    </div>
  );
}
