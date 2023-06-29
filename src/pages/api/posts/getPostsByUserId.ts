// pages/api/posts/getPostByUserId.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from "@vercel/postgres";

import { Post } from '@/types';
import { paginate } from '@/utils/pagination';

const POSTS_API = "https://jsonplaceholder.typicode.com/posts?userId=";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    console.log("asdads")
  // Check if request method is GET
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Extract query parameters
  const userId = String(req.query.userId);
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);

  // todo: create dbclient for sql querys, and use it here. later we will only change it, and code here would be the same
  try {
    // Get posts from the database
    const result = await sql`SELECT * FROM posts WHERE userId = ${userId}`;

    // Check if posts exist in the database
    if (result.rows.length > 0) {
      console.log(`[api/postsWithPostgres] Posts found in the database for userId: ${userId}`);
      const paginatedPosts = paginate(result.rows, limit, page);
      return res.status(200).json(paginatedPosts);
    }

    // If not, fetch posts from the JSONPlaceholder API
    console.log(`[api/postsWithPostgres] No posts found in the database for userId: ${userId}. Fetching from the API...`);
    const response = await fetch(`${POSTS_API}${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response into an array of posts.
    const posts: Post[] = await response.json();

    // Store the posts in the database.
    for(let post of posts) {
      await sql`INSERT INTO posts (id, title, body, userId) VALUES (${post.id}, ${post.title}, ${post.body}, ${post.userId})`;
    }

    const paginatedPosts = paginate(posts, limit, page);

    return res.status(200).json(paginatedPosts);
  } catch (error) {
    console.error(`Failed to fetch posts for user with ID ${userId}:`, error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
