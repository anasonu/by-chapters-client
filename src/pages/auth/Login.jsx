import React, { useState, useContext } from "react";
import { loginService } from "../../services/auth.services";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context.js";

function Login() {
  const { authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleLogin = async (event) => {
    event.preventDefault();

    const user = {
      email,
      password,
    };

    try {
      const response = await loginService(user);
      localStorage.setItem("authToken", response.data.authToken);
      authenticateUser()
      navigate("/");

    } catch (error) {
      const { status, data } = error.response;

      if(status === 400 || status === 401) {
        setErrorMessage(data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div className="auth-div">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        {/* <label htmlFor="email">Email: </label> */}
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          className="input-text"
          placeholder="Correo Electrónico"
        />
        <br />
        <br />
        {/* <label htmlFor="password">Password: </label> */}
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          className="input-text"
          placeholder="Contraseña"
        />
        <br />
        <br />
        {errorMessage !== null && <p>{errorMessage}</p>}
        <button className="new-book-btn auth">Login</button>
      </form>
    </div>
  );
}

export default Login;
