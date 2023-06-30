import mysql from 'mysql2/promise';

export class MySQLClient {
  private pool: mysql.Pool;

  constructor() {
    this.pool = mysql.createPool({
      host: 'localhost',
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
    });
    this.init();
  }

  async init() {
    await this.createTablesIfNeeded();
  }

  async getPostsByUserId(userId: string) {
    const [rows] = await this.pool.query<mysql.RowDataPacket[]>('SELECT * FROM posts WHERE userId = ?', [userId]);
    return rows;
}

  async deletePost(id: number) {
    await this.pool.query('DELETE FROM posts WHERE id = ?', [id]);
  }

  async insertPosts(posts: any[]) {
    for (let post of posts) {
      await this.pool.query('INSERT INTO posts (id, title, body, userId) VALUES (?, ?, ?, ?)', 
      [post.id, post.title, post.body, post.userId]);
    }
  }

  async createTablesIfNeeded() {
    const createTableSql = `
      CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT,
        title VARCHAR(255),
        body TEXT,
        userId INT,
        PRIMARY KEY (id)
      );
    `;
    await this.pool.query(createTableSql);
  }
}
