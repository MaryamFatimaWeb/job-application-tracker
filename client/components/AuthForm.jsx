"use client";

import { useState } from "react";
import "@/styles/auth.css";

export default function AuthForm({
  title,
  buttonText,
  onSubmit,
  isRegister = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
   <div className="auth-container">
  
      <h2 className="auth-title">{title}</h2>

      <form onSubmit={handleSubmit}>
        {isRegister && (
          <>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <br />
            <br />
          </>
        )}

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <label>Password</label>

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <br />
        <br />

       <button className="auth-btn" type="submit">
  {buttonText}
</button>
      </form>
    </div>
  );
}