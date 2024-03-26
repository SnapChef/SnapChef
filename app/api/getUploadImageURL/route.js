import AWS from "aws-sdk";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const { existingKey, id } = await req.json();

    // Configure AWS
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    // Set parameters for the S3 bucket and object
    const bucketName = process.env.AWS_BUCKET_NAME;

    if (existingKey) {
      console.log("deleted", existingKey);
      await s3.deleteObject({ Bucket: bucketName, Key: existingKey }).promise();
    }

    const uuid = uuidv4();

    // Get current date in ISO format (e.g., "2024-02-28")
    const currentDate = new Date().toISOString().split("T")[0];

    // Combine UUID and date to form object key
    const objectKey = `${currentDate}/${uuid}`;

    // Set expiration time for the pre-signed URL (e.g., 30 min)
    const expirationSeconds = 1800;

    // Generate the pre-signed URL
    const params = {
      Bucket: bucketName,
      Key: objectKey,
      Expires: expirationSeconds,
      ContentType: "image/jpeg",
      Metadata: { user_id: id },
    };

    const uploadUrl = await s3.getSignedUrlPromise("putObject", params);
    const imageUrl = "https://d205s045u32g9w.cloudfront.net/" + objectKey;

    // Return the pre-signed URL to the client
    return NextResponse.json({ uploadUrl, imageUrl }, { status: 200 });
  } catch (error) {
    console.error("Error generating pre-signed URL:", error);
    return NextResponse.json(
      { message: "An error has occurred while generating pre-signed URL." },
      { status: 500 }
    );
  }
}
