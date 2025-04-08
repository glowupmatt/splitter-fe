"use client";

import { useEffect, useState, useRef } from "react";
import { useAudioControls } from "@/context/AudioControlsContext";
import WaveSurfer from "wavesurfer.js";
import Controls from "./aduioComponents/Controls";

export const AudioPlayer = () => {
  const { response, containerRefs, setResponse } = useAudioControls();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState<{ [key: string]: boolean }>({});
  const [tracksReady, setTracksReady] = useState(false);
  const wavesurfersRef = useRef<{ [key: string]: WaveSurfer }>({});
  const readyTracksRef = useRef<Set<string>>(new Set());

  const removeAudio = () => {
    setResponse(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setIsMuted({});
  };

  const handleSeek = (position: number) => {
    const waves = Object.values(wavesurfersRef.current);
    if (waves.length === 0) return;

    waves.forEach((wave) => {
      if (wave) {
        wave.seekTo(position);
      }
    });
    setCurrentTime(position);
  };

  const handlePlayPause = () => {
    if (!tracksReady) return;

    Object.values(wavesurfersRef.current).forEach((wave) => {
      if (isPlaying) {
        wave.pause();
      } else {
        wave.play();
      }
    });
    setIsPlaying(!isPlaying);
  };

  const handleMute = (key: string) => {
    const wave = wavesurfersRef.current[key];
    if (wave) {
      const newMutedState = !isMuted[key];
      wave.setMuted(newMutedState);
      setIsMuted((prev) => ({ ...prev, [key]: newMutedState }));
    }
  };

  useEffect(() => {
    if (!response?.downloads) return;

    setTracksReady(false);
    readyTracksRef.current.clear();
    const newWavesurfers: { [key: string]: WaveSurfer } = {};
    const controllers: AbortController[] = [];
    const trackCount = Object.keys(response.downloads).length;

    // Initialize wavesurfer instances for each track
    Object.entries(response.downloads).forEach(([key, url], index) => {
      const container = containerRefs.current[index];
      if (!container) return;

      const controller = new AbortController();
      controllers.push(controller);

      const wavesurfer = WaveSurfer.create({
        container: container,
        waveColor: "#4F4A85",
        progressColor: "#383351",
        height: 100,
        cursorWidth: 1,
        interact: true,
        fetchParams: {
          signal: controller.signal,
        },
      });

      wavesurfer.on("click", () => {
        const position = wavesurfer.getCurrentTime() / wavesurfer.getDuration();
        handleSeek(position);
      });

      wavesurfer.on("audioprocess", (time: number) => {
        setCurrentTime(time);
      });

      wavesurfer.on("error", (error) => {
        console.error(`Error in wavesurfer for track ${key}:`, error);
      });

      // Add ready event handler to track when each wavesurfer instance is ready
      wavesurfer.on("ready", () => {
        readyTracksRef.current.add(key);

        // When all tracks are ready, enable playback
        if (readyTracksRef.current.size === trackCount) {
          setTracksReady(true);
          console.log("All tracks are loaded and ready for playback");
        }
      });

      try {
        // Load the audio with proper error handling
        wavesurfer.load(url);

        newWavesurfers[key] = wavesurfer;
        setIsMuted((prev) => ({ ...prev, [key]: false }));
      } catch (error) {
        console.error(`Error loading track ${key}:`, error);
      }
    });

    wavesurfersRef.current = newWavesurfers;

    return () => {
      Object.values(newWavesurfers).forEach((wave) => {
        if (wave) {
          try {
            wave.destroy();
          } catch (e) {
            console.error("Error destroying wavesurfer:", e);
          }
        }
      });
    };
  }, [response?.downloads, containerRefs]);

  return (
    <div className="w-full flex flex-col gap-4">
      {response?.downloads && (
        <>
          {Object.entries(response.downloads).map(([key], index) => (
            <div
              key={key}
              className="flex flex-row items-center gap-4 justify-between"
            >
              <div
                ref={(el) => {
                  containerRefs.current[index] = el;
                }}
                className="flex-1 max-w-[54rem] h-[100px] bg-gray-900 rounded-lg cursor-pointer"
              />
              <button
                onClick={() => handleMute(key)}
                className={`px-4 py-2 rounded-md cursor-pointer ${
                  isMuted[key] ? "bg-red-500" : "bg-[#4F4A85]"
                } text-white min-w-[100px]`}
              >
                {isMuted[key] ? "Unmute" : "Mute"} {key}
              </button>
            </div>
          ))}
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
