// "use server";

// import { redirect } from "next/navigation";
// import { revalidatePath } from "next/cache";

// import { auth } from "@/auth";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import crypto from "crypto";

// const s3Client = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// const allowedFileTypes = ["image/jpeg", "image/png"];
// const maxFileSize = 1048576 * 5; // 5 MB

// const generateFileName = (bytes = 32) =>
//   crypto.randomBytes(bytes).toString("hex");

// export const getSignedURL = async ({ fileType, fileSize, checksum }) => {
//   const session = await auth();

//   if (!session) {
//     return { failure: "not authenticated" };
//   }

//   if (!allowedFileTypes.includes(fileType)) {
//     return { failure: "File type not allowed" };
//   }

//   if (fileSize > maxFileSize) {
//     return { failure: "File size too large" };
//   }

//   const fileName = generateFileName();

//   const putObjectCommand = new PutObjectCommand({
//     Bucket: process.env.AWS_BUCKET_NAME,
//     Key: fileName,
//     ContentType: fileType,
//     ContentLength: fileSize,
//     ChecksumSHA256: checksum,
//     Metadata: {
//       userId: session.user.id,
//     },
//   });

//   const url = await getSignedUrl(
//     s3Client,
//     putObjectCommand,
//     { expiresIn: 60 } // 60 seconds
//   );

//   console.log({ success: url });

//   return { success: { url } };
// };
