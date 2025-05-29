import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
  const { title, content, collection } = req.body; // retrieve collection from the request body

  if (!title || !content || !collection) { // check if collection is missing
    return res.status(422).json({ message: 'Invalid input' });
  }

  try {
    const { db } = await connectToDatabase(); // use the exported function

    const result = await db.collection(collection.toString()).insertOne({ // use collection value here
      title,
      content,
    });

    res.status(201).json({
      message: 'Blog added!',
      data: result.ops[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Could not add blog' });
  }
}