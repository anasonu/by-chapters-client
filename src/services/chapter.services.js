import service from "./config.services";

const getAllChaptersService = (bookId) => {
    return service.get(`/chapters/${bookId}`);
};

const addChapterService = (bookId, chapterId, chapter) => {
    return service.post(`/chapters/${bookId}/${chapterId}`, chapter);
};

const getChapterDetailService = (chapterId) => {
    return service.get(`/chapters/details/${chapterId}`);
};

const editChapterService = (chapterId, chapter) => {
    return service.patch(`/chapters/details/${chapterId}`, chapter);
};

const deleteChapterService = (chapterId) => {
    return service.delete(`/chapters/details/${chapterId}`);
};

export {
    getAllChaptersService,
    addChapterService,
    getChapterDetailService,
    editChapterService,
    deleteChapterService
};