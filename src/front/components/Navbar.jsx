import React from "react";
import { useNavigate  } from "react-router-dom";

export default function Navbar(){
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login", { replace: true });
  };
  const token = sessionStorage.getItem("token");
  return (
    <nav style={{padding:10, borderBottom:"1px solid #ddd"}}>
      <a href="/signup" style={{marginRight:10}}>Registrarse</a>
      <a href="/login" style={{marginRight:10}}>Logearse</a>
      {token && <button onClick={handleLogout}>Cerrar sesión</button>}
    </nav>
  );
}