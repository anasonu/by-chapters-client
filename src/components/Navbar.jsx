import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context.js";

function Navbar() {
  const { isLoggedIn, user, authenticateUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
  };

  const activeClass = (navInfo) => {
    return navInfo.isActive ? "active-nav" : "inactive-nav";
  };

  return (
    <div>
      {isLoggedIn ? (
        <nav className="navbar">
          <div className="hover-navbar">
            <NavLink to="/" className={activeClass}>
              Inicio
            </NavLink>
          </div>
          <div className="links-nav-container">
            <div className="dropdown">
              <button className="dropbtn">{user !== null && <p>¡Hola, {user.username}! ▾</p>}</button>
              <div className="dropdown-content">
                <NavLink to="/profile" className="drop-link">Mi perfil</NavLink>
                <button onClick={handleLogout} className="logout-btn">
                  Cerrar sesión
                </button>
                </div>
            </div>
            <NavLink to="/new-book" className={`${activeClass} new-book-btn`}>
              Nuevo libro
            </NavLink>
          </div>
        </nav>
      ) : (
        <nav className="navbar">
          <div className="hover-navbar">
            <NavLink to="/" className={activeClass}>
              Inicio
            </NavLink>
          </div>
          <div className="links-nav-container hover-navbar">
            <NavLink to="/login" className={activeClass}>
              Login
            </NavLink>
            <NavLink to="/signup" className={activeClass}>
              Signup
            </NavLink>
          </div>
        </nav>
      )}
    </div>
  );
}

export default Navbar;
