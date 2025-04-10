"use client";

import { type PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { useState, useRef } from "react";
import uploadFile from "@/fetchFunc/uploadFunctions";

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [uploading, setUploading] = useState(false);
  const timeoutPromise = (ms: number) =>
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Upload timed out")), ms)
    );

  return (
    <>
      <h1>Upload Your Avatar</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setUploading(true);

          try {
            if (!inputFileRef.current?.files) {
              throw new Error("No file selected");
            }

            const file = inputFileRef.current.files[0];

            const newBlob = (await Promise.race([
              upload(file.name, file, {
                access: "public",
                handleUploadUrl: "/api/upload",
              }),
              timeoutPromise(300000),
            ])) as PutBlobResult;

            const url = newBlob.url;

            await uploadFile(url, 2);
            setBlob(newBlob);
          } catch (e) {
            console.error("Error uploading file:", e);
          } finally {
            setUploading(false);
          }
        }}
      >
        <input
          name="file"
          ref={inputFileRef}
          type="file"
          accept=".mp3,.wav"
          required
        />
        <button type="submit">Upload</button>
      </form>
      {blob && (
        <div>
          {uploading && <p>Uploading...</p>}
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
  );
}
