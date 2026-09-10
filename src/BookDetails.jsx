import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function BookDetails({ token }) {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
      });
  }, [id]);

  function handleReserve() {
    fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bookId: book.id }),
    })
      .then((response) => response.json())
      .then(() => {
        setMessage('Reserved! Check your Account page.');
        setBook({ ...book, available: false });
      })
      .catch(() => setMessage('Could not reserve this book.'));
  }

  if (!book) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="book-details">
      <img
        className="book-details-cover"
        src={book.coverimage}
        alt={`Cover of ${book.title}`}
      />
      <div className="book-details-info">
        <h1>{book.title}</h1>
        <p className="book-author">{book.author}</p>
        <p className="book-description">{book.description}</p>
        <p className={book.available ? 'status available' : 'status unavailable'}>
          {book.available ? 'Available' : 'Not available'}
        </p>
        {token && (
          <button
            className="reserve-button"
            onClick={handleReserve}
            disabled={!book.available}
          >
            Reserve
          </button>
        )}
        {!token && <p className="hint">Log in to reserve this book.</p>}
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default BookDetails;
