import { useContext } from "react";
import Display from "./components/Display";
import Player from "./components/Player";
import Sidebar from "./components/SideBar";
import { PlayerContext } from "./context/PlayerContext";

const App = () => {
    const { audioRef, track, songsData } = useContext(PlayerContext);
    return (
        <div className="h-screen bg-black">
            {songsData?.length !== 0 ? (
                <>
                    <div className="h-[90%] flex">
                        <Sidebar />
                        <Display />
                    </div>
                    <Player />
                </>
            ) : null}
            <audio ref={audioRef} src={track?.file} preload="auto"></audio>
        </div>
    );
};

export default App;
