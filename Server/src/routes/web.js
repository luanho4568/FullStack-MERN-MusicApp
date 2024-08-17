import express from "express";

const router = express.Router();
/**
 *
 * @param {*} app : express app
 */
const initWebRoutes = (app) => {
    router.get("/", (req, res) => res.send("Welcome to the world of Nodejs !!!"));
    return app.use("/", router);
};

export default initWebRoutes;
