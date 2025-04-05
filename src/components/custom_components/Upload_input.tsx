"use client";

import React, { useState, useRef } from "react";
import upload_file from "@/fetch_func/upload_functions";
import Submit_form from "./Submit_form";
import Spinner_component from "./Spinner_component";
import { useAudioControls } from "@/context/Audio_controls_context";
import { Button } from "../ui/button";

const Upload_input = () => {
  const { setResponse } = useAudioControls();
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [onHover, setOnHover] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonHovered, setButtonHovered] = useState<boolean>(false);

  const onFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  async function onSubmitHandler(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (selectedFile) {
        const data = await upload_file(selectedFile, 2);
        setResponse(data);
      }
    } catch (error) {
      console.error("Error clearing input value:", error);
    } finally {
      setSelectedFile(null);
      setOnHover(false);
      setDragActive(false);
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
      <div
        className={`text-center cursor-pointer p-6
          ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"} ${
          onHover ? "bg-blue-50/40" : "bg-white/20"
        }`}
      >
        {selectedFile ? (
          <div>
            <div
              onMouseEnter={() => setOnHover(true)}
              onMouseLeave={() => setOnHover(false)}
            >
              {isLoading ? (
                <div className="w-full flex justify-center items-center flex-col gap-2 text-white">
                  <Spinner_component />
                  <p>Processing Audio</p>
                </div>
              ) : (
                <p className="text-white">{selectedFile.name}</p>
              )}
            </div>
          </div>
        ) : (
          <>
            <Submit_form
              dragActive={dragActive}
              setDragActive={setDragActive}
              onFileSelect={onFileSelect}
              inputRef={inputRef}
              setOnHover={setOnHover}
              onHover={onHover}
            />
          </>
        )}
      </div>
      <Button
        onMouseEnter={() => setButtonHovered(true)}
        onMouseLeave={() => setButtonHovered(false)}
        className={`cursor-pointer transition-colors duration-200 ${
          buttonHovered ? "bg-blue-500" : "bg-blue-600"
        }`}
      >
        Split Track
      </Button>
    </form>
  );
};

export default Upload_input;
