import axios from "../setup/axios";

const addSongService = async (data) => {
    return await axios.post("api/song/add", data);
};
const listSongService = async () => {
    return await axios.get("api/song/list");
};

const removeSongService = async (id) => {
    return await axios.delete(`api/song/delete/${id}`);
};
export { addSongService, listSongService, removeSongService };
