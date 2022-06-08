import service from "./config.services";

const getAllBooksService = () => {
  return service.get("/books");
};

const addBookService = (book) => {
  return service.post("/books/new-book", book);
};

const getBookDetailService = (id) => {
  return service.get(`/books/${id}`);
};

const editBookService = (id, book) => {
  return service.patch(`/books/${id}`, book);
};

const deleteBookService = (id) => {
  return service.delete(`/books/${id}`);
};

const uploadPicService = (uploadForm) => {
  return service.post("/uploader", uploadForm);
}

// const EditPicService = (uploadForm) => {
//   return service.patch("/uploader/edit", uploadForm);
// }

export {
  getAllBooksService,
  addBookService,
  getBookDetailService,
  editBookService,
  deleteBookService,
  uploadPicService,
  // EditPicService,
};
