import React from "react";

type Props = {
  onFileSelect: (file: File) => void;
  dragActive: boolean;
  setDragActive: React.Dispatch<React.SetStateAction<boolean>>;
  setOnHover: React.Dispatch<React.SetStateAction<boolean>>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onHover: boolean;
};

const Submit_form = ({
  onFileSelect,
  dragActive,
  setDragActive,
  setOnHover,
  onHover,
  inputRef,
}: Props) => {
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };
  return (
    <div
      className={`w-full p-4 border-2 border-dashed rounded-lg text-center cursor-pointer
  ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"} ${
        onHover ? "bg-blue-50/40" : "bg-white/20"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={onButtonClick}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleChange}
        accept=".mp3, .wav"
      />
      <p className="text-white">
        Drag and drop your song here or click to select
      </p>
    </div>
  );
};

export default Submit_form;
