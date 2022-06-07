import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { getChapterDetailService } from "../services/chapter.services";

function ChapterDetail() {
  const { bookId, chapterId } = useParams();
  const navigate = useNavigate();

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
    <div>
      <Link to={`/books/${bookId}`}>← {chapterDetail.book.title}</Link>
      <br />
      <h3>{chapterDetail.title}</h3>
      <p>{chapterDetail.content}</p>
    </div>
  );
}

export default ChapterDetail;
