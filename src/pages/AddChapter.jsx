import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addChapterService } from '../services/chapter.services';

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

  return (
    <div>
      <h2>Agrega un nuevo capítulo a tu libro</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Título del capítulo</label>
        <input type="text" name="title" onChange={handleTitleChange} value={title} />
        <br />
        <br />
        <label htmlFor="content">Escribe aquí tu capítulo</label>
        <textarea name="content" cols="30" rows="10" onChange={handleContentChange} value={content}></textarea>
        <br />
        <br />
        <button>Crear libro</button>
      </form>
    </div>
  )
}

export default AddChapter