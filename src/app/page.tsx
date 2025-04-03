"use client";

import Description_info from "@/components/custom_components/Description_info";
import Information_card from "@/components/custom_components/Information_card";
import information_data from "@/shared_data/information_data";
import description_data from "@/shared_data/description_data";
import Upload_input from "@/components/custom_components/Upload_input";
import Audio_display from "@/components/custom_components/Display_waves/Audio_display";
import { SplitAudioResponse } from "@/types/split_audio_types";
import { useState } from "react";
import { response_test } from "../shared_data/testing_data";
import WaveSurfer from "wavesurfer.js";
import {}

export default function Home() {
  const [response, setResponse] = useState<SplitAudioResponse>(response_test);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wavesurfers, setWavesurfers] = useState<{ [key: string]: any }>({});

  const onReady = (ws: any, key: string) => {
    setWavesurfers((prev) => ({
      ...prev,
      [key]: ws,
    }));
  };

  const onSeek = (ws: WaveSurfer, seekTo: number) => {
    // seekTo is already normalized between 0 and 1
    Object.values(wavesurfers).forEach((wavesurfer: WaveSurfer) => {
      if (wavesurfer !== ws) {
        try {
          // Ensure seekTo is between 0 and 1
          const normalizedSeek = Math.max(0, Math.min(1, seekTo));
          wavesurfer.seekTo(normalizedSeek);
        } catch (error) {
          console.error("Error seeking:", error);
        }
      }
    });
  };

  const onPlayPause = () => {
    Object.values(wavesurfers).forEach((ws) => {
      ws.playPause();
    });
  };

  const audio_links = Object.keys(response_test.downloads).map((key) => {
    return {
      key: key,
      value: response.downloads[key as keyof typeof response.downloads],
    };
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-blue-950">
      <div className="flex flex-col gap-8 p-4 max-w-[80rem]">
        <Description_info
          title={description_data.title}
          description={description_data.description}
        />
        <div className="flex flex-col md:flex-row gap-4 w-full">
          {information_data.map((data) => {
            const { id, icon, title, description } = data;
            return (
              <Information_card
                key={id}
                icon={icon}
                title={title}
                description={description}
              />
            );
          })}
        </div>
        <div className="w-full p-4 border-2 border-dashed rounded-lg">
          <button onClick={onPlayPause} className="text-white">
            Play All
          </button>
          {response ? (
            audio_links.map((audio) => {
              const { key, value } = audio;
              return (
                <div key={key} className="flex flex-col gap-4">
                  <Audio_display
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    url={value}
                    onReady={(ws) => onReady(ws, key)}
                    onSeek={onSeek}
                  />
                </div>
              );
            })
          ) : (
            <Upload_input setResponse={setResponse} />
          )}
        </div>
      </div>
    </div>
  );
}
