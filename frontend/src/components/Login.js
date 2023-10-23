import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login(props) {
  const { setIsLoggedIn } = props;
  const { setToken } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const login = async (user) => {
    try {
      const res = await fetch('http://localhost:5000/fb/usuario/login', {
        method: 'POST',
        body: user,
      });
      var data = await res.json();
      if (data.estado === true) {
        console.log("Usuario logueado");
        setIsLoggedIn(true);
        setToken(data.usuario.token);
        setTimeout(() => {
          localStorage.setItem("token", data.usuario.token);
          navigate(`/mi-cuenta`);
        }, 1500);
      } else {
        console.log("Usuario no logueado");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    await login(formData);
  };

  const recuperarCuenta = async () => {
    try {
      const res = await fetch('http://localhost:5000/fb/usuario/recuperar-cuenta', {
        method: 'POST',
        body: { email },
      });
      const data = await res.json();
      if (data.success) {
        console.log('Correo electrónico de recuperación de cuenta enviado.');
        // Puedes mostrar un mensaje de éxito al usuario.
      } else {
        console.log('La recuperación de cuenta falló.');
        // Puedes mostrar un mensaje de error al usuario.
      }
    } catch (error) {
      console.error(error);
    }
  };

  const manejarRecuperacionCuenta = () => {
    recuperarCuenta();
  };

  const resetearContrasena = async () => {
    try {
      const res = await fetch('http://localhost:5000/fb/usuario/resetear-contrasena', {
        method: 'POST',
        body: { email },
      });
      const data = await res.json();
      if (data.success) {
        console.log('Correo electrónico de restablecimiento de contraseña enviado.');
        // Puedes mostrar un mensaje de éxito al usuario.
      } else {
        console.log('El restablecimiento de contraseña falló.');
        // Puedes mostrar un mensaje de error al usuario.
      }
    } catch (error) {
      console.error(error);
    }
  };

  const manejarRecuperacionContrasena = () => {
    resetearContrasena();
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          className="login-input"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="login-input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login-button" type="submit">Iniciar sesión</button>
      </form>
      <div className="login-message">
        <p><center>¿Necesitas ayuda con tu cuenta o contraseña? <a href="#" onClick={manejarRecuperacionCuenta}>Recuperar cuenta</a> / <a href="#" onClick={manejarRecuperacionContrasena}>Recuperar contraseña</a></center></p>
      </div>
    </div>
  );
}

export default Login;