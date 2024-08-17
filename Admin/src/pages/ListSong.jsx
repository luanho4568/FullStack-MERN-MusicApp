import React, { useEffect, useState } from "react";
import { listSongService, removeSongService } from "../services/songService";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ListSong = () => {
    const [data, setData] = useState([]);
    const fetchSongs = async () => {
        try {
            const response = await listSongService();
            if (response.data.status) {
                setData(response.data.songs);
            }
        } catch (error) {
            console.log(">>> Error message: ", error);
            toast.error("Error Occured");
        }
    };

    const removeSong = async (id) => {
        try {
            const response = await removeSongService(id);
            if (response.data.status) {
                toast.success(response.data.message);
                fetchSongs();
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.log(">>> Error message: ", error);
            toast.error("Error Occured");
        }
    };
    useEffect(() => {
        fetchSongs();
    }, []);
    return (
        <div>
            <p>All Songs List</p>
            <br />
            <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
                <b>Image</b>
                <b>Name</b>
                <b>Album</b>
                <b>Duration</b>
                <b>Action</b>
            </div>
            {data?.map((item, index) => {
                
                return (
                    <div
                        key={index}
                        className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
                    >
                        <img src={item.image} className="w-12" alt="" />
                        <p>{item.name}</p>
                        <p>{item.album}</p>
                        <p>{item.duration}</p>
                        <p className="text-red-600" onClick={() => removeSong(item._id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default ListSong;
