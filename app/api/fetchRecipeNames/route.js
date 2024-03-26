import { NextResponse } from "next/server";

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.URI;

//only fetches recipe names for autocomplete search feature
export async function GET() {
  let client; //formatting client this way gets rid of console error

  try {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();
    await client.db("admin").command({ ping: 1 });

    const database = client.db("test");
    const collection = database.collection("posts");

    const query = {};
    const cursor = collection.find(query);
    const documents = await cursor.toArray();

    const recipeNames = documents.map((doc) => doc.recipe_name);

    return NextResponse.json({ recipeNames });
  } catch (error) {
    console.error("MongoDB error:", error);
    return NextResponse.error(`Internal Server Error: ${error.message}`);
  } finally {
    await client.close();
  }
}
