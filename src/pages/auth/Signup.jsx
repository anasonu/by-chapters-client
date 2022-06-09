import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../../services/auth.services";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    description: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const formCopy = { ...form };
    formCopy[name] = value;
    setForm(formCopy);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { username, description, email, password } = form;
    const user = {
      username,
      description,
      email,
      password,
    };

    try {
      await signupService(user);
      navigate("/login");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={form.username}
          className="input-text"
          placeholder="Nombre de usuario*"
        />
        <br />
        <br />
        <textarea
          name="description"
          cols="30"
          rows="10"
          onChange={handleChange}
          value={form.description}
          className="input-text"
          placeholder="Cuéntale a tus lectores quien eres"
        ></textarea>
        <br />
        <br />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={form.email}
          className="input-text"
          placeholder="Correo electrónico*"
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={form.password}
          className="input-text"
          placeholder="Contraseña*"
        />
        <br />
        {errorMessage !== null && <p className="error-message">{errorMessage}</p>}
        <button className="new-book-btn auth">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
