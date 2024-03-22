import ReorderIcon from "../assets/reorder-icon.png";
import Image from "./Image";

const Thumbnail = ({ video, setShowPlayer, index, setIndex }) => {
  return (
    <div className="flex flex-col lg:flex-row mb-10 items-start lg:items-center relative">
      <div className="flex flex-col lg:flex-row items-center">
        <Image src={ReorderIcon} onClick={null} className={"mr-2 opacity-40"} />
        <img
          className="lg:mr-8 cursor-pointer w-300 h-200"
          src={video.thumbnail}
          alt="thumbnail"
          // style={{ width: 300, height: 200 }}
          onClick={() => {
            setIndex(index);
            setShowPlayer(true);
          }}
        />
      </div>
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
