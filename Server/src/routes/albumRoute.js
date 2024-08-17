import express from "express";
import upload from "../middleware/multer.js";
import { addAlbumController, listAlbumController, removeAlbumController } from "../controllers/albumController.js";

const albumRouter = express.Router();

/**
 *
 * @param {*} app
 * @returns
 */
const initAlbumRoutes = (app) => {
    albumRouter.post("/add", upload.single("image"), addAlbumController);
    albumRouter.get("/list", listAlbumController);
    albumRouter.post("/remove", removeAlbumController);
    
    return app.use("/api/album", albumRouter);
};

export default initAlbumRoutes;
