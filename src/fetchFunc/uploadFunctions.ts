async function uploadFile(file: File, mode: 2 | 4) {
  try {
    if (!file) {
      throw new Error("No file uploaded");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("mode", mode.toString());

    console.log("Uploading file:", file);

    // Send the file to S3 first then to the function

    const s3Url = await fetch("/api/uploadToS3", {
      method: "POST",
      body: formData,
    });

    console.log("S3 URL:", await s3Url.json());

    // const response = await fetch("/api/split_stems", {
    //   method: "POST",
    //   body: formData,
    // });

    // if (!response.ok) {
    //   throw new Error(`Upload failed: ${response.statusText}`);
    // }

    // const data = await response.json();
    // console.log("Response from server:", data);
    // return data;
    return s3Url;
  } catch (error) {
    console.error("Error in uploadFile:", error);
    throw error;
  }
}

export default uploadFile;
