import { connectToDatabase } from '../../../utils/mongodb';

export default async function handler(req, res) {
  const { slug } = req.query;
  const { db } = await connectToDatabase();
  const collection = db.collection('posts');

  if (req.method === 'GET') {
    const post = await collection.findOne({ slug });
    if (!post) return res.status(404).json({ message: 'Not found' });
    return res.status(200).json(post);
  }

  if (req.method === 'PUT') {
    const { title, content } = req.body;
    const result = await collection.findOneAndUpdate(
      { slug },
      { $set: { title, content } },
      { returnDocument: 'after' }
    );
    return res.status(200).json(result.value);
  }

  if (req.method === 'DELETE') {
    await collection.deleteOne({ slug });
    return res.status(204).end();
  }

  res.status(405).end();
}
