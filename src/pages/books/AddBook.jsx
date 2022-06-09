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
    uploadForm.append("img", event.target.files[0]);

    try {
      const response = await uploadPicService(uploadForm);
      setImg(response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newBook = {
      title,
      description,
      img,
    };

    try {
      await addBookService(newBook);
      navigate("/");
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div>
      <h2 className="add-book-section-title">Crea tu propio libro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <div>
            {img ? (
              <img src={img} alt="Book Cover" />
            ) : (
              <div className="no-img">
                <p>No hay ninguna imagen seleccionada</p>
              </div>
            )}
            <br />
            <input
              type="file"
              name="img"
              id="img"
              onChange={handleImgChange}
              className="file-input"
            />
            <label htmlFor="img" className="img-label">
              Selecciona la imagen de portada
            </label>
          </div>
          <div className="add-book-text-container">
            {/* <label htmlFor="title" className="regular-label">Título del libro</label> */}
            <br />
            <input
              type="text"
              name="title"
              onChange={handleTitleChange}
              value={title}
              className="input-text"
              placeholder="Título del libro"
            />
            <br />
            <br />
            {/* <label htmlFor="description" className="regular-label">¿Sobre qué trata tu libro?</label> */}
            <br />
            <textarea
              name="description"
              cols="30"
              rows="10"
              onChange={handleDescriptionChange}
              value={description}
              className="input-text"
              placeholder="¿Sobre qué trata tu libro?"
            ></textarea>
            <br />
            <br />
          </div>
        </div>
        <button className="new-book-btn">Crear libro</button>
      </form>
    </div>
  );
}

export default AddBook;
