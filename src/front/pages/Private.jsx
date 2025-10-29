import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PrivatePage(){
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [secret, setSecret] = useState("");
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }
    // validar token en backend
    fetch("https://poisonous-cackle-69p5q66955gg35x9w-3001.app.github.dev/", {
      method: "GET",
      headers: { "Authorization": "Bearer " + token }
    }).then(async (res) => {
      if (!res.ok) {
        sessionStorage.removeItem("token");
        navigate("/login", { replace: true });
        return;
      }
      // opcional: pedir data privada
      const r2 = await fetch("https://poisonous-cackle-69p5q66955gg35x9w-3001.app.github.dev/", {
        headers: { "Authorization": "Bearer " + token }
      });
      if (r2.ok){
        const d = await r2.json();
        setSecret(d.secret);
      }
      setLoading(false);
    }).catch((err) => {
      sessionStorage.removeItem("token");
      navigate("/login", { replace: true });
    });
  }, [navigate]);

  if (loading) return <div style={{padding:20}}>Validando...</div>;
  return (
    <div style={{padding:20}}>
      <h2>Zona privada</h2>
      <p>{secret || "Bienvenido — contenido privado cargado."}</p>
    </div>
  );
}
