import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register({ setToken }) {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstname, lastname, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          navigate('/account');
        } else {
          setError(data.message || 'Registration failed.');
        }
      })
      .catch(() => setError('Something went wrong. Please try again.'));
  }

  return (
    <div className="auth-page">
      <h1>Register</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            type="text"
            value={firstname}
            onChange={(event) => setFirstname(event.target.value)}
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
          />
        </label>
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
        <button type="submit">Register</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Register;
