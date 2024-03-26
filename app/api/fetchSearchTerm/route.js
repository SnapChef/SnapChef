import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const term = searchParams.get("term");

  try {
    
    await connectMongoDB();
    const query = { recipe_name: { $regex: term, $options: "i" } };
    const documents = await Post.find(query);

    if (!documents || documents.length === 0) {
      return NextResponse.json(
        { message: "No recipe(s) found!" },
        { status: 404 }
      );
    }

    return NextResponse.json({ documents: documents });
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
