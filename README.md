Welcome to Travel Log Web App! This platform allows users to register, share their travel experiences. 
Whether you're a seasoned globetrotter or a weekend explorer, this app provides a space to document and discover amazing journeys.

Getting Started
To get started with Travel Log Web App, follow these simple steps:

# Install dependencies for server
cd server
npm install

# Install dependencies for client
cd client
npm install

# Run the Express server only
cd server
npm start

# Run the React client only
cd client
npm run dev

User Registration/Login: Easily create an account or log in using existing credentials.
Dashboard: A personalized space for users to view and manage their shared travel experiences.
Experience Sharing: Intuitive forms to document and share travel experiences with the community.

Functionality
User Registration and Authentication
New users can register by providing basic information, and existing users can log in securely. Authentication is handled using JSON Web Tokens (JWT) to ensure a secure experience.

Travel Experience Sharing
Users can share their travel experiences by filling out a comprehensive form that includes details such as location, photo, cost and desciption.

SERVER DOCUMENTATION
Authentication Controller Documentation

Register User
POST /auth/register
Register a new user with the provided information.

Request
Method: POST
Endpoint: /auth/register
Headers:
Content-Type: application/json
Body:
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "repeatPassword": "securePassword123",
  "userAvatar": "base64EncodedImage",
  "isAdmin": false
}
Response
Success (200):
"User registered"
Error (400):
"Error message describing the issue"

Login User
POST /auth/login
Authenticate and log in an existing user with the provided credentials.

Request
Method: POST
Endpoint: /auth/login
Headers:
Content-Type: application/json
Body:
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
Response
Success (200):
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
Error (400):
"Error message describing the issue"

HOME END POINT
Get All Posts
GET /
Retrieve all posts available in the system.

Request
Method: GET
Endpoint: /posts
Headers:
Content-Type: application/json
Response
Success (200):
[
  {
    "postId": "1",
    "title": "Amazing Travel Experience",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "author": "authorId",
     "city": "Lorem",
     "userAvatar": "base64EncodedImage"
     "cost": 2000,
    "createdAt": "2023-11-13T12:00:00Z",
    "updatedAt": "2023-11-13T14:30:00Z"
  },
  {
    "postId": "2",
    "title": "Exploring Hidden Gems",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "author": "authorId",
     "city": "Lorem",
     "userAvatar": "base64EncodedImage"
     "cost": 2000,
    "createdAt": "2023-11-14T08:45:00Z",
    "updatedAt": "2023-11-14T10:15:00Z"
  },
  // ... more posts
]

Error (400):
"Error message describing the issue"

