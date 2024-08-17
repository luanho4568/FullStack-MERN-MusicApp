import express from "express";
import upload from "../middleware/multer.js";
import { addSongController, listSongController, removeSongController } from "../controllers/songController.js";
const songRouter = express.Router();

/**
 *
 * @param {*} app
 * @returns
 */
const initSongRoutes = (app) => {
    songRouter.post(
        "/add",
        upload.fields([
            { name: "image", maxCount: 1 },
            { name: "audio", maxCount: 1 },
        ]),
        addSongController
    );
    songRouter.get("/list", listSongController);
    songRouter.post("/remove", removeSongController);

    return app.use("/api/song", songRouter);
};

export default initSongRoutes;
