import React, { createContext, useEffect, useRef, useState } from "react";
import { listSongService } from "../services/songService";
import { listAbumService } from "../services/albumService";

const PlayerContext = createContext();
const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0,
        },
        totalTime: {
            second: 0,
            minute: 0,
        },
    });

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    };
    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    };

    const playWithId = async (id) => {
        await songsData.map((item) => {
            if (id === item._id) {
                setTrack(item);
            }
        });
        await audioRef.current.play();
        setPlayStatus(true);
    };

    const previous = async () => {
        songsData.map(async (item, index) => {
            if (track._id === item._id) {
                if (index > 0) {
                    await setTrack(songsData[index - 1]);
                    await audioRef.current.play();
                    setPlayStatus(true);
                } else {
                    await setTrack(songsData[songsData.length - 1]);
                    await audioRef.current.play();
                    setPlayStatus(true);
                }
            }
        });
    };
    const next = async () => {
        songsData.map(async (item, index) => {
            if (track._id === item._id) {
                console.log(">>> track id : ", track._id);
                console.log(">>> item id : ", item._id);
                console.log(">>> index : ", index);
                console.log(">>> songsData : ", songsData.length);
                if (index < songsData.length - 1) {
                    await setTrack(songsData[index + 1]);
                    await audioRef.current.play();
                    setPlayStatus(true);
                }
                else{
                    await setTrack(songsData[0]);
                    await audioRef.current.play();
                    setPlayStatus(true);
                }
            }
        });
    };

    const seekSong = async (e) => {
        audioRef.current.currentTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
    };

    const getSongsData = async () => {
        try {
            const response = await listSongService();
            if (response.data.status) {
                setSongsData(response.data.songs);
                setTrack(response.data.songs[0]);
            }
        } catch (error) {
            console.log(">>> Error message: ", error);
            toast.error("Error Occured");
        }
    };
    const getAlbumsData = async () => {
        try {
            const response = await listAbumService();
            if (response.data.status) {
                setAlbumsData(response.data.albums);
            }
        } catch (error) {
            console.log(">>> Error message: ", error);
            toast.error("Error Occured");
        }
    };
    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width =
                    Math.floor((audioRef.current.currentTime / audioRef.current.duration) * 100) + "%";
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60),
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60),
                    },
                });
            };
        }, 1000);
    }, [audioRef]);

    useEffect(() => {
        getAlbumsData();
        getSongsData();
    }, []);
    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong,
        songsData,
        albumsData,
    };
    return <PlayerContext.Provider value={contextValue}>{props.children}</PlayerContext.Provider>;
};

export { PlayerContext, PlayerContextProvider };
