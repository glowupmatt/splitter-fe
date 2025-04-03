"use client";

import React, { useState, useRef } from "react";
import upload_file from "@/upload_functions";
import Submit_form from "./Submit_form";
import Spinner_component from "./Spinner_component";
import { Button } from "../ui/button";
import { SplitAudioResponse } from "@/types/split_audio_types";

const Upload_input = () => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [onHover, setOnHover] = useState<boolean>(false);
  const [response, setResponse] = useState<SplitAudioResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        console.log("Response from server:", data);
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
    <div>
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
        {selectedFile ? (
          <div>
            <div
              className={`w-full p-4 border-2 border-dashed rounded-lg text-center cursor-pointer ${
                onHover ? "bg-blue-50/40" : "bg-white/20"
              }`}
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
        <Button className="cursor-pointer">Split Track</Button>
      </form>
    </div>
  );
};

export default Upload_input;
