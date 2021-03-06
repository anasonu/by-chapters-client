import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import ChaptersList from "../../components/ChaptersList";
import { getBookDetailService } from "../../services/book.services";
import { AuthContext } from "../../context/auth.context.js";

function BookDetail() {
  const { user, isLoggedIn } = useContext(AuthContext);
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [bookDetail, setBookDetail] = useState(null);

  useEffect(() => {
    getBookDetails();
  }, []);

  const getBookDetails = async () => {
    try {
      const response = await getBookDetailService(bookId);
      setBookDetail(response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  const goToChapterForm = () => {
    navigate(`/books/${bookId}/new-chapter`);
  };

  if (bookDetail === null) {
    return <ClipLoader color={"black"} />;
  }

  return (
    <div className="book-detail-container">
        {isLoggedIn && user._id == bookDetail.author._id && (
          <Link to={`/books/${bookId}/edit`} className="edit-btn-link">
            Editar libro
          </Link>
        )}
        <br />
        <img
          src={bookDetail.img}
          alt={bookDetail.title}
          className="book-detail-img"
        />
      <div className="flex-space-between">
        <h2 className="book-detail-title">{bookDetail.title}</h2>
        {isLoggedIn && user._id == bookDetail.author._id && (
          <button onClick={goToChapterForm} className="add-chapter-btn">
            + Capítulo
          </button>
        )}
      </div>
      <span>Autor: </span>
      <Link
        to={`/author/${bookDetail.author._id}`}
        className="book-detail-author"
      >
        {bookDetail.author.username}
      </Link>
      <p className="book-detail-description">{bookDetail.description}</p>
      <ChaptersList />
    </div>
  );
}

export default BookDetail;
