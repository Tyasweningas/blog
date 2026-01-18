# Blog Platform API

A robust backend for a blog platform built with Node.js, Express, and MongoDB.

## Features

- **Authentication**: JWT-based login/register with password hashing (bcryptjs).
- **Post Management**: Full CRUD operations with search and pagination.
- **Comment System**: Users can comment on posts and manage their own comments.
- **Authorization**: Secure middleware ensuring only authors can edit/delete their content.
- **Search & Pagination**: Find posts by title/content and navigate through pages.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Security**: JWT & Bcryptjs

## API Endpoints

### Auth
- `POST /api/auth/register` - Create a new user
- `POST /api/auth/login` - Authenticate user
- `GET /api/auth/profile` - Get user profile and posts (Protected)

### Posts
- `GET /api/posts` - List posts (Query params: `search`, `page`, `limit`)
- `GET /api/posts/:id` - Get single post with comments
- `POST /api/posts` - Create post (Protected)
- `PUT /api/posts/:id` - Update post (Owner only)
- `DELETE /api/posts/:id` - Delete post (Owner only)

### Comments
- `POST /api/posts/:id/comments` - Add comment (Protected)
- `GET /api/posts/:id/comments` - List comments for post
- `PUT /api/comments/:id` - Update comment (Owner only)
- `DELETE /api/comments/:id` - Delete comment (Owner only)

## Setup

1. `npm install`
2. Create `.env` file with `MONGODB_URI` and `JWT_SECRET`.
3. `npm run dev`
