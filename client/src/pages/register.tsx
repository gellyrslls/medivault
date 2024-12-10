import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import './register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  

  const handleRegister = () => {
    if (password !== retypePassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      console.log('Registering:', username, password);
      
      
      alert('Registration successful!');
      
      
      const confirmRedirect = window.confirm('Registration successful! Do you want to go back to login?');
      
      if (confirmRedirect) {
        navigate('/');  
      }
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form className="register-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
        />
        <input
          type="password"
          placeholder="Retype Password"
          value={retypePassword}
          onChange={(e) => setRetypePassword(e.target.value)}
          className="register-input"
        />
        {error && <p className="error-message">{error}</p>}
        <button type="button" onClick={handleRegister} className="register-button">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;