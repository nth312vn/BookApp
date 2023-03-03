import React from "react";
import { getAll, update } from "../BooksAPI";
import Book from "./Book";

const BookArea = (props) => {
  const { areaTitle, books, setBooks, bookShelf } = props;

  const updateStatus = async (book, shelf) => {
    await update(book, shelf);
    const res = await getAll();
    setBooks(res);
  };
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{areaTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books &&
            books.map((book, index) => (
              <Book
                key={index}
                bookInfo={book}
                bookShelf={bookShelf}
                changeStatus={updateStatus}
              />
            ))}
        </ol>
      </div>
    </div>
  );
};

export default BookArea;
