import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { getChapterDetailService } from "../../services/chapter.services";
import { AuthContext } from "../../context/auth.context.js";

function ChapterDetail() {
  const { bookId, chapterId } = useParams();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useContext(AuthContext);

  const [chapterDetail, setChapterDetail] = useState(null);

  useEffect(() => {
    getChapterDetails();
  }, []);

  const getChapterDetails = async () => {
    try {
      const response = await getChapterDetailService(chapterId);
      setChapterDetail(response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  if (chapterDetail === null) {
    return <ClipLoader color={"black"} />;
  }

  return (
    <div className="chapter-detail-container">
      <Link to={`/books/${bookId}`} className="chapter-detail-book-title">
        ← {chapterDetail.book.title}
      </Link>

      <br />

      { isLoggedIn && user._id == chapterDetail.author._id && (
        <Link to={`/books/${bookId}/edit`} className="edit-btn-link">Editar capítulo</Link>
      )}

      <h3>{chapterDetail.title}</h3>

      {chapterDetail.content.blocks.map((eachParagraph) => {
        return <p>{eachParagraph.text}</p>;
      })}
    </div>
  );
}

export default ChapterDetail;
