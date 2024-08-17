import React, { useState } from "react";
import { assets } from "../assets/assets";

const AddSong = () => {
    const [image , setImage] = useState(false)
    const [song , setSong] = useState(false)
    const [name , setName] = useState("")
    const [desc, setDesc] = useState("")
    const [album , setAlbum] = useState("none")
    const [loading , setLoading] = useState(false)
    const [albumData , setAlbumData] = useState([])
    return (
        <form className="flex flex-col items-start gap-8 text-gray-600">
            <div className="flex gap-8">
                <div className="flex flex-col gap-4">
                    <p>Upload Song</p>
                    <input type="file" id="song" accept="audio/*" hidden />
                    <label htmlFor="song">
                        <img src={assets.upload_song} className="w-24 cursor-pointer" alt="" />
                    </label>
                </div>
                <div className="flex flex-col gap-4">
                    <p>Upload Image</p>
                    <input type="file" id="image" accept="image/*" hidden />
                    <label htmlFor="image">
                        <img src={assets.upload_area} className="w-24 cursor-pointer" alt="" />
                    </label>
                </div>
            </div>
            <div className="flex flex-col gap-2.5">
                <p>Song name</p>
                <input
                    type="text"
                    className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
                    placeholder="Type Here"
                    required
                />
            </div>
            <div className="flex flex-col gap-2.5">
                <p>Song description</p>
                <input
                    type="text"
                    className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
                    placeholder="Type Here"
                    required
                />
            </div>

            <div className="flex flex-col gap-2.5">
                <p>Album</p>
                <select className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[150px]">
                    <option value="none">None</option>
                </select>
            </div>
            <button type="submit" className="text-base bg-black text-white py-2.5 px-14 cursor-pointer">
                ADD
            </button>
        </form>
    );
};

export default AddSong;
