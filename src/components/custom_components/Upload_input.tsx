"use client";

import React, { useState, useRef } from "react";
import upload_file from "@/upload_functions";
import Submit_form from "./Submit_form";
const Upload_input = () => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [onHover, setOnHover] = useState<boolean>(false);

  const onFileSelect = (file: File) => {
    setSelectedFile(file);
    console.log("Selected file:", file);
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  async function onSubmitHandler(e: React.FormEvent) {
    e.preventDefault();
    if (selectedFile) {
      upload_file(selectedFile, 1)
        .then((response) => {
          console.log("File uploaded successfully:", response);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      console.error("No file selected for upload.");
    }
  }

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
        <form onSubmit={onSubmitHandler}>
          <Submit_form
            dragActive={dragActive}
            setDragActive={setDragActive}
            onFileSelect={onFileSelect}
            inputRef={inputRef}
            setOnHover={setOnHover}
            onHover={onHover}
          />
        </form>
      )}
    </div>
  );
};

export default Upload_input;
