import { v2 as cloudinary } from "cloudinary";
import { addSongService, listSongService, removeSongService } from "../services/songService.js";

const addSongController = async (req, res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`;
        const songData = {
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration,
        };
        const data = await addSongService(songData);
        return res.status(200).json({
            status: data.status,
            message: data.message,
        });
    } catch (error) {
        console.log(">>> check error server: ", error);
        return res.status(500).json({
            message: "Internal server error",
            status: false,
        });
    }
};

const listSongController = async (req, res) => {
    try {
        const data = await listSongService();
        return res.status(200).json({
            status: data.status,
            message: data.message,
            songs: data.songs,
        });
    } catch (error) {
        console.log(">>> check error server: ", error);
        return res.status(500).json({
            message: "Internal server error",
            status: false,
        });
    }
};

const removeSongController = async (req, res) => {
    try {
        const id = req.body.id;
        const data = await removeSongService(id);
        return res.status(200).json({
            status: data.status,
            message: data.message,
        });
    } catch (error) {
        console.log(">>> check error server: ", error);
        return res.status(500).json({
            message: "Internal server error",
            status: false,
        });
    }
};
export { addSongController, listSongController, removeSongController };
