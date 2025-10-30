import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PrivatePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [secret, setSecret] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    fetch("https://poisonous-cackle-69p5q66955gg35x9w-3001.app.github.dev/private", {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    })
      .then(async (res) => {
        if (!res.ok) {
          sessionStorage.removeItem("token");
          navigate("/login", { replace: true });
          return;
        }
        const data = await res.json();
        setSecret(data.msg || "Bienvenido — acceso privado confirmado.");
        setLoading(false);
      })
      .catch(() => {
        sessionStorage.removeItem("token");
        navigate("/login", { replace: true });
      });
  }, [navigate]);

  if (loading) return <div style={{ padding: 20 }}>Validando...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Zona privada</h2>
      <p>{secret}</p>
      <button
        onClick={() => {
          sessionStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}