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

## Live Demo

A live demonstration of the project is available at [weft-fs-task.vercel.app](https://weft-fs-task.vercel.app/).

### Changes in Demo Version

The demo version of the project implements a few significant changes:

1. **Postgres Database Client**: In this version, we have replaced the MySQL database client with a Postgres database client. It interacts with a Postgres database, offering the same functionalities as the MySQL client.

2. **Deployment on Vercel**: This version is deployed using [Vercel](https://vercel.com/), a platform ideal for frontend frameworks like Next.js. It provides features like automatic HTTPS, custom domains, and continuous deployment right out of the box.

3. **Code Differences**: To better understand the modifications made in the demo version, you can view the diff [here](https://github.com/AlonKendler/weft-fs-task/compare/main...demo?diff=unified).

Feel free to explore the live demo and inspect the changes made in the demo version. These changes are aimed at enhancing the project's functionality and deployment setup, thus making it more robust and scalable for real-world applications.
