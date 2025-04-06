"use client";

import { useContext, useState, createContext, useRef } from "react";
import { response_test } from "../shared_data/testing_data";
import { SplitAudioResponse } from "@/types/split_audio_types";

type AudioControlsContextType = {
  response: SplitAudioResponse | null;
  setResponse: React.Dispatch<React.SetStateAction<SplitAudioResponse | null>>;
  containerRefs: React.RefObject<(HTMLDivElement | null)[]>;
};

type AudioControlsProviderProps = {
  children: React.ReactNode;
};

const defaultContext: AudioControlsContextType = {
  response: response_test,
  setResponse: () => {},
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
  const [response, setResponse] = useState<SplitAudioResponse | null>(
    response_test
  );
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const value = {
    response,
    setResponse,
    containerRefs,
  };

  return (
    <AudioControlsContext.Provider value={value}>
      {children}
    </AudioControlsContext.Provider>
  );
};
export default AudioControlsProvider;
