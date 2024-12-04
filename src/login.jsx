import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Limpiar mensajes de error al enviar

    try {
      const response = await fetch("https://backredes.ddnsking.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Mostrar mensaje de error recibido del servidor
        throw new Error(data.message || "Error al iniciar sesión");
      }

      // Almacenar el token JWT en el almacenamiento local o en cookies
      localStorage.setItem("token", data.token);

      // Redirigir o realizar alguna acción tras el inicio de sesión exitoso
      alert("Inicio de sesión exitoso");
      window.location.href = "/productos"; // Cambiar por la ruta deseada
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginBox}>
        <h2 style={styles.heading}>Login</h2>
        {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Correo</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ulises@gmail.com"
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.loginButton}>
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  loginContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#f0f2f5",
    margin: 0,
  },
  loginBox: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
    width: "350px",
    textAlign: "center",
  },
  heading: {
    marginBottom: "25px",
    fontSize: "24px",
    color: "#222831",
    fontWeight: "bold",
  },
  inputGroup: {
    marginBottom: "20px",
    textAlign: "left",
  },
  label: {
    display: "block",
    fontSize: "14px",
    marginBottom: "8px",
    color: "#4b5563",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "14px",
    backgroundColor: "#f9fafb",
    outline: "none",
    transition: "border-color 0.2s",
    color:"black"
  },
  loginButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  errorMessage: {
    color: "#ef4444",
    fontSize: "14px",
    marginBottom: "20px",
  },
};

export default Login;
