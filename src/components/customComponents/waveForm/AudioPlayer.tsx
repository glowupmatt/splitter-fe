"use client";

import MultiTrack from "wavesurfer-multitrack";
import { useEffect, useRef, useState } from "react";
import { useAudioControls } from "@/context/AudioControlsContext";

export const AudioPlayer = () => {
  const { response, setResponse } = useAudioControls();
  const containerRef = useRef<HTMLDivElement>(null);
  const multitrackRef = useRef<MultiTrack | null>(null);
  const [isMuted, setIsMuted] = useState<{ title: string; vol: number }[]>([]);

  const removeAudio = () => {
    setResponse(null);
    if (multitrackRef.current) {
      multitrackRef.current.destroy();
      multitrackRef.current = null;
    }
    setIsMuted([]);
  };

  useEffect(() => {
    if (!response?.downloads) return;

    if (multitrackRef.current) {
      multitrackRef.current.destroy();
      multitrackRef.current = null;
    }

    const initialMutedState = Object.keys(response.downloads).map((key) => ({
      title: key,
      vol: 1,
    }));
    setIsMuted(initialMutedState);

    if (containerRef.current) {
      const trackData = Object.entries(response.downloads).map(
        ([key, url]) => ({
          id: key,
          name: key,
          url: url,
          startPosition: 0,
          options: {
            waveColor: "#96a8e5",
            progressColor: "#4F4A85",
            barHeight: 1,
          },
        })
      );

      multitrackRef.current = MultiTrack.create(trackData, {
        container: containerRef.current,
        trackBorderColor: "#96a8e5",
        minPxPerSec: 10,
      });
    }

    return () => {
      if (multitrackRef.current) {
        multitrackRef.current.destroy();
        multitrackRef.current = null;
      }
    };
  }, [response?.downloads]);

  const handlePlay = () => {
    if (multitrackRef.current) {
      multitrackRef.current.play();
    }
  };

  const handlePause = () => {
    if (multitrackRef.current) {
      multitrackRef.current.pause();
    }
  };

  const handleMute = (index: number) => {
    if (multitrackRef.current) {
      const newVolume = isMuted[index].vol > 0 ? 0 : 1;
      multitrackRef.current.setTrackVolume(index, newVolume);
      setIsMuted((prev) => {
        const newMuted = [...prev];
        newMuted[index] = {
          ...newMuted[index],
          vol: newVolume,
        };
        return newMuted;
      });
    }
  };

  return (
    <div className="w-full gap-4 md:flex-row items-center justify-center">
      <div className="flex align-center justify-center gap-4 mb-[1rem]">
        <button
          onClick={handlePlay}
          className="px-4 py-2 rounded-md cursor-pointer bg-[#4F4A85] text-white"
        >
          Play
        </button>
        <button
          onClick={handlePause}
          className="px-4 py-2 rounded-md cursor-pointer bg-[#4F4A85] text-white"
        >
          Pause
        </button>
        <button
          onClick={removeAudio}
          className="px-4 py-2 rounded-md cursor-pointer bg-red-500 text-white"
        >
          Remove Audio
        </button>
      </div>
      {response?.downloads && (
        <>
          <div className="flex items-center md:flex-row gap-2 w-full">
            <div className="flex flex-col justify-center items-center gap-[6.8rem]">
              {Object.keys(response.downloads).map((key, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-white">
                    {key[0].toUpperCase() + key.slice(1)}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted[index]?.vol || 0}
                    onChange={(e) => {
                      const volume = parseFloat(e.target.value);
                      if (multitrackRef.current) {
                        multitrackRef.current.setTrackVolume(index, volume);
                        setIsMuted((prev) => {
                          const newMuted = [...prev];
                          newMuted[index] = {
                            ...newMuted[index],
                            vol: volume,
                          };
                          return newMuted;
                        });
                      }
                    }}
                    className="accent-[#4F4A85] hidden md:block"
                  />
                </div>
              ))}
            </div>
            <div className="overflow-hidden">
              <div ref={containerRef} className="w-[17rem] md:w-full"></div>
            </div>
            <div className="flex flex-col justify-center items-center gap-[4.8rem]">
              {Object.keys(response.downloads).map((key, index) => (
                <button
                  key={index}
                  onClick={() => handleMute(index)}
                  className="px-4 py-2 rounded-md cursor-pointer bg-[#4F4A85] text-white"
                >
                  {isMuted[index]?.vol > 0 ? "Mute" : "Unmute"} {key}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
