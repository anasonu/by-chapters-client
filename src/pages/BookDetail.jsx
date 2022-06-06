import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import ChaptersList from "../components/ChaptersList";
import { getBookDetailService } from "../services/book.services";

function BookDetail() {
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

  if (bookDetail === null) {
    return <ClipLoader color={"black"} />;
  }

  return (
    <div className="book-detail-container">
      <img src={bookDetail.img} alt={bookDetail.title} className="book-detail-img" />
      <div className="flex-space-between">
        <h2 className="book-detail-title">{bookDetail.title}</h2>
        <button className="add-chapter-btn">+ Capítulo</button>
      </div>
      <h3 className="book-detail-author">{bookDetail.author.username}</h3>
      <p className="book-detail-description">{bookDetail.description}</p>
      <ChaptersList />
    </div>
  );
}

export default BookDetail;
