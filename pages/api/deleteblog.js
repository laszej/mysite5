// pages/api/deleteblog.js

import { connectToDatabase } from '../../utils/mongodb';
import { ObjectId } from 'mongodb';

function isValidObjectId(id) {
  return typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id);
}

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Only DELETE requests allowed' });
  }

  const { id, collection } = req.query;

  if (!id || !collection) {
    return res.status(400).json({ message: 'Missing id or collection name' });
  }

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid ObjectId format' });
  }

  try {
    const { db } = await connectToDatabase();

    const result = await db.collection(collection).deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No document found with this ID' });
    }

    return res.status(200).json({ message: 'Successfully deleted' });
  } catch (err) {
    console.error('🔥 DELETE error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
