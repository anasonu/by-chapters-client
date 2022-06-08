import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBookService, uploadPicService } from "../../services/book.services";

function AddBook() {
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

    const newBook = {
      title,
      description,
      img,
    }

    try {
      await addBookService(newBook);
      navigate("/");
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div>
      <h2>Crea tu propio libro</h2>
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
        <button>Crear libro</button>
      </form>
    </div>
  );
}

export default AddBook;
