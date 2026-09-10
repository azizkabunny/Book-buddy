import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Account({ token }) {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setUser(data));

    fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setReservations(data));
  }, [token]);

  function handleReturn(reservationId) {
    fetch(
      `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${reservationId}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }
    ).then(() => {
      setReservations((current) =>
        current.filter((reservation) => reservation.id !== reservationId)
      );
    });
  }

  if (!token) {
    return (
      <div className="auth-page">
        <h1>Account</h1>
        <p>You need to be logged in to view your account.</p>
        <div className="nav-links">
          <Link to="/login">Log In</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="account-page">
      <h1>
        {user.firstname} {user.lastname}
      </h1>
      <p className="book-author">{user.email}</p>
      <h2>My Reservations</h2>
      {reservations.length === 0 && <p>No reservations yet.</p>}
      <ul className="reservation-list">
        {reservations.map((reservation) => (
          <li key={reservation.id} className="reservation-item">
            <img
              className="reservation-cover"
              src={reservation.coverimage}
              alt={`Cover of ${reservation.title}`}
            />
            <span>{reservation.title}</span>
            <button
              className="return-button"
              onClick={() => handleReturn(reservation.id)}
            >
              Return
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Account;
