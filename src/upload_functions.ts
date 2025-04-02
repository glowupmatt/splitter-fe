async function upload_file(file: File, mode: number) {
  try {
    if (!file) {
      return new Response("No file uploaded", { status: 400 });
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("mode", mode.toString());

    const response = await fetch("/api/upload_file", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload file");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in upload_file:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export default upload_file;
