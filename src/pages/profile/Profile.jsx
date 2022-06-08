import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../context/auth.context.js";
import { getBooksByAuthorService } from "../../services/book.services.js";

function Profile() {
  const navigate = useNavigate;
  const { user } = useContext(AuthContext);

  const [booksCreated, setBooksCreated] = useState(null);

  useEffect(() => {
    getBooksCreated();
  }, []);

  const getBooksCreated = async () => {
    try {
      const response = await getBooksByAuthorService(user._id);
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
      <h3>Mi perfil</h3>
      <h4>{user.username}</h4>
      <p>{user.email}</p>
      <h3>Mis libros publicados</h3>
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
                      <span className="author-name">{user.username}</span>
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

export default Profile;
