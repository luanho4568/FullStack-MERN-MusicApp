import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { listAbumService, removeAlbumService } from "../services/albumService";

const ListAlbum = () => {
    const [data, setData] = useState([]);
    const fetchSongs = async () => {
        try {
            const response = await listAbumService();
            if (response.data.status) {
                setData(response.data.albums);
            }
        } catch (error) {
            console.log(">>> Error message: ", error);
            toast.error("Error Occured");
        }
    };

    const removeAlbum = async (id) => {
        try {
            const response = await removeAlbumService(id);
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
            <p>All Albums List</p>
            <br />
            <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
                <b>Image</b>
                <b>Name</b>
                <b>Description</b>
                <b>Album Color</b>
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
                        <p>{item.desc}</p>
                        <input type="color" value={item.bgColor} />
                        <p className="text-red-600" onClick={() => removeAlbum(item._id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default ListAlbum;
