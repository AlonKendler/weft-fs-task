// pages/api/posts/deletePost.ts
import { PostgresClient } from '@/server/dbClient';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.body;

  // Make sure id is provided
  if (!id) {
    return res.status(400).json({ message: 'No post id provided' });
  }

  // Instantiate your client
  const dbClient = new PostgresClient();

  try {
    await dbClient.deletePost(id);
    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(`Failed to delete the post:`, error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
