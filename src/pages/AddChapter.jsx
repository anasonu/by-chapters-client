import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MyEditor from "../components/MyEditor";
import TextEditor from "../components/TextEditor";
import { addChapterService } from "../services/chapter.services";
import { Editor, EditorState, convertFromRaw, convertToRaw } from "draft-js";

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
    // console.log(title, chapter);
    // console.log("====================>>>>>>>>>>>>>>", chapter.getCurrentContent());
    const content = chapter.getCurrentContent();
    const raw = convertToRaw(content);
    setContent(raw);
    // setContent(JSON.stringify(raw));
    console.log("============>>>>>>>>>", JSON.stringify(raw))
    console.log("============>>>>>>>>>", title, raw)
  }

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
        {/* <label htmlFor="content">Escribe aquí tu capítulo</label> */}
        {/* <textarea
          name="content"
          cols="30"
          rows="10"
          onChange={handleContentChange}
          value={content}
        ></textarea>

        <button>Publicar capítulo</button> */}
      

        {/* <MyEditor handleClick={handleClick} onChange={handleContentChange} value={content} /> */}
        <MyEditor handleClick={handleClick} onChange={handleContentChange} value={content} />

        <br />
        <br />
       
      </form>
      
      {/* <br />
      <br />
      <br />
      <br />

      <TextEditor /> */}
    </div>
  );
}

export default AddChapter;
