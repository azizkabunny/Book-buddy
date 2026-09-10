import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          navigate('/account');
        } else {
          setError(data.message || 'Login failed. Check your email and password.');
        }
      })
      .catch(() => setError('Something went wrong. Please try again.'));
  }

  return (
    <div className="auth-page">
      <h1>Log In</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit">Log In</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Login;
