"use client";

import React, { useState, useRef } from "react";
const Upload_input = () => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [onHover, setOnHover] = useState<boolean>(false);

  const onFileSelect = (file: File) => {
    setSelectedFile(file);
    console.log("Selected file:", file);
  };
  const inputRef = useRef<HTMLInputElement>(null);

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
    <div>
      {selectedFile ? (
        <div>
          <div
            className={`w-full p-4 border-2 border-dashed rounded-lg text-center cursor-pointer ${
              onHover ? "bg-blue-50/40" : "bg-white/20"
            }`}
            onMouseEnter={() => setOnHover(true)}
            onMouseLeave={() => setOnHover(false)}
          >
            <p className="text-white">{selectedFile.name}</p>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Upload_input;
