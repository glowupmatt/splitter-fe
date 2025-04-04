import { useContext, useState, createContext, useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import { SplitAudioResponse } from "@/types/split_audio_types";

type contextType = {
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  response: SplitAudioResponse | null;
  setResponse: React.Dispatch<React.SetStateAction<SplitAudioResponse | null>>;
  waveSurferRef: React.RefObject<WaveSurfer[] | null>;
};

type Props = {
  children: React.ReactNode;
};

export const AudioControlsContext = createContext<contextType | null>(null);
export const useAudioControls = () => {
  const context = useContext(AudioControlsContext);
  if (!context) {
    throw new Error(
      "useAudioControls must be used within an AudioControlsProvider"
    );
  }
  return context;
};

const Audio_controls_context = ({ children }: Props) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [response, setResponse] = useState<SplitAudioResponse | null>(null);
  const waveSurferRef = useRef<WaveSurfer[]>([]);

  useEffect(() => {
    if (response && response.downloads) {
      const audio_links = Object.keys(response.downloads).map((key) => {
        return {
          key: key,
          value: response.downloads[key as keyof typeof response.downloads],
        };
      });

      // Clear previous instances
      waveSurferRef.current.forEach((ws) => ws.destroy());
      waveSurferRef.current = [];

      // Create new instances
      audio_links.forEach((audio) => {
        waveSurferRef.current.push(
          WaveSurfer.create({
            container: `#${audio.key}`,
            waveColor: "violet",
            progressColor: "purple",
            barHeight: 100,
            barWidth: 2,
            interact: true,
            height: 100,
          })
        );
      });

      // Set up event listeners
      waveSurferRef.current.forEach((waveSurfer, index) => {
        waveSurfer.load(audio_links[index].value);
        waveSurfer.on("ready", () => {
          setDuration(waveSurfer.getDuration());
        });
        waveSurfer.on("audioprocess", () => {
          setCurrentTime(waveSurfer.getCurrentTime());
        });
        waveSurfer.on("seeking", (seekTo: number) => {
          waveSurfer.seekTo(seekTo);
        });
      });

      // Cleanup function
      return () => {
        waveSurferRef.current.forEach((ws) => {
          ws.destroy();
        });
        waveSurferRef.current = [];
      };
    }
  }, [response]);

  const value = {
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    response,
    setResponse,

    waveSurferRef,
  };

  return (
    <AudioControlsContext.Provider value={value}>
      {children}
    </AudioControlsContext.Provider>
  );
};

export default Audio_controls_context;
