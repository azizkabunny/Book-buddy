import { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Catalog from './Catalog';
import BookDetails from './BookDetails';
import Account from './Account';
import Login from './Login';
import Register from './Register';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  function handleLogout() {
    localStorage.removeItem('token');
    setToken('');
  }

  return (
    <>
      <nav className="navbar">
        <Link className="brand" to="/books">
          📚 Book Buddy
        </Link>
        <div className="nav-links">
          <Link to="/books">Books</Link>
          <Link to="/account">Account</Link>
          {token ? (
            <button className="link-button" onClick={handleLogout}>
              Log Out
            </button>
          ) : (
            <>
              <Link to="/login">Log In</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
      <main className="page">
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/books" element={<Catalog />} />
          <Route path="/books/:id" element={<BookDetails token={token} />} />
          <Route path="/account" element={<Account token={token} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
        </Routes>
      </main>
    </>
  );
}
