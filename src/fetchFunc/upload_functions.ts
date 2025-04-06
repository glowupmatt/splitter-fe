async function uploadFile(file: File, mode: 2 | 4) {
  try {
    if (!file) {
      throw new Error("No file uploaded");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("mode", mode.toString());

    const response = await fetch("/api/split_stems", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Response from server:", data);
    return data;
  } catch (error) {
    console.error("Error in uploadFile:", error);
    throw error;
  }
}

export default uploadFile;
