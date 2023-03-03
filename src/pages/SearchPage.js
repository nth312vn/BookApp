import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { search, update } from "../BooksAPI";
import Book from "../components/Book";

const SearchPage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState();
  const [text, setText] = useState("");
  const handleSearchBook = (e) => {
    const value = e.target.value;
    setText(value);
    if (!value) {
      setBooks(null);
      return;
    }
    if (text) {
      (async () => {
        const res = await search(text, 100);
        if (res.error) {
          setBooks(null);
          return;
        }
        setBooks(res);
      })();
    }
  };
  const handleChangeStatus = async (book, shelf) => {
    await update(book, shelf);
  };
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button
          style={{ border: "none" }}
          className="close-search"
          onClick={() => navigate("/")}
        >
          Close
        </button>
        <div className="search-books-input-wrapper">
          <input
            name="text"
            type="text"
            value={text}
            onChange={handleSearchBook}
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books &&
            books.map((book, index) => {
              return (
                <Book
                  isSearching
                  bookInfo={book}
                  key={index}
                  changeStatus={handleChangeStatus}
                />
              );
            })}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
