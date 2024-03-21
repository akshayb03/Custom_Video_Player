import ChevronIcon from "../assets/left-chevron.png";

const PlaybackSettings = ({ closeSettings, changeSpeed }) => {
  const playbackSpeeds = [0.25, 0.5, 1, 1.25, 1.5, 1.75, 2];
  return (
    <div className="px-2 lg:px-4 pt-3 absolute bottom-14 right-0 flex flex-col text-white overflow-auto bg-black opacity-80">
      <div className="flex flex-row w-full items-center mb-3 lg:mg-8">
        <img
          src={ChevronIcon}
          onClick={closeSettings}
          className="w-4 h-4 mr-2 cursor-pointer"
          alt="chevron"
        />
        <span className="text-xs lg:text-base">{"Playback speed"}</span>
      </div>
      <div className="px-4">
        {playbackSpeeds.map((speed) => (
          <p
            onClick={() => changeSpeed(speed)}
            className="mb-2 lg:mb-4 text-xs lg:text-base font-normal cursor-pointer"
          >
            {speed}x
          </p>
        ))}
      </div>
    </div>
  );
};

export default PlaybackSettings;
