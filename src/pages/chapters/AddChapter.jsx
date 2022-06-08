import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MyEditor from "../../components/MyEditor";
// import TextEditor from "../components/TextEditor";
import { addChapterService } from "../../services/chapter.services";
import { convertToRaw } from "draft-js";

function AddChapter() {
  const navigate = useNavigate();
  const { bookId } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleContentChange = (event) => setContent(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newChapter = {
        title,
        content,
      };

      await addChapterService(bookId, newChapter);
      navigate(`/books/${bookId}`);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleClick = (chapter) => {
    const content = chapter.getCurrentContent();
    const raw = convertToRaw(content);
    setContent(raw);
  };

  return (
    <div>
      <h2>Agrega un nuevo capítulo a tu libro</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Título del capítulo</label>
        <input
          type="text"
          name="title"
          onChange={handleTitleChange}
          value={title}
        />
        <br />
        <br />
        <MyEditor
          handleClick={handleClick}
          onChange={handleContentChange}
          value={content}
        />
        {/* <TextEditor handleClick={handleClick} onChange={handleContentChange} value={content} /> */}
        <br />
        <br />
      </form>
    </div>
  );
}

export default AddChapter;
