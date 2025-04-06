import React from "react";

type Props = {
  isPlaying: boolean;
  currentTime: number;
  handlePlayPause: () => void;
  removeAudio: () => void;
};

const Controls = (props: Props) => {
  const { isPlaying, currentTime, handlePlayPause, removeAudio } = props;
  return (
    <>
      <div className="text-white font-medium">
        Current Time: {Math.floor(currentTime)}s
      </div>
      <div className="mt-4 flex flex-row items-start gap-2">
        <button
          onClick={handlePlayPause}
          className="px-6 py-3 bg-[#4F4A85] text-white rounded-md hover:bg-[#383351] transition-colors w-full cursor-pointer"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          onClick={removeAudio}
          className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-700 transition-colors w-full cursor-pointer"
        >
          Remove Audio
        </button>
      </div>
    </>
  );
};

export default Controls;
