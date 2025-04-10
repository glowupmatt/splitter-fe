async function uploadFile(link: string, mode: 2 | 4) {
  try {
    if (!link) {
      throw new Error("No link uploaded");
    }

    const formData = new FormData();
    formData.append("link", link);
    formData.append("mode", mode.toString());

    const response = await fetch("/api/split_stems", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in uploadlink:", error);
    throw error;
  }
}

export default uploadFile;
