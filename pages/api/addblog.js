import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { title, content, collection } = req.body;

  if (!title || !content || !collection) {
    return res.status(422).json({ message: 'Invalid input' });
  }

  try {
    const { db } = await connectToDatabase();

    const result = await db.collection(collection.toString()).insertOne({
      title,
      content,
    });

    res.status(201).json({
      message: 'Blog added!',
      data: result.ops?.[0] ?? result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Could not add blog' });
  }
}
