import './register.scss';
import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';
import apiRequest from '../../lib/apiRequest.js';

function Register() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);

    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    if (!username || !email || !password) {
      setError('All fields are required.');
      return;
    }

    try {
      await apiRequest.post('/auth/register', {
        username,
        email,
        password,
      });
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to create');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input
            name="username"
            type="text"
            placeholder="Username"
            aria-label="Username"
          />
          <input
            name="email"
            type="text"
            placeholder="Email"
            aria-label="Email"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            aria-label="Password"
          />
          <button disabled={isLoading} type="submit">
            Register
          </button>
          {error && <span className="error">{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="Background" />
      </div>
    </div>
  );
}

export default Register;
