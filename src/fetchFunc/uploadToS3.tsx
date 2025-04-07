import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

// Create S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

/**
 * Upload a file to S3
 * @param file The file to upload
 * @param key The key (filename) to use in S3
 * @returns The URL of the uploaded file
 */
export async function uploadToS3(
  file: File | Buffer,
  key: string
): Promise<string> {
  try {
    // Convert File to buffer if needed
    let fileBuffer: Buffer;
    if (file instanceof File) {
      const arrayBuffer = await file.arrayBuffer();
      fileBuffer = Buffer.from(arrayBuffer);
    } else {
      fileBuffer = file;
    }

    // Set up the upload parameters
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: key,
        Body: fileBuffer,
        ContentType:
          file instanceof File ? file.type : "application/octet-stream",
        // Optional: make the file public
        ACL: "public-read",
      },
    });

    // Perform the upload
    const result = await upload.done();

    console.log("Upload successful:", result);

    // Return the URL of the uploaded file
    return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/originals/${key}`;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
}
