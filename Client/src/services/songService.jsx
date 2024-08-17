import axios from "../setup/axios";

const listSongService = async () => {
    return await axios.get("api/song/list");
};

export { listSongService };
