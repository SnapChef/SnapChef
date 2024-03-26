// Import necessary modules and models
import { connectMongoDB } from "@/lib/mongodb";
import Comment from "@/models/comment";
import { NextResponse } from "next/server";

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams;
    const recipeId = searchParams.get("recipe_id");

    try {
        await connectMongoDB();

        // find comments with matching recipe id
        const comments = await Comment.find({ recipe_id: recipeId });

        if (!comments || comments.length === 0) {
            return NextResponse.json(
                { message: "No comments found for the provided recipe ID" },
                { status: 404 }
            );
        }

        // Return the comments
        return NextResponse.json({ comments: comments });
    } catch (error) {
        console.error("Error fetching comments:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
