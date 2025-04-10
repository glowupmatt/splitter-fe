"use client";

import { useEffect, useState, useRef } from "react";
import { useAudioControls } from "@/context/AudioControlsContext";
import Multitrack from "wavesurfer-multitrack";
import Controls from "./aduioComponents/Controls";

export const AudioPlayer = () => {
  const { response, setResponse } = useAudioControls();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [tracksReady, setTracksReady] = useState(false);
  const multitrackRef = useRef(null);
  const containerRef = useRef(null);
  const [isMuted, setIsMuted] = useState<{ [key: string]: boolean }>({});

  const removeAudio = () => {
    setResponse(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setIsMuted({});
    if (multitrackRef.current) {
      multitrackRef.current.destroy();
      multitrackRef.current = null;
    }
  };

  const handlePlayPause = () => {
    if (!tracksReady || !multitrackRef.current) return;

    if (isPlaying) {
      multitrackRef.current.pause();
    } else {
      multitrackRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMute = (id: string) => {
    if (!multitrackRef.current) return;

    const newMutedState = !isMuted[id];
    // Find the track in multitrack and set its volume to 0 if muted
    multitrackRef.current.tracks.forEach((track) => {
      if (track.id.toString() === id) {
        track.setVolume(newMutedState ? 0 : 1);
      }
    });

    setIsMuted((prev) => ({ ...prev, [id]: newMutedState }));
  };

  useEffect(() => {
    if (!response?.downloads || !containerRef.current) return;

    setTracksReady(false);

    // Clean up previous instance if it exists
    if (multitrackRef.current) {
      multitrackRef.current.destroy();
    }

    // Prepare tracks configuration for multitrack
    const tracks = Object.entries(response.downloads).map(
      ([key, url], index) => ({
        id: key,
        url: url,
        draggable: false, // Set to true if you want tracks to be draggable
        startPosition: 0,
        volume: 1,
        options: {
          waveColor: "#4F4A85",
          progressColor: "#383351",
        },
      })
    );

    // Create multitrack instance
    const multitrack = Multitrack.create(tracks, {
      container: containerRef.current,
      minPxPerSec: 50, // Initial zoom level
      cursorWidth: 1,
      cursorColor: "#D72F21",
      trackBackground: "#1F1F1F",
      trackBorderColor: "#333333",
    });

    // Event listeners
    multitrack.on("timeupdate", (time) => {
      setCurrentTime(time);
    });

    multitrack.on("volume-change", ({ id, volume }) => {
      console.log(`Track ${id} volume updated to ${volume}`);
    });

    multitrack.once("canplay", () => {
      console.log("All tracks loaded and ready for playback");
      setTracksReady(true);
    });

    // Store the multitrack instance in ref
    multitrackRef.current = multitrack;

    // Initialize muted state for each track
    const initialMutedState = Object.keys(response.downloads).reduce(
      (acc, key) => {
        acc[key] = false;
        return acc;
      },
      {}
    );
    setIsMuted(initialMutedState);

    // Cleanup function
    return () => {
      if (multitrackRef.current) {
        multitrackRef.current.destroy();
      }
    };
  }, [response?.downloads]);

  return (
    <div className="w-full flex flex-col gap-4">
      {response?.downloads && (
        <>
          {/* Main container for the multitrack visualization */}
          <div
            ref={containerRef}
            className="bg-gray-900 rounded-lg w-full h-[400px]"
          />

          {/* Mute buttons for each track */}
          <div className="flex flex-wrap gap-2 mt-4">
            {Object.keys(response.downloads).map((key) => (
              <button
                key={key}
                onClick={() => handleMute(key)}
                className={`px-4 py-2 rounded-md cursor-pointer ${
                  isMuted[key] ? "bg-red-500" : "bg-[#4F4A85]"
                } text-white min-w-[100px]`}
              >
                {isMuted[key] ? "Unmute" : "Mute"} {key}
              </button>
            ))}
          </div>

          <Controls
            isPlaying={isPlaying}
            currentTime={currentTime}
            handlePlayPause={handlePlayPause}
            removeAudio={removeAudio}
            isDisabled={!tracksReady}
          />
        </>
      )}
    </div>
  );
};
