import React from "react";
import { Slider } from "../ui/slider";

type Props = {};

const ZoomSlider = (props: Props) => {
  return (
    <div className="flex items-center gap-2 mt-4">
      <span>Zoom:</span>
      <input
        type="range"
        min="10"
        max="100"
        defaultValue="50"
        onChange={(e) => handleZoomChange(parseInt(e.target.value))}
        className="w-32"
      />
    </div>
  );
};

export default ZoomSlider;
