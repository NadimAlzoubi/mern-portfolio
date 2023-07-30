// Login.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://nadim.onrender.com/login', {
        username,
        password,
      });

      const user = response.data.username;
      onLogin(user); // دع المكون الأب يعرف أن المستخدم قد سجل الدخول بنجاح
      if(user){
        navigate('/dash');
      }else{
          navigate('/login');
          alert('something went wrong!');
      }
    } catch (error) {
      console.error('Failed to login:', error.message);
    }
  };

  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Login</h3>
            <div className="form-group">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                placeholder="Username"
              />
            </div>
            <br />
            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Password"
              />
            </div>
            <div className="text-center">
              <button onClick={handleLogin} className="btn btn-primary">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Login;
