import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import './login.css';  

function Login() {
  const [username, setUsername] = useState<string>(''); 
  const [password, setPassword] = useState<string>(''); 
  const navigate = useNavigate(); 

  const handleLogin = () => {
    if (!username || !password) {
      alert('Username and Password must not be empty!');
    } else {
      console.log('Logging in with:', username, password);
      navigate('/nav');  
    }
  };

  const handleRegister = () => {
    navigate('/register'); 
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