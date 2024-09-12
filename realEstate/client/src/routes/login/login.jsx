import { useContext, useState } from 'react';
import './login.scss';
import apiRequest from '../../lib/apiRequest.js';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';

function Login() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);

    const username = formData.get('username');

    const password = formData.get('password');

    if (!username || !password) {
      setError('All fields are required.');
      return;
    }

    try {
      const res = await apiRequest.post('/auth/login', {
        username,
        password,
      });
      updateUser(res.data);
      console.log(res);
      navigate('/');
    } catch (err) {
      // if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);
      // } else {
      //   setError('Invalid credentials');
      // }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            autoComplete="off"
          />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;