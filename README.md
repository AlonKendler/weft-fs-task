# Weft FS Task

This project showcases a robust, modern full-stack application using Node.js, TypeScript, Next.js, and MySQL. The application is centered around a RESTful API that interacts with a MySQL database to manage blog posts for specific users.

## Project Overview

### API

The API is the backbone of this project. It resides in the `/pages/api/posts` directory and is built using Next.js API Routes. The API includes three primary endpoints:

1. **getPostsByUserId**: Accepts a GET request with a user ID as a query parameter. It returns all posts corresponding to the provided user ID. If the posts are not already in our database, the API fetches them from the JSONPlaceholder API, stores them in our database, and then serves them.

2. **deletePost**: Accepts a POST request with a post ID in the body. It deletes the specified post from the database. If the ID is not provided, it returns an error.

3. **insertPosts**: Accepts a POST request with an array of posts in the body. It inserts these posts into the database.

### Database Clients

This application employs a MySQL database client, which leverages the `mysql2/promise` module to communicate with a MySQL database. It offers the following methods:

- `getPostsByUserId(userId: string)`: Fetches all posts associated with a specific user from the database.

- `deletePost(id: number)`: Deletes a particular post from the database.

- `insertPosts(posts: any[])`: Inserts an array of posts into the database.

- `createTablesIfNeeded()`: Initializes the database by creating the necessary tables if they do not already exist.

### Deployment

The deployment process has been automated using a startup shell script `startup.sh`. This script takes care of pulling the latest changes, installing dependencies, building the application, setting up the Dockerized MySQL database, and finally, starting the server. The deployment script is integrated into the `package.json` file as an NPM script, enabling the deployment of the application using a single command `npm run deploy`.

### Usage

To deploy the application:

```sh
npm run deploy
```
