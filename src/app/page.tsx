"use client";

import Description_info from "@/components/custom_components/Description_info";
import Information_card from "@/components/custom_components/Information_card";
import information_data from "@/shared_data/information_data";
import description_data from "@/shared_data/description_data";
import Upload_input from "@/components/custom_components/Upload_input";
import { useAudioControls } from "@/context/Audio_controls_context";
import { AudioPlayer } from "@/components/custom_components/waveForm/AudioPlayer";

export default function Home() {
  const { response } = useAudioControls();

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
          {response?.downloads ? <AudioPlayer /> : <Upload_input />}
        </div>
      </div>
    </div>
  );
}
