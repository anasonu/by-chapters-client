import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EditEditor from '../../components/EditEditor';
import { deleteChapterService, editChapterService, getChapterDetailService } from '../../services/chapter.services';

function EditChapter() {
  const { bookId, chapterId } = useParams();
  const navigate = useNavigate();

  const [ title, setTitle ] = useState("");
  const [ content, setContent ] = useState("");

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleContentChange = (event) => setContent(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const chapter = {
        title,
        content,
      };
      await editChapterService(chapterId, chapter)
      navigate(`/books/${bookId}/${chapterId}`);
    } catch (error) {
      navigate("/error");
    }
  }

  useEffect(() => {
    getChapterDetails();
  }, []);

  const getChapterDetails = async () => {
    try {
      const response = await getChapterDetailService(chapterId);
      const { title, content } = response.data;
      setTitle(title);
      setContent(content);
    } catch (error) {
      navigate("/error");
    }
  } 

  const handleDelete = async () => {
    await deleteChapterService(chapterId);
    navigate(`/books/${bookId}`)
  }

  return (
    <div>
    <h3 className='next'>PRÓXIMAMENTE</h3>
    <br />
    <br />
      {/* <h2>Estás editando tu capítulo</h2> */}
      {/* <form onSubmit={handleSubmit}>
        <label htmlFor="title">Título: </label>
        <input type="text" name="title" onChange={handleTitleChange} value={title} />
        <br />
        <br />
        <EditEditor
          // handleClick={handleClick}
          onChange={handleContentChange}
          value={content}
        />
      </form> */}
      <button onClick={handleDelete} className="delete-btn">Eliminar capítulo</button>
    </div>
  )
}

export default EditChapter