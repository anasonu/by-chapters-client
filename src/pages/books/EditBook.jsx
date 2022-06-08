import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBookService, editBookService, EditPicService, getBookDetailService, uploadPicService } from "../../services/book.services";

function EditBook() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState();

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleImgChange = async (event) => {
    const uploadForm = new FormData();
    uploadForm.append("img", event.target.files[0])

    try {
      const response = await uploadPicService(uploadForm)
      setImg(response.data)
    } catch (error) {
      navigate("/error")
    }
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      const editedBook = {
        title,
        description,
        img,
      }
      
      try {
        // const editBook = new FormData();
        // editBook.append("img", img);
        // editBook.append("title", title);
        // editBook.append("description", description);

        await editBookService(bookId, editedBook)
        navigate(`/books/${bookId}`);
      } catch (error) {
          navigate("/error");
      }
  }

  useEffect(() => {
    getBookDetails();
  }, []);

  const getBookDetails = async () => {
      try {
          const response = await getBookDetailService(bookId);
          const { title, description, img } = response.data;
          setTitle(title);
          setDescription(description);
          setImg(img);
      } catch (error) {
          navigate("/error");
      }
  }

  const handleDelete = async () => {
    try {
      await deleteBookService(bookId);
      navigate("/");
    } catch (error) {
      navigate("/error")
    }
  } 

  return (
    <div>
      <h2>Modifica los detalles de tu libro</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="img">Imagen de portada</label>
        <br />
        <input type="file" name="img" onChange={handleImgChange} />
        <br />
        <br />
        <img src={img} alt="Book Cover" />
        <br />
        <br />
        <label htmlFor="title">Título del libro</label>
        <input
          type="text"
          name="title"
          onChange={handleTitleChange}
          value={title}
        />
        <br />
        <br />
        <label htmlFor="description">¿Sobre qué trata tu libro?</label>
        <textarea
          name="description"
          cols="30"
          rows="10"
          onChange={handleDescriptionChange}
          value={description}
        ></textarea>
        <br />
        <br />
        <button>Editar detalles de libro</button>
      </form>
      <button onClick={handleDelete}>Eliminar libro</button>
    </div>
  );
}

export default EditBook;
