import React from "react";

type Props = {
  title: string;
  description: string;
};

const DescriptionInfo = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-white leading-14 text-[3rem] text-center font-bold">
        {title}
      </h2>
      <p className="text-white/80 text-center text-[1.5rem] font-light">
        {description}
      </p>
    </div>
  );
};

export default DescriptionInfo;
