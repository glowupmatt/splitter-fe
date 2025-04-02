import React from "react";

type Props = {
  title: string;
  description: string;
};

const Description_info = ({ title, description }: Props) => {
  return (
    <div>
      <h2 className="text-white text-[3rem] text-center font-bold">{title}</h2>
      <p className="text-white/80 text-center text-[1.5rem] font-light">
        {description}
      </p>
    </div>
  );
};

export default Description_info;
