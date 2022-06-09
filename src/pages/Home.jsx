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
      {/* <h2>¿Qué te apetece leer?</h2> */}
      {allBooks === null && <ClipLoader color={"black"} />}
      <div>
        {allBooks !== null &&
          allBooks.map((eachBook) => {
            return (
              <div className="all-books-container">
                <hr />
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
              </div>
            );
          })}
      </div>
      <hr />
    </div>
  );
}

export default Home;
