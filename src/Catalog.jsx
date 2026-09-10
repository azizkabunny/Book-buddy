import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Catalog() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books')
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      });
  }, []);

  return (
    <div>
      <h1>Catalog</h1>
      <ul className="catalog">
        {books.map((book) => (
          <li key={book.id} className="book-card">
            <Link to={`/books/${book.id}`}>
              <img
                className="book-cover"
                src={book.coverimage}
                alt={`Cover of ${book.title}`}
              />
            </Link>
            <div className="book-info">
              <Link className="book-title" to={`/books/${book.id}`}>
                {book.title}
              </Link>
              <p className="book-author">{book.author}</p>
              <p className="book-description">{book.description}</p>
              {!book.available && <p className="unavailable-tag">Reserved</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Catalog;
