# Welcome to Travel Log Web App!

This platform allows users to register and share their travel experiences. Whether you're a seasoned globetrotter or a weekend explorer, this app provides a space to document and discover amazing journeys.
Guest users have access to Dashboard and posts details but cannot interact with them, they can login or register.
Logged in users can create,edit and delete posts(only if they are owners).
Not owners will be albe to like and dislike(only if it's been liked before) post.(It is not implemented yet)
There are two json files extracted from MongoDBCompas with users and posts for testing.
The password for all the users is: 11111

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

