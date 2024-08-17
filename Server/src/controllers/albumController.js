import { v2 as cloudinary } from "cloudinary";
import { addAlbumService, listAlbumService, removeAlbumService } from "../services/albumService.js";

const addAlbumController = async (req, res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const bgColor = req.body.bgColor;
        const imageFile = req.file;
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const albumData = { 
            name,
            desc,
            bgColor,
            image: imageUpload.secure_url,
        }
        const data = await addAlbumService(albumData);
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
const listAlbumController = async (req, res) => {
    try {
        const data = await listAlbumService();
        return res.status(200).json({
            status: data.status,
            message: data.message,
            albums: data.albums,
        });
    } catch (error) {
        console.log(">>> check error server: ", error);
        return res.status(500).json({
            message: "Internal server error",
            status: false,
        });
    }
};
const removeAlbumController = async (req, res) => {
    try {
        const id = req.body.id;
        const data = await removeAlbumService(id);
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
export { addAlbumController, listAlbumController, removeAlbumController };
