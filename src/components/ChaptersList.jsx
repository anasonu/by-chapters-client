import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ChapterDetail from "../pages/ChapterDetail";
import { getAllChaptersService } from "../services/chapter.services";
import { ClipLoader } from "react-spinners";

function ChaptersList() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [allChapters, setAllChapters] = useState(null);

  useEffect(() => {
    getAllChapters();
  }, []);

  const getAllChapters = async () => {
    try {
      const response = await getAllChaptersService(bookId);
      setAllChapters(response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  if (ChapterDetail === null) {
    return <ClipLoader color={"black"} />;
  }

  return (
    <div className="chapters-component-container">
      <h4 className="chapter-list-intro">Capítulos disponibles: </h4>
      <div className="all-chapters-container">
        {allChapters !== null &&
          allChapters.map((eachChapter, index) => {
            return (
              <div key={eachChapter._id}>
                <Link to={`/books/${bookId}/${eachChapter._id}`}>Capítulo {index + 1} - {eachChapter.title}</Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ChaptersList;
