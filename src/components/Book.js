import React from "react";

const Book = (props) => {
  const { bookInfo, changeStatus, bookShelf, isSearching } = props;
  const { authors, title, imageLinks } = bookInfo;
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 174,
              backgroundImage: `url(${imageLinks?.smallThumbnail})`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              defaultValue={bookShelf || "none"}
              onChange={(e) => changeStatus(bookInfo, e.target.value)}
            >
              {isSearching ? (
                <option value="none" disabled>
                  Add to...
                </option>
              ) : (
                <option value="none" disabled>
                  Move to...
                </option>
              )}
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              {isSearching ? null : <option value="none">None</option>}
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    </li>
  );
};
export default Book;
