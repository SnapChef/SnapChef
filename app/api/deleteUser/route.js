import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import Post from "@/models/post";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const bucketName = process.env.AWS_BUCKET_NAME;

async function deleteS3Object(url) {
  if (url) {
    const parts = url.split("/");
    const datePart = parts[parts.length - 2];
    const idPart = parts[parts.length - 1];
    const objectKey = `${datePart}/${idPart}`;
    console.log("objectKey", objectKey);
    if (objectKey) {
      await s3.deleteObject({ Bucket: bucketName, Key: objectKey }).promise();
    }
  }
}

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    console.log("token", session);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    await connectMongoDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const pfpUrl = user.pfpUrl;
    const postIds = user.posts;
    const posts = await Post.find({ _id: { $in: postIds } });
    const recipeImgUrls = posts.map((post) => post.recipe_image);

    await Promise.all([
      Post.deleteMany({ _id: { $in: posts } }),
      ...recipeImgUrls.map((url) => deleteS3Object(url)),
      deleteS3Object(pfpUrl),
    ]);

    await User.findByIdAndDelete(userId);

    return NextResponse.json(
      { message: "User profile deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete user profile:", error);
    return NextResponse.json(
      { message: "Failed to delete user profile" },
      { status: 500 }
    );
  }
}
