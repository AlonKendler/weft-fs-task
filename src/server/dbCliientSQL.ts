import mysql from 'mysql2/promise';

export class MySQLClient {
  private connection: mysql.Connection | null = null;

  constructor() {
    this.init();
  }

  private async init() {
    this.connection = await mysql.createConnection({
      host: 'localhost',
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });
  }

  async getPostsByUserId(userId: string) {
    const [rows] = await this.connection!.query('SELECT * FROM posts WHERE userId = ?', [userId]);
    return rows;
  }

  async deletePost(id: number) {
    await this.connection!.query('DELETE FROM posts WHERE id = ?', [id]);
  }

  async insertPosts(posts: any[]) {
    for (let post of posts) {
      await this.connection!.query('INSERT INTO posts (id, title, body, userId) VALUES (?, ?, ?, ?)', 
      [post.id, post.title, post.body, post.userId]);
    }
  }
}
