# Welcome to Travel Log Web App!

This platform allows users to register and share their travel experiences. Whether you're a seasoned globetrotter or a weekend explorer, this app provides a space to document and discover amazing journeys.

## Quick Links

- [Authentication Controller Documentation](#authentication-controller-documentation)
- [Posts Controller Documentation](#posts-controller-documentation)
- [User Controller Documentation](#user-controller-documentation)

## Getting Started

To get started with Travel Log Web App, follow these simple steps:

- **Install dependencies for server:**
  - `cd server`
  - `npm install`

- **Install dependencies for client:**
  - `cd client`
  - `npm install`

- **Run the Express server only:**
  - `cd server`
  - `npm start`

- **Run the React client only:**
  - `cd client`
  - `npm run dev`

## User Registration/Login

- Easily create an account or log in using existing credentials.
- Dashboard: A personalized space for users to view and manage their shared travel experiences.
- Experience Sharing: Intuitive forms to document and share travel experiences with the community.

## Functionality

### User Registration and Authentication

New users can register by providing basic information, and existing users can log in securely. Authentication is handled using JSON Web Tokens (JWT) to ensure a secure experience.

### Travel Experience Sharing

Users can share their travel experiences by filling out a comprehensive form that includes details such as location, photo, cost, and description.

# SERVER DOCUMENTATION

## Authentication Controller Documentation

### Register User

**POST /auth/register**

Register a new user with the provided information.

**Request:**
- Method: POST
- Endpoint: /auth/register
- Headers: Content-Type: application/json
- Body: { "firstName": "John", "lastName": "Doe", "email": "john.doe@example.com", "password": "securePassword123", "repeatPassword": "securePassword123", "userAvatar": "base64EncodedImage", "isAdmin": false }

**Response:**
- Success (200): "User registered"
- Error (400): "Error message describing the issue"

### Login User

**POST /auth/login**

Authenticate and log in an existing user with the provided credentials.

**Request:**
- Method: POST
- Endpoint: /auth/login
- Headers: Content-Type: application/json
- Body: { "email": "john.doe@example.com", "password": "securePassword123" }

**Response:**
- Success (200): "JWT Token"
- Error (400): "Error message describing the issue"

### HOME END POINT

#### Get All Posts

**GET /posts**

Retrieve all posts available in the system.

**Request:**
- Method: GET
- Endpoint: /posts
- Headers: Content-Type: application/json

**Response:**
- Success (200): Array of posts
- Error (400): "Error message describing the issue"

# Travel Experience Sharing Web App

## Posts Controller Documentation

The Posts Controller provides endpoints for managing travel posts on the platform.

### Create a New Post

**POST /posts/create**

Create a new travel post.

**Request:**
- Method: POST
- Endpoint: /posts/create
- Headers: Content-Type: application/json, Authorization: Bearer `<access_token>`
- Body: { "country": "United States", "city": "New York", "imageUrl": "https://example.com/image.jpg", "cost": 1000, "description": "An amazing journey to the Big Apple" }

**Response:**
- Success (201): Created post object
- Error (401): "Error message describing the issue"

### Get a Post by ID

**GET /posts/:postId**

Retrieve details of a specific travel post.

**Request:**
- Method: GET
- Endpoint: /posts/:postId

**Response:**
- Success (200): Post object
- Error (400): "Error message describing the issue"

### Delete a Post

**DELETE /posts/:postId**

Delete a travel post.

**Request:**
- Method: DELETE
- Endpoint: /posts/:postId
- Headers: Authorization: Bearer `<access_token>`

**Response:**
- Success (200): "Post Deleted"
- Error (401): "Error message describing the issue"

### Edit a Post

**PUT /posts/:postId/edit**

Edit an existing travel post.

**Request:**
- Method: PUT
- Endpoint: /posts/:postId/edit
- Headers: Content-Type: application/json, Authorization: Bearer `<access_token>`
- Body: { "country": "Updated Country", "city": "Updated City", "imageUrl": "https://example.com/updated-image.jpg", "cost": 1200, "description": "An updated description" }

**Response:**
- Success (200): Updated post object
- Error (401): "Error message describing the issue"

## User Controller Documentation

The User Controller provides endpoints for managing user information on the platform.

## Get All Users

**GET /users**

Retrieve a list of all users.

**Request:**
- Method: GET
- Endpoint: /users
- Headers: Authorization: Bearer `<access_token>`

**Response:**
- Success (200): Array of user objects
- Error (401): "Error message describing the issue"

## Get a User by ID

**GET /users/:userId**

Retrieve details of a specific user.

**Request:**
- Method: GET
- Endpoint: /users/:userId
- Headers: Authorization: Bearer `<access_token>`

**Response:**
- Success (200): User object
- Error (401): "Error message describing the issue"

## Edit a User

**PUT /users/:userId/edit**

Edit user information.

**Request:**
- Method: PUT
- Endpoint: /users/:userId/edit
- Headers: Content-Type: application/json, Authorization: Bearer `<access_token>`
- Body: { "firstName": "Updated First Name", "lastName": "Updated Last Name", "isAdmin": true }

**Response:**
- Success (200): Updated user object
- Error (401): "Error message describing the issue"

## Delete a User

**DELETE /users/:userId**

Delete a user.

**Request:**
- Method: DELETE
- Endpoint: /users/:userId
- Headers: Authorization: Bearer `<access_token>`

**Response:**
- Success (200): "User Deleted"
- Error (401): "Error message describing the issue"
