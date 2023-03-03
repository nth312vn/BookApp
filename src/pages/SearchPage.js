import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAll, search, update } from "../BooksAPI";
import Book from "../components/Book";

const SearchPage = () => {
  const navigate = useNavigate();
  const [booksSearch, setBooksSearch] = useState();
  const [books, setBooks] = useState();
  const [text, setText] = useState("");

  useEffect(() => {
    (async () => {
      const res = await getAll();
      setBooks(res);
    })();
  }, []);

  const handleSearchBook = (e) => {
    const value = e.target.value;
    setText(value);
    if (!value) {
      setBooksSearch(null);
      return;
    }
    if (text) {
      (async () => {
        const res = await search(text, 100);
        if (res.error) {
          setBooksSearch(null);
          return;
        }

        setBooksSearch(res);
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
          {booksSearch &&
            booksSearch.map((book, index) => {
              return (
                book && (
                  <Book
                    isSearching
                    bookInfo={book}
                    key={index}
                    changeStatus={handleChangeStatus}
                    bookShelf={
                      books.find((item) =>
                        booksSearch.find((o) => o.id === item.id)
                      )?.shelf
                    }
                  />
                )
              );
            })}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
