"use client";

import DescriptionInfo from "@/components/customComponents/DescriptionInfo";
import Information_card from "@/components/customComponents/InformationCard";
import information_data from "@/shared_data/informationData";
import description_data from "@/shared_data/descriptionData";
import UploadInput from "@/components/customComponents/UploadInput";
import { useAudioControls } from "@/context/AudioControlsContext";
import { AudioPlayer } from "@/components/customComponents/waveForm/AudioPlayer";

export default function Home() {
  const { response } = useAudioControls();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-blue-950">
      <div className="flex flex-col gap-8 p-4 w-full max-w-[80rem]">
        <DescriptionInfo
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
          {response?.downloads ? <AudioPlayer /> : <UploadInput />}
        </div>
      </div>
    </div>
  );
}
