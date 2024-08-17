import axios from "../setup/axios";

const listAbumService = async () => {
    return await axios.get("api/album/list");
};

export {  listAbumService };
