import Description_info from "@/components/custom_components/Description_info";
import Information_card from "@/components/custom_components/Information_card";
import information_data from "@/shared_data/information_data";
import description_data from "@/shared_data/description_data";
import Upload_input from "@/components/custom_components/Upload_input";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 min-h-screen bg-gradient-to-b from-black to-blue-950 p-4">
      <Description_info
        title={description_data.title}
        description={description_data.description}
      />
      <div className="flex gap-4 w-full">
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
      <Upload_input />
    </div>
  );
}
