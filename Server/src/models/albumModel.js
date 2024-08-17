import mongoose from "mongoose";

const Schema = mongoose.Schema;

const albumSchema = new Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    bgColor: { type: String, required: true },
    image: { type: String, required: true },
});
const albumModel = mongoose.model.album || mongoose.model("album", albumSchema);
export default albumModel;
