import { connectToDatabase } from "./mongodb";

export async function addBlog(title, content) {
  const { db } = await connectToDatabase();
  const blog = {
    title,
    content,
    createdAt: new Date(),
  };
  const result = await db.collection("blogs").insertOne(blog);
  return result.ops[0];
}