import PlayIcon from "../assets/play.png";
import PauseIcon from "../assets/pause.png";
import ReplayIcon from "../assets/replay-icon.png";
import ForwardIcon from "../assets/forward-icon.png";
import FullscreenIcon from "../assets/fullscreen-icon.png";
import MinimizeIcon from "../assets/minimize-icon.png";

import { useRef, useState, useEffect } from "react";
import PlaybackSettings from "./PlaybackSettings";
import Image from "./Image";

const VideoPlayer = ({ index, playlist }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(index);
  const videoWrapper = document.getElementById("video-wrapper");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDuration, setShowDuration] = useState(false);

  const onPlay = () => {
    setIsPlaying(true);
    setIsPaused(false);
    videoRef.current.play();
  };

  const onPaused = () => {
    setIsPlaying(false);
    setIsPaused(true);
    videoRef.current.pause();
  };

  const openSettings = () => {
    setShowSettings(true);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  const changeSpeed = (speed) => {
    setSpeed(speed);
    videoRef.current.playbackRate = speed;
    setShowSettings(false);
  };

  const handleProgress = () => {
    const duration =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setDuration(duration);
  };

  const onReplay = () => {
    videoRef.current.currentTime -= 10;
  };

  const onForward = () => {
    videoRef.current.currentTime += 10;
  };

  const onFullscreen = () => {
    videoWrapper.requestFullscreen();
    setIsFullscreen(true);
    const video = document.getElementById("video");
    video.style.height = "100%";
    video.style.width = "100%";
  };

  const onMinimize = () => {
    document.exitFullscreen();
    setIsFullscreen(false);
  };

  const handleEsc = (event) => {
    !document.fullscreenElement && setIsFullscreen(false);
  };

  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  const currentTimeInSeconds = Math.floor(videoRef.current?.currentTime);
  const durationInSeconds = Math.floor(videoRef.current?.duration);
  const formattedCurrentTime = formatTime(currentTimeInSeconds);
  const formattedDuration = formatTime(durationInSeconds);

  const handleLoadedMetadata = () => {
    setShowDuration(true);
  };

  useEffect(() => {
    if (videoRef.current?.ended) {
      setCurrentIndex(currentIndex + 1);
    }
    if (currentIndex === 0) {
      videoRef.current.currentTime += 0.4;
    }
    document.addEventListener("keydown", handleEsc);
    document.addEventListener("fullscreenchange", handleEsc);
    videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
  }, [videoRef.current?.ended, currentIndex]);

  return (
    <div
      id="modal"
      className="fixed top-0 w-full h-full flex justify-center items-center bg-black/90 overflow-hidden px-2 lg:px-0"
    >
      <div id="video-wrapper" className="relative">
        <video
          id="video"
          src={playlist[currentIndex]}
          autoPlay
          ref={videoRef}
          onTimeUpdate={handleProgress}
        />
        <div className=" absolute bottom-1 left-2 right-1 bg-black/10 p-1">
          <div className="flex flex-row justify-between items-center">
            <Image
              src={ReplayIcon}
              onClick={onReplay}
              className={"mr-4 cursor-pointer"}
            />
            {!isPlaying && (
              <Image
                src={PlayIcon}
                onClick={onPlay}
                className="cursor-pointer"
              />
            )}
            {!isPaused && (
              <Image
                src={PauseIcon}
                onClick={onPaused}
                className="cursor-pointer"
              />
            )}
            <Image
              src={ForwardIcon}
              onClick={onForward}
              className={"ml-4 cursor-pointer"}
            />
            <div className="flex-1 flex justify-end">
              <span
                className="text-white text-base font-bold mr-4 cursor-pointer"
                onClick={openSettings}
              >
                {speed}x
              </span>
              <span>
                {isFullscreen ? (
                  <Image
                    src={MinimizeIcon}
                    onClick={onMinimize}
                    className="cursor-pointer"
                  />
                ) : (
                  <Image
                    src={FullscreenIcon}
                    onClick={onFullscreen}
                    className="cursor-pointer"
                  />
                )}
              </span>
            </div>
            {showSettings && (
              <PlaybackSettings
                closeSettings={closeSettings}
                changeSpeed={changeSpeed}
              />
            )}
          </div>
          <div className="h-1 mt-2 mb-1 bg-black/50 w-full">
            <div
              style={{
                width: `${duration}%`,
              }}
              className={"bg-white h-full"}
            />
          </div>
          {showDuration && (
            <div className="text-white text-xs">
              <p>{`${formattedCurrentTime} / ${formattedDuration}`}</p>
            </div>
          )}
        </div>
      </div>
      <div id="hidden-btn" onClick={() => videoRef.current?.play()} />
    </div>
  );
};

export default VideoPlayer;
