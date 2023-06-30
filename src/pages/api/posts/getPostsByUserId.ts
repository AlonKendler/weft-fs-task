// pages/api/posts/getPostByUserId.ts
import { NextApiRequest, NextApiResponse } from 'next';


import { paginate } from '@/utils/pagination';
import { PostgresClient } from '@/server/dbClientPostgres';
import { Post } from '@/types';

const POSTS_API = "https://jsonplaceholder.typicode.com/posts?userId=";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if request method is GET
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Extract query parameters
  const userId = String(req.query.userId);
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);

  // Instantiate your client
  const dbClient = new PostgresClient();

  try {
    // Get posts from the database
    const posts = await dbClient.getPostsByUserId(userId);

    // Check if posts exist in the database
    if (posts.length > 0) {
      console.log(`[api/postsWithPostgres] Posts found in the database for userId: ${userId}`);
      const paginatedPosts = paginate(posts, limit, page);
      return res.status(200).json(paginatedPosts);
    }

    // If not, fetch posts from the API
    console.log(`[api/postsWithPostgres] No posts found in the database for userId: ${userId}. Fetching from the API...`);
    const response = await fetch(`${POSTS_API}${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response into an array of posts.
    const postsFromApi: Post[] = await response.json();

    // Store the posts in the database.
    await dbClient.insertPosts(postsFromApi);

    const paginatedPosts = paginate(postsFromApi, limit, page);

    return res.status(200).json(paginatedPosts);
  } catch (error) {
    console.error(`Failed to fetch posts for user with ID ${userId}:`, error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
