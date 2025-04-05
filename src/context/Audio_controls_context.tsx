"use client";

import { useContext, useState, createContext, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { response_test } from "../shared_data/testing_data";
import { SplitAudioResponse } from "@/types/split_audio_types";

type AudioControlsContextType = {
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  response: SplitAudioResponse | null;
  setResponse: React.Dispatch<React.SetStateAction<SplitAudioResponse | null>>;
  waveSurferRef: React.RefObject<WaveSurfer[]>;
  containerRefs: React.RefObject<(HTMLDivElement | null)[]>;
};

type AudioControlsProviderProps = {
  children: React.ReactNode;
};

const defaultContext: AudioControlsContextType = {
  currentTime: 0,
  setCurrentTime: () => {},
  duration: 0,
  setDuration: () => {},
  response: response_test,
  setResponse: () => {},
  waveSurferRef: { current: [] },
  containerRefs: { current: [] },
};

export const AudioControlsContext =
  createContext<AudioControlsContextType>(defaultContext);
export const useAudioControls = () => {
  const context = useContext(AudioControlsContext);
  if (!context) {
    throw new Error(
      "useAudioControls must be used within an AudioControlsProvider"
    );
  }
  return context;
};

export const AudioControlsProvider = ({
  children,
}: AudioControlsProviderProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [response, setResponse] = useState<SplitAudioResponse | null>(null);
  const waveSurferRef = useRef<WaveSurfer[]>([]);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const value = {
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    response,
    setResponse,
    waveSurferRef,
    containerRefs,
  };

  return (
    <AudioControlsContext.Provider value={value}>
      {children}
    </AudioControlsContext.Provider>
  );
};
export default AudioControlsProvider;
