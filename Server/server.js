import express from "express";
import cors from "cors";
import "dotenv/config";
import initSongRoutes from "./src/routes/songRoute.js";
import initWebRoutes from "./src/routes/web.js";
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";
import initAlbumRoutes from "./src/routes/albumRoute.js";

// app config
const app = express();
const PORT = process.env.PORT || 6969;
connectDB();
connectCloudinary();

// middleware
app.use(express.json());
app.use(cors());

// initializing routes
initWebRoutes(app);
initSongRoutes(app);
initAlbumRoutes(app);

app.use((req, res) => {
    return res.send("404 not found");
});

app.listen(PORT, () => {
    console.log(`Server starting on ${PORT}`);
});

export default app;
