const Thumbnail = ({ video, setShowPlayer, setIndex }) => {
  return (
    <div className="flex flex-col lg:flex-row mb-10 items-center relative">
      <img
        className="lg:mr-8"
        src={video.thumbnail}
        alt="thumbnail"
        onClick={() => {
          setIndex(video.id);
          setShowPlayer(true);
        }}
      />
      <div className="lg:w-2/4">
        <h2 className="text-lg lg:text-2xl font-semibold mb-2">
          {video.title}
        </h2>
        <p className="text-sm lg:text-base opacity-75">{video.description}</p>
      </div>
    </div>
  );
};

export default Thumbnail;
