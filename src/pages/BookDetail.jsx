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
      <img src={bookDetail.img} alt={bookDetail.title} />
      <div className="flex-space-between">
        <h2>{bookDetail.title}</h2>
        <button className="add-chapter-btn">+ Capítulo</button>
      </div>
      <h3>{bookDetail.author.username}</h3>
      <p>{bookDetail.description}</p>
      <ChaptersList />
    </div>
  );
}

export default BookDetail;
