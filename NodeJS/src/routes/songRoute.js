import express from "express";
import { addSong,listSong } from "../controllers/songController.js";

const songRouter = express.Router();

/**
 *
 * @param {*} app
 * @returns
 */
const initSongRoutes = (app) => {
    songRouter.post("/add", addSong);
    songRouter.get("/list", listSong);

    return app.use("/api/song", songRouter);
};

export default initSongRoutes;
