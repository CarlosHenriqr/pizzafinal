import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [clienteNome, setClienteNome] = useState("");
  const [clienteEmail, setClienteEmail] = useState("");

  useEffect(() => {
    setClienteNome(localStorage.getItem("clienteNome") || "");
    setClienteEmail(localStorage.getItem("clienteEmail") || "");
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem("clienteId");
    localStorage.removeItem("clienteNome");
    localStorage.removeItem("clienteEmail");
    setClienteNome("");
    setClienteEmail("");
    navigate("/login-cliente");
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/">🍕 Pizza Ria</Link>
        </div>
        
        <button className="navbar-toggler" onClick={toggleMenu}>
          ☰
        </button>
        
        <div className={`navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          <div className="nav-menu">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/pizzas" 
              className={`nav-link ${isActive('/pizzas') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Cardápio
            </Link>
            <Link 
              to="/carrinho" 
              className={`nav-link cart-link ${isActive('/carrinho') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              🛒 Carrinho
              <span className=""></span>
            </Link>
            <Link 
              to="/pedidos" 
              className={`nav-link ${isActive('/pedidos') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Meus Pedidos
            </Link>
            {clienteEmail === "admin@email.com" && (
              <Link 
                to="/admin" 
                className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            {clienteNome ? (
              <>
                <span className="nav-link" style={{ color: '#fff', fontWeight: 600 }}>
                  Olá, {clienteNome.split(" ")[0]}
                </span>
                <button className="logout-btn" onClick={handleLogout}>
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/login-cliente" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  Entrar
                </Link>
                <Link to="/cadastro-cliente" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
