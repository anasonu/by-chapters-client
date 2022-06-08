import service from "./config.services";

const getAllAuthorsService = () => {
    return service.get("/authors");
};

const getAuthorDetailService = (id) => {
    return service.get(`/authors/${id}`)
};

export {
    getAllAuthorsService,
    getAuthorDetailService
}