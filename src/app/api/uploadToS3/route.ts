import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { NextResponse } from "next/server";

// Create S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Helper function to upload to S3
async function uploadFileToS3(file: File, key: string): Promise<string> {
  if (!file) {
    throw new Error("No file provided");
  }

  const fileBuffer = Buffer.from(await file.arrayBuffer());

  console.log("Uploading file to S3:", file.name);

  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: `originals/${key}`,
      Body: fileBuffer,
      ContentType: "audio/mpeg", // Set the content type based on your file type
    },
  });

  // Perform the upload
  const result = await upload.done();
  console.log("Upload Successful:", result);

  console.log("Upload successful:", result);
  const url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/originals/${key}`;

  console.log("File URL:", url);
  // Return the URL of the uploaded file
  // https://rendered-stem-bucket.s3.us-west-2.amazonaws.com/originals/
  return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/originals/${key}`;
}

// The actual API endpoint handler
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Generate a unique key for the file
    const key = `${Date.now()}-${file.name}`;

    // Upload to S3
    const url = await uploadFileToS3(file, key);

    console.log("Upload successful, URL:", url);

    // Return success response
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Error in upload endpoint:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
