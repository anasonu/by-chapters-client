import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context.js";

function Navbar() {
  const { isLoggedIn, user, authenticateUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
  };

  return (
    <div>
      {user !== null && <p>¡Hola, {user.username}!</p>}

      {isLoggedIn ? (
        <nav>
          <NavLink to="/">Home</NavLink>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </nav>
      ) : (
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </nav>
      )}
    </div>
  );
}

export default Navbar;
