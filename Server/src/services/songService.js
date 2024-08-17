import songModel from "../models/songModel.js";

const addSongService = async (data) => {
    try {
        const song = songModel(data);
        await song.save();
        return {
            status: true,
            message: "Song added successfully!",
        };
    } catch (error) {
        console.log(">>> check error service: ", error);
        return {
            message: "Internal service error",
            status: false,
        };
    }
};
const listSongService = async () => {
    try {
        const allSongs = await songModel.find({});
        return {
            status: true,
            message: "Get list songs successfully!",
            songs: allSongs,
        };
    } catch (error) {
        console.log(">>> check error service: ", error);
        return {
            message: "Internal service error",
            status: false,
        };
    }
};
const removeSongService = async (id) => {
    try {
        let result = await songModel.findByIdAndDelete(id);
        if (!result) {
            return {
                status: false,
                message: "Song not found",
            };
        }
        return {
            status: true,
            message: "Song removed successfully!",
        };
    } catch (error) {
        console.log(">>> check error service: ", error);
        return {
            message: "Internal service error",
            status: false,
        };
    }
};
export { addSongService, listSongService, removeSongService };
