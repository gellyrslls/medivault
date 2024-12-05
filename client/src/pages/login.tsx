import { useState } from 'react';
import './login.css';  

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logging in with:', username, password);
  };

  const handleRegister = () => {
    // Registration logic here
    console.log('Redirecting to registration...');
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button type="button" onClick={handleLogin} className="login-button">
          Login
        </button>
        <button type="button" onClick={handleRegister} className="register-button">
          Register
        </button>
      </form>
    </div>
  );
}

export default Login;