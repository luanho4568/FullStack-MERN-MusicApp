import albumModel from "../models/albumModel.js";

const addAlbumService = async (data) => {
    try {
        const album = albumModel(data);
        await album.save();
        return {
            status: true,
            message: "Album added successfully!",
        };
    } catch (error) {
        console.log(">>> check error service: ", error);
        return {
            message: "Internal service error",
            status: false,
        };
    }
};
const listAlbumService = async () => {
    try {
        const allAlbums = await albumModel.find({});
        return {
            status: true,
            message: "Get list albums successfully!",
            albums: allAlbums,
        };
    } catch (error) {
        console.log(">>> check error service: ", error);
        return {
            message: "Internal service error",
            status: false,
        };
    }
};
const removeAlbumService = async (id) => {
    try {
        const result = await albumModel.findByIdAndDelete(id);
        if (!result) {
            return {
                status: false,
                message: "Album not found",
            };
        }
        return {
            status: true,
            message: "Album removed successfully!",
        };
    } catch (error) {
        console.log(">>> check error service: ", error);
        return {
            message: "Internal service error",
            status: false,
        };
    }
};
export { addAlbumService, listAlbumService, removeAlbumService };
