import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Thumbnail from "../components/Thumbnail";
import VideoPlayer from "../components/VideoPlayer";
import { videos } from "../utils/urls";

const Playlist = () => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [index, setIndex] = useState(0);
  const [list, setList] = useState(videos);
  const handleEsc = (event) => {
    if (event.key === "Escape") {
      setShowPlayer(false);
    }
  };

  const onDragEnd = (result) => {
    const newList = [...list];
    const [removed] = newList.splice(result.source.index, 1);
    newList.splice(result.destination.index, 0, removed);
    setList(newList);
  };

  // const playlist = videos.map((video) => video.videoUrl);
  useEffect(() => {
    window.addEventListener("keydown", handleEsc);
  }, []);
  return (
    <div className="p-2 lg:p-14">
      <h2 className="text-4xl font-bold mb-14">My Playlist</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <div>
                {list.map((video, index) => (
                  <Draggable
                    key={video.id}
                    draggableId={video.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Thumbnail
                          video={video}
                          setShowPlayer={setShowPlayer}
                          index={index}
                          setIndex={setIndex}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {showPlayer ? (
        <VideoPlayer
          index={index}
          playlist={list.map((video) => video.videoUrl)}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Playlist;
