import { connectToDatabase } from "../../utils/mongodb";

export default async function handler(req, res) {
  const { collection } = req.query;
  const { db } = await connectToDatabase();

  const blogs = await db.collection(collection).find({}).toArray();

  res.status(200).json(blogs);
}