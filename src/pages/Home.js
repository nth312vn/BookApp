import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAll } from "../BooksAPI";
import BookArea from "../components/BookArea";

const Home = () => {
  const [books, setBooks] = useState();
  const bookshelves = [
    { title: "Currently Reading", shelfName: "currentlyReading" },
    { title: "Want to Read", shelfName: "wantToRead" },
    { title: "Read", shelfName: "read" },
  ];
  useEffect(() => {
    (async () => {
      const res = await getAll();
      setBooks(res);
    })();
  }, []);
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {bookshelves.map((item, index) => (
            <BookArea
              key={index}
              areaTitle={item.title}
              books={
                books && books.filter((book) => book.shelf === item.shelfName)
              }
              setBooks={setBooks}
              bookShelf={item.shelfName}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default Home;
