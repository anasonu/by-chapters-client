import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../../services/auth.services";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (event) => {
    const { username, name, lastName, email, password, value } = event.target;
    const formCopy = { ...form };
    formCopy[username] = value;
    formCopy[name] = value;
    formCopy[lastName] = value;
    formCopy[email] = value;
    formCopy[password] = value;
    setForm(formCopy);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { username, name, lastName, email, password } = form;
    const user = {
      username,
      name,
      lastName,
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
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={form.username}
        />
        <br />
        <br />
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={form.name}
        />
        <br />
        <br />
        <label htmlFor="lastName">Last Name: </label>
        <input
          type="text"
          name="lastName"
          onChange={handleChange}
          value={form.lastName}
        />
        <br />
        <br />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={form.email}
        />
        <br />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={form.password}
        />
        <br />
        <br />
        {errorMessage !== null && <p>{errorMessage}</p>}
        <button>Signup</button>
      </form>
    </div>
  );
}

export default Signup;
