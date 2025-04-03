/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import WavesurferPlayer from "@wavesurfer/react";
import WaveSurfer from "wavesurfer.js";

type Props = {
  url: string;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  onReady: (ws: any) => void;
  onSeek: (ws: any, seekTo: number) => void;
};

const Audio_display = ({ url, setIsPlaying, onReady, onSeek }: Props) => {
  return (
    <WavesurferPlayer
      height={100}
      waveColor="violet"
      url={url}
      onReady={onReady}
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
      onSeeking={(currentTime: number) => {
        if (wavesurfer) {
          const normalizedSeek = Math.max(0, Math.min(1, currentTime));
          onSeek(wavesurfer, normalizedSeek);
        }
      }}
    />
  );
};

export default Audio_display;
