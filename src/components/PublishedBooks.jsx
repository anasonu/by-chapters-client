import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { getBooksByAuthorService } from "../services/book.services";

function PublishedBooks(props) {
    const {authorDetails} = props;
  const navigate = useNavigate();
  const { authorId } = useParams();

  const [booksCreated, setBooksCreated] = useState(null);

  useEffect(() => {
    getBooksCreated();
  }, []);

  const getBooksCreated = async () => {
    try {
      const response = await getBooksByAuthorService(authorId);
      setBooksCreated(response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  if (booksCreated === null) {
    return <ClipLoader color={"black"} />;
  }

  return (
    <div>
      <h3>Libros publicados</h3>
      {booksCreated === null && <ClipLoader color={"black"} />}
      <div className="all-books-container">
        {booksCreated !== null &&
          booksCreated.map((eachBook) => {
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
                        {authorDetails.username}
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

export default PublishedBooks;
