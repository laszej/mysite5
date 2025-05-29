// pages/api/posts.js
import { connectToDatabase } from "../../utils/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { title, content, slug } = req.body;

  if (!title || !content || !slug) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const { db } = await connectToDatabase();
    const result = await db.collection("posts").insertOne({ title, content, slug });
    res.status(201).json({ message: "Post created", data: result.ops?.[0] ?? null });
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
