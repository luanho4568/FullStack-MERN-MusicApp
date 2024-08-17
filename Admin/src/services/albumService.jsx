import axios from "../setup/axios";

const addAlbumService = async (data) => {
    return await axios.post("api/album/add", data);
};
const listAbumService = async () => {
    return await axios.get("api/album/list");
};

const removeAlbumService = async (id) => {
    return await axios.delete(`api/album/delete/${id}`);
};
export { addAlbumService, listAbumService, removeAlbumService };
