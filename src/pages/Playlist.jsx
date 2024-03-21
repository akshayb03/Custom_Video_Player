import { useEffect, useState } from "react";
import Thumbnail from "../components/Thumbnail";
import VideoPlayer from "../components/VideoPlayer";
import { videos } from "../utils/urls";

const Playlist = () => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [index, setIndex] = useState(0);
  const handleEsc = (event) => {
    if (event.key === "Escape") {
      setShowPlayer(false);
    }
  };
  const playlist = videos.map((video) => video.videoUrl);
  useEffect(() => {
    window.addEventListener("keydown", handleEsc);
  }, []);
  return (
    <>
      <div className="p-2 lg:p-14">
        <h2 className="text-4xl font-bold mb-14">My Playlist</h2>
        {videos.map((video) => (
          <Thumbnail
            video={video}
            setShowPlayer={setShowPlayer}
            setIndex={setIndex}
          />
        ))}
      </div>
      {showPlayer ? <VideoPlayer index={index} playlist={playlist} /> : <></>}
    </>
  );
};

export default Playlist;
