/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useRef } from "react";
import uploadFile from "@/fetchFunc/uploadFunctions";
import SubmitForm from "./SubmitForm";
import SpinnerComponent from "./SpinnerComponent";
import { useAudioControls } from "@/context/AudioControlsContext";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { upload } from "@vercel/blob/client";
import { PutBlobResult } from "@vercel/blob";

const UploadInput = () => {
  const { setResponse } = useAudioControls();
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [mode, setMode] = useState<2 | 4>(2);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [onHover, setOnHover] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonHovered, setButtonHovered] = useState<boolean>(false);

  const timeoutPromise = (ms: number) =>
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Upload timed out")), ms)
    );

  const onFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleModeChange = () => {
    setMode((prevMode) => (prevMode === 2 ? 4 : 2));
    setResponse(null);
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  async function onSubmitHandler(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (selectedFile) {
        const newBlob = (await Promise.race([
          upload(selectedFile.name, selectedFile, {
            access: "public",
            handleUploadUrl: "/api/upload",
          }),
          timeoutPromise(300000),
        ])) as PutBlobResult;

        const url = newBlob.url;

        const splitTrack = await uploadFile(url, mode);
        setResponse(splitTrack);
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
        <div className="flex justify-between items-center">
          {selectedFile ? (
            <div>
              <div
                onMouseEnter={() => setOnHover(true)}
                onMouseLeave={() => setOnHover(false)}
              >
                {isLoading ? (
                  <div className="w-full flex justify-center items-center flex-col gap-2 text-white">
                    <SpinnerComponent />
                    <p>Processing Audio</p>
                  </div>
                ) : (
                  <p className="text-white">{selectedFile.name}</p>
                )}
              </div>
            </div>
          ) : (
            <>
              <SubmitForm
                dragActive={dragActive}
                setDragActive={setDragActive}
                onFileSelect={onFileSelect}
                inputRef={inputRef}
                setOnHover={setOnHover}
                onHover={onHover}
              />
            </>
          )}
          <div className="flex text-white items-center gap-2">
            <p>Get Two Stems</p>
            <Switch onClick={handleModeChange} />
            <p>Get All Four Stems</p>
          </div>
        </div>
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

export default UploadInput;
