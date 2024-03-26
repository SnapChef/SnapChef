import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { id, updatedBio, updatedPfp } = await req.json();

    // Define an empty object to store the fields that need to be updated
    const updateFields = {};

    // Check if updatedBio is provided and add it to the updateFields object
    if (updatedBio !== undefined) {
      updateFields.bio = updatedBio;
    }

    // Check if updatedPfp is provided and add it to the updateFields object
    if (updatedPfp !== undefined) {
      updateFields.pfpUrl = updatedPfp;
    }

    // Update the user with only the provided fields
    const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    return NextResponse.json({
      message: "Successfully Updated User.",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error(new Error("Failed to update user"), 500); // Return an error response if there's an error
  }
}
