import express from "express";

const router = express.Router();
/**
 *
 * @param {*} app : express app
 */
const initWebRoutes = (app) => {
    router.get("/",(req,res) => res.send('API Working!!!') );
    return app.use("/", router);
};

export default initWebRoutes;
