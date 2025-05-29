import { connectToDatabase } from '../../../utils/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const collection = db.collection('posts');

  if (req.method === 'GET') {
    const posts = await collection.find({}).sort({ date: -1 }).toArray();
    return res.status(200).json(posts);
  }

  if (req.method === 'POST') {
    const { title, content, slug } = req.body;
    if (!title || !content || !slug) return res.status(422).json({ message: 'Missing fields' });

    const newPost = {
      title,
      content,
      slug,
      date: new Date()
    };
    const result = await collection.insertOne(newPost);
    return res.status(201).json(result.ops?.[0] || newPost);
  }

  res.status(405).end();
}