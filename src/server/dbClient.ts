// dbClient.ts
import { sql } from '@vercel/postgres';

export class PostgresClient {
  // async fetchUsers(url: string) {
  //   const response = await fetch(url);
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }
  //   const users = await response.json();
  //   return users;
  // }

  async getPostsByUserId(userId: string) {
    const result = await sql`SELECT * FROM posts WHERE userId = ${userId}`;
    return result.rows;
  }

  async deletePost(id: number) {
    await sql`DELETE FROM posts WHERE id = ${id}`;
  }

  async insertPosts(posts: any[]) {
    for (let post of posts) {
      await sql`INSERT INTO posts (id, title, body, userId) VALUES (${post.id}, ${post.title}, ${post.body}, ${post.userId})`;
    }
  }
}
