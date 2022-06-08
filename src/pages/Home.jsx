import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllBooksService } from "../services/book.services";
import ClipLoader from "react-spinners/ClipLoader";

function Home() {
  const navigate = useNavigate();

  const [allBooks, setAllBooks] = useState(null);

  useEffect(() => {
    getAllBooks();
  }, []);

  const getAllBooks = async () => {
    try {
      const response = await getAllBooksService();
      setAllBooks(response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div>
      <h2>Listado de libros</h2>
      {allBooks === null && <ClipLoader color={"black"} />}
      <div className="all-books-container">
        {allBooks !== null &&
          allBooks.map((eachBook) => {
            return (
              <Link
                key={eachBook._id}
                to={`/books/${eachBook._id}`}
                className="book-link"
              >
                <div className="book-container">
                  <img src={eachBook.img} alt={eachBook.title} />
                  <div className="book-text-container">
                    <p className="book-title">{eachBook.title}</p>
                    <p className="book-author">
                      Publicado por:{" "}
                      <span className="author-name">
                        {eachBook.author.username}
                      </span>
                    </p>
                    <p className="book-description">{eachBook.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
